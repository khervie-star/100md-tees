import { TOAST_COUNT_LIMIT, TOAST_NOTIFICATION_DURATION } from "@/utils/";
import React from "react";
import { ToastBar, Toaster, toast, useToasterStore } from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";

export const CustomToastBar = () => {
  const { toasts } = useToasterStore();

  // Enforce Limit
  React.useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_COUNT_LIMIT) // Is toast index over limit
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  }, [toasts]);

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName="toaster-wrapper"
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className:
          "rounded-[12px] border border-solid p-[16px] lg:p-[20px] shadow-[0px_4px_16px_0px_rgba(16,11,39,0.08)] z-50",
        style: {
          borderRadius: "12px",
          border: "1px solid",
          padding: "10px",
          boxShadow: "0px 4px 16px 0px rgba(16, 11, 39, 0.08)",
          zIndex: 999,
        },
        duration: TOAST_NOTIFICATION_DURATION,
        // duration: Infinity,

        // Default options for specific types
        success: {
          className: "!bg-[#F6FFF9] !border-[#48C1B5]",
          //   icon: <ToastIconSuccess />,
        },
        error: {
          className: "!bg-[#FFF5F3] !border-[#F4B0A1]",
          //   icon: <ToastIconError />,
        },
        blank: {
          className: "!bg-[#F5F9FF] !border-[#9DC0EE]",
          //   icon: <ToastIconInfo />,
        },
      }}>
      {(t) => (
        <ToastBar toast={t} style={{ padding: "0", width: "100%" }}>
          {({ icon, message }) => (
            <>
              <div className="w-full flex justify-between items-center">
                <div
                  style={{ display: "flex" }}
                  className="flex items-start justify-start gap-4">
                  <div>{icon}</div>

                  <div className="flex flex-col text-left justify-start items-start">
                    <div className="text-base text-[#27303A] font-semibold font-outfit leading-[100%]">
                      {t.type === "loading" && "Loading"}
                      {t.type === "success" && "Success"}
                      {t.type === "error" && "Error"}
                      {t.type === "blank" && "Info"}
                    </div>
                    <div className="text-[12px] text-[#2F3F53] font-normal font-outfit leading-[100%] text-left w-fit [&>*]:!mx-0">
                      {message}
                    </div>
                  </div>
                </div>
                {t.type !== "loading" && (
                  <button
                    className="bg-transparent border-none p-1 cursor-pointer text-[#979FA9]"
                    onClick={() => toast.dismiss(t.id)}>
                    <FaXmark />
                  </button>
                )}
              </div>
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};
