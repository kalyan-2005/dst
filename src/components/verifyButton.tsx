"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputOTPDemo } from "./otp";
import toast from "react-hot-toast";
import { useState } from "react";

export function VerifyOtp({ email,issueId }: any) {
    const handleOTP = async() => {
        try {
          const response = await fetch("/api/generateOTP", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email,issueId }),
          });
          if (response.ok) {
            try {
              const data = await response.json();
              const otp = data.otp;
              const res = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  otp: otp,
                  email,
                }),
              });
        
              if(response.ok) {
                toast.success('Email sent successfully');
              } else {
                toast.error('Failed to send email');
              }
            } catch (error) {
              toast.error('Failed to send email');
            }
            toast.success("OTP sent successfully");
          } else {
            toast.error("Failed to generate OTP");
          }
        } catch (error) {
          toast.error("Failed to generate OTP");
        }
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
          <button onClick={handleOTP} className="text-green-500 p-1 px-2 rounded border border-green-500">
            Approve
          </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>OTP</DialogTitle>
          <DialogDescription>
            sent to <b>{email}</b>
          </DialogDescription>
        </DialogHeader>
        <div className="my-8 m-auto">
          <InputOTPDemo issueId={issueId} />
        </div>
        <DialogFooter>
          <div className="text-center text-sm text-gray-500">
            OTP sent is valid until this dialog box is open
            <h1 className="text-center text-xs text-gray-500">On reopen, another otp is sent</h1>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
