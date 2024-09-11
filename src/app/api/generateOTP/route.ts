import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { issueId } = body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpString = otp.toString();
    const issue = await db.issue.update({
        where: {
            id:issueId
        },
        data: {
            otp: otpString,
            closedAt: new Date()
        }
    })

    return NextResponse.json({otp:otpString});
}