"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { NavigationMenuDemo } from "./navigationMenu";
import { FaCircleUser } from "react-icons/fa6";
import { ProfileDialog } from "./profile";

function Navbar({ currentUser }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  return (
    <div className="flex justify-between p-2 px-8 shadow-lg sticky top-0 items-center">
      <div className="flex gap-4">
        <h1>LOGO</h1>
        <h1>Name</h1>
        <ProfileDialog currentUser={currentUser} open={isProfileOpen} onOpenChange={setIsProfileOpen} setIsProfileOpen={setIsProfileOpen} />
      </div>
      <div>
        <NavigationMenuDemo currentUser={currentUser} />
      </div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-2 items-center bg-slate-900 hover:bg-slate-800 cursor-pointer rounded-full p-1 px-2 relative"
      >
        <div>
          {currentUser?.image ? (
            <Image
              className="rounded-full w-8 h-8"
              src={currentUser?.image}
              alt="user"
              width={40}
              height={40}
            />
          ) : (
            <div className="rounded-full w-8 h-8 flex justify-center items-center">
              <FaCircleUser className="text-2xl" />
            </div>
          )}
        </div>
        <div>{isOpen ? <FaCaretUp /> : <FaCaretDown />}</div>
        {isOpen && (
          <div className="absolute rounded-lg bg-secondary shadow-md min-w-max overflow-hidden right-0 top-12 text-sm flex flex-col gap-2 cursor-pointer">
            <div className="">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsOpen(false);
                }}
                className="p-2 px-6 w-full hover:bg-blue-500"
              >
                Profile
              </button>
              <hr />
              <button
                onClick={async () => await signOut({ callbackUrl: "/signin" })}
                className="p-2 px-6 hover:bg-blue-500"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
