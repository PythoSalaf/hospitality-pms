import React from "react";
import TopBar from "../TopBar";
import SideBar from "../SideBar";
import { Session } from "next-auth/types";

const AppLayout: React.FC<{
  children: React.ReactNode;
  session?: Session | null;
}> = ({ children, session }) => {
  return (
    <div className="font-worksans relative min-[100vh]">
      <TopBar session={session} />
      <div className="flex">
        <SideBar />
        {/* content */}
        <div className="px-4">
          {/* to accomodate for fixed heading */}
          <div className="md:mt-[15vh]" />

          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
