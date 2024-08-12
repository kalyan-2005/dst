import { getCurrentUser } from "@/actions/getCurrentUser";
import { ProfileDialog } from "@/components/profile";
import React from "react";

async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <ProfileDialog currentUser={currentUser}/>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </div>
  );
}

export default page;
