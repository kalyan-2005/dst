import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SelectIssue from "./selectIssue";

const issues = [
  {
    id: 1,
    title: "Issue 1",
    description: "Issue 1 description",
  },
  {
    id: 2,
    title: "Issue 2",
    description: "Issue 2 description",
  },
  {
    id: 3,
    title: "Issue 3",
    description: "Issue 3 description",
  },
  {
    id: 4,
    title: "Issue 4",
    description: "Issue 4 description",
  },
  {
    id: 5,
    title: "Issue 5",
    description: "Issue 5 description",
  },
  {
    id: 6,
    title: "Issue 6",
    description: "Issue 6 description",
  },
  {
    id: 7,
    title: "Issue 7",
    description: "Issue 7 description",
  },
  {
    id: 8,
    title: "Issue 8",
    description: "Issue 8 description",
  },
];

export function IssueSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 rounded-lg bg-secondary">Report Issue</button>
      </SheetTrigger>
      <SheetContent className="max-h-screen overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Report an issue</SheetTitle>
          <SheetDescription>
            Send already defined issue or describe about your own issue.Please share your location too.
          </SheetDescription>
        </SheetHeader>
        <SelectIssue issues={issues}/>
      </SheetContent>
    </Sheet>
  );
}
