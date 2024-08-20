import { getCurrentUser } from "@/actions/getCurrentUser";
import { getIssuesForUser } from "@/actions/issues";
import { TooltipDemo } from "@/components/hoverDesc";
import { VerifyOtp } from "@/components/verifyButton";
import React from "react";

async function page() {
  function timeAgo(timestamp: any) {
    // Step 1: Parse the timestamp
    const pastDate = new Date(timestamp);

    // Step 2: Get the current time
    const now = new Date();

    // Step 3: Calculate the difference in milliseconds
    const diffMs = now - pastDate;

    // Step 4: Convert the difference into seconds, minutes, hours, or days
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    // Step 5: Determine the appropriate time unit
    if (diffSeconds < 60) {
      return diffSeconds === 0 ? "just now" : `${diffSeconds} seconds ago`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} days ago`;
    }
  }

  const issues = await getIssuesForUser("VERIFY");
  const currentUser = await getCurrentUser();

  return (
    <div className="w-3/4 m-auto p-4 max-sm:w-full">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-bold text-secondary">
          Under Verification ({issues?.length})
        </h1>
        <h1 className="text-sm rounded-full text-yellow-500 border border-yellow-500 p-1 px-2">
          Waiting for approval
        </h1>
      </div>
      <table className="w-full">
        <thead className="border-b ">
          <tr>
            <th className="py-2 uppercase">Sl.No</th>
            <th className="py-2 uppercase">Issue</th>
            {(currentUser?.role !== "USER") && (
              <th className="py-2 uppercase text-start ps-4">Reporter</th>
            )}
            <th className="py-2 uppercase">Location</th>
            <th className="py-2 uppercase">Reported on</th>
            <th className="py-2 uppercase">Resolved on</th>
            {currentUser?.role !== "TECHNICIAN" && <th className="py-2 uppercase">Technician</th>}
            {currentUser?.role === "TECHNICIAN" && (
              <th className="py-2 uppercase">Status</th>
            )}
          </tr>
        </thead>
        <tbody>
          {issues?.map((issue, index) => (
            <tr className=" text-center border-b border-gray-500">
              <td className="py-4">{index + 1}</td>
              <td>
                <TooltipDemo
                  name={issue.title || "no title"}
                  desc={issue.description || "no description"}
                />
              </td>
              {currentUser?.role === "ADMIN" ||
                ((currentUser?.role === "MANAGER" ||
                  currentUser?.role === "TECHNICIAN") && (
                  <td>
                    <div className="text-start ps-4">
                      <h1>{issue.user.name}</h1>
                      <h1 className="text-sm text-gray-500">
                        {issue.user.email}
                      </h1>
                    </div>
                  </td>
                ))}
              <td>{issue.location?.latitude}{" "}{issue.location?.longitude}</td>
              <td>
                <div>
                  <h1>{issue.createdAt.toISOString().split("T")[0]}</h1>{" "}
                  <h1 className="text-sm text-gray-500">
                    {timeAgo(issue.createdAt.toISOString())}
                  </h1>
                </div>
              </td>
              <td>-</td>
              {currentUser?.role !== "TECHNICIAN" && <td>{issue.assignedTo}</td>}
              {currentUser?.role !== "USER" ? (
                <td className="text-yellow-500">Pending</td>
              ):(
                <td><VerifyOtp email={currentUser.email} issueId={issue.id} /></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default page;
