import Categories from "@/components/Categories";
import SearchInput from "@/components/SearchInput";
import { prisma } from "@/lib/prismadb";
import React from "react";

type Props = {};

const Home = async (props: Props) => {
  const categories = await prisma.category.findMany();
  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories categories={categories} />
    </div>
  );
};

export default Home;
