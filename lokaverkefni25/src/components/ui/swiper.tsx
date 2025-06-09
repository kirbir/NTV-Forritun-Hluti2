/* eslint-disable @next/next/no-img-element */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import from main package
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { OrderStage, useOrder } from "@/app/providers";
import router from "next/router";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import FindOrder from "../features/find-order";

const SwiperComponent = () => {
  const { setCurrentOrder, setCurrentStage, } = useOrder();

  const handleNewOrder = () => {
    setCurrentOrder(null);
    setCurrentStage(OrderStage.SELECTING_DISH);
    router.push("/order");
  };

  return (
    <div className="relative h-screen">
      <Swiper
        setWrapperSize={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        autoHeight={false}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={false}
        pagination={{ clickable: true }}
        slidesPerView={1}
        centeredSlides={false}
        centeredSlidesBounds={false}
        loop={true}
        scrollbar={{ draggable: true }}
       
      >
        <SwiperSlide className="relative">
          <img
            className="object-cover  h-screen md:h-full  w-full  md:rounded-lg hover:cursor-grab"
            src="/swiper/1.png"
            alt="sss"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-cover  h-screen md:h-full  w-full   md:rounded-lg hover:cursor-grab"
            src="/swiper/2.png"
            alt="sss"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-cover  h-screen md:h-full   w-full md:rounded-lg hover:cursor-grab"
            src="/swiper/3.png"
            alt="sss"
          />
        </SwiperSlide>
      </Swiper>

      {/* Overlay content*/}
      <div className="absolute h-[50%] bottom-10 left-0 right-0 z-10 text-center p-4 rounded-b-lg ">
        {/* <h1 className="text-[2rem] font-extrabold text-white">Order now</h1> */}
        <p className="text-white mt-2 text-4xl  text-shadow-green-950 text-shadow-lg md:text-[2.2rem] font-extrabold max-w-2xl mx-auto">
          Make it a night to remember
        </p>
        <p className="text-white mt-2 text-xl">
        book your table and indulge in our
        curated food and cocktail menu.
        </p>
        <div className="flex flex-col justify-center items-center" >
          <Link className="w-xs" onClick={handleNewOrder} href={"/order"}>
            <button className="w-xs md:hidden mx-auto shadow-md shadow-black bg-button-card text-white mt-8 py-3 px-2 rounded-lg hover:bg-button-primary/50 text-lg font-semibold cursor-pointer">
              Order Now
            </button>
          </Link>

            <Drawer>
              <DrawerTrigger className="w-xs md:hidden max-w-md mx-auto border-2 bg-black/40 border-button-card text-white mt-2 py-3 px-6 rounded-lg hover:bg-button-primary/50 text-lg font-semibold cursor-pointer">Already ordered?</DrawerTrigger>
              <DrawerContent className="bg-[#211b1c] fixed bottom-0 left-0 right-0 z-[100] max-h-[80vh] rounded-t-lg">
                <DrawerHeader>
                  <DrawerTitle className="text-white text-center">Enter your order e-mail</DrawerTitle>
                  <DrawerDescription>
                  </DrawerDescription>
                </DrawerHeader>
                <FindOrder/>
                <DrawerFooter>
                  <DrawerClose>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

        </div>
      </div>
    </div>
  );
};

export default SwiperComponent;
