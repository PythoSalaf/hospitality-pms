"use client";

import React, { useState, useTransition } from "react";
import { DeleteBranchSchema } from "../_schemas";
import { z } from "zod";
import { Branch } from "@prisma/client";
import { toast } from "sonner";
import { deleteBranch } from "../_actions";

export const useDeleteBranch = () => {
  const [deletedBranch, setDeletedBranch] = useState<Branch | null>(null);
  const [isLoading, startTransition] = useTransition();

  const handleDeleteBranch = (values: z.infer<typeof DeleteBranchSchema>) => {
    startTransition(() => {
      const handler = async () => {
        try {
          const payload = await deleteBranch(values);

          // based on feedback, do something on client
          if (payload && payload.data) {
            setDeletedBranch(payload.data);

            toast.success(payload.message, {
              cancel: {
                label: "Dismiss",
              },
            });
          } else {
            toast.error(payload?.message, {
              description: "OOPS, Something Went Wrong!",
              cancel: {
                label: "Dismiss",
              },
            });
          }
        } catch (error) {
          toast.error("Error!", {
            description: "OOPS, Something Went Wrong!",
            cancel: {
              label: "Dismiss",
            },
            className: "bg-slate-400",
          });
        }
      };

      handler();
    });
  };

  return { isLoading, handleDeleteBranch, deletedBranch };
};
