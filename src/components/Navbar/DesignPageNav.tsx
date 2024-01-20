import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Divider,
} from "@nextui-org/react";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { TiThMenu } from "react-icons/ti";
import { FaUser } from "react-icons/fa";

export const DesignPageNav = () => {
  return (
    <Navbar maxWidth="full" shouldHideOnScroll>
      <NavbarBrand>
        <Link href="/">
          <Image src={logo} className="w-[120px] h-auto" alt="100md Tees" />
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end" className="font-outfit">
        <NavbarItem>
          <Link href="/profile" className="flex items-center gap-2">
            <FaUser />
            My Account
          </Link>
        </NavbarItem>
        <Divider orientation="vertical" />
        <NavbarItem className="flex items-center gap-2">
          <TiThMenu />
          Menu
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
