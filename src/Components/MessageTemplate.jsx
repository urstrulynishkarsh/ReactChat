import React from 'react'

const MessageTemplate = ({ username, createdAt, message, darkMode, currentuser }) => {
  const limitedUsername = username.length > 10 ? username.slice(0, 10) + '...' : username;
  
  return (
    <div className={`${(currentuser.toLowerCase() == username) ? `messageUser` : `message`} `}>
      <p>
        <span className={`${darkMode ? 'text-white' : ' text-black'}  message__name`}>{limitedUsername}</span>
        <span className="message__meta">{createdAt}</span>
      </p>
      <div className={`${darkMode ? 'text-white' : ' text-black'} message__text`}>{message}</div>
    </div>
  )
}

export default MessageTemplate