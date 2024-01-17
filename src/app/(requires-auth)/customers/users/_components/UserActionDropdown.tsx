import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~~/components/ui/dropdown-menu";
import { TUser } from "../_types";
import { AiOutlineMore } from "react-icons/ai";
import { appRoutes } from "~~/routes";
import Link from "next/link";
import BlacklistUser from "./userActionButtons/BlacklistUser";
import { useState } from "react";
import ActivateUser from "./userActionButtons/ActivateUser";
import Image from "next/image";
import { ActivateUserIcon, BlacklistUserIcon, ViewUserIcon } from "~~/assets";
const UserActionDropdown: React.FC<{
  user: TUser;
  onCompleteAction?: () => void;
}> = ({ user, onCompleteAction }) => {
  const [action, setAction] = useState<"blacklist" | "activate">();
  return (
    <>
      <BlacklistUser
        user={user}
        open={action === "blacklist"}
        handleClose={() => setAction(undefined)}
        onBlacklist={() => onCompleteAction?.()}
      />
      <ActivateUser
        user={user}
        open={action === "activate"}
        handleClose={() => setAction(undefined)}
        onActivate={() => onCompleteAction?.()}
      />
      <DropdownMenu defaultOpen={action === undefined ? undefined : false}>
        {/* defaultOpen prop is done as above so that it closes dropdown menu when an action modal is present */}
        <DropdownMenuTrigger className="h-8 w-8 p-0">
          <AiOutlineMore className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44 py-3">
          <DropdownMenuItem>
            <Link
              href={`${appRoutes.customerUsers}/${user.id}`}
              className="w-full flex gap-x-3 justify-center items-center"
            >
              <Image
                src={ViewUserIcon}
                alt="View User Icon"
                width={16}
                height={16}
                className="relative -left-2"
              />
              <span
                className={`font-worksans relative -left-1 font-medium text-sm text-muted`}
              >
                View Details
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={user.status === "blacklisted"}
            onClick={() => setAction("blacklist")}
          >
            <div className="w-full flex gap-x-3 justify-center items-center cursor-pointer">
              <Image
                src={BlacklistUserIcon}
                alt="Blacklist User Icon"
                width={16}
                height={16}
              />

              <span className={`font-worksans font-medium text-sm text-muted`}>
                Blacklist User
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={user.status === "active"}
            onClick={() => setAction("activate")}
          >
            <div className="w-full flex gap-x-3 justify-center items-center cursor-pointer">
              <Image
                src={ActivateUserIcon}
                alt="Activate User Icon"
                width={16}
                height={16}
              />
              <span className={`font-worksans font-medium text-sm text-muted`}>
                Activate User
              </span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserActionDropdown;
