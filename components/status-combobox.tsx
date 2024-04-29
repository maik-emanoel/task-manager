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
import { StatusIcon } from "./custom-icons";
import { useComboboxValues } from "@/app/contexts/useComboboxValues";

const status = [
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "inProgress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
  {
    value: "backlog",
    label: "Backlog",
  },
];

export default function StatusCombobox() {
  const [open, setOpen] = useState(false);
  const { statusValue, handleChangeStatusValue } = useComboboxValues();

  function handleClearCombobox() {
    setOpen(false);
    handleChangeStatusValue("");
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between items-center px-3 border-dashed"
        >
          {status.find((status) => status.value === statusValue) ? (
            <FunnelSimple className="mr-2 size-4 shrink-0" />
          ) : (
            <PlusCircle className="mr-2 size-4 shrink-0" />
          )}
          {statusValue
            ? status.find((status) => status.value === statusValue)?.label
            : "Status"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Status" />
          <CommandEmpty>No status found.</CommandEmpty>
          <CommandGroup>
            {status.map((status) => (
              <CommandItem
                key={status.value}
                value={status.value}
                onSelect={() => {
                  handleChangeStatusValue(status.value);
                  setOpen(false);
                }}
                className="data-[disabled]:pointer-events-auto"
              >
                <Check
                  className={cn(
                    "mr-2 size-4",
                    statusValue === status.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <StatusIcon status={status.value} />
                {status.label}
              </CommandItem>
            ))}
          </CommandGroup>
          {statusValue && (
            <>
              <CommandSeparator />
              <CommandGroup onClick={handleClearCombobox}>
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
