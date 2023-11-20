import { useEffect, useState } from "react";

import { User } from "~/utils/interface";
import { getUser } from "~/utils/service";

const useUser = (props: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();
  const userRole = userData?.usr_role === 1 ? "Client" : "Deliver";

  const isClient = () => {
    return userRole === "Client";
  };

  const isDeliver = () => {
    return userRole === "Deliver";
  };

  const fetchUser = async () => {
    const response = await getUser();
    const data = response.find((item: User) => item.usr_id == props);
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
    setLoggedIn(userData !== null || userData !== undefined);
  }, [props]);

  return {
    loggedIn,
    setLoggedIn,
    userData,
    setUserData,
    isClient,
    isDeliver,
    loading,
  };
};

export default useUser;
