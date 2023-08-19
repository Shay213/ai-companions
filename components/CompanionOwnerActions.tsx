"use client";

import { Edit, Trash } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

type FetchMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"
  | "PATCH";

const DEFAULT_COMPANION_OWNER_ACTIONS = {
  edit: {
    label: "Edit",
    icon: Edit,
    redirectHref: null,
  },
  delete: {
    label: "Delete",
    icon: Trash,
    redirectHref: null,
  },
};

type Action = {
  label?: string;
  icon?: any;
  redirectHref?: string | null;
  callAPI?: string;
  methodAPI?: FetchMethod;
  payloadAPI?: any;
  successAPIRedirect?: string;
};

type ActionConfig = {
  edit?: Action;
  delete?: Action;
};

type Props = {
  config?: ActionConfig;
};

const CompanionOwnerActions = ({ config }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const mergedConfig: ActionConfig = {
    edit: { ...DEFAULT_COMPANION_OWNER_ACTIONS.edit, ...config?.edit },
    delete: { ...DEFAULT_COMPANION_OWNER_ACTIONS.delete, ...config?.delete },
  };

  const callAPIFunc = async (
    url: string,
    method: FetchMethod,
    payload?: any,
    successAPIRedirect?: string
  ) => {
    try {
      await fetch(url, {
        method,
        body: payload ? JSON.stringify(payload) : null,
      });
      toast({
        description: "Success",
      });
      if (successAPIRedirect) {
        router.refresh();
        router.push(successAPIRedirect);
      }
    } catch (error) {
      toast({
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {Object.values(mergedConfig).map(
        ({
          redirectHref,
          icon: Icon,
          label,
          callAPI,
          methodAPI,
          payloadAPI,
          successAPIRedirect,
        }) => (
          <DropdownMenuItem
            key={label}
            onClick={() => {
              redirectHref ? router.push(redirectHref) : undefined;
              if (callAPI) {
                if (!methodAPI) {
                  throw new Error("Method of fetch request must be specified");
                }

                callAPIFunc(callAPI, methodAPI, payloadAPI, successAPIRedirect);
              }
            }}
          >
            {Icon && <Icon className="w-4 h-4 mr-2" />}
            {label}
          </DropdownMenuItem>
        )
      )}
    </>
  );
};

export default CompanionOwnerActions;
