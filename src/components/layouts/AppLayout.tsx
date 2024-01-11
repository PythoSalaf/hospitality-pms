import React from "react";
import TopBar from "../TopBar";
import SideBar from "../SideBar";
import { Session } from "next-auth/types";

const AppLayout: React.FC<{
  children: React.ReactNode;
  session?: Session | null;
}> = ({ children, session }) => {
  return (
    <div className="font-worksans">
      <TopBar session={session} />
      <div className="flex  gap-4">
        <SideBar />

        {children}
      </div>
    </div>
  );
};

export default AppLayout;
