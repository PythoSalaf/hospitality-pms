"use client";

import React from "react";
import { useLogoutUser } from "~~/app/(auth)/_hooks/useLogoutUser";
import { Button } from "~~/components/ui/button";

const DBContainer: React.FC = () => {
  const { onLogout, isLoading } = useLogoutUser();
  return (
    <div>
      DBContainer
      <Button onClick={() => onLogout()} loading={isLoading}>
        Logout
      </Button>
    </div>
  );
};

export default DBContainer;
