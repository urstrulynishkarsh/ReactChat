import React from 'react';
import './MessageTemplate.css'
const MessageTemplate = ({ username, createdAt, message, darkMode }) => {
  const limitedUsername = username.length > 10 ? username.slice(0, 10) + '...' : username;

  return (
    <div className={`message-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="message-box">
         <p>
            <span className={`${darkMode ? 'text-white' : ' text-black'}  message__name`}>{limitedUsername}</span>
            <span className={`${darkMode ? 'text-white' : ' text-gray'} message__meta`}>{createdAt}</span>
        </p>
        <p className="message-text">{message}</p>
        <div className="message-arrow"></div>
      </div>
    </div>
  );
};

export default MessageTemplate;
