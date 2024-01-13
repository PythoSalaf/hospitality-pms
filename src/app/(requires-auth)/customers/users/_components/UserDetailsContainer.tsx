"use client";

import React from "react";
import UserOverview from "./UserOverview";
import UserTabs from "./UserTabs";
import useGetUserDetails from "../_hooks/useGetUserDetails";
import UserDetailPageHeader from "./UserDetailPageHeader";

const UserDetailsContainer: React.FC<{ id: string }> = ({ id }) => {
  const { data: user, isLoading } = useGetUserDetails({ id });
  if (user === null) {
    return <>User not found!</>;
  }
  return (
    <>
      <UserDetailPageHeader data={user} />

      <div className="mt-12 lg:mt-16 font-worksans">
        <UserOverview data={user} isLoading={isLoading} />
        <UserTabs data={user} />
      </div>
    </>
  );
};

export default UserDetailsContainer;
