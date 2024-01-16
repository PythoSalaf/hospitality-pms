"use client";

import React from "react";
import TopBar, { TOPBAR_ACCOMODATION_WIDTH_CLASS_NAME } from "../TopBar";
import SideBar, { SIDEBAR_WIDTH_CLASS_NAME } from "../SideBar";
import { Session } from "next-auth/types";

const AppLayout: React.FC<{
  children: React.ReactNode;
  session?: Session | null;
}> = ({ children, session }) => {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
  const toggleSideBarOpen = () => setIsSideBarOpen((val) => !val);
  return (
    <div className="font-worksans relative min-[100vh]">
      <TopBar
        session={session}
        isSideBarOpen={isSideBarOpen}
        toggleSideBarOpen={toggleSideBarOpen}
      />
      <div className="flex flex-col lg:flex-row">
        {/* to accomodate for fixed  sidebar */}
        <div className={SIDEBAR_WIDTH_CLASS_NAME} />
        <SideBar
          isSideBarOpen={isSideBarOpen}
          toggleSideBarOpen={toggleSideBarOpen}
        />
        {/* content */}
        <div className="flex-1">
          {/* to accomodate for fixed heading */}
          <div className={TOPBAR_ACCOMODATION_WIDTH_CLASS_NAME} />

          <main className="px-4 lg:px-14 py-20 lg:py-7 w-full ">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
