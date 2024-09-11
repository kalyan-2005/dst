import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const body = await req.json();
    const { otp, issueId } = body;
    const user = await db.issue.findUnique({
        where: {
            id: issueId,
        }
    })
    if(!user || user.otp !== otp) {
        return NextResponse.json({ error: "Invalid OTP" });
    }
    const issue = await db.issue.update({
        where: {
            id: issueId
        },
        data: {
            status: "CLOSE"
        }
    })
    return NextResponse.json({
        sucess:true,

    });
}