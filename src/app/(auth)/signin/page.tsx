"use client";

import React, { useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { GoUnlock } from "react-icons/go";
import { TbLogin } from "react-icons/tb";
import Google from "./Google";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      toast.loading("Signing in...");
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      toast.dismiss();

      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successful...");
        router.push("/");
      }
    } catch (error: any) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen pt-[16vh]">
      <div className="w-[400px] h-[450px] rounded-3xl border p-6 flex flex-col justify-center gap-4 border-slate-500 mx-auto bg-transparent backdrop-blur-xl">
        <h1 className="text-center font-bold text-2xl pt-6">Log In</h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleLogin}>
          <div className="relative">
            <LuUser2 className="text-xl absolute right-3 text-slate-500 top-3" />
            <input
              type="email"
              className="bg-transparent rounded-full w-full border border-slate-500 outline-none p-2 px-4"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="relative">
            {/* <GoUnlock className="text-xl absolute right-3 text-slate-500 top-3" /> */}
            {showPassword ? <FaEyeSlash className="text-xl absolute right-3 text-slate-500 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> : <FaEye
              className="text-xl absolute right-3 text-slate-500 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />}
            <input
              type={showPassword ? "text" : "password"}
              className="bg-transparent rounded-full w-full border border-slate-500 outline-none p-2 px-4"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            type="submit"
            className="my-6 flex justify-center gap-2 items-center w-full text-center rounded-full p-2 font-semibold bg-primary text-white duration-200"
            disabled={loading}
          >
            <TbLogin className="text-xl" /> Log In
          </button>
        </form>
        <h1 className="text-center text-slate-500">or</h1>
        <Google />
      </div>
    </div>
  );
}
