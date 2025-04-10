"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Chip,
} from "@heroui/react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { CheckIcon } from "../../../../public/icons";
import { FaPlus } from "react-icons/fa6";

const Address = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <div>
      <div className="w-full bg-white shadow-lg p-4 mb-8 flex items-center justify-between">
        <h2 className="font-outfit text-[24px] lg:text-[32px] font-bold text-black">
          Address
        </h2>
        <Button
          color="primary"
          variant="light"
          startContent={<FaPlus />}
          className="font-outfit font-medium text-base">
          Add a new address
        </Button>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card
            className="w-full"
            classNames={{
              base: "border border-solid border-green font-outfit",
            }}>
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src="/avatars/avatar-1.png"
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    Kwesi Hervie
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">
                    @khervie00
                  </h5>
                </div>
              </div>
              <Chip
                startContent={<CheckIcon size={18} />}
                variant="faded"
                color="success">
                Default
              </Chip>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              <p>University of Ibadan</p>
              <span className="pt-2">Ibadan, Oyo state, Nigeria,</span>
              {/* <span className="py-2" aria-label="computer" role="text">
                200213
              </span> */}
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex items-center gap-1 text-green font-semibold cursor-pointer">
                <AiFillEdit />
                <p className="text-small">Edit</p>
              </div>
              <div className="flex items-center gap-1 text-danger font-semibold cursor-pointer">
                <MdDelete />
                <p className="text-small">Delete</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Address;
