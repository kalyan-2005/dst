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
import { FaCircleUser } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import SetPassword from "./setPassword";

export function ProfileDialog({
  currentUser,
  open,
  onOpenChange,
  setIsProfileOpen,
}: {
  currentUser: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setIsProfileOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {currentUser?.image ? (
              <Image
                src={currentUser?.image}
                className="block m-auto w-1/2"
                width={50}
                height={50}
                alt="logo"
              />
            ) : (
              <div className="text-center">
                <FaCircleUser className="m-auto text-[80px]" />
              </div>
            )}
          </DialogTitle>
        </DialogHeader>
        <div>
          <h1 className="text-2xl font-bold text-center">
            {currentUser?.name}
          </h1>
          {currentUser?.role != "USER" && (
            <h1 className="text-sm text-center">{currentUser?.role}</h1>
          )}
          <div className="flex gap-2 mt-8 items-center">
            <CiMail className="text-lg" />
            <h1 className="text-sm">{currentUser?.email}</h1>
          </div>
          <SetPassword currentUser={currentUser} setIsProfileOpen={setIsProfileOpen}/>
        </div>
        {/* <DialogFooter className="flex gap-4">
          <button
            type="submit"
            className="p-1 px-3 rounded bg-white text-primary"
          >
            Close
          </button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
