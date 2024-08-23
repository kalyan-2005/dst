"use client";
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const customIcon = L.icon({
  iconUrl: '/custom-icon.png',  // Replace with the path to your custom icon
  iconSize: [38, 38], // Size of the icon
  iconAnchor: [22, 38], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -38], // Point from which the popup should open relative to the iconAnchor
});

const MapComponent = ({ locations }: any) => {
  return (
    <MapContainer center={[locations[0].latitude, locations[0].longitude]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={customIcon} // Use the custom icon here
        >
          <Popup>
            <h1>Latitude: {location.latitude}, Longitude: {location.longitude}</h1>
            <p>Location {index + 1}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
