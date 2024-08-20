"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export function InputOTPDemo({issueId}:any) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Function to handle changes in OTP slots
  const handleSlotChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on the next input if the current one is filled
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Function to handle backspace key press
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
          const newOtp = [...otp];
          newOtp[index - 1] = ""; // Clear the previous input
          setOtp(newOtp);
        }
      }
    }
  };

  // Function to handle paste event
  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text").slice(0, 6); // Limit paste to 6 characters
    const newOtp = [...otp];

    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }

    setOtp(newOtp);

    // Focus the last filled input field after pasting
    const lastFilledInput = document.getElementById(`otp-input-${pasteData.length - 1}`);
    if (lastFilledInput) lastFilledInput.focus();
  };

  // Concatenate OTP values into a single string
  const otpString = otp.join("");
  const router = useRouter();

  // UseEffect to detect when the OTP is fully entered and then make an API call
  useEffect(() => {
    if (otpString.length === 6) {
      // Make an API call when the OTP is fully entered
      const verifyOTP = async () => {
        try {
          const response = await fetch("/api/verify-otp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ otp: otpString, issueId }),
          });

          if (response.ok) {
            const data = await response.json();
            if(!data.error) {
              router.push('/issues/resolved');
            }
            console.log("OTP verified successfully:", data);

            // Handle successful OTP verification
          } else {
            console.error("Failed to verify OTP");
            // Handle OTP verification failure
          }
        } catch (error) {
          console.error("Error verifying OTP:", error);
          // Handle errors
        }
      };

      verifyOTP();
    }
  }, [otpString]);

  return (
    <div>
      <div>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleSlotChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-10 h-10 p-2 text-center bg-transparent border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
