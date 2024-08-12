import { auth } from "@/auth";
import { db } from "@/lib/db";


export const getCurrentUser = async() => {
  try {
    const session = await auth();

    if (!session?.user?.email) return null;

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email
      },
    });
    
    if (!currentUser) {
      throw new Error("Not signed in");
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
}