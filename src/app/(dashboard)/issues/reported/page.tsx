import { getCurrentUser } from "@/actions/getCurrentUser";
import { getIssuesForUser } from "@/actions/issues";
import React from "react";

async function page() {
  function timeAgo(timestamp) {
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

  const issues = await getIssuesForUser("OPEN");
  const currentUser = await getCurrentUser();
  return (
    <div className="w-3/4 m-auto p-4 max-sm:w-full">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-bold text-secondary">
          Reported ({issues?.length})
        </h1>
        <h1 className="text-sm rounded-full text-yellow-500 border border-yellow-500 p-1 px-2">
          Under consideration
        </h1>
      </div>
      <table className="w-full">
        <thead className="border-b ">
          <tr>
            <th className="py-2 uppercase">Sl.No</th>
            <th className="py-2 uppercase">Issue</th>
            {currentUser?.role === "ADMIN" ||
              (currentUser?.role === "MANAGER" && (
                <th className="py-2 uppercase">Reporter</th>
              ))}
            <th className="py-2 uppercase">Location</th>
            <th className="py-2 uppercase">Reported on</th>
            {currentUser?.role === "MANAGER" && (
              <th className="py-2 uppercase">Technician</th>
            )}
          </tr>
        </thead>
        <tbody>
          {issues?.map((issue, index) => (
            <tr className=" text-center border-b border-gray-500">
              <td className="py-4">{index + 1}</td>
              <td>{issue.title}</td>
              {currentUser?.role === "ADMIN" ||
                (currentUser?.role === "MANAGER" && <td>{issue.user.name}</td>)}
              <td>{issue.location}</td>
              <td>
                <div>
                  <h1>{issue.createdAt.toISOString().split("T")[0]}</h1>{" "}
                  <h1 className="text-sm text-gray-500">
                    {timeAgo(issue.createdAt.toISOString())}
                  </h1>
                </div>
              </td>
              <td>tech comp</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        // JSON.stringify(issues)
      }
    </div>
  );
}

export default page;
