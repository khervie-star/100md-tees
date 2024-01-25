import { FaPhone } from "react-icons/fa6";
import { MdContactSupport } from "react-icons/md";
import { RiCustomerServiceFill } from "react-icons/ri";

export const Banner = () => {
  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-green px-6 py-2.5 sm:px-3.5 font-outfit">
      <div className="w-full container mx-auto lg:px-[100px]  flex justify-between text-white flex-wrap items-center gap-x-4 gap-y-2 text-xs lg:text-sm">
        <p className="leading-6 hidden lg:block">
          Custom T-shirts & Promotional Products, Fast & Free Shipping, and
          All-Inclusive Pricing
        </p>
        <div className="flex gap-7 w-full justify-between lg:justify-end">
          <div className="flex gap-3 items-center">
            <FaPhone />
            <p>818-074-6707</p>
          </div>
          <div className="flex gap-3 items-center">
            <RiCustomerServiceFill />
            <p>Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};
