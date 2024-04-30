"use client";

import { useState } from "react";
import { Check, FunnelSimple, PlusCircle } from "@phosphor-icons/react";

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
import { PriorityIcon } from "./custom-icons";
import { useComboboxValues } from "@/app/contexts/useComboboxValues";
import { TaskSchema } from "@/app/types";

export default function PriorityCombobox({ tasks }: { tasks: TaskSchema[] }) {
  const [open, setOpen] = useState(false);
  const { priorityValue, handleChangePriorityValue } = useComboboxValues();

  const priorities = [
    {
      value: "high",
      label: "High",
      amount: tasks.filter((task) => task.priority === "high").length,
    },
    {
      value: "medium",
      label: "Medium",
      amount: tasks.filter((task) => task.priority === "medium").length,
    },
    {
      value: "low",
      label: "Low",
      amount: tasks.filter((task) => task.priority === "low").length,
    },
  ];

  function handleClearCombobox() {
    setOpen(false);
    handleChangePriorityValue("");
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
          {priorities.find((priority) => priority.value === priorityValue) ? (
            <FunnelSimple className="mr-2 size-4 shrink-0" />
          ) : (
            <PlusCircle className="mr-2 size-4 shrink-0" />
          )}
          {priorityValue
            ? priorities.find((priority) => priority.value === priorityValue)
                ?.label
            : "Priority"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Priority" />
          <CommandEmpty>No priority found.</CommandEmpty>
          <CommandGroup>
            {priorities.map((priority) => (
              <CommandItem
                key={priority.value}
                value={priority.value}
                onSelect={() => {
                  handleChangePriorityValue(priority.value);
                  setOpen(false);
                }}
                className="data-[disabled]:pointer-events-auto"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    priorityValue === priority.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <PriorityIcon priority={priority.value} />
                <span>{priority.label}</span>
                <span className="ml-auto text-xs">{priority.amount}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          {priorityValue && (
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
