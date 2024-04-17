    import React, { useState, useEffect } from 'react';
    import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
    import "leaflet/dist/leaflet.css";

    function MapComponent() {
    const [markers, setMarkers] = useState([]); // Array to store marker data


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
        <MapContainer center={[14.586598,120.976342]} zoom={20} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker) => (
            <Marker key={marker.lat + marker.lng} position={[marker.lat, marker.lng]}>
            <Popup>{marker.popupContent}</Popup>
            </Marker>
        ))}
        </MapContainer>
    );

    }
    export default MapComponent;
