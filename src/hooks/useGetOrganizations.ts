"use client";

import { useEffect, useState } from "react";
import { TOrganization } from "../types";
import { MOCK_ORGANIZATION_API_URL } from "~~/constants";

export type TGetOrganizationsResponseData = {
  message: string;
  data: TOrganization[];
};

/**
 * Fetches organizations from the mock API.
 *
 * @returns A Promise that resolves to the response data.
 * @throws An error if the fetch operation fails.
 */
export const getOrganizations =
  async (): Promise<TGetOrganizationsResponseData> => {
    const url = `${MOCK_ORGANIZATION_API_URL}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res?.status}`);
      }

      const data = (await res.json()) as unknown as TOrganization[];

      return {
        message: "Organizations retrieved successfully",
        data: data.map((item) => ({ ...item, id: `${item.id}` })),
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch organizations: ${(error as Error).message}`
      );
    }
  };

/**
 * A custom hook for fetching organizations and managing loading state.
 *
 * @returns An object containing data, loading state, and error state.
 */
const useGetOrganizations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isError, setIsError] = useState(true);
  const [data, setData] = useState<TOrganization[]>([]);

  useEffect(() => {
    /**
     * Fetches organizations data.
     */
    const fetchData = async () => {
      try {
        const res = await getOrganizations();

        setData(res.data);
        setIsLoading(false);
        setIsSuccess(true);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetOrganizations;
