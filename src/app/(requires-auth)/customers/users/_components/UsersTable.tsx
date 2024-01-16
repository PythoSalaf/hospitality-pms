"use client";

import { DataTable } from "~~/components/ui/data-table";

import FilterUsers from "./FilterUsers";
import { ColumnDef } from "@tanstack/react-table";
import { appRoutes } from "~~/routes";
import moment from "moment";
import UserActionDropdown from "./UserActionDropdown";
import { useState } from "react";
import { generateUserStatusColor } from "../_utils";
import { TUserFilter, TUser, TUserStatus } from "../_types";
import { usePagination } from "~~/hooks/usePagination";
import useGetUsers from "../_hooks/useGetUsers";
import Link from "next/link";
import React from "react";

export const ColumnHeader: React.FC<{
  name: string;
  handleFilter: (props?: TUserFilter) => void;
  filterValues?: TUserFilter;
  isActiveFilter?: boolean;
}> = ({ name, handleFilter, filterValues, isActiveFilter = false }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="uppercase text-[#545F7D] text-sm font-semibold whitespace-nowrap">
        {name}
      </span>

      <FilterUsers
        handleSave={handleFilter}
        filterValues={filterValues}
        isActive={isActiveFilter}
      />
    </div>
  );
};
const generateUserColumns = ({
  filter,
  handleFilter,
  onDataRefresh,
}: {
  filter?: TUserFilter;
  handleFilter: (props?: TUserFilter) => void;
  onDataRefresh?: () => void;
}): ColumnDef<TUser>[] => [
  {
    accessorKey: "organization",

    header: () => (
      <ColumnHeader
        name={`Organization`}
        handleFilter={handleFilter}
        filterValues={filter}
        isActiveFilter={filter?.organizationId !== undefined}
      />
    ),
    cell: ({ row }) => {
      return (
        <p
          className="font-normal text-truncate text-sm text-[#545F7D]"
          title={row.original.organization.name}
        >
          {row.original.organization.name}
        </p>
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
        isActiveFilter={filter?.name !== undefined}
      />
    ),

    cell: ({ row }) => {
      return (
        <Link href={`${appRoutes.customerUsers}/${row.original.id}`}>
          <p
            className="font-normal text-truncate text-sm text-[#545F7D] hover:text-primary hover:underline underline-offset-2"
            title={row.original.name}
          >
            {row.original.name}
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
        isActiveFilter={filter?.email !== undefined}
      />
    ),

    cell: ({ row }) => {
      return (
        <p
          className="font-normal text-truncate text-sm text-[#545F7D] "
          title={row.original.email}
        >
          {row.original.email}
        </p>
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
        isActiveFilter={filter?.phoneNumber !== undefined}
      />
    ),

    cell: ({ row }) => {
      return (
        <p
          className="font-normal text-truncate text-sm text-ellipsis text-[#545F7D]"
          title={row.original.phoneNumber}
        >
          {row.original.phoneNumber}
        </p>
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
        isActiveFilter={filter?.date !== undefined}
      />
    ),

    cell: ({ row }) => {
      return (
        <p className="font-normal text-truncate text-sm text-[#545F7D]">
          {moment(row.original.dateJoined).format("MMMM D, YYYY h:mm A")}
        </p>
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
        isActiveFilter={filter?.status !== undefined}
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

      return (
        <UserActionDropdown user={user} onCompleteAction={onDataRefresh} />
      );
    },
  },
];
const UsersTable: React.FC = () => {
  const { pagination, handlePagination } = usePagination();
  const [filter, setFilter] = useState<TUserFilter>();

  const {
    data: users,
    isLoading: isFetching,
    forceRefresh,
  } = useGetUsers({
    pagination: {
      limit: pagination.pageSize,
      page: pagination.pageIndex + 1,
    },
    filter,
  });
  const columns = generateUserColumns({
    filter,
    handleFilter: (props) => setFilter(props),
    onDataRefresh: forceRefresh,
  });

  return (
    <div className={`w-full overflow-auto grid grid-cols-2`}>
      <div className="col-span-2">
        <DataTable
          columns={columns}
          // data={[]}
          // total={0}
          data={users?.result}
          total={users?.total}
          onPaginationChange={handlePagination}
          pagination={pagination}
          loading={isFetching}
        />
      </div>
    </div>
  );
};

export default UsersTable;
