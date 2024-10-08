import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // return NextResponse.json({ message: request });
    const body = await request.json();
    const { title, description } = body;
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }
    const userId = currentUser.id;
    const issue = await db.issue.create({
        data: {
            title:title,
            description:description,
            userId:userId
        }
    })
    return NextResponse.json({
        sucess:true,
    });
}