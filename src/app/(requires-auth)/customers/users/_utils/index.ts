import { TUser, TUserDetails, TUserFilter, TUserStatus } from "../_types";

export const generateUserStatusColor = (
  status: TUserStatus
): { bg: string; text: string } => {
  let data = { bg: "", text: "" };
  switch (status) {
    case "active":
      data = {
        bg: "rgba(57, 205, 98, 0.06)",
        text: "rgba(57, 205, 98, 1)",
      };

      break;
    case "inactive":
      data = {
        bg: "rgba(84, 95, 125, 0.06)",
        text: "rgba(84, 95, 125, 1)",
      };

      break;
    case "blacklisted":
      data = {
        bg: "rgba(228, 3, 59, 0.06)",
        text: "rgba(228, 3, 59, 1)",
      };

      break;
    case "pending":
      data = {
        bg: "rgba(233, 178, 0, 0.06)",
        text: "rgba(233, 178, 0, 1)",
      };

      break;

    default:
      break;
  }
  return data;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

/**
 * Checks if a user matches the given filter parameters.
 *
 * @param {TUserDetails} user - The user details.
 * @param {TUserFilter} [filterParams] - The filter parameters. Optional.
 * @return {boolean} Whether the user matches the filter parameters.
 */
export const matchUserToFilterParams = (
  user: TUser,
  filterParams?: TUserFilter
): boolean => {
  let isAMatch = true;
  if (typeof filterParams === "undefined") return isAMatch;
  const filter = filterParams;
  if (
    filter?.status &&
    user.status.toLowerCase() !== filter?.status?.toLowerCase()
  ) {
    isAMatch = false;
  }
  if (
    filter?.organizationId &&
    user.organization.id.toLowerCase() !== filter?.organizationId?.toLowerCase()
  ) {
    isAMatch = false;
  }
  if (
    filter?.name &&
    !user.name.toLowerCase().includes(filter?.name.toLowerCase())
  ) {
    isAMatch = false;
  }
  if (
    filter?.email &&
    !user.email.toLowerCase().includes(filter?.email.toLowerCase())
  ) {
    isAMatch = false;
  }
  if (
    filter?.phoneNumber &&
    !user.phoneNumber.toLowerCase().includes(filter?.phoneNumber.toLowerCase())
  ) {
    isAMatch = false;
  }
  if (filter.date) {
    const filterDate = new Date(filter?.date);
    const userDate = new Date(user.dateJoined);

    if (typeof filter?.date === "string" && !(userDate >= filterDate)) {
      isAMatch = false;
    }
  }
  return isAMatch;
};

/**
 * Paginates an array of user details.
 *
 * @param {TUserDetails[]} array - The array of user details to paginate.
 * @param {number} limit - The maximum number of items to include in each page. Default is DEFAULT_LIMIT.
 * @param {number} page - The page number to retrieve. Default is DEFAULT_PAGE.
 * @return {TUserDetails[]} The portion of the array for the current page.
 */
export const paginateUsers = (
  array: TUserDetails[],
  limit: number = DEFAULT_LIMIT,
  page: number = DEFAULT_PAGE
): TUserDetails[] => {
  // Calculate the start index and end index of the current page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Use slice to get the portion of the array for the current page
  const paginatedArray = array.slice(startIndex, endIndex);

  return paginatedArray;
};

export const generateStatusFromCode = (code: number): TUserStatus => {
  let status: TUserStatus = "pending";
  switch (code) {
    case 200:
      status = "active";
      break;
    case 502:
      status = "inactive";
      break;
    case 410:
      status = "blacklisted";
      break;

    default:
      break;
  }
  return status;
};

export const generateCodeFromStatus = (
  status?: TUserStatus
): number | undefined => {
  let code = undefined; // Default value in case status doesn't match any known values

  switch (status) {
    case "active":
      code = 200;
      break;
    case "inactive":
      code = 502;
      break;
    case "blacklisted":
      code = 410;
      break;
    // Add more cases for other statuses if needed

    default:
      break;
  }

  return code;
};
