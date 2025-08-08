import React from "react";
import dayjs from "dayjs";

export default function MessageBubble({ message, isOwn }) {
  const isYou = isOwn === "You";

  return (
    <div className={`bubble ${isYou ? "own" : ""}`}>
      <div className="meta">
        <strong>{isYou ? "You" : message.name}</strong>
        {/* Show status only for your own message */}
        {isYou && <span className="status">• {message.status}</span>}
      </div>
      <div className="text">{message.message}</div>
      <div className="timestamp">
        {dayjs(message.timestamp).format("h:mm A")}
      </div>
    </div>
  );
}
