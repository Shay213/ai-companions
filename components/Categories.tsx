"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import qs from "query-string";

type Props = {
  categories: Category[];
};

type ButtonProps = {
  label: string;
  isActive?: boolean;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ label, handleClick, isActive }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md hover:opacity-75 transition",
        isActive ? "bg-primary/25" : "bg-primary/10"
      )}
    >
      {label}
    </button>
  );
};

const Categories = ({ categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const handleClick = (id: string | undefined) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="w-full overflow-x-auto space-x-2 flex p-1">
      <Button
        label="Newest"
        handleClick={() => handleClick(undefined)}
        isActive={!categoryId}
      />
      {categories.map(({ id, name }) => (
        <Button
          key={id}
          label={name}
          handleClick={() => handleClick(id)}
          isActive={id === categoryId}
        />
      ))}
    </div>
  );
};

export default Categories;
