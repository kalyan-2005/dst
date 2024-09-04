"use client";
import React from "react";
import { LuUser2 } from "react-icons/lu";
import { GoUnlock } from "react-icons/go";
import { TbLogin } from "react-icons/tb";
import Google from "./Google";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function Page() {  // Updated name here
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    // e.preventDefault();  // Prevent default form submission behavior
    setLoading(true);
    try {
      toast.loading("Signing in...");
      const response = await signIn('credentials', {
        email: "kalyantingani@gmail.com",
        password: "shiva",
      });

      redirect("/");

      toast.dismiss();  // Dismiss the loading toast

      if (response?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successful...");
        router.push("/");
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error("An error occurred. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen pt-[16vh]">
      <div className="w-[400px] h-[450px] rounded-3xl border p-6 flex flex-col justify-center gap-4 border-slate-500 mx-auto bg-transparent backdrop-blur-xl">
        <h1 className="text-center font-bold text-2xl">Log In</h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleLogin}> {/* Added onSubmit here */}
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
          <button
            type="submit"  // Changed to submit to properly trigger form submission
            className="my-6 flex justify-center gap-2 items-center w-full text-center rounded-full p-2 font-semibold bg-primary text-white duration-200"
            disabled={loading}  // Disable button when loading
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

export default Page;
