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

const SIDEBAR_WIDTH_CLASS_NAME = "w-[20vw]";
const BEFORE_4_SIDEBAR_ITEM =
  " before:absolute before:py-2 before:right-0 before:left-0 before:-z-10 before:w-[20vw] before:bg-highlight-lightest before:border-highlight before:border-l-8  before:content-['.'] before:text-transparent";
const SideBar = () => {
  return (
    <div
      className={`relative overflow-y-auto scrollBar bg-white flex flex-col min:w-2/12 ${SIDEBAR_WIDTH_CLASS_NAME} h-[100vh] shadow-md ${GENERAL_LAYOUT_CONTAINER_PADDING}`}
    >
      {/* spacer to account 4 topbar */}
      <div className="md:mt-[15vh]" />
      <OrganizationSelector />

      {/* dashboard */}
      <div className={`md:my-6 lg:my-8`}>
        <SideBarItem
          item={{
            icon: <HomeIcon />,
            title: "Dashboard",
            url: appRoutes.dashboard,
          }}
        />
      </div>
      <div className={``}>
        {SIDEBAR_LINK_CATEGORY_ITEMS.map((category, i) => (
          <div className=" mb-6" key={i}>
            <h2 className="relative text-sm font-worksans text-[#545F7D] font-medium tracking-tight uppercase mb-3">
              {category.title}
            </h2>
            <div className="space-y-1 flex flex-col gap-1">
              {category.items?.map((item, i) => (
                <SideBarItem item={item} key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SideBarItem: React.FC<{ item: TSideBarLink; onClick?: () => void }> = ({
  item,
}) => {
  const pathname = usePathname();
  const url = item?.url ?? "";
  return (
    // TODO: Add trasisition animation for the before element
    <Link
      href={url}
      className={` ${
        new RegExp(pathname, "i").test(url)
          ? `opacity-95 before:block ${BEFORE_4_SIDEBAR_ITEM}`
          : `opacity-60 hover:opacity-40 active:opacity-40 focus:opacity-40 hover:before:block before:hidden ${BEFORE_4_SIDEBAR_ITEM}`
      }`}
    >
      <Button
        variant="ghost"
        className={`w-full font-worksans justify-start font-normal px-3 flex gap-x-2 items-center hover:text-primary active:text-primary hover:bg-transparent ${
          new RegExp(pathname, "i").test(url) ? "text-primary" : ""
        }`}
      >
        {item.icon}
        <span className={`text-base`}>{item.title}</span>
      </Button>
    </Link>
  );
};

export default SideBar;
