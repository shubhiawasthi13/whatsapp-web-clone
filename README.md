# 📱 WhatsApp Clone – Chat Assignment (Full Stack)

This is a full-stack WhatsApp-style chat app that processes WhatsApp webhook payloads (messages + statuses), stores them in MongoDB, and displays them in a real-time responsive frontend using **React + Socket.IO + MongoDB + Express (MERN stack)**.

---

## ✅ Features

- 🔄 Processes WhatsApp message and status payloads
- 💾 Stores messages in MongoDB automatically
- 📥 Real-time updates using Socket.IO
- 💬 Responsive WhatsApp-style chat UI
- 👤 Sidebar with unique contacts
- ✏️ Message status shown (sent, delivered, read)
- 📤 Send new messages (stored locally)

## 🔧Tech Stack
Frontend: React + Vite + Socket.IO + Axios

Backend: Node.js + Express + Mongoose + MongoDB Atlas

Real-time: WebSockets using Socket.IO

## ⚙️ Setup Instructions

### 1. Clone the repo
git clone https://github.com/yourusername/whatsapp-clone-assignment.git
cd whatsapp-clone-assignment
### 2. Setup backend
cd server
npm install
### 3. Create .env file inside /server:
MONGO_URI=your_mongodb_atlas_connection_string
### 4. Run server:
npm run dev
### 5. Process payloads (optional one-time)
node scripts/processPayloads.js
### 5. Setup frontend
cd ../client
npm install
npm run dev


