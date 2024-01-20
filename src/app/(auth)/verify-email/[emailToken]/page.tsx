"use client";

import { MdButton } from "@/components";
import { verify_email } from "@/services";
import { Link, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { FaArrowLeftLong, FaCheck, FaXmark } from "react-icons/fa6";

const VerifyEmail = ({ params }: { params: { emailToken: string } }) => {
  const { emailToken } = params;

  const verifyEmailQuery = useMutation({
    mutationFn: verify_email,
    onError(error, variables, context) {},
    onSuccess(data, variables, context) {},
  });

  React.useEffect(() => {
    if (emailToken) {
      verifyEmailQuery.mutateAsync({
        otp: emailToken,
      });
    }
  }, [emailToken]);

  console.log(verifyEmailQuery.status);

  if (verifyEmailQuery.isPending) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center text-center">
        <div className="flex flex-col gap-8">
          <Spinner size="lg" color="secondary" />
          <p className="text-base lg:text-[21px] text-grey font-semibold">
            Verifying Email
          </p>
        </div>
      </div>
    );
  }

  if (verifyEmailQuery.isError) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center text-center">
        <div className="flex flex-col gap-8 w-full">
          <div>
            <div className="mb-6 flex justify-center">
              <div className="w-[70px] h-[70px] flex justify-center items-center bg-red-700/5 rounded-full">
                <div className="w-[42px] h-[42px] flex justify-center items-center bg-red-700/10 rounded-full">
                  <FaXmark className="text-red-700 text-[21px]" />
                </div>
              </div>
            </div>
            <div className="">
              <h2 className="font-bold text-red-700/75 text-[22px] leading-[1] mb-3">
                Verification Failed
              </h2>
              <p className="text-grey font-semibold text-[14px]">
                Failure reason
              </p>
            </div>
          </div>
          <div>
            <MdButton isLoading={false} extraClass="w-full">
              Resend verification mail
            </MdButton>
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
    );
  }

  if (verifyEmailQuery.isSuccess) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center text-center">
        <div className="flex flex-col gap-8 w-full">
          <div>
            <div className="mb-6 flex justify-center">
              <div className="w-[70px] h-[70px] flex justify-center items-center bg-green/5 rounded-full">
                <div className="w-[42px] h-[42px] flex justify-center items-center bg-green/10 rounded-full">
                  <FaCheck className="text-green text-[21px]" />
                </div>
              </div>
            </div>
            <div className="">
              <h2 className="font-bold text-green text-[22px] leading-[1] mb-3">
                Verification Success
              </h2>
              <p className="text-grey font-semibold text-[14px]">
                Your email has been verified. Click the button below to
                continue.
              </p>
            </div>
          </div>
          <div>
            <MdButton isLoading={false} extraClass="w-full">
              Continue
            </MdButton>
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
    );
  }

  return null;
};

export default VerifyEmail;
