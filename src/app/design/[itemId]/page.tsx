"use client";

import {
  Tabs,
  Tab,
  Switch,
  cn,
  useSwitch,
  SwitchProps,
} from "@nextui-org/react";
import React from "react";
import { FaUpload } from "react-icons/fa6";
import { PiTextAaBold } from "react-icons/pi";
import { MdPalette } from "react-icons/md";
import { IoLogoDeviantart } from "react-icons/io5";

const DesignFrame = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[90vh] bg-gray-300 p-6">
        <div className="w-full h-full flex justify-between">
          <div className="w-1/3 bg-white shadow-lg">
            <Tabs
              aria-label="Options"
              color="primary"
              variant="solid"
              fullWidth
              classNames={{
                tabList:
                  "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full rounded-none",
                tab: "flex-1 px-0 font-outfit font-medium text-base",
                tabContent: "group-data-[selected=true]:text-white",
              }}>
              <Tab
                key="color"
                title={
                  <div className="flex items-center space-x-2">
                    <MdPalette />
                    <span>Color</span>
                  </div>
                }
              />
              <Tab
                key="upload"
                title={
                  <div className="flex items-center space-x-2">
                    <FaUpload />
                    <span>Upload</span>
                  </div>
                }
              />

              <Tab
                key="text"
                title={
                  <div className="flex items-center space-x-2">
                    <PiTextAaBold />
                    <span>Add Text</span>
                  </div>
                }
              />
              <Tab
                key="art"
                title={
                  <div className="flex items-center space-x-2">
                    <IoLogoDeviantart />
                    <span>Add Art</span>
                  </div>
                }
              />
            </Tabs>
            <div className="p-5">
              <h6 className="font-bold text-[20px] font-jk_sans text-black mb-6">
                Choose a color
              </h6>
              <Switch
                classNames={{
                  base: cn(
                    "inline-flex flex-row-reverse w-8 h-8 bg-red-500 hover:bg-content2 items-center",
                    "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                  ),
                  wrapper: "hidden",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignFrame;
