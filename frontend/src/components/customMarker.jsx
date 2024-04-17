import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';

function DraggableMarker({ center, onMarkerClick }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
      click: () => {
        // Call your function to handle sidebar opening for the draggable marker
        console.log(center[0], center[1]);
        onMarkerClick(center[0], center[1]);
      },
    }),
    [onMarkerClick],
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  );
}

export default DraggableMarker;
