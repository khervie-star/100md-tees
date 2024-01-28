import { MdButton } from "@/components";
import { Divider, Input } from "@nextui-org/react";
import React from "react";
import { FaSave } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export const Security = () => {
  const [isVisible, setIsVisible] = React.useState<any>({
    password: false,
    confirmPassword: false,
  });

  const toggleVisibility = (name: string) =>
    setIsVisible({
      ...isVisible,
      [name]: !isVisible[name],
    });
  return (
    <div className="pb-10">
      <h2 className="text-green text-[18px] lg:text-[21px] font-semibold font-outfit mb-7">
        Change Password
      </h2>
      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between gap-[28px] mb-7">
        <form className="form w-full lg:w-1/2 flex-1 flex flex-col gap-6 lg:pr-10">
          <Input
            label="Password"
            variant="flat"
            // placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => toggleVisibility("password")}>
                {isVisible.password ? (
                  <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible.password ? "text" : "password"}
            className="w-full"
          />
          <Input
            label="Confirm Password"
            variant="flat"
            // placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => toggleVisibility("confirmPassword")}>
                {isVisible.confirmPassword ? (
                  <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible.confirmPassword ? "text" : "password"}
            className="w-full"
          />
        </form>
        {/* <div className="flex-1"></div> */}
      </div>

      <div className="w-full flex justify-end">
        <MdButton isLoading={false}>
          <FaSave />
          Save
        </MdButton>
      </div>
      <Divider className="my-5" />
      <div>
        <h2 className="text-green text-[18px] lg:text-[21px] font-semibold font-outfit mb-7">
          Security Settings
        </h2>
      </div>
    </div>
  );
};
