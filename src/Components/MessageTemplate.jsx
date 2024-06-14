import React from "react";

const MessageTemplate = ({
  username,
  createdAt,
  message,
  darkMode,
  isOwnMessage,
}) => {
  const limitedUsername =
    username.length > 10 ? username.slice(0, 10) + "..." : username;
  return (
    <div className={`message ${isOwnMessage ? "sent" : "received"}`}>
      <p>
        <span
          className={`${
            darkMode ? "text-richblack-700" : " text-black"
          }  message__name`}
        >
          {limitedUsername}
        </span>
        <span className="message__meta">{createdAt}</span>
      </p>
      <p className={`${darkMode ? "text-customgrey" : " text-black"}`}>
        {message}
      </p>
    </div>
  );
};

export default MessageTemplate;
