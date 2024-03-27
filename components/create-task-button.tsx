"use client";

import { useState } from "react";
import CreateNewTaskForm from "./create-new-task-form";
import { Button } from "./ui/button";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

export default function CreateTaskButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create task</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New task</DialogTitle>
          <DialogDescription>
            Fill up the fields below to create your new task
          </DialogDescription>
        </DialogHeader>

        <CreateNewTaskForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
