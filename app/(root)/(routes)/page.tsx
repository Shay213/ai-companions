import { UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Home;
