"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AddressInReport({ savedAddress, savedMobile, savedName }: any) {
  const [can, setCan] = useState<string>("");
  const [canDetails, setCanDetails] = useState<any | null>(null);
  const [name, setName] = useState<string>(savedName || "");
  const [mobile, setMobile] = useState<string>(savedMobile || "");
  const [address, setAddress] = useState<string>(savedAddress || "");

  const handleCan = async (can: string) => {
    const toastId = toast.loading("Fetching details...");

    try {
      const response = await fetch(`/api/can-details?can=${can}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data?.m_Item2 === "CAN details not found") {
        toast.error("Invalid CAN", { id: toastId });
        setCanDetails(null);
      } else {
        setCanDetails(data);
        setName(data?.m_Item1?.FirstName);
        setMobile(data?.m_Item1?.MobileNo);
        setAddress(data?.m_Item4);
        toast.success("Details fetched successfully", { id: toastId });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching details", { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  const submitAddress = async () => {
    const toastId = toast.loading("Saving address...");
    try {
      const response = await fetch("/api/post-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          mobile,
          registeredName: name,
        }),
      });
      
      const data = await response.json();
      toast.success("Address saved successfully", { id: toastId });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error saving address", { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <div className="flex gap-2 items-center my-6">
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
          className="px-2 p-1 bg-secondary rounded w-full outline-primary shadow-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h1>Mobile</h1>
        <input
          type="text"
          className="px-2 p-1 bg-secondary rounded w-full outline-primary shadow-md"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <h1>Address</h1>
        <textarea
          className="px-2 p-1 bg-secondary rounded w-full outline-primary shadow-md"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            disabled={!name || !mobile || !address}
            className={`text-white p-2 px-4 mt-1 rounded bg-primary ${
              !name || !mobile || !address
                ? "cursor-not-allowed bg-primary/55"
                : " "
            }`}
            onClick={submitAddress}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default AddressInReport;
