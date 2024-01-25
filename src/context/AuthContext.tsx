/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCookie, deleteCookie } from "cookies-next";

const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [intendedUrl, setIntendedUrl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = getCookie("access_token");

  useEffect(() => {
    // TODO: On component render, get access token from cookie, if it exists,

    console.log(token);
    setIsAuthenticated(!!token);
  }, [token]);

  console.log(isAuthenticated);

  const setIntended = (url: SetStateAction<null>) => {
    setIntendedUrl(url);
  };

  const clearIntended = () => {
    setIntendedUrl(null);
  };

  const handleLogout = () => {
    deleteCookie("access_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        intendedUrl,
        setIntended,
        clearIntended,
        isAuthenticated,
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
