"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import UserInAddress from "./userInAddress";

function AddressInReport() {
  const [can, setCan] = useState<string>("");
  const [canDetails, setCanDetails] = useState<any | null>(null);
  const [name, setName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleCan = async (can: string) => {
    toast.loading("Fetching details...");
    fetch(`/api/can-details?can=${can}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCanDetails(data);
        setName(data?.m_Item1?.FirstName);
        setMobile(data?.m_Item1?.MobileNo);
        setAddress(data?.m_Item4);
        toast.dismiss();
      })
      .catch((error) => console.error("Error fetching data:", error));

    if (canDetails?.m_Item2 === "CAN details not found") {
      toast.error("Invalid CAN");
      setCanDetails(null);
    } else {
      toast.success("Details fetched successfully");
    }
  };
  // return <pre>{JSON.stringify(canDetails, null, 2)}</pre>
  return (
    <>
      <div className="flex gap-2 items-center my-8">
        <h1 className="font-bold">CAN(optional)</h1>
        <input
          type="text"
          className="px-2 p-1 bg-secondary rounded w-full outline-primary"
          value={can}
          onChange={(e) => setCan(e.target.value)}
        />
        <button
          className={`text-white p-1 px-2 rounded bg-primary`}
          onClick={() => handleCan(can)}
        >
          Search
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <h1>Registered Name</h1>
        <input
          type="text"
          className="px-2 p-1 bg-secondary rounded w-full outline-primary"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h1>Mobile</h1>
        <input
          type="text"
          className="px-2 p-1 bg-secondary rounded w-full outline-primary"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <h1>Address</h1>
        <textarea
          className="px-2 p-1 bg-secondary rounded w-full outline-primary"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            disabled={!name || !mobile || !address}
            className={`text-white p-2 px-4 rounded bg-primary ${
              !name || !mobile || !address
                ? "cursor-not-allowed bg-primary/55"
                : " "
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default AddressInReport;
