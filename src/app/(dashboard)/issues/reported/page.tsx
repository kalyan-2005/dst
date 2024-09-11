import { getCurrentUser } from "@/actions/getCurrentUser";
import { getIssuesForUser } from "@/actions/issues";
import { getAllTechnicians } from "@/actions/technician";
import AssignTech from "@/components/assignTech";
import { DialogDemo } from "@/components/confirmDialog";
import { TooltipDemo } from "@/components/hoverDesc";
import MapComponent from "@/components/MapComponent";
import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

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

  const issues = await getIssuesForUser("OPEN");
  const currentUser = await getCurrentUser();
  const technicians = await getAllTechnicians();
  const locations = issues?.map((issue) => issue.user.sensor);

  const handleChangeTech = async (issueId: string, techId: string) => {
    try {
      const response = await fetch("/api/assign-technician", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ issueId, techId }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${
        currentUser?.role !== "USER" ? "w-11/12" : "w-4/5"
      } m-auto p-4 max-sm:w-full`}
    >
      <div className="flex justify-end items-center my-2">
        <h1 className="text-sm rounded-full text-yellow-500 border border-yellow-500 p-1 px-2">
          Under consideration
        </h1>
      </div>
      {currentUser?.role !== "USER" && (
        <div className="my-6">
          <MapComponent locations={locations} />
        </div>
      )}
      <table className="w-full mb-20">
        <thead>
          <tr className="text-center uppercase bg-secondary">
            <th className="py-2 uppercase">Sl.No</th>
            <th className="py-2 uppercase">Issue</th>
            {currentUser?.role !== "USER" && (
              <th className="py-2 uppercase text-start">Reporter</th>
            )}
            <th className="py-2 uppercase">Reported on</th>
            <th className="py-2 uppercase">Assigned on</th>
            {currentUser?.role !== "USER" && (
              <th className="py-2 uppercase">Location</th>
            )}
            {currentUser?.role === "MANAGER" && (
              <th className="py-2 uppercase">Technician</th>
            )}
            {currentUser?.role === "TECHNICIAN" && (
              <th className="py-2 uppercase">Status</th>
            )}
          </tr>
        </thead>
        <tbody>
          {issues?.map((issue, index) => (
            <tr
              key={issue.id}
              className=" text-center border-b border-gray-500"
            >
              <td className="py-4">{index + 1}</td>
              <td>
                <TooltipDemo
                  name={issue.title || "no title"}
                  desc={issue.description || "no description"}
                />
              </td>
              {currentUser?.role !== "USER" && (
                  <td className="flex items-center gap-3 py-1">
                    {issue.user.image ? (
                      <Image
                        src={issue.user.image}
                        className="rounded-full w-40 h-40"
                        width={50}
                        height={50}
                        alt=""
                      />
                    ) : (
                      <div>
                        <FaCircleUser className="text-4xl" />
                      </div>
                    )}
                    <div className="text-start">
                      <h1>{issue.user.name}</h1>
                      <h1 className="text-sm text-gray-500">
                        {issue.user.email}
                      </h1>
                    </div>
                  </td>
                )}
              <td>
                <div>
                  <h1>{issue.createdAt.toISOString().split("T")[0]}</h1>{" "}
                  <h1 className="text-sm text-gray-500">
                    {timeAgo(issue.createdAt.toISOString())}
                  </h1>
                </div>
              </td>
              <td>
                {issue.assignedAt ? <div>
                  <h1>{issue.assignedAt?.toISOString().split("T")[0]}</h1>{" "}
                  <h1 className="text-sm text-gray-500">
                    {timeAgo(issue.assignedAt?.toISOString())}
                  </h1>
                </div>:<h1>waiting...</h1>}
              </td>

              {currentUser?.role !== "USER" && (
                <td>
                  <TooltipDemo
                    name={"location"}
                    desc={issue.user.address || "no location"}
                  />
                </td>
              )}
              {currentUser?.role === "MANAGER" && (
                <td>
                  <AssignTech issue={issue} technicians={technicians} />
                </td>
              )}
              {currentUser?.role === "TECHNICIAN" && (
                <td>
                  <DialogDemo id={issue.id} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default page;
