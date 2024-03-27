import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/app/utils/get-user";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { title, label, priority } = await req.json();
    const user = await getUser();

    await prisma.task.create({
      data: {
        title: title as string,
        label: label as string,
        priority: priority as string,
        status: "todo",
        userId: user?.id as number,
      },
    });

    return NextResponse.json({
      message: "Task created successfully",
      status: 201,
      ok: true
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
      ok: false
    });
  }
}
