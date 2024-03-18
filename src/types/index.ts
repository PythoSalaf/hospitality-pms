import { z } from "zod";
import { PaginationSchema } from "~~/schema";

export { type IconProps } from "./icon";

export type TUserRole = "CUSTOMER" | "ADMIN" | "STAFF";
export type TSideBarLinkCategory =
  | "management"
  | "booking & reservation"
  | "orders"
  | "reports & analytics";

export type TSideBarLink = {
  icon: React.ReactNode;
  title: string;
  url?: string;
  category?: TSideBarLinkCategory;
};

export type TSideBarLinkCategoryItem = { title: string; items: TSideBarLink[] };

export type TPagination = z.infer<typeof PaginationSchema>;

export type TApiResponse<T> = {
  data?: T | null;
  message: string;
};
export type TApiResponseWithPagination<T> = {
  data?: {
    result: T[];
    currentPage: string;
    total: number;
  } | null;
  message: string;
};
