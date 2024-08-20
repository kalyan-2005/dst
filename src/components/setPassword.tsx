"use client";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CiLock } from "react-icons/ci";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

function SetPassword({ currentUser, setIsProfileOpen }: any) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [editPassword, setEditPassword] = React.useState(false);
  const handleSetPassword = async () => {
    if (password.length < 5) {
      toast.error("Minimum password length is 5");
      return;
    }
    try {
      toast.loading("Setting password...");
      const res = await fetch("/api/setPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          email: currentUser?.email,
        }),
      });
      setIsProfileOpen(false);
      if (res.ok) {
        toast.success("Password set successfully");
      } else {
        toast.error("Something went wrong");
      }
      toast.dismiss();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Toaster />
      {currentUser?.password ? (
        !editPassword ? (
          <div className="flex justify-between my-4 items-center">
            <div className="flex gap-2 items-center text-sm">
              <CiLock className="text-lg" />
              Edit Password
            </div>
            <button onClick={() => setEditPassword(!editPassword)}><CiEdit className="text-4xl p-1.5 rounded-full hover:bg-slate-800" /></button>
          </div>
        ) : (
          <div className="flex gap-2 my-4 items-center">
          <CiLock className="text-lg" />
          <div className="flex justify-between items-center w-full">
            <div className="relative">
              {!showPassword ? (
                <input
                  className="outline-none bg-transparent border-b"
                  type="password"
                  placeholder="set password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              ) : (
                <input
                  className="outline-none bg-transparent border-b"
                  type="text"
                  placeholder="set password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
              {
                <h1
                  className="absolute text-md cursor-pointer right-1 top-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye/> : <FaEyeSlash/>}
                </h1>
              }
            </div>
            <div className="flex gap-2 items-center">
            <button
              className="rounded p-1 px-2 bg-secondary hover:bg-blue-500"
              onClick={() => setEditPassword(!editPassword)}
            >
              cancel
            </button>
            <button
              className="rounded p-1 px-4 bg-secondary hover:bg-blue-500"
              onClick={handleSetPassword}
            >
              set
            </button>
            </div>
          </div>
        </div>
        )
      ) : (
        <div className="flex gap-2 my-4 items-center">
          <CiLock className="text-lg" />
          <div className="flex justify-between items-center w-full">
            <div className="relative">
              {!showPassword ? (
                <input
                  className="outline-none bg-transparent border-b"
                  type="password"
                  placeholder="set password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              ) : (
                <input
                  className="outline-none bg-transparent border-b"
                  type="text"
                  placeholder="set password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
              {
                <h1
                  className="absolute text-lg cursor-pointer right-1 top-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye/> : <FaEyeSlash/>}
                </h1>
              }
            </div>
            <button
              className="rounded p-1 px-4 bg-secondary hover:bg-blue-500"
              onClick={handleSetPassword}
            >
              set
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SetPassword;
