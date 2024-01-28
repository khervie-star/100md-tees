"use client";

import { MainNav } from "@/components";
import { RouteGuard } from "@/routeguard";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Listbox,
  ListboxItem,
  ListboxSection,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import {
  FaAddressBook,
  FaBagShopping,
  FaEnvelopeOpen,
  FaGear,
  FaUser,
} from "react-icons/fa6";
import { LiaCcApplePay } from "react-icons/lia";
import { MdDesignServices, MdFeedback } from "react-icons/md";
import { RiRefund2Fill } from "react-icons/ri";

export default function UserAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const account_menu = [
    {
      title: "Overview",
      path: "/account",
      icon: null,
    },
    {
      title: "Designs",
      path: "/account/designs",
      icon: null,
    },
    {
      title: "Orders",
      path: "/account/orders",
      icon: null,
    },
    {
      title: "Payments",
      path: "/account/payments",
      icon: null,
    },
    {
      title: "Address",
      path: "/account/address",
      icon: null,
    },
    {
      title: "Settings",
      path: "/account/settings",
      icon: null,
    },
    {
      title: "Refund and Return",
      path: "/account/refund",
      icon: null,
    },
    {
      title: "Feedback",
      path: "/account/feedback",
      icon: null,
    },
    {
      title: "Invite Friends",
      path: "/account/invite",
      icon: null,
    },
  ];

  console.log(pathname);

  return (
    <>
      <MainNav />
      <main className="p-5 lg:p-8 bg-[#f5f5f5] min-h-screen h-full">
        <div className="container mx-auto lg:px-[100px] lg:py-[50px]">
          <div className="mb-10 hidden lg:block">
            <Breadcrumbs>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem href="/account/">Account</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-[40px]">
            <div className="hidden lg:block">
              <Listbox
                className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 w-[300px] max-w-[300px] overflow-visible shadow-small rounded-none border-none font-outfit"
                itemClasses={{
                  base: "px-3 rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80 text-[28px]",
                  title: "text-[16px] font-medium",
                }}>
                <ListboxItem
                  key={"overview"}
                  href={"/account"}
                  className={`${
                    pathname == "/account" &&
                    "border-l-2 border-solid border-red bg-default-100/80"
                  }`}
                  startContent={<FaUser className={iconClasses} />}>
                  Overview{" "}
                </ListboxItem>

                <ListboxItem
                  key="new"
                  href="/account/designs"
                  className={`${
                    pathname == "/account/designs" &&
                    "border-l-2 border-solid border-red bg-default-100/80"
                  }`}
                  startContent={<MdDesignServices className={iconClasses} />}>
                  Designs
                </ListboxItem>
                <ListboxItem
                  key="orders"
                  href="/account/orders"
                  className={`${
                    pathname == "/account/orders" &&
                    "border-l-2 border-solid border-red bg-default-100/80"
                  }`}
                  startContent={<FaBagShopping className={iconClasses} />}>
                  Orders
                </ListboxItem>
                <ListboxItem
                  key="payments"
                  href="/account/payments"
                  className={`${
                    pathname == "/account/payments" &&
                    "border-l-2 border-solid border-red bg-default-100/80"
                  }`}
                  startContent={<LiaCcApplePay className={iconClasses} />}>
                  Payments
                </ListboxItem>
                <ListboxItem
                  key="address"
                  href="/account/address"
                  showDivider
                  className={`${
                    pathname == "/account/address" &&
                    "border-l-2 border-solid border-red bg-default-100/80"
                  }`}
                  startContent={<FaAddressBook className={iconClasses} />}>
                  Address
                </ListboxItem>
                <ListboxItem
                  key="settings"
                  href="/account/settings"
                  className={`${
                    pathname == "/account/settings" &&
                    "border-l-2 border-solid border-red bg-default-100/80"
                  }`}
                  startContent={<FaGear className={iconClasses} />}>
                  Settings
                </ListboxItem>
                <ListboxItem
                  key="refunds"
                  href="#"
                  startContent={<RiRefund2Fill className={iconClasses} />}>
                  Refund and Return
                </ListboxItem>
                <ListboxItem
                  key="feedback"
                  href="#"
                  startContent={<MdFeedback className={iconClasses} />}>
                  Feedback
                </ListboxItem>
                <ListboxItem
                  key="invite"
                  href="#"
                  startContent={<FaEnvelopeOpen className={iconClasses} />}>
                  Invite friends
                </ListboxItem>
              </Listbox>
            </div>
            <div className="block lg:hidden w-full">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="shadow" fullWidth>
                    Open Menu
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Link Actions">
                  <DropdownItem key="account" href="/account">
                    Account
                  </DropdownItem>
                  <DropdownItem key="address" href="/account/address">
                    Address
                  </DropdownItem>
                  <DropdownItem key="settings" href="/account/settings">
                    Settings
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="w-full lg:w-[calc(100%-300px)]">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}
