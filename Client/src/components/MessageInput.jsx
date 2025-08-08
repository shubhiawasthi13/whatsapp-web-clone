import React, { useState } from "react";
import { Smile, Paperclip, Mic } from "lucide-react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div
      className="message-input"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        gap: "10px",
      }}
    >
      {/* Left icons */}
      <Smile size={22} />
      <Paperclip size={22} />

      {/* Text box */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        style={{
          flex: 1,
          padding: "8px 10px",
          borderRadius: "20px",
          border: "1px solid #ccc",
        }}
      />

      {/* Right icon */}
      <Mic size={22} />
    </div>
  );
}
