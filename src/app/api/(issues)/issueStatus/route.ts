import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, status } = body;
  const issue = await db.issue.update({
    where: {
      id: id.id,
    },
    data: {
      status,
    },
  });
  return NextResponse.json({
    message: "Issue status updated successfully",
  });
}
