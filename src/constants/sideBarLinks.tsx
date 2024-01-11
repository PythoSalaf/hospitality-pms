import GuarantorsIcon from "~~/components/icons/GuarantorsIcon";
import UsersIcon from "~~/components/icons/UsersIcon";
import { TSideBarLink, TSideBarLinkCategoryItem } from "~~/types";

export const SIDEBAR_LINKS: TSideBarLink[] = [
  // customers
  {
    icon: <UsersIcon />,
    title: "Users",
    url: "",
    category: "customers",
  },
  {
    icon: <GuarantorsIcon />,
    title: "Guarantors",
    url: "",
    category: "customers",
  },
  {
    icon: <GuarantorsIcon />,
    title: "Loans",
    url: "",
    category: "customers",
  },
  {
    icon: <GuarantorsIcon />,
    title: "Decision Models",
    url: "",
    category: "customers",
  },
  {
    icon: <GuarantorsIcon />,
    title: "Savings",
    url: "",
    category: "customers",
  },
  {
    icon: <GuarantorsIcon />,
    title: "Loan Requests",
    url: "",
    category: "customers",
  },
  {
    icon: <GuarantorsIcon />,
    title: "Whitelist",
    url: "",
    category: "customers",
  },
  {
    icon: <GuarantorsIcon />,
    title: "Karma",
    url: "",
    category: "customers",
  },
  //   businesses
  {
    icon: <GuarantorsIcon />,

    title: "Organization",
    url: "",
    category: "businesses",
  },
  {
    icon: <GuarantorsIcon />,

    title: "Loan Products",
    url: "",
    category: "businesses",
  },
  {
    icon: <GuarantorsIcon />,

    title: "Savings Products",
    url: "",
    category: "businesses",
  },
  {
    icon: <GuarantorsIcon />,

    title: "Fees and Charges",
    url: "",
    category: "businesses",
  },
  {
    icon: <GuarantorsIcon />,

    title: "Transactions",
    url: "",
    category: "businesses",
  },
  {
    icon: <GuarantorsIcon />,

    title: "Services",
    url: "",
    category: "businesses",
  },
  {
    icon: <GuarantorsIcon />,

    title: "Service Account",
    url: "",
    category: "businesses",
  },
  {
    icon: <GuarantorsIcon />,

    title: "Settlements",
    url: "",
    category: "businesses",
  },
  {
    icon: <GuarantorsIcon />,

    title: "Reports",
    url: "",
    category: "businesses",
  },
  //   settings
  {
    icon: <GuarantorsIcon />,

    title: "Preferences",
    url: "",
    category: "settings",
  },
  {
    icon: <GuarantorsIcon />,

    title: "Fees and Pricing",
    url: "",
    category: "settings",
  },
  {
    icon: <GuarantorsIcon />,

    title: "Audit Logs",
    url: "",
    category: "settings",
  },
  {
    icon: <GuarantorsIcon />,

    title: "System Messages",
    url: "",
    category: "settings",
  },
];

export const SIDEBAR_LINK_CATEGORY_ITEMS: TSideBarLinkCategoryItem[] = [
  {
    title: "Customers",
    items: SIDEBAR_LINKS.filter((item) => item.category === "customers"),
  },
  {
    title: "Businesses",
    items: SIDEBAR_LINKS.filter((item) => item.category === "businesses"),
  },
  {
    title: "Settings",
    items: SIDEBAR_LINKS.filter((item) => item.category === "settings"),
  },
];
