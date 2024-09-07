"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const tabs = [
  {
    name: "Reported",
    href: "reported",
  },
  {
    name: "Verify",
    href: "verify",
  },
  {
    name: "Resolved",
    href: "resolved",
  },
];

function layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex mt-4">
        <div className="p-1 rounded bg-secondary m-auto flex gap-8">
          {tabs.map((tab) => (
            <Link
              className={`p-1.5 px-3 rounded font-bold duration-200 uppercase ${
                pathname === `/issues/${tab.href}`
                  ? "bg-primary text-white"
                  : "hover:bg-primary/75 hover:text-white"
              }`}
              href={tab.href}
              key={tab.name}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default layout;
