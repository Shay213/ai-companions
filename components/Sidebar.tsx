"use client";

import { cn } from "@/lib/utils";
import { Home, Plus, Settings } from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type Props = {};

const ROUTES = [
  {
    icon: Home,
    href: "/",
    label: "Home",
    pro: false,
  },
  {
    icon: Plus,
    href: "/companion/new",
    label: "Create",
    pro: true,
  },
  {
    icon: Settings,
    href: "/settings",
    label: "Settings",
    pro: false,
  },
];

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (href: string, pro: boolean) => {
    router.push(href);
  };

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-4 flex flex-1 justify-center">
        <div className="space-y-2">
          {ROUTES.map(({ href, icon: Icon, label, pro }) => (
            <div
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === href && "bg-primary/10 text-primary"
              )}
              key={href}
              onClick={() => handleClick(href, pro)}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <Icon className="h-5 w-5" />
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
