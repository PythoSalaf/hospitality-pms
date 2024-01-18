import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TUser, TUserFilter } from "../_types";
import { matchUserToFilterParams } from "../_utils";
import useGetUsers from "./useGetUsers";
import { createMockFetchResponse } from "~~/lib/test";

const users: TUser[] = Array(20).fill({
  dateJoined: "2023-09-20T05:57:54.585Z",
  dob: "2023-09-20T05:57:54.585Z",
  email: "a@a.com",
  id: "1",
  name: "a",
  organizationId: "1",
  phoneNumber: "1234567890",
  status: "active",
  organization: {
    createdAt: "2023-09-20T05:57:54.585Z",
    id: "1",
    name: "organization 0",
  },
});

describe("useGetUsers", () => {
  //Spy on the global fetch function
  const fetchSpy = vi.spyOn(global, "fetch");

  it("Should return a message and an array of users when request is successful", async () => {
    fetchSpy.mockResolvedValue(
      createMockFetchResponse({
        data: users,
        response: { ok: true },
      }) as unknown as Response
    );
    const { result } = renderHook(() => useGetUsers());

    await waitFor(() => {
      expect(result?.current).toHaveProperty("data");
      expect(result?.current?.data?.result).toHaveProperty("length");
      if (result?.current?.data && result?.current?.data?.result.length > 0) {
        expect(result?.current?.data?.result[0]).toHaveProperty("id");
        expect(result?.current?.data?.result[0]).toHaveProperty("name");
        expect(result?.current?.data?.result[0]).toHaveProperty("email");
        expect(result?.current?.data?.result[0]).toHaveProperty("dob");
        expect(result?.current?.data?.result[0]).toHaveProperty("dateJoined");
        expect(result?.current?.data?.result[0]).toHaveProperty(
          "organizationId"
        );
        expect(result?.current?.data?.result[0]).toHaveProperty("organization");
        expect(result?.current?.data?.result[0]).toHaveProperty("phoneNumber");
        expect(result?.current?.data?.result[0]).toHaveProperty("status");
      }
    });
  });
  it.each([
    ["active", "2023-09-20", "james@gmail.com", "James", "1", "1234567890"],
    ["active", undefined, undefined, undefined, undefined, undefined],
    [undefined, "2023-09-20", undefined, undefined, undefined, undefined],
    [
      "blacklisted",
      undefined,
      "james@gmail.com",
      undefined,
      undefined,
      undefined,
    ],
    ["inactive", undefined, undefined, "James", undefined, undefined],
    [undefined, undefined, undefined, undefined, "1", undefined],
    ["pending", undefined, undefined, undefined, undefined, "1234567890"],
    [
      "blacklisted",
      "04-07-2024",
      "eva@gmail.com",
      "Eva",
      "20",
      "236 8090 890 231",
    ],
  ])(
    "Should return an array of users that match filter when filter params are provided",
    async (status, date, email, name, organizationId, phoneNumber) => {
      localStorage.clear();
      fetchSpy.mockResolvedValue(
        createMockFetchResponse({
          data: users,
          response: { ok: true },
        }) as unknown as Response
      );
      const filter: TUserFilter = {
        status: status as TUserFilter["status"],
        date: typeof date === "string" ? new Date(date) : undefined,
        email,
        name,
        organizationId,
        phoneNumber,
      };
      const { result } = renderHook(() =>
        useGetUsers({
          filter,
        })
      );
      const filteredUsers = users.filter((user) =>
        matchUserToFilterParams(user, filter)
      );

      await waitFor(() => {
        expect(filteredUsers.length).toBe(result.current.data?.total);
      });
    }
  );
  it("Should return an array of users when pagination params are provided", async () => {
    fetchSpy.mockResolvedValue(
      createMockFetchResponse({
        data: users,
        response: { ok: true },
      }) as unknown as Response
    );
    const { result } = renderHook(() =>
      useGetUsers({ pagination: { limit: 15, page: 1 } })
    );

    await waitFor(() => {
      expect(result?.current).toHaveProperty("data");
      expect(result?.current?.data?.result).toHaveProperty("length");
      if (result?.current?.data && result?.current?.data?.result.length > 0) {
        expect(result?.current?.data?.result.length).toBe(15);
      }
    });
  });
  it("Should return an error when the request is not successful", async () => {
    localStorage.clear();
    const response = createMockFetchResponse({
      data: [],
      response: {
        ok: false,
        status: 500,
      },
    }) as unknown as Response;
    fetchSpy.mockResolvedValue(response);
    const { result } = renderHook(() => useGetUsers());

    await waitFor(() => {
      expect(result?.current?.isError).toBe(true);
    });
  });
});
