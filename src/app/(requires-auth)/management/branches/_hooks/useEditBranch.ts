"use client";

import React, { useState, useTransition } from "react";
import { UpdateBranchSchema } from "../_schemas";
import { z } from "zod";
import { Branch } from "@prisma/client";
import { toast } from "sonner";
import { editBranch } from "../_actions";

export const useDeleteBranch = () => {
  const [editedBranch, setEditedBranch] = useState<Branch | null>(null);
  const [isLoading, startTransition] = useTransition();

  const handleEditBranch = (values: z.infer<typeof UpdateBranchSchema>) => {
    startTransition(() => {
      const handler = async () => {
        try {
          const payload = await editBranch(values);

          // based on feedback, do something on client
          if (payload && payload.data) {
            setEditedBranch(payload.data);

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

  return { isLoading, handleEditBranch, editedBranch };
};
