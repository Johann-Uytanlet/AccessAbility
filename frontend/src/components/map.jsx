import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L, { Icon } from 'leaflet';
import tryIcon from '../assets/try.png';
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
    iconUrl: tryIcon,
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
          let rating;
          do {
            rating = prompt('What is your Rating (0-5)');
            rating = parseFloat(rating);
          } while (isNaN(rating) || rating < 0 || rating > 5);

          const starString = generateStarRating(rating);
          const center = [lat, lng];
          const newMarker = {
            center,
            name,
            rating,
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
          <MarkerDetails markerData={selectedMarker} onClose={closeMarkerDetails} generateStarRating={generateStarRating} />
        </div>
      )}
      <MapContainer center={[14.586598, 120.976342]} zoom={20} style={{ height: '900px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MyComponent />
        <MyMarkers markers={markers} />
      </MapContainer>
    </div>
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

export default MapComponent;