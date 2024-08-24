"use client";
import { IssueDropdown } from "@/components/issueDropdown";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function page() {
  const [selectedIssue, setSelectedIssue] = React.useState<null | any>(null);
  const [customTitle, setCustomTitle] = useState("");
  const [value, setValue] = React.useState("")
  const [customDesc, setCustomDesc] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      toast.loading("Reporting issue...");
      const response = await fetch("/api/sendIssue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: customTitle,
          description: customDesc,
          location: "Temp",
        }),
      });
      toast.dismiss();
      if (response.ok) {
        toast.success("Issue reported successfully");
        router.push(`/issues/reported`);
      } else {
        toast.error("Failed to report issue");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  const defaultHandleSubmit = async () => {
    try {
      toast.loading("Reporting issue...");
      const response = await fetch("/api/sendIssue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: value,
          description: "Defined issue",
          location: "Temp",
        }),
      });
      toast.dismiss();
      if (response.ok) {
        toast.success("Issue reported successfully");
        router.push(`/issues/reported`);
      } else {
        toast.error("Failed to report issue");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  return (
    <div className="m-10 flex gap-8">
      <div className="w-2/3 rounded shadow-md p-4 px-8">
        <h1 className="font-black uppercase text-3xl text-animate">
          Report an issue
        </h1>
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex justify-between">
            <IssueDropdown value={value} setValue={setValue} />
            <button className={`text-white p-1 px-4 rounded-full ${value!==""?"bg-primary":"bg-primary/50"}`} disabled={!value} onClick={defaultHandleSubmit} >
              submit
            </button>
          </div>
          <div className="relative border border-gray-300 rounded-full my-10">
            <h1 className="absolute left-1/2 p-1 bg-background -top-4">or</h1>
          </div>
          <input
            type="text"
            placeholder="Title"
            className="bg-secondary shadow-lg rounded w-full p-2 outline-primary"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
          />
          <textarea
            className="bg-secondary shadow-lg rounded-xl w-full min-h-40 p-2 outline-primary"
            name=""
            id=""
            placeholder="Detailed description about your issue goes here..."
            value={customDesc}
            onChange={(e) => setCustomDesc(e.target.value)}
          />
          <div className="flex justify-end">
            <button className={`text-white p-2 px-4 rounded ${(customDesc!==""&&customTitle!=="")?"bg-primary":"bg-primary/50"}`} disabled={!customDesc||!customTitle} onClick={handleSubmit}>
              submit
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/3 rounded shadow-md p-4">
        <h1 className="font-black uppercase text-3xl text-animate">Address</h1>
      </div>
    </div>
  );
}

export default page;
