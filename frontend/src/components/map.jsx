import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L, { Icon } from 'leaflet';
import tryIcon from '../assets/try.png';
import BACKEND_URL from '../../config.js';
import MarkerDetails from './MarkerDetails.jsx';
import MarkerReviewer from './MarkerReviewer.jsx';

function MapComponent() {

  /*************************************************************** 
                            Variables
  ***************************************************************/
  const [markers, setMarkers] = useState([]);

  const myIcon = new Icon({
    iconUrl: tryIcon,
    iconSize: [50, 50],
    popupAnchor: [0, -41],
  });

  useEffect(() => {
    fetchMarkers();
  }, []);

  /*************************************************************** 
                             Queries
  ***************************************************************/
  const fetchMarkers = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/getAllMarkers`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if( response.ok ) {
          const data = await response.json();
          setMarkers(data);
        } else {
          const errorData = await response.json();
          console.error('Error fetching markers:', errorData.error);
        }
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  };

  const createMarker = async (name, lat, lng) => {
    try {
        const form = {
            location: name, 
            lat: lat,
            lng: lng
        };

        const response = await fetch(`${BACKEND_URL}/createMarker`, {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        
        if( response.ok ) {
            alert("MARKER WAS CREATEED");
            fetchMarkers();
        } else {
            alert( `${response.message}`)
        }

    } catch(error) {
      console.error('Error creating marker:', error);
      alert("MARKER WAS NOT CREATED");
    }
  };

  const createMarkerReview = async (markerID, rating, comment) => {
    try {
        const form = {
            markerID,
            rating,
            comment
        }

        const response = await fetch(`${BACKEND_URL}/createMarkerReview`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: form
        });

    } catch (error) {
      console.error('Error creating marker review:', error);
    }
  };

  /*************************************************************** 
                          Helper Functions
  ***************************************************************/
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
      starString += fullStar.slice(0, 1);
    }

    for (let i = Math.floor(rating) + (decimalPart > 0 ? 1 : 0); i < 5; i++) {
      starString += emptyStar;
    }

    return starString;
  }

  function MyComponent() {
    const map = useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        const name = prompt('You are creating a new marker. Please enter the name:');

        if( name ) {
          await createMarker(name, lat, lng);
        }
      },
    });

    return null;
  }

  /*************************************************************** 
                            Variables
  ***************************************************************/
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showMarkerDetails, setShowMarkerDetails] = useState(false);
  const [showMarkerReviewer, setShowMarkerReviewer] = useState(false);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setShowMarkerDetails(true);
  };

  const handleMarkerDetailsClose = () => {
    setSelectedMarker(null);
    setShowMarkerDetails(false);
  };

  const handleReviewLocationClick = () => {
    setShowMarkerDetails(false);
    setShowMarkerReviewer(true);
  };

  const handleMarkerReviewSubmit = async (rating, comment) => {
    if (selectedMarker) {
      await createMarkerReview(selectedMarker.id, rating, comment);
      setSelectedMarker(null);
      setShowMarkerReviewer(false);
    }
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  return (
    <div>
      <MapContainer center={[14.586598, 120.976342]} zoom={20} style={{ height: '900px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MyComponent />
        {markers.map((marker) => (
          <Marker
            position={[marker.lat, marker.lng]}
            icon={myIcon}
            eventHandlers={{
              click: () => handleMarkerClick(marker),
            }}
          >
            <Popup>
              Location: {marker.location}  
              <br></br>
              Ratings: {marker.averageRating}
            
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <MarkerDetails
        marker={selectedMarker}
        show={showMarkerDetails}
        onHide={handleMarkerDetailsClose}
        onReviewClick={handleReviewLocationClick}
      />
      <MarkerReviewer
        show={showMarkerReviewer}
        onHide={() => setShowMarkerReviewer(false)}
        onSubmit={handleMarkerReviewSubmit}
      />
    </div>
  );
}

export default MapComponent;