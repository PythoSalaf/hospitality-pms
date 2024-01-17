/**
 * Auth Routes.
 * This is a list of routes for pages that are used for authentication. e.g login, register, etc
 */
export const authRoutes = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verify: "/verify",
};
/**
 * Error Routes
 */
export const errorRoutes = {
  error: "/error",
};

/**
 * Setting Routes
 */
export const settingRoutes = {
  settingAuditLogs: "/settings/audit-logs",
  settingFeesAndPricing: "/settings/fees-and-pricing",
  settingPreferences: "/settings/preferences",
};
/**
 * docmentation Routes
 */
export const documentationRoutes = {
  documentationHome: "/documentation",
};
/**
 * customer Routes
 */
export const customerRoutes = {
  customerUsers: "/customers/users",
  customerLoans: "/customers/loans",
  customerSavings: "/customers/savings",
  customerLoanRequests: "/customers/loan-requests",
  customerWhitelist: "/customers/whitelist",
  customerDecisionModels: "/customers/decision-models",
  customerKarma: "/customers/karma",
  customerGuarantors: "/customers/guarantors",
};
/**
 * bussiness Routes
 */
export const businessRoutes = {
  businessOrganizations: "/business/organizations",
  businessLoanProducts: "/business/loan-products",
  businessSavingsProducts: "/business/savings-products",
  businessFeesAndCharges: "/business/fees-and-charges",
  businessTransactions: "/business/transactions",
  businessServices: "/business/services",
  businessServiceAccount: "/business/service-account",
  businessSettlements: "/business/settlements",
  businessReports: "/business/reports",
};
