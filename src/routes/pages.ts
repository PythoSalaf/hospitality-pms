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
 * docmentation Routes
 */
export const documentationRoutes = {
  documentationHome: "/documentation",
};
/**
 * management Routes
 */
export const managementRoutes = {
  managementCustomers: "/management/customers",
  managementStaff: "/management/staff",
  managementAdministrators: "/management/administrators",
  managementBranches: "/management/branches",
  managementRooms: "/management/rooms",
  managementVenues: "/management/venues",
  managementServices: "/management/services",
};
/**
 * order Routes
 */
export const orderRoutes = {
  orderRecentOrders: "/order/recent-orders",
  orderFulfilledOrders: "/order/fullfilled-orders",
  orderCancelledOrders: "/order/cancelled-orders",
};
/**
 * booking & reservation Routes
 */
export const bookingAndReservationRoutes = {
  bookingAndReservationBookings: "/booking-reservations/bookings",
  bookingAndReservationReservations: "/booking-reservations/reservations",
  bookingAndReservationAvailableRooms: "/booking-reservations/available-rooms",
  bookingAndReservationAvailableVenues:
    "/booking-reservations/available-venues",
};

/**
 * Report Routes
 */
export const reportRoutes = {
  reportSales: "/report/sales",
  reportCustomers: "/report/customers",
  reportServices: "/report/services",
  reportOrders: "/report/orders",
  reportBookings: "/report/bookings",
  reportReservations: "/report/reservations",
};
