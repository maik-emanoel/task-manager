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
      ok: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
      ok: false,
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id: taskId, value, isStatus } = await req.json();

    if (isStatus) {
      await prisma.task.update({
        where: { id: taskId },
        data: {
          status: value,
        },
      });
    } else {
      await prisma.task.update({
        where: { id: taskId },
        data: {
          label: value,
        },
      });
    }

    return NextResponse.json({
      message: `${isStatus ? 'Status' : 'Label'} updated successfully!`,
      ok: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Failed update task, try again!`,
      ok: false,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const taskId: string = await req.json();

    await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json({
      message: "Task deleted successfully!",
      ok: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to delete task, please try again!",
      ok: false,
    });
  }
}
