"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

function AssignTech({ issue, technicians, currentTech }: any) {
  const [technician, setTechnician] = React.useState<any>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const router = useRouter();
  const handleTechnician = async () => {
    try {
      const response = await fetch("/api/assignTechnician", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issueId: issue.id,
          techId: technician.id,
        }),
      });

      if (response.ok) {
        toast.success("Technician assigned successfully");
        setTechnician(null);
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error("Failed to assign technician");
        console.error("Failed to assign technician");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <div className="relative rounded">
      <div className="hover:cursor-pointer m-auto">
        {currentTech !== null ? (
          <h1 className="rounded" onClick={() => setIsOpen(!isOpen)}>{currentTech}</h1>
        ) : technician === null ? (
          <div
            className="flex justify-center gap-3 items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h1>select</h1>
            <h1>{isOpen ? <FaCaretUp/> : <FaCaretDown/>}</h1>
          </div>
        ) : (
          <div
            className="rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            {technician.name}
          </div>
        )}
      </div>
      {isOpen &&
        (technicians.length === 0 ? (
          <h1 className="p-1 px-2 absolute w-full bg-secondary hadow-md rounded">
            No Technicians
          </h1>
        ) : (
          <div className="absolute flex flex-col w-full rounded">
            {technicians.map((technician: any) => (
              <h1
                className="p-1 px-2 absolute w-full bg-secondary shadow-md border-b hover:bg-blue-700"
                onClick={() => {
                  setTechnician(technician);
                  setIsOpen(false);
                }}
              >
                {technician.name}
              </h1>
            ))}
          </div>
        ))}
      {technician && technician.id !== currentTech && (
        <div className="flex gap-2">
          <button
            className="absolute p-1 px-2 top-0 -right-20 border rounded border-green-500 text-green-500 hover:text-green-700"
            onClick={handleTechnician}
          >
            Assign
          </button>
          <button
            className="absolute p-1 px-2 top-0 -right-40 border rounded border-red-500 text-red-500 hover:text-red-700"
            onClick={() => setTechnician(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
    </>
  );
}

export default AssignTech;
