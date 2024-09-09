"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

function AssignTech({ issue, technicians }: any) {
  const handleChangeTech = async (issueId,techId) => {
    try {
      toast.loading("Assigning technician...");
      const response = await fetch("/api/assignTechnician", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issueId,
          techId,
        }),
      });

      if (response.ok) {
        toast.success("Technician assigned successfully");
      } else {
        toast.error("Failed to assign technician");
        console.error("Failed to assign technician");
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss();
    }
  };
  return (
    <>
      <select
        value={issue.assignedToId || ""}
        onChange={(e) =>
          handleChangeTech(issue.id, e.target.value)
        }
        className="border text-center border-gray-300 px-2 py-1 rounded-md focus:outline-none bg-transparent focus:border-blue-500 text-sm"
      >
        <option value="" disabled selected>
          -- Select Technician --
        </option>
        {technicians.map((tech: any, index: any) => (
          <option key={index} className="text-gray-500" value={tech.id}>
            {tech.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default AssignTech;
