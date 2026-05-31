"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

export default function CarouselOne() {
  return (
    <Swiper
      loop={true}
      spaceBetween={10}
      slidesPerView={1}
      style={{
        width: "100%",
        maxWidth: "1180px",
        aspectRatio: "1180 / 435",
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
          src="/slides/home/banner1.svg"
          alt="Slide 1"
          width={1180}
          height={435}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/slides/home/banner2.svg"
          alt="Slide 2"
          width={1180}
          height={435}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/slides/home/banner3.svg"
          alt="Slide 3"
          width={1180}
          height={435}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </SwiperSlide>
    </Swiper>
  );
}
