"use client";

import { AuthProvider, UserProvider } from "@/context";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomToastBar } from "@/components/ToastBar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HeroUIProvider } from "@heroui/system";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import { treasuryConfig } from "@/config/xion.config";

const queryClient = new QueryClient();

const clientId =
  "239230360273-3mmgne5hej0h8aco3qpqq1asdc2htc8j.apps.googleusercontent.com";

export const ProviderTree = ({ children }: { children: ReactNode }) => {
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <AbstraxionProvider
          config={treasuryConfig}>
        <AuthProvider>
          <GoogleOAuthProvider clientId={clientId}>
            <UserProvider>
              <CustomToastBar />
              {children}
            </UserProvider>
          </GoogleOAuthProvider>
          </AuthProvider>
          </AbstraxionProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
};
