import Navbar from "@/components/Navbar";
import { Metadata } from "next/types";
import React from "react";

export const metadata: Metadata = {
  title: "Home",
};
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="md:pl-20 pt-16 h-full">{children}</main>
    </div>
  );
};

export default Layout;
