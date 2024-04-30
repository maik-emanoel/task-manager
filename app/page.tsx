import CreateTaskButton from "@/components/create-task-button";
import FilterTools from "@/components/filter-tools";
import Header from "@/components/header";
import Pagination from "@/components/pagination";
import { getUser } from "./utils/get-user";
import { prisma } from "@/lib/prisma";
import TasksTable from "@/components/tasks-table";

export default async function Home() {
  const user = await getUser();
  const tasks = await prisma.task.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-screen-lg mx-auto py-16 h-full">
      <Header />
      <div className="space-y-4 mt-8">
        <div className="flex justify-between items-center">
          <FilterTools tasks={tasks} />
          <CreateTaskButton />
        </div>

        <TasksTable tasks={tasks} />
        <Pagination />
      </div>
    </div>
  );
}
