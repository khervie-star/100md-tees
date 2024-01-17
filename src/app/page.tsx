"use client";

import { Banner, MainNav } from "@/components";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Banner />
      <MainNav />
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    </>
  );
}
