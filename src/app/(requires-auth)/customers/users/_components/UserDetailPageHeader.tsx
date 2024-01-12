import React from "react";
import PageTitle from "~~/components/page/PageTitle";
import { Button } from "~~/components/ui/button";

const UserDetailPageHeader = () => {
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row justify-between w-full my-6 lg:my-8`}
    >
      <PageTitle text="User Details" />
      <div className={`flex  gap-4`}>
        <Button
          variant={"outline"}
          className={`border-destructive text-destructive  uppercase text-xs font-semibold bg-transparent hover:bg-transparent hover:border-black tracking-wider`}
          // size={`sm`}
        >
          Blacklist User
        </Button>
        <Button
          variant={"outline"}
          className={`border-highlight text-highlight uppercase text-xs font-semibold bg-transparent hover:bg-transparent hover:border-black tracking-wider`}
          // size={`sm`}
        >
          Activate User
        </Button>
      </div>
    </div>
  );
};

export default UserDetailPageHeader;
