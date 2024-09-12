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
      include: {
        sensor: true
      }
    });
    
    if (!currentUser) {
      throw new Error("Not signed in");
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
}

export const getAllUsers = async() => {
  try {
    const users = await db.user.findMany({
      include: {
        sensor: true
      }
    });
    return users;
  } catch (error: any) {
    return null;
  }
}

export const getAddress = async() => {
  try {
    const currentUser = await getCurrentUser();
    if(!currentUser) return null;
    const address = await db.user.findUnique({
      where: {
        id: currentUser.id
      },
      select: {
        address: true,
        mobile: true,
        registeredName: true
      }
    });
    return {
      address: address?.address||'NA',
      mobile: address?.mobile,
      registeredName: address?.registeredName
    } as any;
  } catch (error: any) {
    throw new Error(error);
  }
}
export const getAllSensors = async() => {
  try {
    const sensors = await db.sensor.findMany({
      include: {
        User: true
      }
    });
    return sensors;
  } catch (error: any) {
    throw new Error(error);
  }
}