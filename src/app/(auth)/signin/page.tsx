
import React from "react";
import { LuUser2 } from "react-icons/lu";
import { GoUnlock } from "react-icons/go";
import { TbLogin } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/auth"
import Google from "./Google";


function page() {

  return (
    <div className="bg-primary min-h-screen pt-[16vh] text-white">
      <div className="w-[400px] h-[450px] rounded-3xl border p-6 flex flex-col justify-center gap-4 border-slate-500 mx-auto bg-transparent backdrop-blur-xl">
        <h1 className="text-center font-bold text-2xl">Log In</h1>
        <form className="flex flex-col gap-4 mt-4">
          <div className="relative">
            <LuUser2 className="text-xl absolute right-3 text-slate-500 top-3" />
            <input
              type="email"
              className="bg-transparent rounded-full w-full border border-slate-500 outline-none p-2 px-4"
              placeholder="Email"
            />
          </div>
          <div className="relative">
            <GoUnlock className="text-xl absolute right-3 text-slate-500 top-3" />
            <input
              type="password"
              className="bg-transparent rounded-full w-full border border-slate-500 outline-none p-2 px-4"
              placeholder="Password"
            />
          </div>
          <button className="my-6 flex justify-center gap-2 items-center w-full text-center bg-white rounded-full p-2 text-black font-semibold hover:bg-secondary hover:text-white duration-200">
            <TbLogin className="text-xl"/> Log In
          </button>
        </form>
        <h1 className="text-center text-slate-500">or</h1>
    <Google />
      </div>
    </div>
  );
}

export default page;
