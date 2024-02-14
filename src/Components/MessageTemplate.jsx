import React from 'react'

const MessageTemplate = ({ username, createdAt, message }) => {
  return (
    <div className="message">
        <p>
            <span className="message__name">{username}</span>
            <span className="message__meta">{createdAt}</span>
        </p>
        <p>{message}</p>
  </div>
  )
}

export default MessageTemplate