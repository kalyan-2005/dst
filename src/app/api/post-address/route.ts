import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { address, mobile, registeredName } = body;
        
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }
        
        const user = await db.user.update({
            where: { id: currentUser.id },
            data: { address, mobile, registeredName }
        });
        
        return new Response(JSON.stringify({ message: "User updated successfully" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to update user" }), { status: 500 });
    }
}
