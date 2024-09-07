import { getAddress, getCurrentUser } from "@/actions/getCurrentUser";
import React from "react";
import PersonalProfile from "@/components/personal-profile";

async function page() {
  const currentUser = await getCurrentUser();
  const { address, mobile, registeredName }: any = await getAddress();
  return (
    <div className="mx-32 flex mt-8 gap-4">
      <PersonalProfile currentUser={currentUser} address={address} mobile={mobile} registeredName={registeredName} />
      <div className="shadow-md w-full p-4 rounded">Numbers and doughnut chart</div>
    </div>
  );
}

export default page;
