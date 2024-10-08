import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo({ name,desc }: { name: string, desc: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button>{name}</button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-60">{desc}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
