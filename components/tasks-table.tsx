"use client";

import {
  DotsThree,
  ArrowRight,
  Icon,
  Circle,
  Timer,
  XCircle,
  CheckCircle,
  Question,
  ArrowUp,
  ArrowDown,
  Minus,
} from "@phosphor-icons/react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { TaskSchema } from "@/app/types";
import { updateDatabase } from "@/app/actions";
import DeleteTaskButton from "./delete-task-button";
import { toast } from "sonner";

export default function TasksTable({ tasks }: { tasks: TaskSchema[] }) {
  async function handleChangeTaskLabel({
    value,
    id,
  }: {
    value: string;
    id: string;
  }) {
    const changeTaskLabel = await fetch("/api/task", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        value,
        id,
      }),
    });

    const response = await changeTaskLabel.json();
    updateDatabase();

    if (response.ok) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  if (tasks.length === 0) {
    return (
      <p className="text-muted-foreground text-sm text-center pt-40">
        You havent a task yet, create one now
      </p>
    );
  }

  return (
    <Table>
      <TableHeader className="pointer-events-none">
        <TableRow>
          <TableHead className="w-[80px] pl-5">Task</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => {
          return (
            <TableRow key={task.id}>
              <TableCell className="font-medium pl-5">
                <div className="w-[80px]" title={task.id}>
                  {task.id.slice(0, 4)}...
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <span className="inline items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground first-letter:uppercase">
                    {task.label}
                  </span>
                  <span className="max-w-[450px] truncate font-medium">
                    {task.title}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex w-[110px] items-center">
                  <StatusIcon status={task.status} />
                  <span className="capitalize">{task.status}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center w-[110px]">
                  <PriorityIcon priority={task.priority} />
                  <span className="first-letter:uppercase">
                    {task.priority}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0 flex">
                      <DotsThree className="mx-auto size-5 cursor-pointer" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Copy task id</DropdownMenuItem>
                    <DropdownMenuItem>Favorite</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup
                          value={task.label}
                          onValueChange={(e) =>
                            handleChangeTaskLabel({ value: e, id: task.id })
                          }
                        >
                          <DropdownMenuRadioItem value="bug">
                            Bug
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="feature">
                            Feature
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="documentation">
                            Documentation
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DeleteTaskButton taskId={task.id} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function StatusIcon({ status }: { status: string }) {
  let Icon: Icon = Circle;

  switch (status) {
    case "todo":
      Icon = Circle;
      break;
    case "inProgress":
      Icon = Timer;
      break;
    case "canceled":
      Icon = XCircle;
      break;
    case "done":
      Icon = CheckCircle;
      break;
    case "backlog":
      Icon = Question;
      break;
    default:
      break;
  }

  return <Icon className="mr-2 size-4 text-muted-foreground" />;
}

function PriorityIcon({ priority }: { priority: string }) {
  let Icon: Icon = Minus;

  switch (priority) {
    case "high":
      Icon = ArrowUp;
      break;
    case "medium":
      Icon = ArrowRight;
      break;
    case "low":
      Icon = ArrowDown;
      break;
    default:
      break;
  }

  return <Icon className="mr-2 size-4 text-muted-foreground" />;
}
