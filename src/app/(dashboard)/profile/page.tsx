import { getAddress, getCurrentUser } from "@/actions/getCurrentUser";
import React from "react";
import PersonalProfile from "@/components/personal-profile";

async function page() {
  const currentUser = await getCurrentUser();
  const address: any = await getAddress();

  if(!currentUser || !address || !address.address || !address.mobile || !address.registeredName) return null

  return (
    <div className="mx-32 flex mt-8 gap-4">
      <PersonalProfile currentUser={currentUser} address={address.address} mobile={address.mobile} registeredName={address.registeredName} />
      <div className="shadow-md w-full p-4 rounded">Numbers and doughnut chart</div>
    </div>
  );
}

export default page;
