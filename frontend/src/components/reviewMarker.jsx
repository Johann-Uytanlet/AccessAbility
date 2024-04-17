// ReviewMarker.jsx
import React from 'react';
import { Marker } from 'react-leaflet';

const ReviewMarker = ({ data, onMarkerClick }) => {
  const { center } = data;

  return (
    <Marker
      position={center}
      eventHandlers={{
        click: () => {
          onMarkerClick(data);
        },
      }}
    >
      {/* Render marker content here */}
    </Marker>
  );
};

export default ReviewMarker;