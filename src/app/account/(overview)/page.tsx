import { Button, User } from "@nextui-org/react";
import React from "react";
import { FaEdit } from "react-icons/fa";

const Account = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-white shadow-lg p-4 lg:p-6">
        <div className="w-full flex justify-between items-center mb-7">
          <User
            name="Kwesi Hervie"
            description="Khervie00"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              size: "lg",
            }}
            classNames={{
              name: "text-[24px] font-medium font-outfit",
            }}
          />
          <Button
            color="primary"
            variant="light"
            startContent={<FaEdit />}
            className="font-outfit font-medium text-base">
            Edit Profile
          </Button>
        </div>
        <div className="flex items-center justify-evenly font-jk_sans">
          <div className="text-center flex flex-col gap-2">
            <p className="text-[20px] font-semibold text-black">0</p>
            <p className="text-base text-grey">Designs created</p>
          </div>
          <div className="text-center flex flex-col gap-2">
            <p className="text-[20px] font-semibold text-black">0</p>
            <p className="text-base text-grey">Designs sold</p>
          </div>
          <div className="text-center flex flex-col gap-2">
            <p className="text-[20px] font-semibold text-black">0</p>
            <p className="text-base text-grey">Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
