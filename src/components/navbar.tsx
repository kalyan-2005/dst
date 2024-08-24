"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { NavigationMenuDemo } from "./navigationMenu";
import { FaCircleUser } from "react-icons/fa6";
import { ProfileDialog } from "./profile";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar({ currentUser }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const pathname = usePathname();
  let links;
  if(currentUser?.role==="USER") {
    links = [
      {
        name: "Home",
        href: "/",
      },
      {
        name: "Issues",
        href: "/issues/reported",
      },
      {
        name: "Report",
        href: "/report",
      },
      {
        name: "Profile",
        href: "/profile",
      },
    ];
  } else {
    links = [
      {
        name: "Home",
        href: "/",
      },
      {
        name: "Issues",
        href: "/issues/reported",
      },
      {
        name: "Contact",
        href: "/contact",
      },
      {
        name: "Services",
        href: "/services",
      },
    ];
    
  }
  return (
    <div className="flex justify-between p-2 px-8 shadow-lg items-center">
      <div className="flex gap-4">
        <h1 className="font-black text-2xl">LOGO</h1>
        <ProfileDialog
          currentUser={currentUser}
          open={isProfileOpen}
          onOpenChange={setIsProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
        />
      </div>
      <div className="flex gap-40 items-center">
        {/* <NavigationMenuDemo currentUser={currentUser} /> */}
        <div className="flex gap-6 items-center p-1 px-2 rounded-full bg-secondary shadow-md">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={`p-1 px-3 rounded-full font-semibold hover:bg-primary/75 hover:text-white duration-200 ${
                (pathname === link.href||(pathname.startsWith("/issues/")&&link.name==="Issues")) && "bg-primary text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex gap-2 items-center bg-secondary shadow-md cursor-pointer rounded-full p-1 px-2 relative"
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
            <div className="absolute rounded-lg bg-secondary shadow-md min-w-max border overflow-hidden right-0 top-12 text-sm flex flex-col gap-2 cursor-pointer">
              <div className="">
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsOpen(false);
                  }}
                  className="p-2 px-6 w-full hover:bg-primary hover:text-white"
                >
                  Profile
                </button>
                <hr />
                <button
                  onClick={async () =>
                    await signOut({ callbackUrl: "/signin" })
                  }
                  className="p-2 px-6 hover:bg-blue-500 hover:text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
