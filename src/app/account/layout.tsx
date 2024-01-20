import { RouteGuard } from "@/routeguard";

export default function UserAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RouteGuard>{children}</RouteGuard>;
}
