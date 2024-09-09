"use client";
import React, { useState } from "react";
import MapComponent from "./MapComponent";
import Linechart from "./line-chart";
import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";

function SensorHeader({ sensors }: any) {
  const [selectedSensor, setSelectedSensor] = useState<any>(sensors[0]);
  return (
    <div>
      <div className="flex items-center justify-center gap-4 shadow-md p-2 rounded">
        <div className="flex-1">
          <MapComponent
            locations={sensors}
            selectedSensor={selectedSensor}
            setSelectedSensor={setSelectedSensor}
          />
        </div>
        <div className="flex-1">
          <Linechart selectedSensor={selectedSensor} />
        </div>
      </div>
      <div className="p-2 shadow-md rounded mt-2">
        <table className="m-auto w-2/3 my-10">
          <thead>
            <tr className="text-center uppercase bg-secondary">
              <th className="border p-2">Profile</th>
              <th className="border p-2">Mobile</th>
              <th className="border p-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {selectedSensor.User.length === 0 && (
              <tr className="text-center">
                <td colSpan={3} className="py-10">No users found</td>
              </tr>
            )}
            {selectedSensor.User?.map((user: any, index: number) => (
              <tr key={index} className="font-semibold">
                <td className="border p-2 flex items-center gap-4 justify-center">
                  {user.image ? (
                    <Image
                      src={user?.image}
                      alt="profile"
                      className="w-10 h-10 rounded-full"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <div className="text-center">
                      <FaCircleUser className="m-auto text-[40px]" />
                    </div>
                  )}
                  <div>
                    <h1>{user.name}</h1>
                    <h1>{user.email}</h1>
                  </div>
                </td>
                <td className="border p-2 text-center">{user.mobile}</td>
                <td className="border p-2 text-sm max-w-60">{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SensorHeader;
