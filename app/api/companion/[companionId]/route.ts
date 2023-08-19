import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { companionCreationSchema } from "@/lib/schemas";
import { ZodError } from "zod";
import { prisma } from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params: { companionId } }: { params: { companionId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { categoryId, description, instructions, name, seed, src } =
      companionCreationSchema.parse(body);

    if (!companionId) {
      return new NextResponse("Missing companionId", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // TODO: Check for subscription

    const companion = await prisma.companion.update({
      where: {
        id: companionId,
      },
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

    return new NextResponse(JSON.stringify(companion), { status: 200 });
  } catch (error) {
    console.log("[COMPANION_PATCH]", error);
    if (error instanceof ZodError) {
      return new NextResponse("Missing or invalid fields", { status: 400 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { companionId } }: { params: { companionId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const companion = await prisma.companion.delete({
      where: {
        userId,
        id: companionId,
      },
    });

    return new NextResponse(JSON.stringify(companion), { status: 200 });
  } catch (error) {
    console.log("[COMPANION_DELETE]", error);
    if (error instanceof ZodError) {
      return new NextResponse("Missing or invalid fields", { status: 400 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}
