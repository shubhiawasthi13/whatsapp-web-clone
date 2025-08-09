import React, { useState } from "react";
import {
  CircleDashed, // Status
  MessageCircle, // Chats
  Users, // Communities
  Bookmark, // Channels
  Plus, // New Chat
  MoreVertical, // Menu
  Search, // Search
  Filter,
  Settings,
  Phone,
  Star,
  Menu,
} from "lucide-react";
import "../styles/Sidebar.css";

export default function Sidebar({ users, selected, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users based on search
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar-container">
      {/* Left Narrow Strip */}
      <div className="left-strip">
        <div className="top-icons">
          <Menu size={24} className="icon" />
          <MessageCircle size={24} className="icon active" />
          <Phone size={24} className="icon" />
          <CircleDashed size={24} className="icon" style={{ color: "blue" }} />
        </div>
        <div className="bottom-icons">
          <Settings size={24} className="icon" />
          <Star size={24} className="icon" />
          <div className="profile-circle">
            <Users size={24} className="icon" />
          </div>
        </div>
      </div>

      {/* Right Chat Panel */}
      <div className="chat-panel">
        {/* Header */}
        <div className="chat-panel-header">
          <h3>Chats</h3>
          <div className="header-icons">
            <Plus size={20} className="icon" />
            <MoreVertical size={20} className="icon" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search or start a new chat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Filter size={18} className="filter-icon" />
        </div>

        {/* Chat List */}
        <div className="chat-list">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.wa_id}
                className={`contact ${selected === user.wa_id ? "active" : ""}`}
                onClick={() => onSelect(user.wa_id)}
              >
                {/* Avatar */}
                <div className="avatar">
                  {user.name?.charAt(0).toUpperCase() || "?"}
                </div>

                {/* Contact Info */}
                <div className="contact-info">
                  <div className="name">{user.name}</div>
                  <div className="preview">{user.latest}</div>
                </div>
                
              </div>
              
            ))
          ) : (
            <div className="spinner"></div>
          )}
        </div>
      </div>
    </div>
  );
}
