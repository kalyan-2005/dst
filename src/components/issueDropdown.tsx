"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "Low water pressure",
    label: "Low water pressure",
  },
  {
    value: "High water pressure",
    label: "High water pressure",
  },
  {
    value: "No water from x days",
    label: "No water from x days",
  },
  {
    value: "Pipe leakage",
    label: "Pipe leakage",
  },
  {
    value: "Polluted water supply",
    label: "Polluted water supply",
  },
  {
    value: "Valve leakage",
    label: "Valve leakage",
  },
  {
    value: "Water leakage",
    label: "Water leakage",
  }
]

export function IssueDropdown({value,setValue}:any) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={`justify-between flex items-center w-1/2 p-2 rounded bg-secondary shadow-md ${value?"text-black font-semibold":"text-gray-400"}`}
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select defined issue"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search for issue" />
          <CommandList>
            <CommandEmpty>No issue found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
