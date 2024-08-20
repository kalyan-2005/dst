"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";
import axios from 'axios';

function page() {
  // const users = await getAllUsers();
  const [users, setUsers] = React.useState<any>([]);
  useEffect(()=>{
    axios.get('/api/getAllUsers').then((res)=>{
      setUsers(res.data);
    })
  },[])
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

  return (
    <div>
      <table className="m-auto w-2/3 mt-20">
        <thead>
          <tr className="text-center uppercase bg-secondary">
            <th className="border p-2 w-32">SL NO</th>
            <th className="border p-2">Profile</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
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
                  onChange={(e) =>
                    handleChangeRole(user.email, e.target.value)
                  }
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none bg-transparent focus:border-blue-500 text-sm"
                >
                  <option className="text-gray-500 bg-primary" value={"USER"}>
                    USER
                  </option>
                  <option
                    className="text-gray-500 bg-primary"
                    value="TECHNICIAN"
                  >
                    TECHNICIAN
                  </option>
                  <option className="text-gray-500 bg-primary" value="MANAGER">
                    MANAGER
                  </option>
                  <option className="text-gray-500 bg-primary" value="ADMIN">
                    ADMIN
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default page;
