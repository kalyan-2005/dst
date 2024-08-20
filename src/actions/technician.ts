import { db } from "@/lib/db";

export const getAllTechnicians = async() => {
    const technicians = await db.user.findMany({
        where: {
            role: "TECHNICIAN"
        }
    });
    return technicians;
}