import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L, {Icon, icon} from 'leaflet';
import tryIcon from '../assets/try.png'; 
import axios from 'axios';
import DraggableMarker from './customMarker';
import ReviewMarker from './reviewMarker';

    function MapComponent() {
    const [markers, setMarkers] = useState([]); // Array to store marker data
    //const [markerCoordinates, setMarkerCoordinates] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null); // State to store selected marker
    const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility

    useEffect(() => {
      // Replace with your actual marker data
      const initialMarkers = [
        { center: [14.586598, 120.976342], name: "UAC", rating: 5 },
        { center: [14.5865, 120.9763], name: "PLM", rating: 5 },
        // Add more markers here
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
                      let center = [lat, lng]
                      const newMarker = {
                        center,
                        name,
                        rating,
                      };

                      setMarkers(prevMarkers => [...prevMarkers, newMarker]);

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
            <p>Latitude: {selectedMarker.center[0]}</p>
            <p>Longitude: {selectedMarker.center[1]}</p>
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