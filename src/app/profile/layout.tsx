import { RouteGuard } from "@/route-guard";
import Image from "next/image";
import Link from "next/link";

export default function UserAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RouteGuard>{children}</RouteGuard>;
}
