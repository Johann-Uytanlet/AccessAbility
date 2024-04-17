import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L, {Icon, icon} from 'leaflet';
import tryIcon from '../assets/try.png'; 

function MapComponent() {
    const [markers, setMarkers] = useState([]); // Array to store marker data
    const { currentUser } = useAuth();

    const myIcon = new Icon({
        iconUrl: tryIcon,
        iconSize: [50, 50],
        // iconAnchor: [12.5, 41],
        popupAnchor: [0, -41],
    
    });

    useEffect(() => {
        // Replace with your actual marker data
        const initialMarkers = [
            { lat: 14.586598, lng: 120.976342, popupContent: 'London' },
            { lat: 14.5865, lng: 120.9763, popupContent: 'Paris' },
        // Add more markers here
        ];
        setMarkers(initialMarkers);
    }, []);

    const fetchMarkers = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/getAllMarkers`);
            const data = await response.json();
            setMarkers(data);
        } catch( error ) {
            console.error('Error fetching markers:', error);
        }
    };

    const createMarker = async (lat, lng, name, rating, comment) => {
        try {
            const form = {
                location: name,
                lat,
                lng,
            }
            
            const response = await fetch(`${BACKEND_URL}/createMarker`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: form
            });

            const newMarker = await response.json();
            setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        
            // - Create marker review
            await createMarkerReview(newMarker.id, rating, comment);
        } catch( error ) {
          console.error('Error creating marker:', error);
        }
    };

    const createMarkerReview = async (markerID, rating, comment) => {
        try {
            const form = {
                markerID: markerID,
                rating: rating,
                comment: comment,
                filePath: ''
            }

            await fetch(`${BACKEND_URL}/createMarkerReview`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: form
            });
        } catch (error) {
          console.error('Error creating marker review:', error);
        }
      };

    function MyComponent() {
        const map = useMapEvents({
            click: async (e) => {
                const { lat, lng } = e.latlng;
                const response = prompt(
                    'Enter details for the new marker (separate details with commas):\nName, Rating (0-5), Comment'
                );
            
                if (response) {
                    const [name, rating, comment] = response.split(','); // Split user input
                    await createMarker(lat, lng, name, rating, comment);

                    // Validate input (optional)
                    // You can add checks for valid name format, rating within range (0-5), and comment length
                    var customPopup = `<b>name</b>: ${name}<br/> <b>rating</b>: ${rating}<br/> <b>comment</b>: ${comment}<br/>`;

                    // specify popup options 
                    var customOptions = {
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