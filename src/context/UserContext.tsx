"use client";

import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const UserContext = createContext<any>({});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  const set_user = (user_details: SetStateAction<null>) => {
    setUser(user_details);
  };

  return (
    <UserContext.Provider value={{ user, set_user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
