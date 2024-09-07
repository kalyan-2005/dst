import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { email,sensorId } = body;
    const sensor = await db.user.update({
        where: {
            email,
        },
        data: {
            sensorId,
        },
    });
    return NextResponse.json(sensor);
}