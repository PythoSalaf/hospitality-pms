"use client";

import React from "react";
import { RoleSelector } from "./SelectRole";
import Link from "next/link";
import { TSideBarLink } from "~~/types";
import { Button } from "./ui/button";
import { SIDEBAR_LINK_CATEGORY_ITEMS } from "~~/constants/sideBarLinks";
import { appRoutes } from "~~/routes";
import HomeIcon from "./icons/HomeIcon";
import { usePathname } from "next/navigation";
import { cn } from "~~/lib/utils";
import { FaTimes } from "react-icons/fa";
import { GENERAL_LAYOUT_CONTAINER_PADDING } from "~~/constants";

export const SIDEBAR_WIDTH_CLASS_NAME = "lg:min-w-2/12 lg:w-[14vw]";

const SideBar: React.FC<{
  isSideBarOpen?: boolean;
  toggleSideBarOpen?: () => void;
}> = ({ isSideBarOpen = false, toggleSideBarOpen }) => {
  const handleSideBarItemClick = () => {
    if (!isSideBarOpen) return;
    toggleSideBarOpen?.();
  };
  return (
    <>
      {isSideBarOpen ? (
        <div
          className="fixed lg:hidden bg-black/75 z-40 w-[100vw] top-0 h-[100vh]"
          onClick={toggleSideBarOpen}
        />
      ) : null}

      <div
        className={cn(
          `fixed top-0 bottom-0  overflow-y-auto scrollBar bg-white hidden lg:flex flex-col  ${SIDEBAR_WIDTH_CLASS_NAME} h-[100vh] shadow-md ${GENERAL_LAYOUT_CONTAINER_PADDING} ${
            isSideBarOpen ? "flex left-0 z-50" : "hidden"
          }`
        )}
      >
        {/* spacer to account 4 topbar */}
        <div className="lg:mt-[15vh]" />
        <div className="lg:hidden flex justify-end mb-8">
          <Button
            variant={`ghost`}
            size={"icon"}
            className=""
            onClick={toggleSideBarOpen}
            data-testid="toggleSideBarCloseBtn"
          >
            <FaTimes className="text-xl" />
          </Button>
        </div>
        <RoleSelector />

        {/* dashboard */}
        <div className={`my-8`}>
          <SideBarItem
            item={{
              icon: <HomeIcon />,
              title: "Dashboard",
              url: appRoutes.dashboard,
            }}
            onClick={handleSideBarItemClick}
          />
        </div>
        <div className={``}>
          {SIDEBAR_LINK_CATEGORY_ITEMS.map((category, i) => (
            <div className=" mb-6" key={i}>
              <h2 className="relative text-sm font-worksans text-muted font-medium tracking-tight uppercase mb-4">
                {category.title}
              </h2>
              <div className="space-y-1 flex flex-col gap-y-3">
                {category.items?.map((item, i) => (
                  <SideBarItem
                    item={item}
                    key={i}
                    onClick={handleSideBarItemClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const SideBarItem: React.FC<{ item: TSideBarLink; onClick?: () => void }> = ({
  item,
  onClick,
}) => {
  const pathname = usePathname();
  const url = item?.url ?? "";
  const activeCondition =
    pathname.toLowerCase().indexOf(url.toLowerCase()) !== -1 &&
    url.length !== 0;

  return (
    // TODO: Add trasisition animation for the before element
    <Link href={url} onClick={onClick}>
      <Button
        variant="ghost"
        className="flex items-center gap-x-3 w-full justify-start"
      >
        {item.icon}
        <span className={`text-base`}>{item.title}</span>
      </Button>
    </Link>
  );
};

export default SideBar;
