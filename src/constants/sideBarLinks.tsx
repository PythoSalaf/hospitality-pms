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
    title: "Customers",
    url: appRoutes.managementCustomers,
    category: "management",
  },
  {
    icon: <GuarantorsIcon />,
    title: "Staff",
    url: appRoutes.managementStaff,
    category: "management",
  },
  {
    icon: <LoansIcon />,
    title: "Administrators",
    url: appRoutes.managementAdministrators,
    category: "management",
  },
  {
    icon: <DecisionModelIcon />,
    title: "Branches",
    url: appRoutes.managementBranches,
    category: "management",
  },
  {
    icon: <SavingsIcon />,
    title: "Rooms",
    url: appRoutes.managementRooms,
    category: "management",
  },
  {
    icon: <LoanRequestIcon />,
    title: "Venues",
    url: appRoutes.managementVenues,
    category: "management",
  },
  {
    icon: <WhitelistIcon />,
    title: "Services",
    url: appRoutes.managementServices,
    category: "management",
  },

  // booking & reservation
  {
    icon: <OrganizationIcon />,
    title: "Bookings",
    url: appRoutes.bookingAndReservationBookings,
    category: "booking & reservation",
  },
  {
    icon: <LoanProductIcon />,
    title: "Reservations",
    url: appRoutes.bookingAndReservationReservations,
    category: "booking & reservation",
  },
  {
    icon: <SavingProductIcon />,
    title: "Available Rooms",
    url: appRoutes.bookingAndReservationAvailableRooms,
    category: "booking & reservation",
  },
  {
    icon: <FeeAndChargeIcon />,
    title: "Available Venues",
    url: appRoutes.bookingAndReservationAvailableVenues,
    category: "booking & reservation",
  },

  // orders
  {
    icon: <PreferenceIcon />,
    title: "Recent Orders",
    url: appRoutes.orderRecentOrders,
    category: "orders",
  },
  {
    icon: <FeeAndPricingIcon />,
    title: "Fulfilled Orders",
    url: appRoutes.orderFulfilledOrders,
    category: "orders",
  },
  {
    icon: <KarmaIcon />,
    title: "Cancelled Orders",
    url: appRoutes.orderCancelledOrders,
    category: "orders",
  },
  // reports & analytics
  {
    icon: <ReportIcon />,
    title: "Sales Report",
    url: appRoutes.reportSales,
    category: "reports & analytics",
  },
  {
    icon: <ServiceIcon />,
    title: "Customers Report",
    url: appRoutes.reportCustomers,
    category: "reports & analytics",
  },
  {
    icon: <ServiceAccountIcon />,
    title: "Services Report",
    url: appRoutes.reportServices,
    category: "reports & analytics",
  },
  {
    icon: <SettlementIcon />,
    title: "Orders Report",
    url: appRoutes.reportOrders,
    category: "reports & analytics",
  },

  {
    icon: <AuditLogIcon />,
    title: "Bookings Report",
    url: appRoutes.reportBookings,
    category: "reports & analytics",
  },
  {
    icon: <TransactionIcon />,
    title: "Reservations Report",
    url: appRoutes.reportReservations,
    category: "reports & analytics",
  },
];
/**
 * Sidebar link Category Items
 * These are the sidebar links grouped by category
 */
export const SIDEBAR_LINK_CATEGORY_ITEMS: TSideBarLinkCategoryItem[] = [
  {
    title: "management",
    items: SIDEBAR_LINKS.filter((item) => item.category === "management"),
  },
  {
    title: "booking & reservation",
    items: SIDEBAR_LINKS.filter(
      (item) => item.category === "booking & reservation"
    ),
  },
  {
    title: "orders",
    items: SIDEBAR_LINKS.filter((item) => item.category === "orders"),
  },
  {
    title: "reports & analytics",
    items: SIDEBAR_LINKS.filter(
      (item) => item.category === "reports & analytics"
    ),
  },
];
