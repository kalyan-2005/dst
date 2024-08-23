import MapComponent from "@/components/MapComponent";
import React from "react";

const locations = [
  { lat: 17.5501505, lng: 78.3948765 }, // San Francisco
  { lat: 40.7128, lng: -74.006 }, // New York
  { lat: 34.0522, lng: -118.2437 }, // Los Angeles
  { lat: 41.8781, lng: -87.6298 }, // Chicago
];

const App = () => {
  return (
    <div>
      <h1>Locations on Map</h1>
      <MapComponent locations={locations} />
    </div>
  );
};

export default App;
