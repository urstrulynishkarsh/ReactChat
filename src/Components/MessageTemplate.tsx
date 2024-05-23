import React, { FC } from 'react'
import { GenerateMessageInit } from '../../server/types/Message';

type Props = GenerateMessageInit & { darkMode: boolean };

const MessageTemplate: FC<Props> = ({ username, createdAt, message, darkMode }) => {
  const limitedUsername = username.length > 10 ? username.slice(0, 10) + '...' : username;
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

export default MessageTemplate;