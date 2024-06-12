import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MapEmbed from "./MapEmbed";
import { ThemeContext } from "../Context/ThemeContext";
const LocationTemplate = ({
  username,
  createdAt,
  url,

  isOwnMessage,
}) => {
  // console.log(username)
  const limitedUsername =
    username.length > 10 ? username.slice(0, 10) + "..." : username;

    const {theme}=useContext(ThemeContext);
    const isDarkMode = theme === 'dark';
  return (
    <div className={`message ${isOwnMessage ? "sent" : "received"}`}>
      <p>
        <span
          className={`${
            isDarkMode ? "text-white" : " text-black"
          }  message__name`}
        >
          {limitedUsername}
        </span>
        <span className="message__meta">
          {createdAt && createdAt.toString()}
        </span>
      </p>
      <p>
        <Link
          to={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${isDarkMode ? "text-white" : ""}  text-caribbeangreen-400`}
        >
          My current location
        </Link>
      </p>
      <MapEmbed url={url} />
    </div>
  );
};

export default LocationTemplate;
