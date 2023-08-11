import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

type Props = {};

const MobileSidebar = (props: Props) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
