import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { otp, email } = body;

  // Set up Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "gmail", // e.g., Gmail
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });
  const htmlContent = `
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
      </div>`;

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    html: htmlContent,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}
