"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "./ui/table";
import { TaskSchema } from "@/app/types";
import { usePagination } from "@/app/contexts/usePagination";
import { useEffect } from "react";
import useFilterTasks from "@/app/hooks/useFilterTasks";
import TableTrigger from "./table-trigger";

export default function TasksTable({ tasks }: { tasks: TaskSchema[] }) {
  const { page, rowsPerPage, setTotalPages } = usePagination();
  const filteredTasks = useFilterTasks(tasks);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredTasks.length / rowsPerPage));
  }, [setTotalPages, filteredTasks.length, rowsPerPage]);

  if (tasks.length === 0) {
    return (
      <p className="text-muted-foreground text-sm text-center pt-40">
        You havent a task yet, create one now
      </p>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <p className="text-muted-foreground text-sm text-center pt-40">
        No tasks found.
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
        {filteredTasks
          .slice((page - 1) * rowsPerPage, page * rowsPerPage)
          .map((task) => {
            return (
              <TableTrigger task={task} key={task.id} />
            );
          })}
      </TableBody>
    </Table>
  );
}
