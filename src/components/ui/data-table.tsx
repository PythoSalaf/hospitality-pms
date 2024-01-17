import * as React from "react";
import RCPagination from "rc-pagination";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type PaginationState,
  OnChangeFn,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import SkeletonLoader from "../loader/SkeletonLoader";
import { Button } from "./button";
import ENV from "~~/config/enviroment";

type SetPaginationFunction = React.Dispatch<
  React.SetStateAction<PaginationState>
>;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  loading?: boolean;

  pagination?: PaginationState;
  pageCount?: number;
  onPaginationChange?: OnChangeFn<PaginationState>;
  total?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data = [],
  total,
  onPaginationChange,
  pagination,
  loading,
  pageCount = -1,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { pagination },
    getPaginationRowModel: undefined,
    onPaginationChange,
    manualPagination: true,
    debugTable: ENV.NODE_ENV === "development",
    pageCount: pageCount,
  });

  return (
    <div>
      <div className="">
        <Table className="font-worksans rounded-md shadow-lg bg-white">
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            <>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <SkeletonLoader
                      paragraph={{ rows: 10 }}
                      loading={loading}
                    />
                  </TableCell>
                </TableRow>
              ) : null}
              {!loading && table?.getRowModel().rows?.length
                ? table?.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : null}
              {!loading && table?.getRowModel().rows?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              ) : null}
            </>
          </TableBody>
        </Table>
      </div>
      <div
        className={`flex gap-6 md:flex-row flex-col justify-between md:items-center mt-4`}
      >
        <div className="flex gap-4 items-center text-sm text-muted-foreground">
          <span>Showing</span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(val) => {
              table.resetPagination();
              table.setPagination((prev) => ({ ...prev, pageSize: +val }));
            }}
          >
            <SelectTrigger className="w-[80px] bg-[#213F7D1A]">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent className="">
              {[10, 20, 50, 100].map((item, i) => (
                <SelectItem value={`${item}`} key={i}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>out of {total}</span>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="h-2" />
          <div className="flex items-center gap-2">
            <RCPagination
              className="flex gap-2 items-center font-worksans text-sm cursor-pointer text-muted"
              total={total}
              onChange={(pageIndex, pageSize) => {
                if (onPaginationChange) {
                  onPaginationChange({ pageIndex: pageIndex - 1, pageSize });
                }
              }}
              current={table.getState().pagination.pageIndex + 1}
              pageSize={table.getState().pagination.pageSize}
              prevIcon={
                <Button
                  className={`bg-[#213F7D1A]  hover:bg-white p-1 h-6 `}
                  size={`icon`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.6">
                      <path
                        d="M10.0061 11.0573C10.8472 11.8984 9.54344 13.1595 8.745 12.3184L3.99424 7.56759C3.61581 7.23127 3.61581 6.64282 3.99424 6.3065L8.61858 1.64002C9.45967 0.841037 10.7208 2.10267 9.87967 2.94322L5.8859 6.937L10.0061 11.0573Z"
                        fill="#213F7D"
                      />
                    </g>
                  </svg>
                </Button>
              }
              itemRender={(item, type, element) => {
                if (type === "page") {
                  return (
                    <span
                      className={`text-muted ${
                        typeof pagination?.pageIndex === "number" &&
                        pagination?.pageIndex + 1 === item
                          ? "font-bold"
                          : "font-normal"
                      }`}
                    >
                      {/* TODO: Address the ellipsis issue at the max page */}
                      {typeof pagination?.pageIndex === "number" &&
                      pagination?.pageIndex + 3 === item
                        ? `${item} ...`
                        : item}
                    </span>
                  );
                }
                return <>{element}</>;
              }}
              nextIcon={
                <Button
                  className={`bg-[#213F7D1A]  hover:bg-white  p-1 h-6 `}
                  size={`icon`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.99391 2.94274C3.15281 2.10165 4.45656 0.840502 5.255 1.68165L10.0058 6.43241C10.3842 6.76873 10.3842 7.35718 10.0058 7.6935L5.38142 12.36C4.54033 13.159 3.27918 11.8973 4.12033 11.0568L8.1141 7.063L3.99391 2.94274Z"
                      fill="#213F7D"
                    />
                  </svg>
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
