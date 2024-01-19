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

const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [intendedUrl, setIntendedUrl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // TODO: On component render, get access token from cookie, if it exists,
    // const token = document.cookie
    //   .split("; ")
    //   .find((c) => c.startsWith("access_token="))
    //   ?.split("=")[1];
    const token = localStorage.getItem("access_token");

    console.log(token);
    setIsAuthenticated(!!token);
  }, []);

  console.log(isAuthenticated);

  const setIntended = (url: SetStateAction<null>) => {
    setIntendedUrl(url);
  };

  const clearIntended = () => {
    setIntendedUrl(null);
  };

  return (
    <AuthContext.Provider
      value={{ intendedUrl, setIntended, clearIntended, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
