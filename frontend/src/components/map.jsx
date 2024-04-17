import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L, {Icon, icon} from 'leaflet';
import tryIcon from '../assets/try.png'; 
import axios from 'axios';
import DraggableMarker from './customMarker';
import ReviewMarker from './reviewMarker';
import BACKEND_URL from '../../config.js';

function MapComponent() {
    const [markers, setMarkers] = useState([]); // Array to store marker data
    const [selectedMarker, setSelectedMarker] = useState(null); // State to store selected marker
    const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility

    const myIcon = new Icon({
      iconUrl: tryIcon,
      iconSize: [50, 50],
      popupAnchor: [0, -41],
    });

    useEffect(() => {
      setMarkers(fetchMarkers());
    }, []);

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

    async function createMarker( name, lat, lng ) {
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

    function MyMarkers({ markers }) {
      return (
        <>
          {markers.map((marker, index) => (
            <ReviewMarker key={index} data={marker} onMarkerClick={handleMarkerClick} />
          ))}
        </>
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

    function MyComponent() {
        const map = useMapEvents({
          click: (e) => {
            const { lat, lng } = e.latlng;
            const name = prompt(
                'What is the name of the Building?'
            );     
              if (name) {
                let rating;
                do {
                  rating = prompt('What is your Rating (0-5)');
                  rating = parseFloat(rating);
                } while (isNaN(rating) || rating < 0 || rating > 5);
                
              
                  let center = [lat, lng]
                  const newMarker = {
                    center,
                    name,
                    rating,
                  };

                  createMarker(name, lat, lng);
                  // setMarkers(prevMarkers => [...prevMarkers, newMarker]);
                  // `name: ${name}, rating: ${rating}, comment: ${comment}`
                  //L.marker([lat, lng], { icon: myIcon }).addTo(map).bindPopup(customPopup, customOptions).openPopup();
                  //handleAddMarker(name, rating, comment, [lat, lng])
              }
          }
        });
        return null;
      }

    

    const handleMarkerClick = (data) => {
      console.log("Here");
      setSidebarOpen(true);
      setSelectedMarker(data);
    };

    const closeSidebar = () => {
      setSidebarOpen(false);
    };

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        {sidebarOpen && (
      <div className="sidebar">
        <button className="close-button" onClick={closeSidebar}>Close</button>
        {selectedMarker && (
          <div>
            <h3>Marker Coordinates</h3>
            <p>Latitude: {selectedMarker.lat}</p>
            <p>Longitude: {selectedMarker.lng}</p>
            <p>Name: {selectedMarker.name}</p>
            <p>Rating: {generateStarRating(selectedMarker.rating)}</p>
            
          </div>
        )}
      </div>
    )}
        <MapContainer center={[14.586598,120.976342]} zoom={20} style={{ height: '900px', width: '100%' }}>
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