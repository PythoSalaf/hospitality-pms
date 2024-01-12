import React from "react";
import TopBar, { TOPBAR_ACCOMODATION_WIDTH_CLASS_NAME } from "../TopBar";
import SideBar, { SIDEBAR_WIDTH_CLASS_NAME } from "../SideBar";
import { Session } from "next-auth/types";

const AppLayout: React.FC<{
  children: React.ReactNode;
  session?: Session | null;
}> = ({ children, session }) => {
  return (
    <div className="font-worksans relative min-[100vh]">
      <TopBar session={session} />
      <div className="flex ">
        {/* to accomodate for fixed  sidebar */}
        <div className={SIDEBAR_WIDTH_CLASS_NAME} />
        <SideBar />
        {/* content */}
        <div className="flex-1">
          {/* to accomodate for fixed heading */}
          <div className={TOPBAR_ACCOMODATION_WIDTH_CLASS_NAME} />

          <main className="px-14 py-7 w-full ">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
