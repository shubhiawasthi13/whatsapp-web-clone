import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import socket from "./services/socket";
import { fetchMessages, sendMessage as apiSend } from "./services/api";
import "./styles/App.css";

function App() {
  const [allMessages, setAllMessages] = useState([]);
  const [selectedWaId, setSelectedWaId] = useState(null);
  const [currentUser] = useState("918329446654"); // your own wa_id
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch from backend
  useEffect(() => {
    fetchMessages().then((res) => {
      setAllMessages(res.data);
    });
  }, []);

  // WebSocket listeners
  useEffect(() => {
    socket.on("newMessage", (msg) => {
      setAllMessages((prev) => [...prev, msg]);
    });
    socket.on("statusUpdate", (updated) => {
      setAllMessages((prev) =>
        prev.map((msg) =>
          msg.meta_msg_id === updated.meta_msg_id ? updated : msg
        )
      );
    });

    return () => {
      socket.off("newMessage");
      socket.off("statusUpdate");
    };
  }, []);

  const users = Object.values(
    allMessages.reduce((acc, msg) => {
      if (msg.wa_id === currentUser) return acc; // skip your own messages

      if (!acc[msg.wa_id]) {
        acc[msg.wa_id] = {
          wa_id: msg.wa_id,
          name: msg.name,
          latest: msg.message,
        };
      } else {
        acc[msg.wa_id].latest = msg.message;
      }
      return acc;
    }, {})
  );

  const selectedMessages = allMessages.filter(
    (m) =>
      m.wa_id === selectedWaId || // received from selected user
      (m.wa_id === currentUser && m.to === selectedWaId) // sent to selected user
  );

  const selectedUser = users.find((u) => u.wa_id === selectedWaId);

  const handleSend = async (text) => {
    const newMsg = {
      wa_id: currentUser, // YOU
      to: selectedWaId, // receiver
      name: "you" || "",
      message: text,
      timestamp: new Date(),
      status: "sent",
      meta_msg_id: `${Date.now()}-${Math.random()}`,
    };
    await apiSend(newMsg);
  };

  return (
    <div className="app">
      {/* Show sidebar always on desktop, but hide on mobile when chat is open */}
      {(!isMobile || !selectedWaId) && (
        <Sidebar
          users={users}
          selected={selectedWaId}
          onSelect={setSelectedWaId}
        />
      )}

      {/* Show chat only if selected */}
      {selectedWaId ? (
        <div className="chat-section">
          <ChatWindow
            messages={selectedMessages}
            user={selectedUser}
            currentUser={currentUser}
            onBack={() => setSelectedWaId(null)} // <-- Back arrow handler
          />
          <MessageInput onSend={handleSend} />
        </div>
      ) : (
        !isMobile && (
          <div className="empty-chat">Select a user to start chatting</div>
        )
      )}
    </div>
  );
}

export default App;
