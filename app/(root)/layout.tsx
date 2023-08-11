import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
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
      <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
        <Sidebar />
      </div>
      <main className="md:pl-20 pt-16 h-full">{children}</main>
    </div>
  );
};

export default Layout;
