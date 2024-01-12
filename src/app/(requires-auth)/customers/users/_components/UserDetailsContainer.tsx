"use client";

import React from "react";
import UserOverview from "./UserOverview";
import UserTabs from "./UserTabs";

const UserDetailsContainer = () => {
  return (
    <div className="mt-12 lg:mt-16 font-worksans">
      <UserOverview />
      <UserTabs />
    </div>
  );
};

export default UserDetailsContainer;
