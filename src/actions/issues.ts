import { db } from "@/lib/db";
import { getCurrentUser } from "./getCurrentUser";

export const getIssuesForUser = async (status: any) => {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;
    if(currentUser.role==="TECHNICIAN")  {
        const issues = await db.issue.findMany({
            where: {
                assignedToId: currentUser?.id,
                status: status
            },
            include: {
                user: {
                    select: {
                        sensor: true,
                        name: true,
                        email: true,
                        address: true,
                        mobile: true,
                    }
                },
                assignedTo: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return issues;
    }
    if(currentUser.role==="MANAGER" || currentUser.role==="ADMIN") {
        const issues = await db.issue.findMany({
            where: {
                status: status,
            },
            include: {
                user: {
                    select: {
                        sensor: true,
                        name: true,
                        email: true,
                        address: true,
                        mobile: true,
                    }
                },
                assignedTo: true
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
        include: {
            user: true,
            assignedTo: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return issues;
}
