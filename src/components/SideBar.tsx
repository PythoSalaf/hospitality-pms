"use client";

import React from "react";
import { GENERAL_LAYOUT_CONTAINER_PADDING } from "~~/app/(auth)/_constants";
import { OrganizationSelector } from "./SelectOrganization";
import Link from "next/link";
import { TSideBarLink } from "~~/types";
import { Button } from "./ui/button";
import { SIDEBAR_LINK_CATEGORY_ITEMS } from "~~/constants/sideBarLinks";
import { appRoutes } from "~~/routes";
import HomeIcon from "./icons/HomeIcon";
import { usePathname } from "next/navigation";
import { cn } from "~~/lib/utils";
import { FaTimes } from "react-icons/fa";

export const SIDEBAR_WIDTH_CLASS_NAME = "lg:min:w-2/12 lg:w-[20vw]";
const BEFORE_4_SIDEBAR_ITEM =
  " before:absolute before:py-4 before:-mt-3 before:right-0 before:left-0 before:-z-10 before:w-full md:before:w-[20vw] before:bg-highlight-lightest before:border-highlight before:border-l-8  before:content-['.'] before:text-transparent";
const SideBar: React.FC<{
  isSideBarOpen?: boolean;
  toggleSideBarOpen?: () => void;
}> = ({ isSideBarOpen = false, toggleSideBarOpen }) => {
  return (
    <>
      {isSideBarOpen ? (
        <div
          className="fixed md:hidden bg-black/75 z-40 w-[100vw] top-0 h-[100vh]"
          onClick={toggleSideBarOpen}
        />
      ) : null}

      <div
        className={cn(
          `fixed top-0 overflow-y-auto scrollBar bg-white hidden lg:flex flex-col  ${SIDEBAR_WIDTH_CLASS_NAME} h-[100vh] shadow-md ${GENERAL_LAYOUT_CONTAINER_PADDING} ${
            isSideBarOpen ? "flex left-0 z-50" : "hidden"
          }`
        )}
      >
        {/* spacer to account 4 topbar */}
        <div className="md:mt-[15vh]" />
        <div className="md:hidden flex justify-end mb-8">
          <Button
            variant={`ghost`}
            size={"icon"}
            className=""
            onClick={toggleSideBarOpen}
          >
            <FaTimes className="text-xl" />
          </Button>
        </div>
        <OrganizationSelector />

        {/* dashboard */}
        <div className={`my-8`}>
          <SideBarItem
            item={{
              icon: <HomeIcon />,
              title: "Dashboard",
              url: appRoutes.dashboard,
            }}
            onClick={toggleSideBarOpen}
          />
        </div>
        <div className={``}>
          {SIDEBAR_LINK_CATEGORY_ITEMS.map((category, i) => (
            <div className=" mb-6" key={i}>
              <h2 className="relative text-sm font-worksans text-[#545F7D] font-medium tracking-tight uppercase mb-4">
                {category.title}
              </h2>
              <div className="space-y-1 flex flex-col gap-y-3">
                {category.items?.map((item, i) => (
                  <SideBarItem
                    item={item}
                    key={i}
                    onClick={toggleSideBarOpen}
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
    <Link
      href={url}
      className={` ${
        activeCondition
          ? `opacity-95 before:block ${BEFORE_4_SIDEBAR_ITEM}`
          : `opacity-70 hover:opacity-60 active:opacity-60 focus:opacity-60 hover:before:block before:hidden ${BEFORE_4_SIDEBAR_ITEM}`
      }`}
      onClick={onClick}
    >
      <Button
        variant="ghost"
        className={`w-full font-worksans justify-start font-normal px-3 flex gap-x-2 items-center hover:text-primary active:text-primary hover:bg-transparent ${
          activeCondition ? "text-primary" : ""
        }`}
      >
        {item.icon}
        <span className={`text-base`}>{item.title}</span>
      </Button>
    </Link>
  );
};

export default SideBar;
