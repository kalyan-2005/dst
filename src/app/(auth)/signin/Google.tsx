"use client"


import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const Google = () => {
  const handleSignin = async () => {
    await signIn("google",{
      callbackUrl: "/",
    });
  };

  return (
    <form
        action={handleSignin}
    >
      <button className="my-6 flex justify-center gap-2 items-center w-full text-center shadow-md border bg-white rounded-full p-2 text-black font-semibold hover:scale-105 duration-500">
        <FcGoogle /> Continue with Google
      </button>
    </form>
  );
};

export default Google;
