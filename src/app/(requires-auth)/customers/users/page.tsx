"use client";

import PageHeader from "~~/components/page/PageHeader";
import { UserCards } from "./_components/UserCard";
import UsersTable from "./_components/UsersTable";

const Page = () => {
  return (
    <div className="">
      <PageHeader title={{ text: "Users" }} />
      <div className="flex flex-col gap-y-6 lg:gap-y-8 items-stretch">
        <UserCards />
        <UsersTable />
      </div>
    </div>
  );
};

export default Page;
