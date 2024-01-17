import React from "react";
import AppLogo from "./AppLogo";
import ENV from "~~/config/enviroment";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaBars, FaSearch, FaTimes, FaUser } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLogoutUser } from "~~/app/(auth)/_hooks/useLogoutUser";
import {
  EXTERNAL_DOCUMENTATION_URL,
  GENERAL_LAYOUT_CONTAINER_PADDING,
  GLOBAL_SEARCH_PLACEHOLDER_TEXT,
} from "~~/constants";
import MobileSearch from "./MobileSearch";

export const TOPBAR_ACCOMODATION_WIDTH_CLASS_NAME = `lg:mt-[15vh]`;
/**
 * TopBar component for the application.
 * @param session - User session information.
 * @param isSideBarOpen - Flag indicating whether the sidebar is open.
 * @param toggleSideBarOpen - Function to toggle the sidebar.
 */
const TopBar: React.FC<{
  session?: Session | null;
  isSideBarOpen?: boolean;
  toggleSideBarOpen?: () => void;
}> = ({ session, isSideBarOpen = false, toggleSideBarOpen }) => {
  return (
    <div
      className={`bg-white  flex items-center max-h-[15vh]  shadow-md fixed  w-full min-w-[100vw] ${GENERAL_LAYOUT_CONTAINER_PADDING} z-10`}
    >
      <AppLogo
        text={{
          value: ENV.APP_NAME,
          className:
            "text-primary hidden lg:block text-lg lg:text-2xl font-semibold",
        }}
        image={{ height: 16, width: 16 }}
        containerClassName="flex lg:gap-x-3 gap-x-2 items-center w-4/12"
      />
      <SearchBar />
      <TopActions session={session} />
      <Button
        variant={`ghost`}
        size={"icon"}
        className="lg:hidden flex mx-4"
        onClick={toggleSideBarOpen}
      >
        {isSideBarOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </Button>
    </div>
  );
};

/**
 * TopActions component for rendering top bar actions.
 * @param session - User session information.
 */
const TopActions: React.FC<{
  session?: Session | null;
}> = ({ session }) => {
  return (
    <div className="w-8/12 flex justify-end items-center gap-x-0.5 lg:gap-x-5">
      <a
        href={EXTERNAL_DOCUMENTATION_URL}
        target="_blank"
        className="text-primary text-sm lg:text-base underline hover:no-underline underline-offset-2 font-roboto"
      >
        <span>Docs</span>
      </a>
      <Button
        variant={`ghost`}
        size={"icon"}
        className="text-sm lg:text-xl text-primary hover:text-primary/90"
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

/**
 * UserMenu component for rendering the user menu in the top bar.
 * @param user - User information.
 * @param onClick - Callback function for click event.
 */
const UserMenu: React.FC<{
  user?: Pick<Session["user"], "email" | "id" | "image" | "name">;
  onClick?: () => void;
}> = ({ user, onClick }) => {
  const { onLogout, isLoading } = useLogoutUser();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            onClick={onClick}
            className=" flex gap-x-0.5 items-center lg:gap-x-2 text-primary cursor-pointer"
          >
            <Avatar className="h-8 w-8 lg:w-10 lg:h-10">
              <AvatarImage src={user?.image ? user.image : undefined} />
              <AvatarFallback className="bg-secondary">
                <FaUser className="text-white text-xs lg:text-sm" />
              </AvatarFallback>
            </Avatar>
            <span className="hidden lg:block  font-semibold">{user?.name}</span>
            <IoMdArrowDropdown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuGroup>
            {["Add Organization", "Billing", "Setting"].map((item, i) => (
              <DropdownMenuItem key={i}>{item}</DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {" "}
            <Button
              onClick={() => onLogout()}
              className="w-full"
              loading={isLoading}
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

/**
 * SearchBar component for rendering the search bar in the top bar.
 */
const SearchBar = () => {
  return (
    <>
      <MobileSearch />
      <div className=" lg:w-4/12 flex ">
        <Input
          type="search"
          placeholder={GLOBAL_SEARCH_PLACEHOLDER_TEXT}
          className="hidden lg:block  lg:w-[300px] rounded-tr-none rounded-br-none outline-none focus-visible:ring-0 focus-visible:outline-none"
        />
        <Button
          size={`icon`}
          className="hidden lg:flex rounded-tl-none rounded-bl-none "
        >
          <FaSearch className="text-white" />
        </Button>
      </div>
    </>
  );
};

export default TopBar;
