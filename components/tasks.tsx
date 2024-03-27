import { getUser } from "@/app/utils/get-user";
import { prisma } from "@/lib/prisma";
import TasksTable from "./tasks-table";

export default async function Tasks() {
  const user = await getUser();
  const tasks = await prisma.task.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: "asc" },
  });

  return <TasksTable tasks={tasks} />;
}
