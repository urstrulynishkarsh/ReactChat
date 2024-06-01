
import React from 'react';
import { Link } from 'react-router-dom';

const MapEmbed = ({ url}) => {

  return (
    <div className="mapembed">
    <iframe src={`${url}&hl=es;z=14&output=embed`} width="300" height="200"></iframe>
    </div>
  );
};

export default MapEmbed;