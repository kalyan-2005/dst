"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPhoneVolume, FaRegAddressCard } from 'react-icons/fa'
import { FaCircleUser } from 'react-icons/fa6'
import { LuMail } from 'react-icons/lu'
import { MdOutlineFormatListBulleted } from 'react-icons/md'

function PersonalProfile({currentUser, address, mobile, registeredName}:any) {
    const [edit,setEdit] = useState(false);
    const [newName, setNewName] = useState(registeredName);
    const [newAddress, setNewAddress] = useState(address);
    const [newMobile, setNewMobile] = useState(mobile);
    const submitAddress = async () => {
        if(!newName||!newAddress||!newMobile) {
            toast.error("Please fill all the fields");
            return;
        }
        const toastId = toast.loading("Editing address...");
        try {
          const response = await fetch("/api/post-address", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              address: newAddress,
              mobile: newMobile,
              registeredName: newName,
            }),
          });
          
          const data = await response.json();
          toast.success("Address saved successfully", { id: toastId });
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error saving address", { id: toastId });
        } finally {
          toast.dismiss(toastId);
          setEdit(false);
        }
      };
  return (
    <div className="min-w-[400px] shadow-md p-4 bg-secondary rounded relative">
        {currentUser?.image ? (
          <Image
            src={currentUser?.image}
            className="w-28 h-28 rounded-full block m-auto my-4"
            width={50}
            height={50}
            alt="logo"
          />
        ) : (
          <div className="text-center my-4">
            <FaCircleUser className="text-[100px] m-auto" />
          </div>
        )}
        <div className="border-b border-black pb-4">
          <h1 className="font-bold text-center text-lg">{currentUser?.name}</h1>
          {currentUser?.role!=="USER" && <h1 className='text-center text-semibold text-sm'>{currentUser?.role}</h1>}
        </div>
        <div className="absolute top-2 right-2 p- px-2 rounded bg-primary/50 hover:bg-primary text-white cursor-pointer" onClick={() => setEdit(!edit)}>{edit?"Cancel":"Edit"}</div>
        <div className="mt-6 text- font-semibold flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <h1>
              <MdOutlineFormatListBulleted />
            </h1>
            {edit?<input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className='bg-transparent outline-none border-black border-b' />:<h1>{registeredName}</h1>}
          </div>
          <div className="flex gap-2 items-center">
            <h1>
              <LuMail />
            </h1>
            <h1>{currentUser?.email}</h1>
          </div>
          <div className="flex gap-2 items-center">
            <h1>
              <FaPhoneVolume />
            </h1>
            {edit?<input type="text" value={newMobile} onChange={(e) => setNewMobile(e.target.value)} className='bg-transparent outline-none border-black border-b' />:<h1>{mobile}</h1>}
          </div>
          <div className="flex gap-2 items-center">
            <h1>
              <FaRegAddressCard />
            </h1>
            <h1>Address</h1>
          </div>
          {edit?<textarea name="" id="" value={newAddress} onChange={(e)=>setNewAddress(e.target.value)} className='bg-transparent outline-primary text-sm p-1'></textarea>:<p className="text-sm">{address}</p>}
          {edit&&<button className='bg-primary text-white px-4 py-2 rounded' onClick={submitAddress}>Save</button>}
        </div>
      </div>
  )
}

export default PersonalProfile