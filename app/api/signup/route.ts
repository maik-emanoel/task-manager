import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    const existingUserByUsername = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUserByEmail) {
      return NextResponse.json({
        message:
          "Email already in use. Please try again with a different email.",
        errorType: "emailExists",
        status: 400,
      });
    }

    if (existingUserByUsername) {
      return NextResponse.json({
        message: "Username already taken. Please choose a different username.",
        errorType: "usernameExists",
        status: 400,
      });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User created successfully!",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to sign up new user. Please try again later.",
      errorType: "serverError",
      status: 500,
    });
  }
}
