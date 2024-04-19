import React from 'react'

const MessageTemplate = ({ username, createdAt, message,darkMode }) => {
  return (
    <div className="message">
        <p>
            <span className={`${darkMode ? 'text-white' : ' text-black'}  message__name`}>{username}</span>
            <span className="message__meta">{createdAt}</span>
        </p>
        <p className={`${darkMode ? 'text-white' : ' text-black'}`}>{message}</p>
  </div>
  )
}

export default MessageTemplate