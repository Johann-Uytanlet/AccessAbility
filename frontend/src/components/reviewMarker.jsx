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

function generateStarRating(rating) {
    if (rating < 0 || rating > 5) {
      return 'Invalid rating value.';
    }
    else if(isNaN(rating)){
      return 'No ratings yet, please add one'
    }

    const fullStar = '★';
    const emptyStar = '☆';
    let starString = '';

    for (let i = 0; i < Math.floor(rating); i++) {
      starString += fullStar;
    }

    const decimalPart = rating - Math.floor(rating);
    if (decimalPart > 0) {
      starString += fullStar.slice(0, 1); // Add half star if needed
    }

    for (let i = Math.floor(rating) + (decimalPart > 0 ? 1 : 0); i < 5; i++) {
      starString += emptyStar;
    }

    return starString;
  };

export default reviewMarker;
