import { Dispatch, SetStateAction, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CircleNotch,
} from "@phosphor-icons/react";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "./ui/error-message";
import { toast } from "sonner";
import { updateDatabase } from "@/app/actions";

interface CreateNewTaskFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface TaskFormSchema {
  title: string;
  priority: string;
  label: string;
}

export default function CreateNewTaskForm({ setOpen }: CreateNewTaskFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskFormSchema>();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: TaskFormSchema) {
    setIsLoading(true);
    const createNewTask = await fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await createNewTask.json();

    setIsLoading(false);
    updateDatabase();
    setOpen(false);

    if (!response.ok) {
      toast.error("Failed to create new task, please try again!");
      return;
    }

    if (response.ok) {
      toast.success("Task created successfully!");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="title-input" className="text-sm text-primary/80">
            Title
          </label>
          <Input
            placeholder="Insert your task title"
            id="title-input"
            {...register("title", { required: true })}
            className=""
          />
          {errors.title?.type === "required" && (
            <ErrorMessage message="Title is required" />
          )}
        </div>
        <div className="flex gap-6">
          <div className="flex-1">
            <label htmlFor="label" className="text-sm text-primary/80">
              Label
            </label>
            <Controller
              control={control}
              name="label"
              rules={{
                required: true,
              }}
              render={({ field }) => {
                return (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select label"
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    </SelectTrigger>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      <SelectItem value="bug">Bug</SelectItem>
                      <SelectItem value="feature">Feature</SelectItem>
                      <SelectItem value="documentation">
                        Documentation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                );
              }}
            />
            {errors.label?.type === "required" && (
              <ErrorMessage message="Label is required" />
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="priority" className="text-sm text-primary/80">
              Priority
            </label>
            <Controller
              control={control}
              name="priority"
              rules={{
                required: true,
              }}
              render={({ field }) => {
                return (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select priority"
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">
                        <div className="flex gap-2 items-center">
                          <ArrowUp />
                          <span>High</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex gap-2 items-center">
                          <ArrowRight />
                          <span>Medium</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="low">
                        <div className="flex gap-2 items-center">
                          <ArrowDown />
                          <span>Low</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                );
              }}
            />
            {errors.priority?.type === "required" && (
              <ErrorMessage message="Priority is required" />
            )}
          </div>
        </div>
      </div>

      <Button type="submit" className="mt-10 w-full h-10 sm:w-[140px]" disabled={isLoading}>
        {isLoading ? (
          <CircleNotch size={20} className="animate-spin" />
        ) : (
          <span>Create new task</span>
        )}
      </Button>
    </form>
  );
}
