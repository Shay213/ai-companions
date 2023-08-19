import CompanionForm from "@/components/CompanionForm";
import { prisma } from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import React from "react";

type Props = {
  params: {
    companionId: string;
  };
};

const Companion = async ({ params: { companionId } }: Props) => {
  // TODO: Check subscription
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companionPromise =
    companionId === "new"
      ? undefined
      : prisma.companion.findUnique({
          where: { id: companionId, userId },
        });
  const categoriesPromise = prisma.category.findMany();

  const [companion, categories] = await Promise.all([
    companionPromise,
    categoriesPromise,
  ]);

  return <CompanionForm initialCompanion={companion} categories={categories} />;
};

export default Companion;
