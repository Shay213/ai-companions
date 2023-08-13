import Categories from "@/components/Categories";
import Companions from "@/components/Companions";
import SearchInput from "@/components/SearchInput";
import { prisma } from "@/lib/prismadb";
import React from "react";

type Props = {
  searchParams: {
    categoryId: string;
    name: string;
  };
};

const Home = async ({ searchParams: { categoryId, name } }: Props) => {
  const categoriesPromise = prisma.category.findMany();
  const companionsPromise = prisma.companion.findMany({
    where: {
      categoryId,
      name: { contains: name },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const [categories, companions] = await Promise.all([
    categoriesPromise,
    companionsPromise,
  ]);

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories categories={categories} />
      <Companions companions={companions} />
    </div>
  );
};

export default Home;
