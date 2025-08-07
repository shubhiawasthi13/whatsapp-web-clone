import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import "../styles/App.css";

export default function ChatWindow({ messages, user, currentUser }) {
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div style={{ display: "flex" }}>
          <div className="avatar">
            {user.name?.charAt(0).toUpperCase() || "?"}
          </div>
            <h3>{user?.name || user?.wa_id}</h3>
        </div>
      </div>

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
