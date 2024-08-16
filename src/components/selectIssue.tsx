"use client";
import React from "react";
import { SheetClose, SheetFooter } from "./ui/sheet";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function SelectIssue({ issues }: any) {
  const [selectedIssue, setSelectedIssue] = React.useState<null | any>(null);
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
          title: selectedIssue.title,
          description: selectedIssue.description,
          location: "Hyderabad",
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
    <>
      <div>
        <button className="p-2 rounded-xl border border-gray-500 w-full my-8">
          Detect current location
        </button>
        {selectedIssue === null ? (
          <div className="flex flex-col gap-2 my-4 mb-8">
            {issues.map((issue: any) => (
              <div
                className="w-full p-2 rounded-lg border border-gray-500 cursor-pointer hover:border-white"
                onClick={() => setSelectedIssue(issue)}
              >
                <h1 key={issue.id} className="font-bold text-xl">
                  {issue.title}
                </h1>
                <p className="text-gray-500">{issue.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="my-4">
            <div className="w-full p-2 mb-6 rounded-lg border border-gray-500 cursor-pointer">
              <h1 key={selectedIssue?.id} className="font-bold text-xl">
                {selectedIssue?.title}
              </h1>
              <p className="text-gray-500">{selectedIssue?.description}</p>
            </div>
            <div className="flex justify-between">
              <button
                className="p-1 px-2 rounded bg-red-500"
                onClick={() => setSelectedIssue(null)}
              >
                Cancel
              </button>
              <SheetClose>
                <button
                  onClick={handleSubmit}
                  className="p-1 px-2 rounded border border-secondary text-secondary hover:bg-secondary hover:text-white"
                >
                  Submit
                </button>
              </SheetClose>
            </div>
          </div>
        )}
      </div>
      {selectedIssue === null && (
        <SheetFooter className="sticky bottom-0">
          <div className="flex w-full p-3 bg-black justify-between rounded">
            <input
              type="text"
              className="bg-transparent outline-none text-lg w-full"
              placeholder="Type a custom issue"
            />
            <SheetClose>
              <button className="">Send</button>
            </SheetClose>
          </div>
        </SheetFooter>
      )}
    </>
  );
}

export default SelectIssue;
