"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const customIcon = L.icon({
  iconUrl: '/custom-icon.png',  // Replace with the path to your custom icon
  iconSize: [38, 38], // Size of the icon
  iconAnchor: [22, 38], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -38], // Point from which the popup should open relative to the iconAnchor
});

const selectedIcon = L.icon({
  iconUrl: '/selected-icon.png',  // Replace with the path to your custom icon
  iconSize: [38, 38], // Size of the icon
  iconAnchor: [22, 38], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -38], // Point from which the popup should open relative to the iconAnchor
});

// Custom component to open all popups on render
const AutoOpenPopup = ({ markers }: any) => {
  const map = useMap();

  useEffect(() => {
    markers.forEach((marker: any) => {
      if (marker) {
        marker.openPopup(); // Automatically open popup
      }
    });
  }, [map, markers]);

  return null;
};

const MapComponent = ({ locations, selectedSensor, setSelectedSensor }: any) => {
  const [markers, setMarkers] = useState<any[]>([]); // Store marker references

  // Function to handle marker click and set the sensor name
  const handleMarkerClick = (sensor: any) => {
    setSelectedSensor(sensor);
  };

  return (
    <div className="relative z-0">
      <MapContainer className='w-full h-[400px] z-0' center={[locations[0]?.latitude, locations[0]?.longitude]} zoom={16} style={{ borderRadius: '32px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location: any, index: number) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
            icon={location.name === selectedSensor?.name ? selectedIcon : customIcon}
            ref={(marker) => {
              if (marker && !markers.includes(marker)) {
                setMarkers((prev) => [...prev, marker]);
              }
            }} // Store marker reference
            eventHandlers={{
              click: () => handleMarkerClick(location),
            }}
          >
            <Popup autoClose={false}>
              <h1>{location.name}</h1>
            </Popup>
          </Marker>
        ))}
        <AutoOpenPopup markers={markers} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
