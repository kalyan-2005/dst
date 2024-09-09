import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();
    const { address, mobile, registeredName } = body;
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    
    try {
        const user = await db.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                address,
                mobile,
                registeredName
            }
        });

        return new NextResponse(JSON.stringify({ message: "User updated" }), { status: 200 });
    } catch (error) {
        return new NextResponse("Failed to update user", { status: 500 });
    }
}
