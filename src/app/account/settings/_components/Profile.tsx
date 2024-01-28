import { MdButton } from "@/components";
import { country_data } from "@/lib/data";
import { Avatar, Input, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { FaSave } from "react-icons/fa";
import image from "../../../../../public/images/user.jpeg";
import { FaPen } from "react-icons/fa6";

export const Profile = () => {
  return (
    <div className="pb-10">
      <h2 className="text-green text-[18px] lg:text-[21px] font-semibold font-outfit mb-7">
        Edit Profile
      </h2>
      <div className="avatar_wrapper mb-12">
        <div className="w-[100px] h-[100px] rounded-full border-solid border-2 border-green bg-gray-200 relative cursor-pointer">
          <Image
            src={image}
            alt=""
            className="object-cover w-full h-full rounded-full"
          />
          <div className="edit-button w-[24px] h-[24px] rounded-full bg-green text-white flex justify-center items-center border-none absolute -right-[12px] top-[calc(50%-12px)]">
            <FaPen className="text-[12px]" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-10">
        <div className="flex flex-col">
          <Input
            type="email"
            name="email"
            value={"herviek2001@gmail.com"}
            variant={"flat"}
            label="Email"
            disabled
          />
        </div>
        <div className="flex flex-col">
          <Input
            type="text"
            name="nickname"
            placeholder="khervie00"
            variant={"flat"}
            label="Nickname"
          />
        </div>
        <div className="flex flex-col">
          <Input
            type="text"
            name="firstName"
            placeholder="Moyinoluwa"
            variant={"flat"}
            label="First Name"
          />
        </div>
        <div className="flex flex-col">
          <Input
            type="text"
            name="firstName"
            placeholder="Afolabi"
            variant={"flat"}
            label="Last Name"
          />
        </div>
        <div className="flex flex-col">
          <Select className="w-full" label="Select country" fullWidth>
            {country_data.map((country, i) => (
              <SelectItem
                key={country.name}
                startContent={
                  <Avatar
                    alt={country.name}
                    className="w-6 h-6"
                    src={country.flag}
                  />
                }>
                {country.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <Input
            type="text"
            name="phone"
            placeholder="+234(818)-074-6707"
            variant={"flat"}
            label="Phone Number"
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <MdButton isLoading={false}>
          <FaSave />
          Save
        </MdButton>
      </div>
    </div>
  );
};
