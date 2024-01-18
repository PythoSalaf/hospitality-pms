import { describe, expect, it } from "vitest";
import { matchUserToFilterParams, paginateUsers } from ".";
import { DUMMY_USERS } from "../_constants";
import { TUserDetails } from "../_types";

// TODO: Use just org.id, ang get rid of orgId

describe("Users Pagination", () => {
  it("should return items within specified limit", () => {
    const limit = 10;
    const page = 1;
    expect(paginateUsers(DUMMY_USERS, limit, page).length).toBeLessThanOrEqual(
      limit
    );
  });
  it("should return items starting from specified page", () => {
    const limit = 10;
    const page = 2;
    expect(paginateUsers(DUMMY_USERS, limit, page)[0].id).toBe(
      DUMMY_USERS[10].id
    );
  });
  it("should return an empty array when page does not exist", () => {
    const limit = 10;
    const pageDoesNotExist = DUMMY_USERS.length + 1;
    expect(paginateUsers(DUMMY_USERS, limit, pageDoesNotExist).length).toBe(0);
  });
  it("should return at least 10 items when limit is not specified", () => {
    const pageDoesNotExist = DUMMY_USERS.length + 1;
    expect(
      paginateUsers(DUMMY_USERS, undefined, pageDoesNotExist).length
    ).toBeLessThanOrEqual(10);
  });
  it("should return items at the beginning of array when no page is specified", () => {
    expect(paginateUsers(DUMMY_USERS, undefined, undefined)[0].id).toBe(
      DUMMY_USERS[0].id
    );
  });
});
describe("Users Filter", () => {
  it("should return true if no params are specified in filter", () => {
    const filterParams = undefined;
    expect(matchUserToFilterParams(DUMMY_USERS[0], filterParams)).toBe(true);
  });
  it("should return true if status matches user status", () => {
    const user: TUserDetails = DUMMY_USERS[0];
    const status = "active";

    expect(matchUserToFilterParams(user, { status })).toBe(
      user.status === status
    );
  });
  it("should return true if organizationId matches user organizationId", () => {
    const user: TUserDetails = DUMMY_USERS[0];
    const organizationId = "3";

    expect(matchUserToFilterParams(user, { organizationId })).toBe(
      user.organization.id === organizationId
    );
  });
  it("should return true if name matches user name", () => {
    const user: TUserDetails = DUMMY_USERS[0];
    const name = "James Sowell";

    expect(matchUserToFilterParams(user, { name })).toBe(
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  });
  it("should return true if email matches user email", () => {
    const user: TUserDetails = DUMMY_USERS[0];
    const email = "test@gmail.com";

    expect(matchUserToFilterParams(user, { email })).toBe(
      user.email.toLowerCase().includes(email.toLowerCase())
    );
  });
  it("should return true if phone number matches user phone number", () => {
    const user: TUserDetails = DUMMY_USERS[0];
    const phoneNumber = "+234 8908009000";

    expect(matchUserToFilterParams(user, { phoneNumber })).toBe(
      user.phoneNumber.toLowerCase().includes(phoneNumber.toLowerCase())
    );
  });
  it("should return true if date joined matches user date joined", () => {
    const user: TUserDetails = DUMMY_USERS[0];
    const dateJoined = new Date("20-04-2023");

    expect(matchUserToFilterParams(user, { date: dateJoined })).toBe(
      new Date(user.dateJoined) <= new Date(dateJoined)
    );
  });
});
