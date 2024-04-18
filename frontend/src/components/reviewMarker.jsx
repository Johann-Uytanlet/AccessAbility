import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import tryIcon from '../assets/try.png'; 

import markerOne from '../assets/marker-1.png'; 
import markerTwo from '../assets/marker-2.png'; 
import markerThree from '../assets/marker-3.png'; 
import markerFour from '../assets/marker-4.png'; 


//import notFriendly from '../assets/notfriendly.png'; 
//import partially from '../assets/partially.png'; 
//import friendly from '../assets/friendly.png'; 

function reviewMarker({ data, onMarkerClick }) {
    const markerRef = useRef(null);
    const lat = data.lat;
    const lng = data.lng;
    //const center = data.center;
    const name = data.name;
    const averageRating = data.averageRating;

    const getIconByRating = () => {  
      if( averageRating > 0 && averageRating < 2 ) {
        return markerThree;
      } else if( averageRating >= 2 && averageRating < 4 ) {
        return markerTwo;
      } else if( averageRating >= 4 ) {
        return markerOne;
      } else if( averageRating <= 0 ) {
        return markerFour;
      } 
    }

    const icon = useMemo(
        () =>
          new L.Icon({
            iconUrl: getIconByRating(),
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
          {name}
        </span>
      </Popup>
    </Marker>
  );
}

export default reviewMarker;