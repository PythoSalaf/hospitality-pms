import { TPagination } from "~~/types";
import { TUser, TUserFilter, TUserDetails } from "../_types";
import {
  generateRandomUserDetails,
  matchUserToFilterParams,
  paginateUsers,
} from "../_utils";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY_FOR_USERS } from "../_constants";
import { faker } from "@faker-js/faker";

export const QUERY_KEY_FOR_USERS = "users";
const USERS_API_URL =
  "https://run.mocky.io/v3/32064e83-fd95-4ac7-ace7-19568daaa806";

type TResponseData = {
  message: string;
  data: {
    result: TUser[];
    total: number;
    allUsersDataForLocalStorage: TUserDetails[];
  };
};
interface IProps {
  pagination?: TPagination;
  filter?: TUserFilter;
}
export const getUsers = async (props: IProps = {}): Promise<TResponseData> => {
  // TODO: Create an API that emulates a DB, so that it is properly done
  const url = `${USERS_API_URL}`;
  const existingLocalStorageUsers = localStorage.getItem(
    LOCAL_STORAGE_KEY_FOR_USERS
  );

  try {
    let data: TUserDetails[] = [];
    if (existingLocalStorageUsers) {
      const users: TUserDetails[] = JSON.parse(existingLocalStorageUsers);
      data = users;
    } else {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res?.status}`);
      }

      let _data = (await res.json()) as unknown as TUserDetails[];
      data = _data.map((user) => ({
        ...user,
        dateJoined: faker.date.past().toDateString(),
        dob: faker.date.birthdate().toDateString(),
      }));
    }
    // store in local storage, according to requirements
    // TODO: refactor to be in its own function, also on visit to user details check n insert if not present
    const usersLocalStorageData: TUserDetails[] = data.map((user) =>
      generateRandomUserDetails(user)
    );
    // set data in local storage
    localStorage.setItem(
      LOCAL_STORAGE_KEY_FOR_USERS,
      JSON.stringify(usersLocalStorageData)
    );

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
        allUsersDataForLocalStorage: usersLocalStorageData,
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
  const [refresh, setRefresh] = useState(false);
  const forceRefresh = () => {
    setRefresh((val) => !val);
  };
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
  }, [props.pagination?.page, props.pagination?.limit, props?.filter, refresh]); // Empty dependency array ensures that this effect runs only once

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    forceRefresh,
  };
};

// test hook
// does hook return appropriate data for each state
// does hook returned paginated data

export default useGetUsers;
