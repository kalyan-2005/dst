import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const data = await request.json();
    const {email, role} = data;
    const user = await db.user.update({
        where: {
            email
        },
        data: {
            role
        }
    });
    return NextResponse.json({
        sucess:true,

    });
}