"use client";

import React, { useEffect, useState } from "react";
import { Button } from "~~/components/ui/button";
import { TUser } from "../../_types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~~/components/ui/alert-dialog";
import useChangeUserStatus from "../../_hooks/useChangeUserStatus";

type TActivateProps = {
  user?: TUser;
  open?: boolean;
  handleClose?: () => void;
  onActivate?: () => void;
};
export const ActivateUserBtn: React.FC<
  Pick<TActivateProps, "user" | "onActivate">
> = ({ user, onActivate }) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<TUser["status"]>();
  useEffect(() => {
    setStatus(user?.status);
  }, [user?.status]);
  const handleActivate = () => {
    setStatus("active");
    onActivate?.();
  };
  return (
    <>
      <ActivateUser
        open={open}
        handleClose={() => setOpen(false)}
        user={user}
        onActivate={handleActivate}
      />
      <Button
        disabled={status === "active"}
        title={status === "active" ? "Already active" : ""}
        onClick={() => setOpen(true)}
        variant={"outline"}
        className={`border-highlight text-highlight uppercase text-xs font-semibold bg-transparent hover:bg-transparent hover:border-black tracking-wider`}
        // size={`sm`}
      >
        Activate User
      </Button>
    </>
  );
};

const ActivateUser: React.FC<TActivateProps> = ({
  user,
  open = false,
  handleClose,
  onActivate,
}) => {
  const { onChangeUserStatus, isLoading } = useChangeUserStatus();
  const handleActivate = () => {
    if (!user) return;
    onChangeUserStatus({ id: user?.id, status: "active" });
    onActivate?.();
    handleClose?.();
  };
  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to activate {user?.name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleClose?.()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleActivate()}>
              Proceed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ActivateUser;
