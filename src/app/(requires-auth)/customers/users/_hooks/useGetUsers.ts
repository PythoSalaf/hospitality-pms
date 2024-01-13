import { TPagination } from "~~/types";
import { TUser, TUserFilter, TUserDetails } from "../_types";
import { matchUserToFilterParams, paginateUsers } from "../_utils";
import { useEffect, useState } from "react";

export const QUERY_KEY_FOR_USERS = "users";
const USERS_API_URL =
  "https://run.mocky.io/v3/32064e83-fd95-4ac7-ace7-19568daaa806";

type TResponseData = {
  message: string;
  data: { result: TUser[]; total: number };
};
interface IProps {
  pagination?: TPagination;
  filter?: TUserFilter;
}
export const getUsers = async (props: IProps): Promise<TResponseData> => {
  // TODO: Create an API that emulates a DB, so that it is properly done
  const url = `${USERS_API_URL}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res?.status}`);
    }

    const data = (await res.json()) as unknown as TUserDetails[];

    const filteredData = data.filter((item) =>
      matchUserToFilterParams(item, props.filter)
    );
    const paginatedData = paginateUsers(
      filteredData,
      props.pagination?.limit,
      props.pagination?.page
    );

    return {
      message: "Users retrieved successfully",
      data: {
        total: filteredData.length,
        result: paginatedData,
      },
    };
  } catch (error) {
    throw new Error(`Failed to fetch users: ${(error as Error).message}`);
  }
};

const useGetUsers = (props: IProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<TResponseData["data"]>();

  useEffect(() => {
    // Define a cleanup function to avoid setting state on an unmounted component
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getUsers(props);

        if (isMounted) {
          setData(res.data);
          setIsSuccess(true);
          setIsError(false);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setIsError(true);
          setIsLoading(false);
          setIsSuccess(false);
        }
      }
    };

    fetchData();

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  }, [props.pagination?.page, props.pagination?.limit, props?.filter]); // Empty dependency array ensures that this effect runs only once

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};

// test hook
// does hook return appropriate data for each state
// does hook returned paginated data

export default useGetUsers;
