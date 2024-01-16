import { TUserDetails } from "../_types";
import { useEffect, useState } from "react";
import { getUsers } from "./useGetUsers";
import { toast } from "sonner";
import { LOCAL_STORAGE_KEY_FOR_USERS } from "../_constants";

type TResponseData = {
  message: string;
  data: TUserDetails | null;
};

type TProps = {
  id: string;
};
const useGetUserDetails = (props: TProps) => {
  const { id } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<TResponseData["data"]>();
  const [refresh, setRefresh] = useState(false);
  const forceRefresh = () => {
    setRefresh((val) => !val);
  };
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getUsers();
        const {
          data: { allUsersDataForLocalStorage },
          message,
        } = res;
        localStorage.setItem(
          LOCAL_STORAGE_KEY_FOR_USERS,
          JSON.stringify(allUsersDataForLocalStorage)
        );
        const userDetail =
          allUsersDataForLocalStorage.find((user) => user.id === id) ?? null;
        toast(message, {
          cancel: {
            label: "Cancel",
          },
        });
        if (isMounted) {
          setData(userDetail);
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
    const existingLocalStorageUsers = localStorage.getItem(
      LOCAL_STORAGE_KEY_FOR_USERS
    );
    if (existingLocalStorageUsers) {
      const users: TUserDetails[] = existingLocalStorageUsers
        ? JSON.parse(existingLocalStorageUsers)
        : null;
      const userDetail = users.find((user) => user.id === id) ?? null;

      setData(userDetail);
      setIsSuccess(true);
      setIsError(false);
      setIsLoading(false);
    } else {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [id, refresh]);

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

export default useGetUserDetails;
