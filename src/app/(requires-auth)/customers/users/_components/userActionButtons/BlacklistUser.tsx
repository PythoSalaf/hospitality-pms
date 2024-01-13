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

type TBlacklistProps = {
  user?: TUser;
  open?: boolean;
  handleClose?: () => void;
};
export const BlacklistBtn: React.FC<Pick<TBlacklistProps, "user">> = ({
  user,
}) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<TUser["status"]>();
  useEffect(() => {
    setStatus(user?.status);
  }, [user?.status]);

  return (
    <>
      <BlacklistUser
        open={open}
        handleClose={() => setOpen(false)}
        user={user}
      />
      <Button
        onClick={() => setOpen(true)}
        disabled={status === "blacklisted"}
        variant={"outline"}
        className={`border-destructive text-destructive  uppercase text-xs font-semibold bg-transparent hover:bg-transparent hover:border-black tracking-wider`}
        // size={`sm`}
      >
        Blacklist User
      </Button>
    </>
  );
};

const BlacklistUser: React.FC<
  TBlacklistProps & { onBlacklist?: () => void }
> = ({ user, open = false, handleClose, onBlacklist }) => {
  const { onChangeUserStatus, isLoading } = useChangeUserStatus();
  const handleBlacklist = () => {
    if (!user) return;
    onChangeUserStatus({ id: user?.id, status: "blacklisted" });
    onBlacklist?.();
    handleClose?.();
  };
  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to blacklist {user?.name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleClose?.()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleBlacklist()}>
              Proceed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BlacklistUser;
