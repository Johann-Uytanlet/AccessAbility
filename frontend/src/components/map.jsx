import React, { useState, useEffect } from 'react';
    import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
    import "leaflet/dist/leaflet.css";
    import L, {Icon, icon} from 'leaflet';
    import tryIcon from '../assets/try.png'; 

    function MapComponent() {
    const [markers, setMarkers] = useState([]); // Array to store marker data

    const myIcon = new Icon({

      iconUrl: tryIcon,
    
      iconSize: [40, 40],
    
      //iconAnchor: [12.5, 41],
    
      popupAnchor: [0, -41],
    
    });

    function MyComponent() {
        const map = useMapEvents({
          click: (e) => {
            const { lat, lng } = e.latlng;
            const response = prompt(
                'Enter details for the new marker (separate details with commas):\nName, Rating (0-5), Comment'
              );
        
              if (response) {
                const [name, rating, comment] = response.split(','); // Split user input
        
                // Validate input (optional)
                // You can add checks for valid name format, rating within range (0-5), and comment length

                var customPopup = `<b>name</b>: ${name}<br/> <b>rating</b>: ${rating}<br/> <b>comment</b>: ${comment}<br/>`;

                // specify popup options 
                var customOptions =
                    {
                    'maxWidth': '400',
                    'width': '200',
                    'className' : 'popupCustom'
                    }
                // `name: ${name}, rating: ${rating}, comment: ${comment}`
                L.marker([lat, lng], { icon: myIcon }).addTo(map).bindPopup(customPopup, customOptions).openPopup();;
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
        <MapContainer center={[14.586598,120.976342]} zoom={20} style={{ height: '900px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MyComponent />
        {markers.map((marker) => (
            <Marker key={marker.lat + marker.lng} position={[marker.lat, marker.lng]} icon = {myIcon}>
            <Popup>{marker.popupContent}</Popup>
            </Marker>
        ))}
        </MapContainer>
    );

    }
    export default MapComponent;