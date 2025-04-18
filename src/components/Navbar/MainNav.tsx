"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import { FaRegUser } from "react-icons/fa6";
import { useAuth } from "@/context";
import { HiOutlineLogout } from "react-icons/hi";
import { useModal, useAbstraxionAccount, Abstraxion } from "@burnt-labs/abstraxion";
import { Button } from "@heroui/react";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const MainNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, handleLogout } = useAuth()!;

  const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();

  // General state hooks
  const [, setShow] = useModal();

  // watch isConnected and isConnecting
  // only added for testing
  useEffect(() => {
    console.log({ isConnected, isConnecting });
  }, [isConnected, isConnecting])

  return (
    <header className="bg-white">
      <nav
        className="container mx-auto flex w-full items-center justify-between p-6 lgpx-[100px]"
        aria-label="Global">
        <div className="flex items-center lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">100MD Tees</span>
            <Image
              className="h-6 w-auto lg:h-[40px] lg:w-full"
              src={logo}
              alt=""
            />
          </Link>

          <Popover.Group className="hidden lg:flex lg:gap-x-12 mx-10">
            <a
              href="/marketplace"
              className="text-sm font-semibold leading-6 text-gray-900">
              Marketplace
            </a>
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Product
                <ChevronDownIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1">
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {products.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon
                            className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <a
                            href={item.href}
                            className="block font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    {callsToAction.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                        <item.icon
                          className="h-5 w-5 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <a
              href="/design-studio"
              className="text-sm font-semibold leading-6 text-gray-900">
              Design room
            </a>
            <a
              href="/templates"
              className="text-sm font-semibold leading-6 text-gray-900">
              Templates
            </a>
          </Popover.Group>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:justify-end">
          {bech32Address ? (
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                {bech32Address.slice(0, 6)}...{bech32Address.slice(-4)}
              </div>
              <Link
                href="/account"
                className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-3"
              >
                <FaRegUser className="w-5 h-5" />
                My Account
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Button
                onClick={() => { setShow(true) }}
                className="text-sm font-semibold leading-6 text-white bg-green border border-solid border-green rounded-full px-7 py-2 flex items-center gap-3"
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">100MD Tees</span>
              <Image className="h-6 w-auto" src={logo} alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="/design-studio"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Design studio
                </a>
                <a
                  href="/marketplace"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Marketplace
                </a>
                <a
                  href="/templates"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Templates
                </a>
              </div>

              <div className="">
                {isAuthenticated ? (
                  <div className="py-6 flex flex-col gap-4">
                    <Link
                      href="/account"
                      className="w-full text-center -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-green hover:bg-gray-50 flex justify-center items-center gap-3">
                      <FaRegUser className="w-5 h-5" />
                      My Account
                    </Link>
                    <div
                      onClick={handleLogout}
                      className="w-full text-center -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-danger text-white hover:bg-danger/80 flex justify-center items-center gap-3">
                      <HiOutlineLogout className="w-5 h-5" />
                      Logout
                    </div>
                  </div>
                ) : (
                  <div className="py-6 flex flex-col gap-4">
                    {/* <Link
                      href="/login"
                      className="w-full text-center -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-green hover:bg-gray-50">
                      Log in
                    </Link> */}
                    <Link
                      href="/register"
                      className="w-full text-center -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-green text-white hover:bg-green/80">
                      {bech32Address ? (
                        <div className="flex items-center justify-center">VIEW ACCOUNT</div>
                      ) : (
                        "CONNECT"
                      )}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <Abstraxion onClose={() => setShow(false)} />
    </header>
  );
};
