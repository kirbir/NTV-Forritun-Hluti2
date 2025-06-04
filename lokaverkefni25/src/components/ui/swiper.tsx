"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import from main package
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

const SwiperComponent = () => {
  return (
    <div className="relative">
      <Swiper
        setWrapperSize={true}
        autoplay={{
          delay: 3000, // 3 seconds delay between slides
          disableOnInteraction: false, // continues autoplay even after user interaction
        }}
        autoHeight={true}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        slidesPerView={1}
        centeredSlides={false}
        centeredSlidesBounds={false}
        loop={true}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <Image
            className="object-contain h-auto w-full md:rounded-lg"
            src="/swiper/1.png"
            alt="sss"
            layout="responsive"
            width={100}
            height={500}
          ></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="object-contain h-auto w-full md:rounded-lg"
            src="/swiper/2.png"
            alt="sss"
            layout="responsive"
            width={100}
            height={500}
          ></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="object-contain h-auto w-full md:rounded-lg"
            src="/swiper/3.png"
            alt="sss"
            layout="responsive"
            width={100}
            height={500}
          ></Image>
        </SwiperSlide>
      </Swiper>

      {/* Overlay content*/}
      <div className="absolute bottom-0 left-0 right-0 z-10 text-center p-4 rounded-b-lg ">
        {/* <h1 className="text-[2rem] font-extrabold text-white">Order now</h1> */}
        <p className="text-white mt-2 text-xl md:text-3xl font-extrabold max-w-2xl mx-auto">
          Make it a night to remember — book your table and indulge in our
          curated food and cocktail menu.
        </p>
        <div >
        <Link href="/order">
        <button
          className="w-full max-w-md mx-auto  bg-button-card text-white mt-8 py-3 px-6 rounded-lg hover:bg-button-primary/50 text-lg font-semibold cursor-pointer"
        >Order Now
         
        </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default SwiperComponent;
