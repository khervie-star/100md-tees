"use client";

import { reset_password } from "@/services";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import { reset_password_schema } from "@/utils";

import toast from "react-hot-toast";
import { MdButton } from "@/components";
import { FaArrowLeftLong } from "react-icons/fa6";
import key_icon from "../../../../../public/icons/key.svg";
import mail_icon from "../../../../public/icons/mail.svg";

const ForgotPassword = () => {
  const [resetStatus, setResetStatus] = React.useState(false);

  const resetPasswordQuery = useMutation({
    mutationFn: reset_password,
    onError(error: any, variables, context) {
      toast.error(error?.response?.data);
    },
    onSuccess(data, variables, context) {
      setResetStatus(true);
    },
  });

  const reset_password_request = useFormik({
    initialValues: { email: "" },
    validationSchema: reset_password_schema,
    onSubmit: (values: { email: string }) => {
      resetPasswordQuery.mutate(values);
    },
  });

  return (
    <>
      <div className="w-full h-[70vh] flex justify-center items-center text-center">
        <div className="flex flex-col gap-8">
          {resetStatus && (
            <div className="flex flex-col gap-8">
              <div>
                <div className="mb-6 flex justify-center">
                  <div className="w-[84px] h-[84px] flex justify-center items-center bg-green/5 rounded-full">
                    <div className="w-[56px] h-[56px] flex justify-center items-center bg-green/10 rounded-full">
                      <Image src={mail_icon} className="" alt="" />
                    </div>
                  </div>
                </div>
                <div className="">
                  <h2 className="font-bold text-black text-[22px] leading-[1] mb-3">
                    Check your email
                  </h2>
                  <p className="text-grey font-semibold text-[14px]">
                    A reset link has been sent to your email to verify.
                  </p>
                </div>
              </div>
              <div>
                <MdButton isLoading={false} extraClass="w-full">
                  <Link
                    href="https://mail.google.com/mail/u/0/#inbox"
                    target="_blank">
                    Open mail app
                  </Link>
                </MdButton>
              </div>
              <div>
                <p className="font-normal text-grey text-[14px] lg:text-[18px] text-center">
                  Didn&apos;t receive the email?{" "}
                  <div
                    className="font-medium text-green"
                    onClick={() => reset_password_request.handleSubmit}>
                    Click to resend
                  </div>
                </p>
              </div>
            </div>
          )}
          {!resetStatus && (
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
                    Forgot password?
                  </h2>
                  <p className="text-grey font-medium text-[14px]">
                    It happens to be the best of us, enter your email to get a
                    reset link
                  </p>
                </div>
              </div>
              <form>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-[10px] rounded-[8px] bg-transparent border border-solid border-[#D0D5DD] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] placeholder:text-grey placeholder:text-base text-black mb-[24px] focus:ring-0 focus:outline-none focus:border-2px focus:border-green/80 transition-all duration-300"
                  onChange={reset_password_request.handleChange}
                  value={reset_password_request.values.email}
                />
                <MdButton
                  isLoading={resetPasswordQuery.isPending}
                  extraClass="w-full"
                  onClick={reset_password_request.handleSubmit}>
                  Reset password
                </MdButton>
              </form>
            </div>
          )}

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

export default ForgotPassword;
