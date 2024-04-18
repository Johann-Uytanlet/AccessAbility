import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import tryIcon from '../assets/try.png'; 
//import notFriendly from '../assets/notfriendly.png'; 
//import partially from '../assets/partially.png'; 
//import friendly from '../assets/friendly.png'; 

function reviewMarker({ data, onMarkerClick }) {
    const markerRef = useRef(null);
    const lat = data.lat;
    const lng = data.lng;
    //const center = data.center;
    const name = data.name;
    const rating = data.rating;

    const icon = useMemo(
        () =>
          new L.Icon({
            iconUrl: tryIcon,
            iconSize: [50, 50], // Set the icon size
            popupAnchor: [0, -25], // Adjust the popup anchor position
          }),
        []
      );

  const eventHandlers = useMemo(
    () => ({
      click: () => {
        // Call your function to handle sidebar opening for the draggable marker
        console.log(lat, lng);
        onMarkerClick(data);
      },
    }),
    [onMarkerClick],
  );

  return (
    <Marker
      eventHandlers={eventHandlers}
      icon={icon} 
      position={[lat, lng]}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span>
          Trying
        </span>
      </Popup>
    </Marker>
  );
}

export default reviewMarker;