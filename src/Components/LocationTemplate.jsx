import React from 'react';
import { Link } from 'react-router-dom';

const LocationTemplate = ({ username, createdAt, url,darkMode,currentuser }) => {

  // console.log(username)
  const limitedUsername = username.length> 10 ? username.slice(0, 10) + '...' : username;
  return (
    <div className={`${(currentuser.toLowerCase() == username)?`messageUser`:`message`} `}>
      <p>
        <span className={`${darkMode ? 'text-white' : ' text-black'}  message__name`}>{limitedUsername}</span>
        <span className="message__meta">{createdAt && createdAt.toString()}</span>
      </p>
      <div >
        <Link to={url} target="_blank" rel="noopener noreferrer"  className={`${darkMode ? 'text-white' : ''}  text-caribbeangreen-400`}>
          My current location
        </Link>
      </div>
    </div>
  );
};

export default LocationTemplate;
