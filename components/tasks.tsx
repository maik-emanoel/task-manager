import { getTasks } from "@/app/utils/get-tasks";
import TasksTable from "./tasks-table";

export default async function Tasks() {
  const tasks = await getTasks();

  return <TasksTable tasks={tasks} />;
}
