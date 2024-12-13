"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode } from "swiper/modules";
import { Button } from "../ui/button";

export default function Tags() {
  return (
    <div className="bg-white p-3 rounded-lg flex flex-col md:flex-row gap-5 justify-center items-center bg-black">
      <div className="overflow-x-auto w-[1112px] md:w-auto">
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          grabCursor
          spaceBetween={8}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          modules={[FreeMode]}
          className="mySwiper"
        >
          <SwiperSlide className="w-20">Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </div>
      <Button className="self-center md:self-auto bg-slate-600">Add Tag</Button>
    </div>
  );
}
