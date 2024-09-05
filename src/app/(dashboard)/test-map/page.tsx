"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
      fetch(`/api/can-details?can=${"621159828"}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const connDetails = data.m_Item1;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <h1>Connection Details</h1>
      <p><strong>Name:</strong> {connDetails?.FirstName}</p>
      <p><strong>Mobile Number:</strong> {connDetails?.MobileNo}</p>
      <p><strong>Balance:</strong> {connDetails?.Balance}</p>
      <p><strong>House Number:</strong> {connDetails?.ServicePremisesAddress?.HouseNumber}</p>
      <p><strong>Street:</strong> {connDetails?.ServicePremisesAddress?.Street}</p>
      <p><strong>Area:</strong> {connDetails?.ServicePremisesAddress?.Area}</p>
      {/* Add more fields as needed */}
    </div>
  );
}
