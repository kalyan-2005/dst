"use client";
import { db } from "@/lib/db";
import React from "react";
import toast from "react-hot-toast";

function AssignTech({ issue, technicians }: any) {
  const handleChangeTech = async (issueId: string, techId: string) => {
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
        try {
          const tech = technicians.find((tech: any) => tech.id === techId);
          const res = await fetch("/api/sendEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: tech.email,
              subject: "New Issue Assigned",
              htmlContent: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #0B1120;">
        <h2 style="text-align: center; color: #4CAF50;">Issue Assigned</h2>
        <p style="font-size: 18px; color: #534809;">
          Hello,
        </p>
        <p style="font-size: 18px; color: #333;">
          You are assigned with new issue.
        </p>
        <div style="text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; padding: 10px; border-radius: 5px; background-color: #f2f2f2;">
          <a href="https://water-sense.vercel.app/issues/reported" style="text-decoration: none; color: #0B1120;">
            View Issue
          </a>
        </div>
        <p style="font-size: 16px; color: #777;">
          If it is not relevant to you, you can safely ignore this email.
        </p>
        <p style="font-size: 16px; color: #777; text-align: center; margin-top: 20px;">
          &mdash; Water sense
        </p>
      </div>`,
            }),
          });

          if (!res.ok) {
            throw new Error("Failed to send email");
          }
          toast.success("Email sent successfully");
        } catch (error) {
          toast.error("Failed to send email:");
          console.error(error);
        }
        toast.success("Technician assigned successfully");
      } else {
        toast.error("Failed to assign technician");
        console.error("Failed to assign technician");
      }
    } catch (error) {
      toast.error("Failed to assign technician");
      console.error(error);
    } finally {
      toast.dismiss();
    }
  };
  return (
    <>
      <select
        value={issue.assignedToId || ""}
        onChange={(e) => handleChangeTech(issue.id, e.target.value)}
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
