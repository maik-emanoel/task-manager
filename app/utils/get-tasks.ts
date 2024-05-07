import { getUser } from "./get-user";
import { prisma } from "@/lib/prisma";
import { unstable_cache as cache } from "next/cache";

export const getTasks = cache(async () => {
  const user = await getUser();
  const tasks = await prisma.task.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
  });

  return tasks;
});
