import React from 'react';
import { Link } from 'react-router-dom';

const LocationTemplate = ({ username, createdAt, url,darkMode }) => {
  // console.log(darkMode)
  return (
    <div className="message">
      <p>
        <span className={`${darkMode ? 'text-white' : ' text-black'}  message__name`}>{username}</span>
        <span className="message__meta">{createdAt && createdAt.toString()}</span>
      </p>
      <p >
        <Link to={url} target="_blank" rel="noopener noreferrer"  className={`${darkMode ? 'text-white' : ''}  text-caribbeangreen-400`}>
          My current location
        </Link>
      </p>
    </div>
  );
};

export default LocationTemplate;
