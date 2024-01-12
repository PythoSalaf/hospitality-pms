import React from "react";
import AppLogo from "./AppLogo";
import ENV from "~~/config/enviroment";
import {
  GENERAL_LAYOUT_CONTAINER_PADDING,
  GLOBAL_SEARCH_PLACEHOLDER_TEXT,
} from "~~/app/(auth)/_constants";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaBell, FaConciergeBell, FaSearch, FaUser } from "react-icons/fa";
import Link from "next/link";
import { appRoutes } from "~~/routes";
import { FaRegBell } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Session } from "next-auth";

export const TOPBAR_ACCOMODATION_WIDTH_CLASS_NAME = `md:mt-[15vh]`;
const TopBar: React.FC<{
  session?: Session | null;
}> = ({ session }) => {
  return (
    <div
      className={`bg-white  flex items-center max-h-[15vh]  shadow-md fixed  w-full min-w-[100vw] ${GENERAL_LAYOUT_CONTAINER_PADDING} z-10`}
    >
      <AppLogo
        text={{
          value: ENV.APP_NAME,
          className: "text-primary text-lg lg:text-2xl font-semibold",
        }}
        image={{ height: 16, width: 16 }}
        containerClassName="flex lg:gap-x-3 gap-x-2 items-center w-4/12"
      />
      <SearchBar />
      <TopActions session={session} />
    </div>
  );
};

const TopActions: React.FC<{
  session?: Session | null;
}> = ({ session }) => {
  return (
    <div className="w-8/12 flex justify-end items-center lg:gap-x-5">
      <Link
        href={appRoutes.documentationHome}
        className="text-primary underline hover:no-underline underline-offset-2 font-roboto"
      >
        <span>Docs</span>
      </Link>
      <Button
        variant={`ghost`}
        size={"icon"}
        className="text-xl text-primary hover:text-primary/90"
      >
        <FaRegBell />
      </Button>
      <UserMenu
        user={
          session
            ? {
                id: session?.user.id,
                name: session?.user.name,
                image: session?.user.image,
              }
            : undefined
        }
      />
    </div>
  );
};

const UserMenu: React.FC<{
  user?: Pick<Session["user"], "email" | "id" | "image" | "name">;
  onClick?: () => void;
}> = ({ user, onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" flex gap-x-1 items-center lg:gap-x-2 text-primary cursor-pointer"
    >
      <Avatar>
        <AvatarImage src={user?.image ? user.image : undefined} />
        <AvatarFallback className="bg-secondary">
          <FaUser className="text-white" />
        </AvatarFallback>
      </Avatar>
      <span className="hidden lg:block font-semibold">{user?.name}</span>
      <IoMdArrowDropdown />
    </div>
  );
};
const SearchBar = () => {
  return (
    <div className="w-4/12 flex ">
      <Input
        type="search"
        placeholder={GLOBAL_SEARCH_PLACEHOLDER_TEXT}
        className="hidden md:block md:w-[100px] lg:w-[300px] rounded-tr-none rounded-br-none outline-none focus-visible:ring-0 focus-visible:outline-none"
      />
      <Button
        size={`icon`}
        className="hidden md:flex rounded-tl-none rounded-bl-none "
      >
        <FaSearch />
      </Button>
    </div>
  );
};

export default TopBar;
