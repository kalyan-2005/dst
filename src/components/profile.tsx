// import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export function ProfileDialog({ currentUser }: { currentUser: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 px-6 w-full hover:bg-blue-500">Profile</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Image
              src={currentUser?.image}
              className="block m-auto w-1/2"
              width={50}
              height={50}
              alt="logo"
            />
          </DialogTitle>
        </DialogHeader>
        <div>
          <h1 className="text-2xl font-bold text-center">
            {currentUser?.name}
          </h1>
          <div className="flex gap-2 mt-8 items-center">
            <CiMail className="text-lg"/>
            <h1 className="text-sm">{currentUser?.email}</h1>
          </div>
          <div className="flex justify-between my-4 items-center">
            <div className="flex gap-2 items-center">
              <CiLock className="text-lg"/>
              <h1 className="text-sm">{currentUser?.password?currentUser.password:"**********"}</h1>
            </div>
            <div><FaEye className="text-lg"/></div>
          </div>
        </div>
        <DialogFooter className="flex gap-4">
          <button type="submit" className="p-1 px-3 rounded bg-white text-primary">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
