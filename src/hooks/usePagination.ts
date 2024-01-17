import { type PaginationState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

const DEFAULT_PAGE_SIZE = 10;

/**
 * A custom hook for managing pagination state.
 *
 * @param {object} props - Configuration options for pagination.
 * @param {number} [props.defaultPageSize=10] - Default page size when not specified.
 * @returns {object} An object containing pagination state and a function to update pagination.
 */
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
