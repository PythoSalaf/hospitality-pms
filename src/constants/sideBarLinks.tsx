import {
  DecisionModelIcon,
  GuarantorsIcon,
  UsersIcon,
  LoansIcon,
  SavingsIcon,
  LoanRequestIcon,
  WhitelistIcon,
  KarmaIcon,
  OrganizationIcon,
  LoanProductIcon,
  SavingProductIcon,
  FeeAndChargeIcon,
  TransactionIcon,
  ServiceIcon,
  ServiceAccountIcon,
  SettlementIcon,
  ReportIcon,
  PreferenceIcon,
  FeeAndPricingIcon,
  AuditLogIcon,
} from "~~/components/icons";
import { appRoutes } from "~~/routes";

import { TSideBarLink, TSideBarLinkCategoryItem } from "~~/types";

export const SIDEBAR_LINKS: TSideBarLink[] = [
  // customers
  {
    icon: <UsersIcon />,
    title: "Users",
    url: appRoutes.customerUsers,
    category: "customers",
  },
  {
    icon: <GuarantorsIcon />,
    title: "Guarantors",
    url: appRoutes.customerGuarantors,
    category: "customers",
  },
  {
    icon: <LoansIcon />,
    title: "Loans",
    url: "",
    category: "customers",
  },
  {
    icon: <DecisionModelIcon />,
    title: "Decision Models",
    url: "",
    category: "customers",
  },
  {
    icon: <SavingsIcon />,
    title: "Savings",
    url: "",
    category: "customers",
  },
  {
    icon: <LoanRequestIcon />,
    title: "Loan Requests",
    url: "",
    category: "customers",
  },
  {
    icon: <WhitelistIcon />,
    title: "Whitelist",
    url: "",
    category: "customers",
  },
  {
    icon: <KarmaIcon />,
    title: "Karma",
    url: "",
    category: "customers",
  },
  // businesses
  {
    icon: <OrganizationIcon />,
    title: "Organization",
    url: "",
    category: "businesses",
  },
  {
    icon: <LoanProductIcon />,
    title: "Loan Products",
    url: "",
    category: "businesses",
  },
  {
    icon: <SavingProductIcon />,
    title: "Savings Products",
    url: "",
    category: "businesses",
  },
  {
    icon: <FeeAndChargeIcon />,
    title: "Fees and Charges",
    url: "",
    category: "businesses",
  },
  {
    icon: <TransactionIcon />,
    title: "Transactions",
    url: "",
    category: "businesses",
  },
  {
    icon: <ServiceIcon />,
    title: "Services",
    url: "",
    category: "businesses",
  },
  {
    icon: <ServiceAccountIcon />,
    title: "Service Account",
    url: "",
    category: "businesses",
  },
  {
    icon: <SettlementIcon />,
    title: "Settlements",
    url: "",
    category: "businesses",
  },
  {
    icon: <ReportIcon />,
    title: "Reports",
    url: "",
    category: "businesses",
  },
  // settings
  {
    icon: <PreferenceIcon />,
    title: "Preferences",
    url: "",
    category: "settings",
  },
  {
    icon: <FeeAndPricingIcon />,
    title: "Fees and Pricing",
    url: "",
    category: "settings",
  },
  {
    icon: <AuditLogIcon />,
    title: "Audit Logs",
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
