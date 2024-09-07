"use client"

import "@/styles/globals.css";
import React from "react";

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  } 
  return (
    <html lang="en">
      <Toaster  />
      <body>{children}</body>
    </html>
  )
}
