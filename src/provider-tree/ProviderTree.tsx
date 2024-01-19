"use client";

import { AuthProvider, UserProvider } from "@/context";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomToastBar } from "@/components/ToastBar";
import { NextUIProvider } from "@nextui-org/react";

const queryClient = new QueryClient();

export const ProviderTree = ({ children }: { children: ReactNode }) => {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserProvider>
            <CustomToastBar />
            {children}
          </UserProvider>
        </AuthProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
};
