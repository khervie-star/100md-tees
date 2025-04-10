import React from "react";
import { DesignPageNav } from "@/components";

export default function DesignPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <DesignPageNav /> */}
      <main className="w-full h-full lg:w-screen lg:min-h-screen">
        {children}
      </main>
    </>
  );
}
