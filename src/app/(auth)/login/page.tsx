"use client";

import { login_user } from "@/app/services/auth";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import { login_types } from "@/utils";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@/context";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const { intendedUrl, clearIntended } = useAuth()!;
  const { set_user } = useUser()!;

  const [login_body, setLoginBody] = React.useState({
    email: "",
    password: "",
  });

  const loginQuery = useMutation({
    mutationFn: (payload: login_types) => login_user(payload),
    onError(error, variables, context) {},
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
    onSubmit: (values: login_types) => {
      console.log(values);
      loginQuery.mutate(values);
    },
  });

  return (
    <>
      <form onSubmit={login_request.handleSubmit}>
        <div className="lg:mb-10">
          <h2 className="font-bold text-st_black text-[36px] lg:text-[48px] lg:leading-[48px] mb-[40px] lg:mb-[34px]">
            Sign in
          </h2>
          <p className="font-normal text-st_grey lg:text-[18px] hidden lg:block">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-green">
              Create now
            </Link>
          </p>
        </div>
        <div>
          <div className="mb-[30px]">
            <label htmlFor="email" className="mb-[12px] text-st_grey">
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
          </div>
          <div className="mb-[45px]">
            <label htmlFor="password" className="mb-[12px] text-st_grey">
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
          </div>
          <div className="flex items-center justify-between mb-[45px]">
            <div className="text-st_grey flex items-center gap-3">
              <input type="checkbox" name="rememberMe" />
              <p>Remind me</p>
            </div>
            <Link href="#" className="font-semibold text-green">
              Forgot password?
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 bg-green rounded-[30px] lg:rounded-[20px] text-white100 text-[20px] leading-[28px] font-semibold">
              Sign in
            </button>
          </div>
          <div className="my-[40px] flex items-center w-full gap-4">
            <div className="bg-st_slate h-[1px] w-full flex-1" />
            <span className="text-[12px] text-st_grey leading-[20px] font-medium">
              OR
            </span>
            <div className="bg-st_slate h-[1px] w-full flex-1" />
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
            <p className="font-normal text-st_grey text-[14px] lg:text-[18px] text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-green">
                {loginQuery.isPending ? <></> : "Create now"}
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
