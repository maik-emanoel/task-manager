import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function getUser() {
  const session = await getServerSession(authOptions);
  const userInfo = await prisma.user.findUnique({
    where: {
      id: Number(session?.user.id),
    },
  });

  if (!userInfo) return null

  const { password, ...rest } = userInfo;

  return rest
}