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

export function VerifyOtp({ email, issueId }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const handleOTP = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/generateOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, issueId }),
      });
      if (response.ok) {
        try {
          const data = await response.json();
          const otp = data.otp;
          const res = await fetch("/api/sendEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              subject: "OTP for Approval",
              htmlContent: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #0B1120;">
        <h2 style="text-align: center; color: #4CAF50;">Your OTP Code</h2>
        <p style="font-size: 18px; color: #534809;">
          Hello,
        </p>
        <p style="font-size: 18px; color: #333;">
          Your One-Time Password (OTP) is:
        </p>
        <div style="text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; padding: 10px; border-radius: 5px; background-color: #f2f2f2;">
          ${otp}
        </div>
        <p style="font-size: 16px; color: #777;">
          This OTP is valid for 10 minutes. Please do not share this code with anyone.
        </p>
        <p style="font-size: 16px; color: #777;">
          If you didn't request this, you can safely ignore this email.
        </p>
        <p style="font-size: 16px; color: #777; text-align: center; margin-top: 20px;">
          &mdash; Water sense
        </p>
      </div>`,
            }),
          });

          setLoading(false);
          if (response.ok) {
            toast.success("Email sent successfully");
          } else {
            toast.error("Failed to send email");
          }
        } catch (error) {
          toast.error("Failed to send email");
        }
      } else {
        toast.error("Failed to generate OTP");
      }
    } catch (error) {
      toast.error("Failed to generate OTP");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={handleOTP}
          className="text-green-500 p-1 px-2 rounded border border-green-500"
        >
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
          {loading ? (
            <div className="flex justify-center gap-2 items-center">
              <div className="w-8 h-8 border-4 border-primary border-dashed rounded-full animate-spin"></div>
              <h1>Sending email...</h1>
            </div>
          ) : (
            <InputOTPDemo issueId={issueId} />
          )}
        </div>
        <DialogFooter>
          <div className="text-center text-sm text-gray-500">
            OTP sent is valid until this dialog box is open
            <h1 className="text-center text-xs text-gray-500">
              On reopen, another otp is sent
            </h1>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
