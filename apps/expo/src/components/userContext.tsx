import React, { createContext, useEffect, useMemo, useState } from "react";
import { User, UserLogin } from "~/utils/interface";
import { getContentFromAsyncStorage, getTokenFromAsyncStorage } from "./storage";

export const UserContext = createContext({
  user: {} as UserLogin | null,
  addUser: (newUser: any) => { },
  emptyUser: () => { },
  token: "",
  addToken: (newToken: string) => { },
  profile: {} as User | null,
  addProfile: (element: any) => { },
  updateProfile: (element: any) => { },
  loggedIn: false,
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserLogin | null>(null);
  const [token, setToken] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [profile, setProfile] = useState<User | null>(null);


  const addToken = (newToken: string) => {
    setToken(newToken);
  }


  const addUser = (newUser: any) => {
    const aux = newUser as UserLogin;
    setUser(aux);
    setLoggedIn(true);
  };

  const addProfile = (element: any) => {
    const aux = element as User;
    setProfile(aux);
  };

  const updateProfile = (element: any) => {
    const aux = profile
    if (aux) {
      aux.prf_name = element.name ? element.name : aux.prf_name;
      aux.prf_lastname = element.lastName ? element.lastName : aux.prf_lastname;
      aux.prf_mail = element.email ? element.email : aux.prf_mail;
      aux.prf_phone = element.phone ? element.phone : aux.prf_phone;
      aux.usr_pass = element.password ? element.password : aux.usr_pass;
      setProfile(aux);
    }
  }


  const emptyUser = () => {
    setUser(null);
    setProfile(null);
    setToken("");
    setLoggedIn(false);
  }



  useEffect(() => {
    getTokenFromAsyncStorage("@token").then((res) => {
      if (res) {
        addToken(res);
        getContentFromAsyncStorage("@user").then((res2) => {
          if (res2) {
            addUser(res2);
          }
        });
      }

    });
  }, []);




  const contextValue = useMemo(() => {
    return { user, addUser, emptyUser, token, addToken, loggedIn, profile, addProfile, updateProfile };
  }, [user, token, profile, loggedIn]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
