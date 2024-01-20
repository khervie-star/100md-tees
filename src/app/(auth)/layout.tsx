"use client";

import Image from "next/image";
import Link from "next/link";
import pattern from "../../../public/icons/pattern.svg";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCreative,
} from "swiper/modules";
import { authScreenSliders } from "@/utils";
import { useAuth } from "@/context";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth()!;

  React.useEffect(() => {
    if (isAuthenticated) {
      window.location.replace("/");
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full h-full lg:w-screen lg:min-h-screen">
      <div className="w-full lg:min-h-screen flex flex-col lg:flex-row">
        <div className="w-full h-full lg:min-h-screen lg:w-1/2 bg-white100 px-[25px] py-[30px] lg:px-[42px] lg:py-[50px] font-outfit">
          <div className="relative mb-[52px] lg:mb-[60px]">
            <Link href="/">
              <Image
                src={"/logo.png"}
                alt="100MD Tees"
                width={150}
                height={40}
                className="ml-[-4px] lg:ml-0"
              />
            </Link>
          </div>
          <div className="lg:px-[50px]">{children}</div>
        </div>
        <div className="hidden lg:block w-full h-[inherit] lg:w-1/2 bg-green overflow-y-hidden">
          <div className="relative w-full h-full">
            <div className="absolute -top-2 -right-6">
              <Image src={pattern} alt="" className="" />
            </div>
            <div className="absolute -bottom-[240px] -left-6">
              <Image src={pattern} alt="" className="" />
            </div>
            <div className="relative w-full h-full lg:p-36 flex items-center justify-center">
              <Swiper
                spaceBetween={30}
                loop={true}
                effect={"creative"}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={true}
                modules={[EffectCreative, Navigation, Pagination, Autoplay]}
                creativeEffect={{
                  prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                  },
                  next: {
                    translate: ["100%", 0, 0],
                  },
                }}
                className="mySwiper !w-full ">
                {authScreenSliders.map((slide, i) => (
                  <SwiperSlide className="" key={i}>
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <div>
                            <div className="w-full h-[300px] relative lg:mb-16 shadow-[0px_24px_48px_-12px_rgba(16,24,40,0.18)]">
                              <Image
                                src={slide.image}
                                alt=""
                                sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%, 33vw"
                                fill
                                className="rounded-[8px] object-cover"
                              />
                            </div>

                            <div
                              className={`w-full text-center flex flex-col justify-center items-center font-jk_sans ${
                                isActive ? "block" : "hidden"
                              }`}>
                              <p className="text-white font-semibold text-[20px] leading-[150%] mb-2 text-center">
                                {slide.title}
                              </p>
                              <p className="text-white/75 font-normal text-[15px] leading-[150%] mb-2 text-center font-outfit">
                                {slide.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
