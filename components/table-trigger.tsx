import { TaskSchema } from "@/app/types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import TasksTableRow from "./tasks-table-row";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Check, CopySimple, X } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { Input } from "./ui/input";
import { handleCopyToClipboard } from "@/app/utils/copy-to-clipboard";
import { cn } from "@/lib/utils";

interface TableTriggerProps {
  task: TaskSchema;
}

export default function TableTrigger({ task }: TableTriggerProps) {
  const isDesktop = useMediaQuery();
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <TasksTableRow task={task} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar formação</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para adicionar sua formação
            </DialogDescription>
          </DialogHeader>
          <TaskInfo task={task} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <TasksTableRow task={task} />
      </DrawerTrigger>
      <DrawerContent className="flex rounded-t-3xl focus-visible:outline-none">
        <div className="relative flex px-5 pb-8 pt-10">
          <TaskInfo task={task} />
          <DrawerClose asChild className="absolute -top-5 right-2">
            <Button variant="ghost" className="p-2">
              <X size={20} />
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function TaskInfo({ task }: { task: TaskSchema }) {
  const [isCopied, setIsCopied] = useState(false);
  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-US", {
    weekday: "long", // Full name of the weekday (e.g., "Monday")
    year: "numeric", // Full numeric representation of the year (e.g., "2024")
    month: "long", // Full name of the month (e.g., "May")
    day: "numeric", // Numeric representation of the day (e.g., "7")
    hour: "numeric", // Numeric representation of the hour (e.g., "13")
    minute: "2-digit", // Numeric representation of the minute (e.g., "58")
  });

  return (
    <div className="flex flex-col gap-6 flex-1">
      <div className="flex flex-col gap-1">
        <label className="text-sm">Id</label>
        <div className="flex items-center">
          <Input
            value={task.id}
            readOnly
            className="rounded-r-none pointer-events-none focus-visible:ring-0"
            disabled
          />
          <Button
            variant="outline"
            className="rounded-l-none"
            onClick={() => {
              handleCopyToClipboard(task.id);
              setIsCopied(true);

              setTimeout(() => setIsCopied(false), 1000);
            }}
          >
            <div className="relative size-[18px]">
              <Check
                size={18}
                className={cn(
                  "text-emerald-500 absolute",
                  isCopied ? "animate-scale-in" : "animate-scale-out"
                )}
              />
              <CopySimple
                size={18}
                className={cn(
                  "absolute",
                  isCopied ? "animate-scale-out" : "animate-scale-in"
                )}
              />
            </div>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm">Title</span>
        <div className="taskInfoValue">{task.title}</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-sm">Status</span>
          <div className="taskInfoValue">
            <span className="first-letter:uppercase">{task.status}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-sm">Priority</span>
          <div className="taskInfoValue">
            <span className="first-letter:uppercase">{task.priority}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <span className="text-sm">Label</span>
        <div className="taskInfoValue">
          <span className="first-letter:uppercase">{task.label}</span>
        </div>
      </div>

      <p className="flex items-center gap-1 text-xs mx-auto mt-3 opacity-40">
        <span>Created at:</span>
        <span className="first-letter:uppercase">{formattedDate}</span>
      </p>
    </div>
  );
}
