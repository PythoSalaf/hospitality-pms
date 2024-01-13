"use client";

import { DataTable } from "~~/components/ui/data-table";

import FilterUsers from "./FilterUsers";
import { ColumnDef } from "@tanstack/react-table";
import { appRoutes } from "~~/routes";
import { shortenString } from "~~/lib/utils";
import moment from "moment";
import UserActionDropdown from "./UserActionDropdown";
import { useState } from "react";
import { generateUserStatusColor } from "../_utils";
import { TUserFilter, TUser, TUserStatus } from "../_types";
import { usePagination } from "~~/hooks/usePagination";
import useGetUsers from "../_hooks/useGetUsers";
import Link from "next/link";
import React from "react";

// type TAction = "view" | "edit" | "delete";

export const ColumnHeader: React.FC<{
  name: string;
  handleFilter: (props?: TUserFilter) => void;
  filterValues?: TUserFilter;
}> = ({ name, handleFilter, filterValues }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="uppercase text-[#545F7D] text-xs font-semibold whitespace-nowrap">
        {name}
      </span>

      <FilterUsers handleSave={handleFilter} filterValues={filterValues} />
    </div>
  );
};
const generateUserColumns = ({
  filter,
  handleFilter,
}: {
  filter?: TUserFilter;
  handleFilter: (props?: TUserFilter) => void;
}): ColumnDef<TUser>[] => [
  {
    accessorKey: "organization",

    header: () => (
      <ColumnHeader
        name={`Organization`}
        handleFilter={handleFilter}
        filterValues={filter}
      />
    ),
    cell: ({ row }) => {
      return (
        <div
          className="font-normal text-[#545F7D]"
          title={row.original.organization.name}
        >
          {shortenString({ input: row.original.organization.name })}
        </div>
      );
    },
  },
  {
    accessorKey: "username",

    header: () => (
      <ColumnHeader
        name={`Username`}
        handleFilter={handleFilter}
        filterValues={filter}
      />
    ),

    cell: ({ row }) => {
      return (
        <Link href={`${appRoutes.customerUsers}/${row.original.id}`}>
          <p
            className="font-normal text-[#545F7D] hover:text-primary hover:underline underline-offset-2"
            title={row.original.name}
          >
            {shortenString({ input: row.original.name })}
          </p>
        </Link>
      );
    },
  },
  {
    accessorKey: "email",

    header: () => (
      <ColumnHeader
        name={`Email`}
        handleFilter={handleFilter}
        filterValues={filter}
      />
    ),

    cell: ({ row }) => {
      return (
        <div className="font-normal text-[#545F7D]" title={row.original.email}>
          {shortenString({ input: row.original.email })}
        </div>
      );
    },
  },
  {
    accessorKey: "phone number",

    header: () => (
      <ColumnHeader
        name={`Phone Number`}
        handleFilter={handleFilter}
        filterValues={filter}
      />
    ),

    cell: ({ row }) => {
      return (
        <div
          className="font-normal text-[#545F7D]"
          title={row.original.phoneNumber}
        >
          {shortenString({ input: row.original.phoneNumber })}
        </div>
      );
    },
  },
  {
    accessorKey: "date joined",

    header: () => (
      <ColumnHeader
        name={`Date Joined`}
        handleFilter={handleFilter}
        filterValues={filter}
      />
    ),

    cell: ({ row }) => {
      return (
        <div className="font-normal text-[#545F7D]">
          {moment(row.original.dateJoined).format("MMMM D, YYYY h:mm A")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",

    header: () => (
      <ColumnHeader
        name={`status`}
        handleFilter={handleFilter}
        filterValues={filter}
      />
    ),

    cell: ({ row }) => {
      const color = generateUserStatusColor(
        row.original.status.toLowerCase() as TUserStatus
      );
      return (
        <div
          style={{ background: color.bg, color: color.text }}
          className={`rounded-full py-1 px-2 inline-flex items-center`}
        >
          <span className="text-sm font-normal capitalize">
            {row.original.status}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "actions",

    header: "",
    cell: ({ row }) => {
      const user = row.original;

      return <UserActionDropdown user={user} />;
    },
  },
];
const UserTableContainer: React.FC<{
  columns: ColumnDef<TUser>[];
  filter?: TUserFilter;
}> = ({ columns, filter }) => {
  // TODO: fix render pagination issue: 10 min, then move on to filter, then mobile reponsive user, then user details fix ui, then local storage, then

  const { pagination, handlePagination } = usePagination();
  console.log(pagination, "pagination");
  console.log(filter);
  const { data: users, isLoading: isFetching } = useGetUsers({
    pagination: {
      limit: pagination.pageSize,
      page: pagination.pageIndex + 1,
    },
    filter,
  });

  return (
    <div className={`w-full `}>
      <DataTable
        columns={columns}
        data={users?.result}
        total={users?.total}
        onPaginationChange={handlePagination}
        pagination={pagination}
        loading={isFetching}
      />
    </div>
  );
};

const UsersTable = () => {
  const [filter, setFilter] = useState<TUserFilter>();

  const USER_COLUMNS = generateUserColumns({
    filter,
    handleFilter: (props) => setFilter(props),
  });
  return <UserTableContainer columns={USER_COLUMNS} />;
};
export default UsersTable;
