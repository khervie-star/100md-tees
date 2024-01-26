"use client";

import { AuthProvider, UserProvider } from "@/context";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomToastBar } from "@/components/ToastBar";
import { NextUIProvider } from "@nextui-org/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

const clientId =
  "239230360273-3mmgne5hej0h8aco3qpqq1asdc2htc8j.apps.googleusercontent.com";

export const ProviderTree = ({ children }: { children: ReactNode }) => {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GoogleOAuthProvider clientId={clientId}>
            <UserProvider>
              <CustomToastBar />
              {children}
            </UserProvider>
          </GoogleOAuthProvider>
        </AuthProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
};
