import React from "react";
import { Button } from "@nextui-org/react";

type buttonTypes = {
  isLoading: boolean;
  onClick?: any;
  extraClass?: string;
  children: any;
};

export const MdButton = ({
  isLoading,
  onClick,
  extraClass,
  children,
}: buttonTypes) => {
  return (
    <Button
      color="secondary"
      isLoading={isLoading}
      className={`${extraClass} h-full flex justify-center items-center py-3 bg-green rounded-[30px] lg:rounded-[12px] text-white100 text-[20px] leading-[28px] font-semibold`}
      onClick={onClick}>
      {children}
    </Button>
  );
};
