import { db } from "@/lib/db";
import { getCurrentUser } from "./getCurrentUser";

export const getIssuesForUser = async (status: any) => {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;
    if(currentUser.role==="MANAGER" || currentUser.role==="ADMIN") {
        const issues = await db.issue.findMany({
            include: {
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return issues;
    }
    const issues = await db.issue.findMany({
        where: {
            userId: currentUser?.id,
            status: status,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return issues;
}