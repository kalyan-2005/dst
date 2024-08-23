"use client"
import React, { useState } from 'react';
import { BiTargetLock } from "react-icons/bi";

const GeoLocation = ({ location, setLocation }: { location: any, setLocation: any }) => {
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true, // Request high accuracy
          timeout: 5000, // Timeout after 5 seconds
          maximumAge: 0, // Do not use cached position
        }
      );
      
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className='my-8'>
      <button className={`bg-blue-500 w-full text-white font-bold py-2 px-4 rounded-xl flex justify-center gap-4 items-center ${location.latitude && location.longitude ? 'disabled bg-green-500 hover:bg-none' : 'hover:bg-blue-700'}`}  onClick={handleGetLocation}><BiTargetLock className='text-xl' />{location.latitude && location.longitude ? 'Location Detected' : 'Detect Location'}</button>
      {error && (
        <p className='text-red-500'>Allow location access</p>
      )}
    </div>
  );
};

export default GeoLocation;
