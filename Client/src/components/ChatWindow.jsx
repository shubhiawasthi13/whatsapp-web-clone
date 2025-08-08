import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { Search, Phone, Video, MoreVertical } from "lucide-react";
import "../styles/App.css";

export default function ChatWindow({ messages, user, currentUser }) {
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="avatar">
            {user.name?.charAt(0).toUpperCase() || "?"}
          </div>
          <h3 style={{ marginLeft: "10px" }}>{user?.name || user?.wa_id}</h3>
        </div>

        {/* Right side icons */}
        <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
          <div>
            <Phone
              size={20}
              className="icon"
              style={{ backgroundColor: "white", padding: "7px" }}
            />
            <Video
              size={20}
              className="icon"
              style={{ backgroundColor: "white", padding: "7px" }}
            />
          </div>

          <Search size={20} className="icon" />
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat-body">
        {messages.map((msg) => {
          const isOwn = msg.wa_id === currentUser ? "You" : msg.name;
          return <MessageBubble key={msg._id} message={msg} isOwn={isOwn} />;
        })}
        <div ref={endRef} />
      </div>
    </div>
  );
}
