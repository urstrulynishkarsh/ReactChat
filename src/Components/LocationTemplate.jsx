import React from 'react';
import { Link } from 'react-router-dom';

const LocationTemplate = ({ username, createdAt, url, darkMode }) => {
  const limitedUsername = username.length > 10 ? username.slice(0, 10) + '...' : username;
  return (
    <div className="message p-2 md:p-4 bg-white dark:bg-gray-800 rounded-md shadow-md mb-2">
    <p className="flex justify-between items-center text-sm md:text-base">
  <span className={`${darkMode ? 'text-gray-300' : 'text-black'} font-semibold`}>
    {limitedUsername}
  </span>
  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-xs md:text-sm`}>
    {createdAt && createdAt.toString()}
  </span>
</p>

      <p>
        <Link
          to={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${darkMode ? 'text-green-300' : 'text-green-600'} underline`}
        >
          My current location
        </Link>
      </p>
    </div>
  );
};

export default LocationTemplate;
