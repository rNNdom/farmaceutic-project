import React, { createContext, useMemo, useState } from "react";
import { User } from "~/utils/interface";

export const UserContext = createContext({
  user: {} as User | null,
  addUser: (element: any) => {},
  emptyUser: () => {},
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);


    const addUser = (element: any) => {
        setUser(element);
    };

    const emptyUser = () => {
        setUser(null);
    }
    


  const contextValue = useMemo(() => {
    return { user, addUser, emptyUser };
  }, [user]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
