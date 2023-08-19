import { Companion, Message } from "@prisma/client";
import { Button, buttonVariants } from "./ui/button";
import { ChevronLeft, MessagesSquare, MoreVertical } from "lucide-react";
import Link from "next/link";
import BotAvatar from "./BotAvatar";
import { useAuth } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import CompanionOwnerActions from "./CompanionOwnerActions";

type Props = {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};
const ChatHeader = ({ companion }: Props) => {
  const { userId } = useAuth();
  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Link
          href="/"
          className={buttonVariants({ size: "icon", variant: "ghost" })}
        >
          <ChevronLeft className="h-8 w-8" />
        </Link>
        <BotAvatar src={companion.src} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{companion.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessagesSquare className="w-3 h-3 mr-1" />
              {companion._count.messages}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Created by @{companion.userName}
          </p>
        </div>
      </div>
      {userId === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <CompanionOwnerActions
              config={{
                edit: { redirectHref: `/companion/${companion.id}` },
                delete: {
                  callAPI: `/api/companion/${companion.id}`,
                  methodAPI: "DELETE",
                  successAPIRedirect: "/",
                },
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ChatHeader;
