import { getAddress, getCurrentUser } from "@/actions/getCurrentUser";
import React from "react";
import PersonalProfile from "@/components/personal-profile";
import { getIssuesForUser } from "@/actions/issues";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

async function page() {
  const currentUser = await getCurrentUser();
  const address: any = await getAddress();
  const issues = await getIssuesForUser("CLOSE");

  if(!address) return null;
  // Calculate the total sum of time differences in hours
  const totalTimeInHours = issues?.reduce((total: number, issue: any) => {
    const createdAt = new Date(issue.createdAt);
    const closedAt = new Date(issue.closedAt);
    const diffInHours = (closedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours
    return total + diffInHours;
  }, 0);

  // Calculate the average time in hours
  const avgTimeInHours = totalTimeInHours ? issues&&issues.length > 0 ? (totalTimeInHours / issues.length).toFixed(2):0 : 0;

  // Filter issues that have feedback
  const filteredIssues = issues?.filter((issue: any) => issue.feedback != null);

  // Calculate the average feedback
  const avgFeedback = filteredIssues?.reduce((total: number, issue: any) => {
    return total + issue.feedback;
  }, 0);

  return (
    <div className="mx-32 flex mt-8 gap-4">
      <PersonalProfile
        currentUser={currentUser}
        address={address.address||'NA'}
        mobile={address.mobile}
        registeredName={address.registeredName}
      />
      {currentUser?.role === "TECHNICIAN" && <div className="shadow-md w-full p-4 rounded">
        <div className="flex items-center justify-between mx-20 my-6">
          {/* Display average feedback and average time */}
          <div className="font-bold p-4 px-8 rounded-xl border-2 text-center">
            <h1 className="text-4xl mb-2 font-black">{filteredIssues ? avgFeedback?(avgFeedback / filteredIssues.length).toFixed(2):'NA': 'NA'} <span className="text-lg">/5</span></h1>
            <h1>Officer Rating</h1>
          </div>
          <div className="font-bold p-4 px-8 rounded-xl border-2 text-center">
            <h1 className="text-4xl font-black mb-2">{avgTimeInHours} <span className="text-lg">hours</span></h1>
            <h1>Average Time of Completion</h1>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="uppercase bg-secondary py-2">
              <th className="py-2 border border-violet-500">User</th>
              <th className="py-2 border border-violet-500">Issue</th>
              <th className="py-2 border border-violet-500">Resolved on</th>
              <th className="py-2 border border-violet-500">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {issues?.map((issue: any) => (
              <tr key={issue.id} className="border border-gray-500 text-center py-2">
                <td className="py-2 border border-violet-500">{issue.user.name}</td>
                <td className="py-2 border border-violet-500">{issue.title}</td>
                <td className="py-2 border border-violet-500">{issue.closedAt.toISOString().split("T")[0]}</td>
                <td className="py-2 border border-violet-500">{issue.feedback ? <div className="flex gap-1 items-center justify-center w-full">{issue.feedback}<FaStar className="text-yellow-500"/></div> : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  );
}

export default page;
