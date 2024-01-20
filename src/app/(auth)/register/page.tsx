"use client";

import { MdButton } from "@/components";
import { register_user } from "@/services";
import { signup_Schema, signup_body_types } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Register = () => {
  const router = useRouter();
  const [signup_body, setSignupBody] = React.useState({
    firstName: "",
    lastName: "",
    nickName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const signupQuery = useMutation({
    mutationFn: register_user,
    onError(error: any, variables, context) {
      // Throw toast notification
      toast.error(error?.response?.data);
    },
    onSuccess(data, variables, context) {
      // Throw toast notification
      toast.success(
        "Account created successfully, Please check your email for a verification code!"
      );

      // Redirect to the intended URL or a default one
      router.push("/check-email");
    },
  });

  const signup_request = useFormik({
    initialValues: signup_body,
    validationSchema: signup_Schema,
    onSubmit: (values: signup_body_types) => {
      signupQuery.mutate(values);
    },
  });
  return (
    <>
      <form>
        <div className="lg:mb-10">
          <h2 className="font-bold text-black text-[36px] lg:text-[48px] lg:leading-[48px] mb-[40px] lg:mb-[34px]">
            Sign up
          </h2>
          <p className="font-normal text-grey lg:text-[18px] hidden lg:block">
            Have an account?{" "}
            <Link href="/login" className="font-medium text-green">
              Login
            </Link>
          </p>
        </div>
        <div>
          <div className="mb-[30px] w-full flex flex-col lg:flex-row lg:gap-[20px]">
            <div className="flex-1 mb-[30px] lg:mb-0">
              <label htmlFor="first_name" className="mb-[12px] text-grey">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Moyinoluwa"
                className="w-full bg-transparent border border-solid border-[#CBD5E0] rounded-[12px] p-[12px]"
                onChange={signup_request.handleChange}
                value={signup_request.values.firstName}
              />
              {signup_request.errors.firstName &&
                signup_request.touched.firstName && (
                  <div className="text-red-700 text-[14px] font-medium mt-[2px]">
                    {signup_request.errors.firstName}
                  </div>
                )}
            </div>
            <div className="flex-1">
              <label htmlFor="first_name" className="mb-[12px] text-grey">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Afolabi"
                className="w-full bg-transparent border border-solid border-[#CBD5E0] rounded-[12px] p-[12px]"
                onChange={signup_request.handleChange}
                value={signup_request.values.lastName}
              />
              {signup_request.errors.lastName &&
                signup_request.touched.lastName && (
                  <div className="text-red-700 text-[14px] font-medium mt-[2px]">
                    {signup_request.errors.lastName}
                  </div>
                )}
            </div>
          </div>
          <div className="mb-[30px]">
            <label htmlFor="email" className="mb-[12px] text-grey">
              Nickname
            </label>
            <input
              type="text"
              name="nickName"
              placeholder="Momo_"
              className="w-full bg-transparent border border-solid border-[#CBD5E0] rounded-[12px] p-[12px]"
              onChange={signup_request.handleChange}
              value={signup_request.values.nickName}
            />
          </div>
          {signup_request.errors.nickName &&
            signup_request.touched.nickName && (
              <div className="text-red-700 text-[14px] font-medium mt-[2px]">
                {signup_request.errors.nickName}
              </div>
            )}
          <div className="mb-[30px]">
            <label htmlFor="email" className="mb-[12px] text-grey">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="moyinoluwaafolabi@gmail.com"
              className="w-full bg-transparent border border-solid border-[#CBD5E0] rounded-[12px] p-[12px]"
              onChange={signup_request.handleChange}
              value={signup_request.values.email}
            />
            {signup_request.errors.email && signup_request.touched.email && (
              <div className="text-red-700 text-[14px] font-medium mt-[2px]">
                {signup_request.errors.email}
              </div>
            )}
          </div>
          <div className="mb-[30px]">
            <label htmlFor="password" className="mb-[12px] text-grey">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-transparent border border-solid border-[#CBD5E0] rounded-[12px] p-[12px]"
              onChange={signup_request.handleChange}
              value={signup_request.values.password}
            />
            {signup_request.errors.password &&
              signup_request.touched.password && (
                <div className="text-red-700 text-[14px] font-medium mt-[2px]">
                  {signup_request.errors.password}
                </div>
              )}
          </div>
          <div className="mb-[45px]">
            <label htmlFor="password" className="mb-[12px] text-grey">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Password"
              className="w-full bg-transparent border border-solid border-[#CBD5E0] rounded-[12px] p-[12px]"
              onChange={signup_request.handleChange}
              value={signup_request.values.confirmPassword}
            />
            {signup_request.errors.confirmPassword &&
              signup_request.touched.confirmPassword && (
                <div className="text-red-700 text-[14px] font-medium mt-[2px]">
                  {signup_request.errors.confirmPassword}
                </div>
              )}
          </div>

          <div>
            <MdButton
              extraClass="w-full"
              onClick={signup_request.handleSubmit}
              isLoading={signupQuery.isPending}>
              Sign up
            </MdButton>
          </div>
          <div className="my-[40px] flex items-center w-full gap-4">
            <div className="bg-slate h-[1px] w-full flex-1" />
            <span className="text-[12px] text-grey leading-[20px] font-medium">
              OR
            </span>
            <div className="bg-slate h-[1px] w-full flex-1" />
          </div>
          <div className="w-full flex flex-col gap-8">
            <button className="relative w-full flex bg-transparent justify-center items-center border border-solid border-[#CBD5E0] rounded-[30px] p-3 lg:p-4 text-[#67728A] text-[18px] font-medium leading-[28px]">
              <div className="icon absolute left-5">
                <Image src="/icons/google.svg" alt="" width={25} height={25} />
              </div>
              Continue with Google
            </button>
            <button className="relative w-full flex bg-transparent justify-center items-center border border-solid border-[#CBD5E0] rounded-[30px] p-3 lg:p-4 text-[#67728A] text-[18px] font-medium leading-[28px]">
              <div className="icon absolute left-5">
                <Image
                  src="/icons/facebook.svg"
                  alt=""
                  width={25}
                  height={25}
                />
              </div>
              Continue with Facebook
            </button>
          </div>
          <div className="block lg:hidden mt-[35px] lg:mt-0">
            <p className="font-normal text-grey text-[14px] lg:text-[18px] text-center">
              Have an account?{" "}
              <Link href="/login" className="font-medium text-green">
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
