import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.json();
    const { stars, issueId } = data;
    const issue = await db.issue.update({
        where: {
            id: issueId
        },
        data: {
            feedback: Number(stars)
        }
    });
    return NextResponse.json(issue);
}