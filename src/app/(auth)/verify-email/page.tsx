"use client";

import { MdButton } from "@/components";
import { useAuth, useUser } from "@/context";
import { resend_verification_email, verify_email } from "@/services";
import { Link, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaArrowLeftLong, FaCheck, FaXmark } from "react-icons/fa6";

const VerifyEmail = ({ params }: { params: { emailToken: string } }) => {
  const router = useRouter();
  const { intendedUrl, clearIntended } = useAuth()!;
  const { set_user } = useUser()!;
  const searchParams = useSearchParams();

  const userId = searchParams.get("id");
  const token = searchParams.get("token");

  const verifyEmailQuery = useMutation({
    mutationFn: verify_email,
    onError(error, variables, context) {},
    onSuccess(data, variables, context) {
      set_user(data);
    },
  });

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
    if (userId) {
      resendVerificationEmailQuery.mutate({
        userId: userId,
      });
    }
  };

  const continueToLogin = () => {
    router.push(intendedUrl || "/");
    clearIntended();
  };

  React.useEffect(() => {
    if (userId && token) {
      verifyEmailQuery.mutateAsync({
        userId: userId,
        token: token,
      });
    }
  }, [userId, token]);

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
            <MdButton
              isLoading={resendVerificationEmailQuery.isPending}
              extraClass="w-full"
              onClick={resendVerificationEmail}>
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
            <MdButton
              isLoading={false}
              extraClass="w-full"
              onClick={continueToLogin}>
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
