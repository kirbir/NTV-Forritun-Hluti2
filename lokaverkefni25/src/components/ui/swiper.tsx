"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import from main package
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SwiperComponent = () => {
  return (
    <div className="w-[500px]">
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
              className="object-contain h-auto w-full"
              src="/swiper/1.png"
              alt="sss"
              layout="responsive"
              width={100}
              height={500}
            ></Image>
          </SwiperSlide>
          <SwiperSlide>
            <Image
              className="object-contain h-auto w-full"
              src="/swiper/2.png"
              alt="sss"
              layout="responsive"
              width={100}
              height={500}
            ></Image>
          </SwiperSlide>
          <SwiperSlide>
            <Image
              className="object-contain h-auto w-full"
              src="/swiper/3.png"
              alt="sss"
              layout="responsive"
              width={100}
              height={500}
            ></Image>
          </SwiperSlide>
        </Swiper>
    </div>
  );
};

export default SwiperComponent;
