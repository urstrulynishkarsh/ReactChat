
import React from 'react';


const MapEmbed = ({ url}) => {

  return (
    <div className="mapembed">
    <iframe src={`${url}&hl=es;z=14&output=embed`} width="300" height="200" title='map'></iframe>
    </div>
  );
};

export default MapEmbed;