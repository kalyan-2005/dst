import { getAddress, getCurrentUser } from "@/actions/getCurrentUser";
import AddressInReport from "@/components/addressInReport";
import ReportIssuePage from "@/components/userInAddress";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";

async function page() {
  const currentUser = await getCurrentUser();
  const address: any = await getAddress();

  if(!currentUser || !address || !address.address || !address.mobile || !address.registeredName) return null

  const { address: sa, mobile, registeredName } = address

  return (
    <div className="m-10 flex gap-8">
      <ReportIssuePage
        savedAddress={sa}
        savedMobile={mobile}
        savedName={registeredName}
      />
      <div className="w-1/3 rounded shadow-md p-8">
        <div>
          <h1 className="font-black uppercase text-3xl text-animate">
            Address
          </h1>
          <div className="flex mt-4 justify-start gap-4 items-center p-2 px-4 rounded-xl shadow-inner shadow-gray-500">
            {currentUser?.image ? (
              <Image
                src={currentUser?.image}
                className="w-11 h-11 rounded-full"
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
          <div>
            {!address ? (
              <AddressInReport
                savedAddress={address}
                savedMobile={mobile}
                savedName={registeredName}
              />
            ) : (
              <div className="my-8 font-semibold flex flex-col gap-5">
                <div className="flex justify-end">
                  <Link
                    href={"/profile"}
                    className="text-violet-500 px-3 p-0.5 rounded border border-violet-500 bg-secondary hover:bg-secondary/75"
                  >
                    Edit
                  </Link>
                </div>
                <div>
                  <h1>Name</h1>
                  <h1 className="text-l py-1 px-2 rounded bg-secondary border-violet-300 border-2">
                    {registeredName}
                  </h1>
                </div>
                <div>
                  <h1>Mobile</h1>
                  <h1 className="text-l py-1 px-2 rounded bg-secondary border-violet-300 border-2">
                    {mobile}
                  </h1>
                </div>
                <div>
                  <h1>Address</h1>
                  <h1 className="text-l py-1 px-2 rounded bg-secondary border-violet-300 border-2">
                    {address}
                  </h1>
                </div>
              </div>
            )}
          </div>
          {/* <pre>{JSON.stringify(currentUser, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
}

export default page;
