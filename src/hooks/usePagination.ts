import { type PaginationState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

const DEFAULT_PAGE_SIZE = 10;
export const usePagination = (props: { defaultPageSize?: number } = {}) => {
  const { defaultPageSize = DEFAULT_PAGE_SIZE } = props;
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const offset = useMemo(
    () =>
      pageIndex && pageIndex !== 0
        ? (pageSize ?? DEFAULT_PAGE_SIZE) * pageIndex
        : 0,
    [pageSize, pageIndex]
  );
  const pagination = useMemo(
    () => ({
      pageIndex: pageIndex,
      skip: offset,
      pageSize,
    }),
    [offset, pageSize, pageIndex]
  );
  return {
    handlePagination: setPagination,
    pagination,
  };
};
