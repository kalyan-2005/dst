import { getCurrentUser } from "@/actions/getCurrentUser";
import AddressInReport from "@/components/addressInReport";
import ReportIssuePage from "@/components/userInAddress";
import Image from "next/image";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";

async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div className="m-10 flex gap-8">
      <ReportIssuePage />
      <div className="w-1/3 rounded shadow-md p-8">
        <div>
          <h1 className="font-black uppercase text-3xl text-">Address</h1>
          <div className="flex mt-4 gap-3 items-center p-2 px-4 rounded-xl shadow-inner shadow-gray-500">
            {currentUser?.image ? (
              <Image
                src={currentUser?.image}
                className="block m-auto w-1/2"
                width={50}
                height={50}
                alt="logo"
              />
            ) : (
              <div className="text-center">
                <FaCircleUser className="text-4xl" />
              </div>
            )}
            <div>
              <h1 className="font-bold">{currentUser?.name}</h1>
              <h1 className="font-semibold text-sm">{currentUser?.email}</h1>
            </div>
          </div>
          <AddressInReport />
        </div>
      </div>
    </div>
  );
}

export default page;
