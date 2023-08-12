import { Metadata } from "next/types";
import React from "react";

export const metadata: Metadata = {
  title: "Create Companion",
};

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <>{children}</>;
};

export default Layout;
