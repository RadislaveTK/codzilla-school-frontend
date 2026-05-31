"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function CarouselOne() {
  const isMobile = useIsMobile();

  return (
    <Swiper
      loop={true}
      spaceBetween={10}
      slidesPerView={1}
      style={{
        width: "100%",
        maxWidth: isMobile ? "340px" : "1180px",
        aspectRatio: isMobile ? "340 / 590" : "1180 / 435",
        height: "auto",
        minHeight: "auto",
        borderRadius: "20px",
        overflow: "hidden",
      }}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <Image
          src={
            isMobile
              ? "/slides/home/banner1MB.svg"
              : "/slides/home/banner1PC.svg"
          }
          alt="Slide 1"
          width={isMobile ? 340 : 1180}
          height={isMobile ? 590 : 435}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={
            isMobile
              ? "/slides/home/banner1MB.svg"
              : "/slides/home/banner2PC.svg"
          }
          alt="Slide 2"
          width={isMobile ? 340 : 1180}
          height={isMobile ? 590 : 435}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={
            isMobile
              ? "/slides/home/banner1MB.svg"
              : "/slides/home/banner3PC.svg"
          }
          alt="Slide 3"
          width={isMobile ? 340 : 1180}
          height={isMobile ? 590 : 435}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </SwiperSlide>
    </Swiper>
  );
}
