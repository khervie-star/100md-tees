"use client";

import { login_user } from "@/services";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import { reset_password_schema, reset_password_types } from "@/utils";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@/context";
import toast from "react-hot-toast";
import { MdButton } from "@/components";
import { FaArrowLeftLong } from "react-icons/fa6";
import key_icon from "../../../../../public/icons/key.svg";

const SetNewPassword = () => {
  const router = useRouter();
  const { intendedUrl, clearIntended } = useAuth()!;
  const { set_user } = useUser()!;

  const [reset_password_body, setResetPasswordBody] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const resetPasswordQuery = useMutation({
    mutationFn: login_user,
    onError(error: any, variables, context) {
      // Throw toast notification
      toast.error(error?.response?.data);
    },
    onSuccess(data, variables, context) {
      // Set isAuthenticated to true and set userDetails to global state
      set_user(data);

      // Throw toast notification
      toast.success("Logged In!");

      // Redirect to the intended URL or a default one
      router.push(intendedUrl || "/");

      // Clear the intended URL after redirecting
      clearIntended();
    },
  });

  const resetPasswordRequest = useFormik({
    initialValues: reset_password_body,
    validationSchema: reset_password_schema,
    onSubmit: (values: reset_password_types) => {},
  });

  return (
    <>
      <div className="w-full h-[70vh] flex justify-center items-center text-center">
        <div className="flex flex-col gap-8">
          <div>
            <div className="mb-6 flex justify-center">
              <div className="w-[84px] h-[84px] flex justify-center items-center bg-green/5 rounded-full">
                <div className="w-[56px] h-[56px] flex justify-center items-center bg-green/10 rounded-full">
                  <Image src={key_icon} className="" alt="" />
                </div>
              </div>
            </div>
            <div className="">
              <h2 className="font-bold text-black text-[22px] leading-[1] mb-3">
                Set new password
              </h2>
              <p className="text-grey font-medium text-[14px]">
                Your new password must be different to previously used
                passwords.
              </p>
            </div>
          </div>
          <form className="flex flex-col gap-[24px]">
            <div>
              <label htmlFor="email" className="sr-only">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-[10px] rounded-[8px] bg-transparent border border-solid border-[#D0D5DD] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] placeholder:text-grey placeholder:text-base text-black mb-[24px] focus:ring-0 focus:outline-none focus:border-2px focus:border-green/80 transition-all duration-300"
                onChange={resetPasswordRequest.handleChange}
                value={resetPasswordRequest.values.password}
              />
              {resetPasswordRequest.errors.password &&
                resetPasswordRequest.touched.password && (
                  <div className="text-red-700 text-[14px] font-medium mt-[2px]">
                    {resetPasswordRequest.errors.password}
                  </div>
                )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-[10px] rounded-[8px] bg-transparent border border-solid border-[#D0D5DD] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] placeholder:text-grey placeholder:text-base text-black mb-[24px] focus:ring-0 focus:outline-none focus:border-2px focus:border-green/80 transition-all duration-300"
                onChange={resetPasswordRequest.handleChange}
                value={resetPasswordRequest.values.password}
              />
              {resetPasswordRequest.errors.password &&
                resetPasswordRequest.touched.password && (
                  <div className="text-red-700 text-[14px] font-medium mt-[2px]">
                    {resetPasswordRequest.errors.password}
                  </div>
                )}
            </div>

            <MdButton
              isLoading={resetPasswordQuery.isPending}
              extraClass="w-full"
              onClick={resetPasswordRequest.handleSubmit}>
              Reset password
            </MdButton>
          </form>

          <div>
            <Link
              href="/login"
              className="flex justify-center items-center gap-3 text-grey">
              <FaArrowLeftLong />
              <p className="font-normal text-[14px] lg:text-[18px] text-center">
                Back to log in
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetNewPassword;
