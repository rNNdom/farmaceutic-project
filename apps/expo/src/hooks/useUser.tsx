import { useEffect, useState } from "react";

import { User } from "~/utils/interface";
import { getUser } from "~/utils/service";

const useUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const userRole = userData?.usr_role

  const isClient = () => {
    return userRole === "USER"
  };

  const isDeliver = () => {
    return userRole === "DELIVER"
  };

  const isAdmin=()=>{
    return userRole === "ADMIN"
  }

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
    isAdmin,
  };
};

export default useUser;
