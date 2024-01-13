"use client";

import React, { useState } from "react";
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

type TActivateProps = {
  user?: TUser;
  open?: boolean;
  handleClose?: () => void;
};
export const ActivateUserBtn: React.FC<Pick<TActivateProps, "user">> = ({
  user,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ActivateUser
        open={open}
        handleClose={() => setOpen(false)}
        user={user}
      />
      <Button
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
}) => {
  // TODO: Implement activate hook and use it here
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
            <AlertDialogAction>Proceed</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ActivateUser;
