import React from 'react';
import { Link } from 'react-router-dom';
import MapEmbed from './MapEmbed';
const LocationTemplate = ({ username, createdAt, url,darkMode }) => {
 

  // console.log(username)
  const limitedUsername = username.length> 10 ? username.slice(0, 10) + '...' : username;
  return (
    <div className="message">
      <p>
        <span className={`${darkMode ? 'text-white' : ' text-black'}  message__name`}>{limitedUsername}</span>
        <span className="message__meta">{createdAt && createdAt.toString()}</span>
      </p>
      <p >
        <Link to={url} target="_blank" rel="noopener noreferrer"  className={`${darkMode ? 'text-white' : ''}  text-caribbeangreen-400`}>
          My current location
        </Link>
      </p>
      <MapEmbed url={url} />
    </div>
  );
};

export default LocationTemplate;
