import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import tryIcon from '../assets/try.png'; 

function reviewMarker({ data, onMarkerClick }) {
    const markerRef = useRef(null);
    const center = data.center;
    const name = data.name;
    const rating = data.rating;

    const icon = useMemo(
        () =>
          new L.Icon({
            iconUrl: tryIcon, // Set the icon URL to your tryIcon
            iconSize: [50, 50], // Set the icon size
            popupAnchor: [0, -25], // Adjust the popup anchor position
          }),
        []
      );

  const eventHandlers = useMemo(
    () => ({
      click: () => {
        // Call your function to handle sidebar opening for the draggable marker
        console.log(center[0], center[1]);
        onMarkerClick(data);
      },
    }),
    [onMarkerClick],
  );


  return (
    <Marker
      eventHandlers={eventHandlers}
      icon={icon} 
      position={center}
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
    if (isNaN(rating) || rating < 0 || rating > 5) {
      return 'Invalid rating value.';
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
