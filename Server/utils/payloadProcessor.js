import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Message from '../models/Message.js';

// Added: Setup dummy express server to initialize WebSocket
import express from 'express';
import http from 'http';
import { initSocket, getIO } from '../socket.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Dummy server to initialize socket
const app = express();
const server = http.createServer(app);
initSocket(server); //  FIX: Now getIO() will work

const dir = './payloads';

const processPayloads = async () => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const data = JSON.parse(raw);

      console.log(` Processing: ${file}`);

      const entry = data.metaData?.entry?.[0];
      const value = entry?.changes?.[0]?.value;

      const messages = value?.messages || [];
      for (const msg of messages) {
        console.log(" Message payload:", msg);

        try {
          const saved = await Message.create({
            wa_id: msg.from || 'unknown',
            name: value.contacts?.[0]?.profile?.name || 'Unknown',
            message: msg.text?.body || '[Empty]',
            timestamp: new Date(Number(msg.timestamp) * 1000),
            meta_msg_id: msg.id
          });

          console.log(`Inserted message from: ${msg.from}`);

          // Emit only if socket initialized
          const io = getIO();
          if (io) {
            io.emit('newMessage', saved);
            console.log(`WebSocket emitted: newMessage`);
          }
        } catch (err) {
          console.error(` Message insert failed in ${file}:`, err.message);
        }
      }

      const statuses = value?.statuses || [];
      for (const status of statuses) {
        console.log("Status update payload:", status);

        try {
          const updated = await Message.findOneAndUpdate(
            { meta_msg_id: status.id },
            { status: status.status },
            { new: true }
          );

          if (updated) {
            console.log(`Status updated: ${status.id} → ${status.status}`);
            const io = getIO();
            if (io) {
              io.emit('statusUpdate', updated);
              console.log(` WebSocket emitted: statusUpdate`);
            }
          } else {
            console.warn(` No message found for status update: ${status.id}`);
          }
        } catch (err) {
          console.error(` Status update failed in ${file}:`, err.message);
        }
      }

    } catch (err) {
      console.error(` Error processing file ${file}:`, err.message);
    }
  }

  console.log("All payloads processed!");
};

processPayloads();

