import { Switch, cn } from "@nextui-org/react";
import React from "react";

export const Notifications = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
      <Switch
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
            "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-default",
            "data-[selected=true]:border-primary"
          ),
          wrapper: "p-0 h-4 overflow-visible",
          thumb: cn(
            "w-6 h-6 border-2 shadow-lg",
            "group-data-[hover=true]:border-primary",
            //selected
            "group-data-[selected=true]:ml-6",
            // pressed
            "group-data-[pressed=true]:w-7",
            "group-data-[selected]:group-data-[pressed]:ml-4"
          ),
        }}>
        <div className="flex flex-col gap-1">
          <p className="text-medium">Email notifications</p>
          <p className="text-tiny text-default-400">
            Receive notifications about new features and updates.
          </p>
        </div>
      </Switch>
      <Switch
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
            "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-default",
            "data-[selected=true]:border-primary"
          ),
          wrapper: "p-0 h-4 overflow-visible",
          thumb: cn(
            "w-6 h-6 border-2 shadow-lg",
            "group-data-[hover=true]:border-primary",
            //selected
            "group-data-[selected=true]:ml-6",
            // pressed
            "group-data-[pressed=true]:w-7",
            "group-data-[selected]:group-data-[pressed]:ml-4"
          ),
        }}>
        <div className="flex flex-col gap-1">
          <p className="text-medium">Enable early access</p>
          <p className="text-tiny text-default-400">
            Receive notifications about new features and updates.
          </p>
        </div>
      </Switch>
    </div>
  );
};