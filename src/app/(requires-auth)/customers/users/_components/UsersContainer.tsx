import React from "react";
import { UserCards } from "./UserCard";
import UsersTable from "./UsersTable";

const UsersContainer = () => {
  return (
    <div className="flex flex-col gap-y-6 lg:gap-y-8 items-stretch">
      <UserCards />
      <UsersTable />
    </div>
  );
};

export default UsersContainer;
