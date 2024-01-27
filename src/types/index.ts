export { type IconProps } from "./icon";

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

export type TPagination = {
  page: number;
  limit: number;
};
