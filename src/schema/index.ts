import { z } from "zod";

/**
 * Represents a schema for pagination parameters (cursor pagination is used).
 * @typedef {Object} PaginationSchema
 * @property {string} currentPage - The current page number.
 * @property {number} pageSize - The number of items per page.
 */
export const PaginationSchema = z.object({
  currentPage: z.string().optional(),
  pageSize: z.number().optional(),
});
export const SearchShema = z.string().optional();
