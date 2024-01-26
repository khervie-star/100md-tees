"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdButton } from "@/components";
import { FaArrowLeftLong } from "react-icons/fa6";
import mail_icon from "../../../../public/icons/mail.svg";
import { resend_verification_email } from "@/services";
import { useMutation } from "@tanstack/react-query";
import router from "next/router";
import toast from "react-hot-toast";

const CheckEmail = () => {
  const resendVerificationEmailQuery = useMutation({
    mutationFn: resend_verification_email,
    onError(error, variables, context) {
      toast.error("Failed to resend verification email. Please try again.");
    },
    onSuccess(data, variables, context) {
      router.push("/check-email");
    },
  });

  const resendVerificationEmail = () => {
    // if (userId) {
    resendVerificationEmailQuery.mutate({
      userId: "",
    });
    // }
  };
  return (
    <>
      <div className="w-full h-[70vh] flex justify-center items-center text-center">
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
                Open mail app to verify
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
                onClick={resendVerificationEmail}>
                Click to resend
              </div>
            </p>
          </div>
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

export default CheckEmail;
