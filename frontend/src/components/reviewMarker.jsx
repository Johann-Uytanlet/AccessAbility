import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import friendlyIcon from '../assets/friendly.png';
import notfriendlyIcon from '../assets/notfriendly.png';
import partiallyIcon from '../assets/partially.png';
import initialIcon from '../assets/initial.png'


const selectedIcon = (rating) => {
  if (rating  > 3 && rating <= 5){
    return friendlyIcon;
  } else if (rating < 3 && rating > 0){
    return notfriendlyIcon
  } else if (rating == 3){
    return partiallyIcon;
  } else{
    return initialIcon;
  }
}

function reviewMarker({ data, onMarkerClick }) {
    const markerRef = useRef(null);
    const center = data.center;
    const name = data.name;
    const rating = data.rating;

    const icon = useMemo(
        () =>
          new L.Icon({
            iconUrl: selectedIcon(rating), // Set the icon URL to your tryIcon
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
    {/* <Popup minWidth={90}>
      <span>
        Trying
      </span>
    </Popup> */}

  </Marker>
);
}

export default reviewMarker;