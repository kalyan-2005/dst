// api for setting password
import { NextResponse } from "next/server";
// import {hash} from "bcryptjs"
import { db } from "@/lib/db";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
    const body = await req.json();
    const { password, email } = body;
    const hashedPassword = await hash(password, 10);
    const user = await db.user.update({
        where: {
            email: email,
        },
        data: {
            password: hashedPassword,
        },
    });
    return NextResponse.json({
        sucess:true,

    });
}