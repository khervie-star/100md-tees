"use client";

import { login_user } from "@/services";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import { login_schema, login_types } from "@/utils";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@/context";
import toast from "react-hot-toast";
import { MdButton } from "@/components";
import { FaArrowLeftLong } from "react-icons/fa6";
import key_icon from "../../../../../public/icons/key.svg";

const ForgotPassword = () => {
  const router = useRouter();
  const { intendedUrl, clearIntended } = useAuth()!;
  const { set_user } = useUser()!;

  const [login_body, setLoginBody] = React.useState({
    email: "",
    password: "",
  });

  const loginQuery = useMutation({
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

  const login_request = useFormik({
    initialValues: login_body,
    validationSchema: login_schema,
    onSubmit: (values: login_types) => {
      loginQuery.mutate(values);
    },
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
                Forgot password?
              </h2>
              <p className="text-grey font-medium text-[14px]">
                It happens to be the best of us, enter your email to get a reset
                link
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
            />
            <MdButton isLoading={false} extraClass="w-full">
              <Link
                href="https://mail.google.com/mail/u/0/#inbox"
                target="_blank">
                Reset password
              </Link>
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

export default ForgotPassword;
