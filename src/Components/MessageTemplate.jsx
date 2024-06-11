import React from 'react'

const MessageTemplate = ({ username, createdAt, message,darkMode }) => {
  const limitedUsername = username.length> 10 ? username.slice(0, 10) + '...' : username;
  return (
    <div className="message">
        <p>
            <span className={`${darkMode ? 'text-white' : ' text-black'}  message__name`}>{limitedUsername}</span>
            <span className="message__meta">{createdAt}</span>
        </p>
        <p className={`${darkMode ? 'text-white' : ' text-black'}`}>{message}</p>
  </div>
  )
}

export default MessageTemplate