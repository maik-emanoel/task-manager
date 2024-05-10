import { getUser } from "./get-user";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getTasks = cache(async () => {
  const user = await getUser();
  const tasks = await prisma.task.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
  });

  return tasks;
});
