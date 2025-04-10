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
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal
} from "@burnt-labs/abstraxion";

const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [intendedUrl, setIntendedUrl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();

  // General state hooks
  const [, setShow] = useModal();

  // watch isConnected and isConnecting
  // only added for testing
  useEffect(() => {
    console.log({ isConnected, isConnecting });
  }, [isConnected, isConnecting])


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
