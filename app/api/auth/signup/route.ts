// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/security";
import { signupSchema } from "@/lib/validations/singup";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    // Strip confirmPassword – we don’t store it
    const { name, email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    const exists = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (exists) {
      return NextResponse.json(
        { message: "Unable to create account" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        passwordHash,
        role: "USER",
      },
    });

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

