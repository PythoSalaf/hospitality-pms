import React, { useState } from "react";
import { TUser, TUserDetails } from "../_types";
import { LOCAL_STORAGE_KEY_FOR_USERS } from "../_constants";

const useChangeUserStatus = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onChangeUserStatus = ({ id, status }: Pick<TUser, "id" | "status">) => {
    setIsLoading(true);
    setIsSuccess(false);
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    ) as TUserDetails[];
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status } : user
    );
    const updatedUsersJson = JSON.stringify(updatedUsers);
    localStorage.setItem(LOCAL_STORAGE_KEY_FOR_USERS, updatedUsersJson);
    setIsLoading(false);
    setIsSuccess(true);
    onSuccess?.();
  };
  return {
    onChangeUserStatus,
    isLoading,
    isSuccess,
  };
};

export default useChangeUserStatus;
