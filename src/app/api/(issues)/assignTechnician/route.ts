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
            assignedToId: techId,
            assignedAt: new Date(),
        },
    });
    return NextResponse.json(issue);
}