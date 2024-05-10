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
import { TaskSchema } from "@/app/types";

export default function StatusCombobox({ tasks }: { tasks: TaskSchema[] }) {
  const [open, setOpen] = useState(false);
  const { statusValue, handleChangeStatusValue } = useComboboxValues();

  const status = [
    {
      value: "todo",
      label: "Todo",
      amount: tasks.filter((task) => task.status === "todo").length,
    },
    {
      value: "inProgress",
      label: "In Progress",
      amount: tasks.filter((task) => task.status === "inProgress").length,
    },
    {
      value: "done",
      label: "Done",
      amount: tasks.filter((task) => task.status === "done").length,
    },
    {
      value: "canceled",
      label: "Canceled",
      amount: tasks.filter((task) => task.status === "canceled").length,
    },
    {
      value: "backlog",
      label: "Backlog",
      amount: tasks.filter((task) => task.status === "backlog").length,
    },
  ];

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
          className="w-full sm:w-fit sm:justify-between items-center px-3 border-dashed"
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
                <span>{status.label}</span>
                <span className="ml-auto text-xs">{status.amount}</span>
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
