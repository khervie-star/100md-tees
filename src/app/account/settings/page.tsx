"use client";
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { FaLock, FaUser } from "react-icons/fa6";
import { GoBellFill } from "react-icons/go";
import { Notifications, Profile, Security } from "./_components";

const Settings = () => {
  const [selected, setSelected] = React.useState("photos");

  return (
    <div>
      <div className="w-full bg-white shadow-lg p-4 mb-8">
        <h2 className="font-outfit text-[32px] font-bold text-black">
          Settings
        </h2>
      </div>
      <div className="w-full bg-white shadow-lg p-4">
        <div className="flex w-full flex-col gap-4">
          <Tabs
            aria-label="Options"
            color="primary"
            variant="underlined"
            selectedKey={selected}
            onSelectionChange={(key: any) => setSelected(key)}
            classNames={{
              tabList:
                "gap-10 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-red",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-red",
            }}>
            <Tab
              key="profile"
              title={
                <div className="flex items-center space-x-2">
                  <FaUser />
                  <span>Profile</span>
                </div>
              }
            />
            <Tab
              key="security"
              title={
                <div className="flex items-center space-x-2">
                  <FaLock />
                  <span>Security</span>
                </div>
              }
            />
            <Tab
              key="notifications"
              title={
                <div className="flex items-center space-x-2">
                  <GoBellFill />
                  <span>Notifications</span>
                </div>
              }
            />
          </Tabs>
          <div className="px-6">{selected == "profile" && <Profile />}</div>
          <div className="px-6">{selected == "security" && <Security />}</div>
          <div className="px-6">
            {selected == "notifications" && <Notifications />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
