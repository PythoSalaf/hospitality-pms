export type TOrganization = {
  name: string;
  id: string;
  createdAt: string;
};

export type TSideBarLinkCategory = "customers" | "businesses" | "settings";

export type TSideBarLink = {
  icon: React.ReactNode;
  title: string;
  url?: string;
  category?: TSideBarLinkCategory;
};

export type TSideBarLinkCategoryItem = { title: string; items: TSideBarLink[] };
