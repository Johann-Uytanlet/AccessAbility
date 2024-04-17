import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L, {Icon, icon} from 'leaflet';
import tryIcon from '../assets/try.png'; 
import axios from 'axios';
import DraggableMarker from './customMarker';

    function MapComponent() {
    const [markers, setMarkers] = useState([]); // Array to store marker data
    const [markerCoordinates, setMarkerCoordinates] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null); // State to store selected marker
    const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility

    const myIcon = new Icon({

      iconUrl: tryIcon,
    
      iconSize: [50, 50],
    
      popupAnchor: [0, -41],
    
    });
    

    const handleAddMarker = (name, rating, comment, latlng) => {
      const data = {
        name,
        rating,
        comment,
        latlng
      };
      /*
      axios
        .post('http://localhost:5555/marker', data)
        .then(() => {
          setLoading(false);
          enqueueSnackbar('Book Created successfully', { variant: 'success' });
          navigate('/');
        })
        .catch((error) => {
          // alert('An error happened. Please Chack console');
          enqueueSnackbar('Error', { variant: 'error' });
          console.log(error);
        });*/
    };

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
                
                
                  let starString = generateStarRating(rating);
                  var customPopup = `<div>
                                      <b>Name</b>: ${name}<br />
                                      <b>Rating</b>: ${starString}<br />
                                      </div>`;

                  // specify popup options 
                  var customOptions =
                      {
                      'fontSize': '30px',
                      'maxWidth': '800',
                      'width': '500',
                      'className' : 'popupCustom'
                      }
                  // `name: ${name}, rating: ${rating}, comment: ${comment}`
                  L.marker([lat, lng], { icon: myIcon }).addTo(map).bindPopup(customPopup, customOptions).openPopup();
                  //handleAddMarker(name, rating, comment, [lat, lng])
              }
          }
        });
        return null;
      }

    useEffect(() => {
        // Replace with your actual marker data
        const initialMarkers = [
            { lat: 14.586598, lng: 120.976342, name: "UAC", rating: "★★★★★" },
            { lat: 14.5865, lng: 120.9763, name: "PLM", rating: "★★★★★" },
        // Add more markers here
        ];
        setMarkers(initialMarkers);
    }, []);

    const handleMarkerClick = (lat, lng) => {
      console.log("Here");
      console.log(lat, lng);
      setSidebarOpen(true);
      setMarkerCoordinates({ lat, lng });
    };

    const closeSidebar = () => {
      setSidebarOpen(false);
    };

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        {sidebarOpen && (
      <div className="sidebar">
        <button className="close-button" onClick={closeSidebar}>Close</button>
        {markerCoordinates && (
          <div>
            <h3>Marker Coordinates</h3>
            <p>Latitude: {markerCoordinates.lat}</p>
            <p>Longitude: {markerCoordinates.lng}</p>
          </div>
        )}
      </div>
    )}
        <MapContainer center={[14.586598,120.976342]} zoom={20} style={{ height: '900px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MyComponent />
        <DraggableMarker center={[14.58659, 120.97634]} onMarkerClick={handleMarkerClick}  />
        <DraggableMarker center={[14.58659, 120.9763]} onMarkerClick={handleMarkerClick}  />
        {markers.map((marker) => (
            <Marker key={marker.lat + marker.lng} position={[marker.lat, marker.lng]} icon = {myIcon}>
            <Popup>
              <div style={{ fontSize: '20px' }}>
                  <strong>Name:</strong> {marker.name}<br />
                  <strong>Rating:</strong> {marker.rating}<br />
              </div>
            </Popup>
            </Marker>
        ))}
        </MapContainer>
        
      </div>
        
    );
    }

    
    
    export default MapComponent;