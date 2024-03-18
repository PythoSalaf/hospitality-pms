"use client";

import React, { useState, useTransition } from "react";
import { AddBranchSchema } from "../_schemas";
import { z } from "zod";
import { Branch } from "@prisma/client";
import { toast } from "sonner";
import { addBranch } from "../_actions";

export const useAddBranch = () => {
  const [addedBranch, setAddedBranch] = useState<Branch | null>(null);
  const [isLoading, startTransition] = useTransition();

  const handleAddBranch = (values: z.infer<typeof AddBranchSchema>) => {
    startTransition(() => {
      const handler = async () => {
        try {
          const payload = await addBranch(values);

          // based on feedback, do something on client
          if (payload && payload.data) {
            setAddedBranch(payload.data);

            toast.success(payload.message, {
              description: "Branch Deleted Successfully!",
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

  return { isLoading, handleAddBranch, addedBranch };
};
