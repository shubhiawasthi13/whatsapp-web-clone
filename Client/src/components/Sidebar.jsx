import React from 'react';
export default function Sidebar({ users, selected, onSelect }) {
  return (
    <div className="sidebar">
      <h2>Chats</h2>
      {users.map((user) => (
        <div
          key={user.wa_id}
          className={`contact ${selected === user.wa_id ? 'active' : ''}`}
          onClick={() => onSelect(user.wa_id)}
        >
          {/* Profile Circle with Initial */}
          <div className="avatar">
            {user.name?.charAt(0).toUpperCase() || '?'}
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="name">{user.name}</div>
            <div className="preview">{user.latest}</div>
          </div>
        </div>
      ))}
      
    </div>
  );
}
