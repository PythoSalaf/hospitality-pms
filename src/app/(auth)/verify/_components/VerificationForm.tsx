"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useVerifyToken } from "../_hooks/useVerifyToken";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";
import AuthContainer from "../../_components/AuthContainer";
import { appRoutes } from "~~/routes";
import Link from "next/link";
import { Button } from "~~/components/ui/button";
import {
  FaCheck,
  FaCheckCircle,
  FaInfoCircle,
  FaStopCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { MessageContainer } from "~~/components/message";
const VerificationForm = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const { onSubmit, isError, isLoading, isSuccess, error } = useVerifyToken();
  useEffect(() => {
    if (token && email) {
      onSubmit(token, email);
    }
    if (!token && !email) {
      toast("Missing Token & Email", {
        description: "Please provide a valid token and email address",
      });
    }
    if (!email) {
      toast("Missing Email", {
        description: "Please provide a valid email address",
      });
    }
    if (!email) {
      toast("Missing Email", {
        description: "Please provide a valid email address",
      });
    }
  }, [token, email, onSubmit]);
  return (
    <AuthContainer
      title="Verification!"
      description={
        isLoading ? "Verification Processing ...." : "Verification Completed"
      }
    >
      <div className="flex items-center  w-full justify-center">
        {isLoading && <BeatLoader />}
        {isError && <ErrorMessage message={error} />}
        {isSuccess && (
          <SuccessMessage message={VERIFICATION_CONGRATS_MESSAGE} />
        )}
      </div>
    </AuthContainer>
  );
};

const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <MessageContainer
      icon={<FaTimesCircle className="text-9xl text-red-500" />}
      message={
        <p className="text-center">
          {message}{" "}
          <Link
            href={appRoutes.register}
            className="text-primary underline hover:no-underline"
          >
            <span>Go Back</span>
          </Link>
        </p>
      }
    />
  );
};
const SuccessMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <MessageContainer
      icon={<FaCheckCircle className="text-9xl text-green-500" />}
      message={
        <p className="text-center">
          {message}{" "}
          <Link
            href={appRoutes.login}
            className="text-primary underline hover:no-underline"
          >
            <span>Proceed</span>
          </Link>
        </p>
      }
    />
  );
};

const VERIFICATION_CONGRATS_MESSAGE =
  "Congrats, Your account has been successfully verified!";

export default VerificationForm;
