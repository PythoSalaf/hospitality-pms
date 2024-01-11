"use client";

import { useEffect, useState, useTransition } from "react";
import { TOrganization } from "../types";

export const QUERY_KEY_FOR_ORGANIZATIONS = "users";
export const ORG_API_URL =
  "https://run.mocky.io/v3/90ca5ce7-80ff-4b6e-9721-f8811cf13f21";

export type TGetOrganizationsResponseData = {
  message: string;
  data: TOrganization[];
};

export const getOrganizations =
  async (): Promise<TGetOrganizationsResponseData> => {
    const url = `${ORG_API_URL}`;

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

const useGetOrganizations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isError, setIsError] = useState(true);
  const [data, setData] = useState<TOrganization[]>([]);
  useEffect(() => {
    getOrganizations()
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetOrganizations;
