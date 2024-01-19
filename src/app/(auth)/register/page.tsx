import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register = () => {
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
              />
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
              />
            </div>
          </div>
          <div className="mb-[30px]">
            <label htmlFor="email" className="mb-[12px] text-grey">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full bg-transparent border border-solid border-[#CBD5E0] rounded-[12px] p-[12px]"
            />
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
            />
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
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 bg-green rounded-[30px] lg:rounded-[20px] text-white100 text-[20px] leading-[28px] font-semibold">
              Sign up
            </button>
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
