"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Scrollbar} from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/scrollbar";

import styles from "./CarouselTwo.module.css";

export default function CarouselTwo() {
  const slides = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className={styles.container}>
      <Swiper
        modules={[Scrollbar, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        scrollbar={{ draggable: true, hide: false }}
        breakpoints={{
          0: { slidesPerView: 1.2, spaceBetween: 12 },
          480: { slidesPerView: 1.5, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 14 },
          768: { slidesPerView: 2.5, spaceBetween: 14 },
          1024: { slidesPerView: 3, spaceBetween: 16 },
          1200: { slidesPerView: 3, spaceBetween: 20 },
        }}
        className={styles.swiper}
      >
        {slides.map((id) => (
          <SwiperSlide key={id}>
            <div className={styles.slideCard}>
              <Image
                src="/slides/home/imageCarTwo.png"
                alt={`Слайд ${id}`}
                width={480}
                height={350}
                className={styles.slideImage}
                priority={id <= 3}
                loading={"eager"}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
