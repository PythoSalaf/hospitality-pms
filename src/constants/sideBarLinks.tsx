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
/**
 * Sidebar links
 * These are the link items that appear in the sidebar of app
 */
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
    url: appRoutes.customerLoans,
    category: "customers",
  },
  {
    icon: <DecisionModelIcon />,
    title: "Decision Models",
    url: appRoutes.customerDecisionModels,
    category: "customers",
  },
  {
    icon: <SavingsIcon />,
    title: "Savings",
    url: appRoutes.customerSavings,
    category: "customers",
  },
  {
    icon: <LoanRequestIcon />,
    title: "Loan Requests",
    url: appRoutes.customerLoanRequests,
    category: "customers",
  },
  {
    icon: <WhitelistIcon />,
    title: "Whitelist",
    url: appRoutes.customerWhitelist,
    category: "customers",
  },
  {
    icon: <KarmaIcon />,
    title: "Karma",
    url: appRoutes.customerKarma,
    category: "customers",
  },
  // businesses
  {
    icon: <OrganizationIcon />,
    title: "Organization",
    url: appRoutes.businessOrganizations,
    category: "businesses",
  },
  {
    icon: <LoanProductIcon />,
    title: "Loan Products",
    url: appRoutes.businessLoanProducts,
    category: "businesses",
  },
  {
    icon: <SavingProductIcon />,
    title: "Savings Products",
    url: appRoutes.businessSavingsProducts,
    category: "businesses",
  },
  {
    icon: <FeeAndChargeIcon />,
    title: "Fees and Charges",
    url: appRoutes.businessFeesAndCharges,
    category: "businesses",
  },
  {
    icon: <TransactionIcon />,
    title: "Transactions",
    url: appRoutes.businessTransactions,
    category: "businesses",
  },
  {
    icon: <ServiceIcon />,
    title: "Services",
    url: appRoutes.businessServices,
    category: "businesses",
  },
  {
    icon: <ServiceAccountIcon />,
    title: "Service Account",
    url: appRoutes.businessServiceAccount,
    category: "businesses",
  },
  {
    icon: <SettlementIcon />,
    title: "Settlements",
    url: appRoutes.businessSettlements,
    category: "businesses",
  },
  {
    icon: <ReportIcon />,
    title: "Reports",
    url: appRoutes.businessReports,
    category: "businesses",
  },
  // settings
  {
    icon: <PreferenceIcon />,
    title: "Preferences",
    url: appRoutes.settingPreferences,
    category: "settings",
  },
  {
    icon: <FeeAndPricingIcon />,
    title: "Fees and Pricing",
    url: appRoutes.settingFeesAndPricing,
    category: "settings",
  },
  {
    icon: <AuditLogIcon />,
    title: "Audit Logs",
    url: appRoutes.settingAuditLogs,
    category: "settings",
  },
];
/**
 * Sidebar link Category Items
 * These are the sidebar links grouped by category
 */
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
