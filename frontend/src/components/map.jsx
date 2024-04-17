import React, { useState, useEffect } from 'react';
    import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
    import "leaflet/dist/leaflet.css";
    import L, {Icon, icon} from 'leaflet';
    import tryIcon from '../assets/try.png'; 
    import axios from 'axios';

    function MapComponent() {
    const [markers, setMarkers] = useState([]); // Array to store marker data

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
                
                
                  var customPopup = `<b>name</b>: ${name}<br/> <b>rating</b>: ${rating}<br/>`;

                  // specify popup options 
                  var customOptions =
                      {
                      'maxWidth': '400',
                      'width': '200',
                      'className' : 'popupCustom'
                      }
                  // `name: ${name}, rating: ${rating}, comment: ${comment}`
                  L.marker([lat, lng], { icon: myIcon }).addTo(map).bindPopup(customPopup, customOptions).openPopup();
                  handleAddMarker(name, rating, comment, [lat, lng])
                
                
              }
          }
        });
        return null;
      }

    useEffect(() => {
        // Replace with your actual marker data
        const initialMarkers = [
            { lat: 14.586598, lng: 120.976342, popupContent: 'London' },
            { lat: 14.5865, lng: 120.9763, popupContent: 'Paris' },
        // Add more markers here
        ];
        setMarkers(initialMarkers);
    }, []);

    

    return (
      <div>
        <MapContainer center={[14.586598,120.976342]} zoom={20} style={{ height: '900px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MyComponent />
        {markers.map((marker) => (
            <Marker key={marker.lat + marker.lng} position={[marker.lat, marker.lng]} icon = {myIcon}>
            <Popup>{marker.popupContent}</Popup>
            </Marker>
        ))}
        </MapContainer>
      </div>
        
    );

    }
    export default MapComponent;