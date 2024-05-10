import { TaskSchema } from "@/app/types";
import { TableCell, TableRow } from "./ui/table";
import { DotsThree } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { StatusIcon, PriorityIcon } from "./custom-icons";
import DeleteTaskButton from "./delete-task-button";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { updateDatabase } from "@/app/actions";
import { ComponentProps, forwardRef } from "react";
import { handleCopyToClipboard } from "@/app/utils/copy-to-clipboard";
import { cn } from "@/lib/utils";

interface TasksTableRowProps extends ComponentProps<"tr"> {
  task: TaskSchema;
}

const TasksTableRow = forwardRef<HTMLTableRowElement, TasksTableRowProps>(
  ({ task, className, onClick }, ref) => {
    async function handleChangeTaskInfo({
      value,
      id,
      isStatus,
      actualValue,
    }: {
      value: string;
      id: string;
      isStatus: boolean;
      actualValue: string;
    }) {
      if (value === actualValue) return;

      const changeTaskInfo = fetch("/api/task", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          value,
          id,
          isStatus,
        }),
      });

      const response = changeTaskInfo;
      updateDatabase();

      toast.promise(response, {
        loading: "Loading...",
        success: `${isStatus ? "Status" : "Label"} updated successfully!`,
        error: "Failed update task, try again!",
      });
    }

    return (
      <TableRow ref={ref} className={cn('text-xs sm:text-sm', className)} onClick={onClick}>
        <TableCell className="font-medium pl-5">
          <div className="w-fit sm:w-[80px]" title={task.id}>
            {task.id.slice(0, 4)}...
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center space-x-2">
            <span className="inline items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground first-letter:uppercase">
              {task.label}
            </span>
            <span className="max-w-[300px] sm:max-w-[450px] truncate font-medium">
              {task.title}
            </span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center w-fit sm:w-[110px]">
            <StatusIcon status={task.status} />
            <span className="capitalize">{task.status}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center w-fit sm:w-[110px]">
            <PriorityIcon priority={task.priority} />
            <span className="first-letter:uppercase">{task.priority}</span>
          </div>
        </TableCell>

        <TableCell onClick={(e) => e.stopPropagation()}>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0 flex">
                <DotsThree className="mx-auto size-5 cursor-pointer" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem disabled>Edit</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleCopyToClipboard(task.id);
                  toast.success("TaskId copied to your clipboard!");
                }}
              >
                Copy task id
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>

                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={task.status}
                    onValueChange={(e) =>
                      handleChangeTaskInfo({
                        value: e,
                        actualValue: task.status,
                        id: task.id,
                        isStatus: true,
                      })
                    }
                  >
                    <DropdownMenuRadioItem value="todo">
                      Todo
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="inProgress">
                      In Progress
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="done">
                      Done
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="canceled">
                      Canceled
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="backlog">
                      Backlog
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={task.label}
                    onValueChange={(e) =>
                      handleChangeTaskInfo({
                        value: e,
                        actualValue: task.label,
                        id: task.id,
                        isStatus: false,
                      })
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
  }
);

TasksTableRow.displayName = "TasksTableRow";
export default TasksTableRow;
