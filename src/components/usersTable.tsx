"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";
import axios from "axios";

function UsersTable({ users, sensors }: any) {
  const router = useRouter();

  const handleChangeRole = async (email: string, role: string) => {
    toast.loading("Updating user role...");
    try {
      const res = await axios.post("/api/change-role", {
        email,
        role,
      });
      console.log(res.data);
      toast.dismiss();
      toast.success(`User role updated to ${role}`);
      router.refresh();
    } catch (err: any) {
      toast.dismiss();
      toast.error(err.response.data.error);
    }
  };

  const handleChangeSensor = async (email: string, sensorId: string) => {
    toast.loading("Assigning sensor...");
    try {
      const res = await axios.post("/api/change-sensor", {
        email,
        sensorId,
      });
      console.log(res.data);
      toast.dismiss();
      toast.success(`Sensor assigned to ${email}`);
      router.refresh();
    } catch (err: any) {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <table className="m-auto w-2/3 mt-20">
        <thead>
          <tr className="text-center uppercase bg-secondary">
            <th className="border p-2 w-32">SL NO</th>
            <th className="border p-2">Profile</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Sensor</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any, index: number) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <div className="flex items-center px-4">
                  {user.image ? (
                    <Image
                      className="w-10 h-10 rounded-full mr-4"
                      src={user.image}
                      width={40}
                      height={40}
                      alt="profile"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full mr-4 flex justify-center items-center">
                      <FaCircleUser className="text-4xl" />
                    </div>
                  )}
                  <div className="text-left">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="border p-2">
                <select
                  value={user.role}
                  onChange={(e) => handleChangeRole(user.email, e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none bg-transparent focus:border-blue-500 text-sm"
                >
                  <option className="text-gray-500 bg-" value={"USER"}>
                    USER
                  </option>
                  <option className="text-gray-500 bg-" value="TECHNICIAN">
                    TECHNICIAN
                  </option>
                  <option className="text-gray-500 bg-" value="MANAGER">
                    MANAGER
                  </option>
                  <option className="text-gray-500 bg-" value="ADMIN">
                    ADMIN
                  </option>
                </select>
              </td>
              <td className="border p-2">
                {user.role === "USER" ? (
                  user.sensor?.id ? (
                    <select
                      value={user.sensor?.id}
                      onChange={(e) =>
                        handleChangeSensor(user.email, e.target.value)
                      }
                      className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none bg-transparent focus:border-blue-500 text-sm"
                    >
                      {sensors.map((sensor: any, index: any) => (
                        <option
                          key={index}
                          className="text-gray-500"
                          value={sensor.id}
                        >
                          {sensor.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div>
                      <select
                        onChange={(e) =>
                          handleChangeSensor(user.email, e.target.value)
                        }
                        className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none bg-transparent focus:border-blue-500 text-sm"
                      >
                        <option value="" disabled selected>
                          -- Select Sensor --
                        </option>
                        {sensors.map((sensor: any, index: any) => (
                          <option
                            key={index}
                            className="text-gray-500"
                            value={sensor.id}
                          >
                            {sensor.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )
                ) : (
                  <h1>-</h1>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
