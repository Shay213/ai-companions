import React from "react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Chat",
};

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div className="mx-auto max-w-4xl h-full w-full">{children}</div>;
};

export default Layout;
