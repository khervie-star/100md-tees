import React from "react";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { FaSave, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Divider,
  Button
} from "@heroui/react";

export const DesignPageNav = () => {
  return (
    <Navbar maxWidth="full" shouldHideOnScroll className="py-4">
      <NavbarBrand>
        <Link href="/">
          <Image src={logo} className="w-[120px] h-auto" alt="100md Tees" />
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end" className="font-outfit">
        <NavbarItem>
          <Button color="primary" variant="light" startContent={<FaSave />}>
            Save Design
          </Button>
        </NavbarItem>
        <Divider orientation="vertical" />
        <Button color="primary" className="text-white" variant="solid" startContent={<FaShoppingCart />}>
          Add to Cart
        </Button>
      </NavbarContent>
    </Navbar>
  );
};


