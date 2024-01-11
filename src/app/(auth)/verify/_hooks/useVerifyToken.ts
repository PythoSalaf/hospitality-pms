"use client";

import { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";
import { verifyToken } from "../_actions/verifyToken";

export const useVerifyToken = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();
  const onSubmit = useCallback((token: string, email: string) => {
    setIsLoading(true);
    verifyToken(token, email)
      .then((data) => {
        setIsError(data.isError);
        setIsSuccess(data.isError === false);
        if (!data.isError) {
          setSuccess(data.success);
        }
        if (data.isError) {
          setError(data.error);
        }
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        toast.error("Error", {
          description: "OOPS! Something went wrong",
          cancel: {
            label: "Dismiss",
          },
          className: "bg-slate-400",
        });
        setIsLoading(false);
      });
  }, []);
  return { onSubmit, isLoading, isError, isSuccess, success, error };
};
