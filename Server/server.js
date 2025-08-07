import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import messageRoutes from './routes/messages.js';
import { initSocket } from './socket.js';

dotenv.config();
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = initSocket(server);

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);

// Connect DB and Start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));

export { io };
