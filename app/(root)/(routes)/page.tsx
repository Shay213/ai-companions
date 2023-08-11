import SearchInput from "@/components/SearchInput";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
    </div>
  );
};

export default Home;
