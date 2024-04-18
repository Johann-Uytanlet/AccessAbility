import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L, { Icon } from 'leaflet';
import friendlyIcon from '../assets/friendly.png';
import notfriendlyIcon from '../assets/notfriendly.png';
import partiallyIcon from '../assets/partially.png';
import ReviewMarker from './reviewMarker';
import MarkerDetails from './MarkerDetails/MarkerDetails';

function MapComponent() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showMarkerDetails, setShowMarkerDetails] = useState(false);

  useEffect(() => {
    const initialMarkers = [
      { center: [14.586598, 120.976342], name: "UAC", rating: 5 },
      { center: [14.5865, 120.9763], name: "PLM", rating: 5 },
    ];
    setMarkers(initialMarkers);
  }, []);

  const myIcon = new Icon({
    iconUrl: friendlyIcon,
    iconSize: [50, 50],
    popupAnchor: [0, -41],
  });

  function MyMarkers({ markers }) {
    return (
      <>
        {markers.map((marker, index) => (
          <ReviewMarker key={index} data={marker} onMarkerClick={handleMarkerClick} />
        ))}
      </>
    );
  }

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        const name = prompt('What is the name of the Building?');
        if (name) {
          // let rating;
          // do {
          //   rating = prompt('What is your Rating (0-5)');
          //   rating = parseFloat(rating);
          // } while (isNaN(rating) || rating < 0 || rating > 5);

          const center = [lat, lng];
          const newMarker = {
            center,
            name,
            rating: "?", // default
          };

          setMarkers(prevMarkers => [...prevMarkers, newMarker]);
        }
      }
    });
    return null;
  }

  const handleMarkerClick = (data) => {
    setSelectedMarker(data);
    setShowMarkerDetails(true);
  };

  const closeMarkerDetails = () => {
    setShowMarkerDetails(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {showMarkerDetails && (
        <div className="marker-details-container">
          <MarkerDetails markerData={selectedMarker} onClose={closeMarkerDetails} />
        </div>
      )}
      <MapContainer center={[14.586598, 120.976342]} zoom={20} style={{ height: '100vh', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MyComponent />
        <MyMarkers markers={markers} />
      </MapContainer>
    </div>
  );
}

export default MapComponent;