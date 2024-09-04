"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

function AddressInReport() {
  const currentUser = {
    name: "Kalyan",
    email: "wYqFP@example.com",
  }
  const [can,setCan] = useState<string>("")
  const [canDetails,setCanDetails] = useState<any|null>(null)
  const handleCan = () => {
    fetch(`https://erp.hyderabadwater.gov.in/HmwssbOnlineNew/api/HmwssbMCCCaptureGrievance/GetServConnDetailsForCAN?can=${can}`)
    .then((res) => res.json())
    .then((data) => {
      setCanDetails(data)
    })
  }
  return (
    <div>
      <h1 className="font-black uppercase text-3xl text-animate">Address</h1>
      <div className="flex mt-4 gap-3 items-center p-2 px-4 rounded-xl shadow-inner shadow-gray-500">
        {currentUser?.image ? (
          <Image
            src={currentUser?.image}
            className="block m-auto w-1/2"
            width={50}
            height={50}
            alt="logo"
          />
        ) : (
          <div className="text-center">
            <FaCircleUser className="text-4xl" />
          </div>
        )}
        <div>
            <h1 className="font-bold">{currentUser?.name}</h1>
            <h1 className="font-semibold text-sm">{currentUser?.email}</h1>
        </div>
      </div>
      <div className="flex gap-2 items-center my-8">
        <h1 className="font-bold">CAN(optional)</h1>
        <input
          type="text"
          className="px-2 p-1 bg-secondary rounded w-full outline-primary"
          value={can}
          onChange={(e)=>setCan(e.target.value)}
        />
        <button className={`text-white p-1 px-2 rounded bg-primary`} onClick={handleCan}>
          Search
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <h1>Registered Name</h1>
        <input
          type="text"
          className="px-2 p-1 bg-secondary rounded w-full outline-primary"
        />
        <h1>Mobile</h1>
        <input
          type="text"
          className="px-2 p-1 bg-secondary rounded w-full outline-primary"
        />
        <h1>Address</h1>
        <textarea className="px-2 p-1 bg-secondary rounded w-full outline-primary" />
        <div className="flex justify-end"><button className={`text-white p-1 px-3 rounded-full bg-primary`}>Save Details</button></div>
      </div>
    </div>
  );
}

export default AddressInReport;
