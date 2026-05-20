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
      width={1180}
      height={435}
      style={{
        width:"100%",
        maxWidth: "1180px",
        height: "435px",
        minHeight: "435px",
        borderRadius: "20px",
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
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/slides/home/banner2.svg"
          alt="Slide 2"
          width={1180}
          height={435}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/slides/home/banner3.svg"
          alt="Slide 3"
          width={1180}
          height={435}
        />
      </SwiperSlide>
    </Swiper>
  );
}
