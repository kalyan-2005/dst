import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { issueId, techId } = body;
    const issue = await db.issue.update({
        where: {
            id: issueId,
        },
        data: {
            assignedTo: techId,
        },
    });
    return NextResponse.json(issue);
}