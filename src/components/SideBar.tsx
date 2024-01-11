import React from "react";
import { GENERAL_LAYOUT_CONTAINER_PADDING } from "~~/app/(auth)/_constants";
import { OrganizationSelector } from "./SelectOrganization";
import Link from "next/link";
import { TSideBarLink } from "~~/types";
import { Button } from "./ui/button";
import { SIDEBAR_LINK_CATEGORY_ITEMS } from "~~/constants/sideBarLinks";
import { appRoutes } from "~~/routes";
import HomeIcon from "./icons/HomeIcon";

const SideBar = () => {
  return (
    <div
      className={`overflow-y-auto scrollBar bg-white flex flex-col min:w-2/12 w-[20vw] h-[100vh] shadow-md ${GENERAL_LAYOUT_CONTAINER_PADDING}`}
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
  return (
    <Link href={item?.url ?? ""}>
      <Button
        variant="ghost"
        className="w-full justify-start font-normal px-3 flex gap-x-2 items-center"
      >
        {item.icon}
        <span className={`font-worksans text-primary text-base font-normal`}>
          {item.title}
        </span>
      </Button>
    </Link>
  );
};

export default SideBar;
