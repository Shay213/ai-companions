import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { companionCreationSchema } from "@/lib/schemas";
import { ZodError } from "zod";
import { prisma } from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { categoryId, description, instructions, name, seed, src } =
      companionCreationSchema.parse(body);

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // TODO: Check for subscription

    const companion = await prisma.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_POST]", error);
    if (error instanceof ZodError) {
      return new NextResponse("Missing or invalid fields", { status: 400 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}
