import React from 'react';
import { Link } from 'react-router-dom';

const LocationTemplate = ({ username, createdAt, url }) => {
  return (
    <div className="message">
      <p>
        <span className="message__name">{username}</span>
        <span className="message__meta">{createdAt && createdAt.toString()}</span>
      </p>
      <p>
        <Link to={url} target="_blank" rel="noopener noreferrer">
          My current location
        </Link>
      </p>
    </div>
  );
};

export default LocationTemplate;
