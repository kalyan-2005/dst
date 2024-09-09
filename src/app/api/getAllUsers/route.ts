import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const currentUser = await getCurrentUser();
    if(!currentUser||currentUser.role!=="MANAGER") return NextResponse.json({message:"Unauthorized",users:[]});
    const users = await db.user.findMany({
        orderBy: {
            name: 'asc',
        }
    });
    return NextResponse.json(users);
}