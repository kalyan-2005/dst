import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {

    const body = await req.json();
    const {address, mobile, registeredName} = body;
    const currentUser = await getCurrentUser();
    if(!currentUser)
        return NextResponse.json(null);
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
        })
        return NextResponse.json({
            message: 'Address added successfully',
        });
    } catch (error) {
        throw new Error('Failed to add address');
    }
}