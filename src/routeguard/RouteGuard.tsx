import { useAuth } from "@/context";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

export const RouteGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page if not authenticated
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
};
