import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L, { Icon } from 'leaflet';
import tryIcon from '../assets/try.png';
import BACKEND_URL from '../../config.js';
import MarkerDetails from './MarkerDetails.jsx';
import MarkerReviewer from './MarkerReviewer.jsx';
import DraggableMarker from './customMarker.jsx';
import ReviewMarker from './reviewMarker.jsx';

function MapComponent() {

  /*************************************************************** 
                            Variables
  ***************************************************************/
  const [markers, setMarkers] = useState([]); // Array to store marker data
  const [selectedMarker, setSelectedMarker] = useState(null); // State to store selected marker
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility

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
        <ReviewMarker data={{center: [14.58659, 120.97634], name: "PLM", rating: 5}} onMarkerClick={handleMarkerClick}  />
        <ReviewMarker data={{center: [14.5865933, 120.9763411], name: "UAC", rating: 3}} onMarkerClick={handleMarkerClick}  />
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