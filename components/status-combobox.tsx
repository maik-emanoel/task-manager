"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Circle,
  Timer,
  XCircle,
  CheckCircle,
  Question,
  Check,
  PlusCircle,
  FunnelSimple,
} from "@phosphor-icons/react";

const status = [
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "inProgress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: XCircle,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CheckCircle,
  },
  {
    value: "backlog",
    label: "Backlog",
    icon: Question,
  },
];

export default function StatusCombobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between items-center px-3 border-dashed"
        >
          {status.find((status) => status.value === value) ? (
            <FunnelSimple className="mr-2 size-4 shrink-0" />
          ) : (
            <PlusCircle className="mr-2 size-4 shrink-0" />
          )}
          {value
            ? status.find((status) => status.value === value)?.label
            : "Status"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search status..." />
          <CommandEmpty>No status found.</CommandEmpty>
          <CommandGroup>
            {status.map((status) => (
              <CommandItem
                key={status.value}
                value={status.value}
                onSelect={() => {
                  setValue(status.value);
                  setOpen(false);
                }}
                className="data-[disabled]:pointer-events-auto"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === status.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {status.label}
              </CommandItem>
            ))}
          </CommandGroup>
          {value && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem className="justify-center">
                  Clear filter
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
