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
import { Checkbox } from "@nextui-org/react";

const Login = () => {
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
      <form onSubmit={login_request.handleSubmit}>
        <div className="lg:mb-10">
          <h2 className="font-bold text-black text-[36px] lg:text-[48px] lg:leading-[48px] mb-[40px] lg:mb-[34px]">
            Sign in
          </h2>
          <p className="font-normal text-grey lg:text-[18px] hidden lg:block">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-green">
              Create now
            </Link>
          </p>
        </div>
        <div className="text-black">
          <div className="mb-[30px]">
            <label htmlFor="email" className="mb-[12px] text-grey">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full bg-transparent border border-solid border-[#CBD5E0] rounded-[12px] p-[12px]"
              onChange={login_request.handleChange}
              value={login_request.values.email}
            />
            {login_request.errors.email && login_request.touched.email && (
              <div className="text-red-700 text-[14px] font-medium mt-[2px]">
                {login_request.errors.email}
              </div>
            )}
          </div>
          <div className="mb-[45px]">
            <label htmlFor="password" className="mb-[12px] text-grey">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-transparent border border-solid border-[#CBD5E0] rounded-[12px] p-[12px]"
              onChange={login_request.handleChange}
              value={login_request.values.password}
            />
            {login_request.errors.password &&
              login_request.touched.password && (
                <div className="text-red-700 text-[14px] font-medium mt-[2px]">
                  {login_request.errors.password}
                </div>
              )}
          </div>
          <div className="flex items-center justify-between mb-[45px]">
            <Checkbox defaultSelected color="primary" className="!text-white">
              Remind me
            </Checkbox>
            <Link href="/password/forgot" className="font-semibold text-green">
              Forgot password?
            </Link>
          </div>
          <div>
            <MdButton
              extraClass="w-full"
              onClick={login_request.handleSubmit}
              isLoading={loginQuery.isPending}>
              Sign in
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
            {" "}
            <p className="font-normal text-grey text-[14px] lg:text-[18px] text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-green">
                Create now
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
