import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const MessageTemplate = ({
  username,
  createdAt,
  message,
  isOwnMessage,
}) => {
  const limitedUsername =
    username.length > 10 ? username.slice(0, 10) + "..." : username;
    const {theme}=useContext(ThemeContext);
    const isDarkMode = theme === 'dark';
  return (
    <div className={`message ${isOwnMessage ? "sent" : "received"}`}>
      <p>
        <span
          className={`${
            isDarkMode ? "text-richblack-700" : " text-black"
          }  message__name`}
        >
          {limitedUsername}
        </span>
        <span className="message__meta">{createdAt}</span>
      </p>
      <p className={`${isDarkMode ? "text-customgrey" : " text-black"}`}>
        {message}
      </p>
    </div>
  );
};

export default MessageTemplate;
