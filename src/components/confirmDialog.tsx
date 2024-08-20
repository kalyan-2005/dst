import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TechDoneBtn from "./techDoneBtn";

export function DialogDemo({id}: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-gray-500 p-1 px-2 border rounded-xl border-gray-500 hover:text-green-500 hover:border-green-500 duration-200">
          Resolved
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm your work</DialogTitle>
          <DialogDescription>
            User will verify the work you have done to mark it as resolved
          </DialogDescription>
        </DialogHeader>
        <h1>Send for approval from the user?</h1>
        <DialogFooter>
            <DialogClose><TechDoneBtn id={id}/></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
