/* eslint-disable @next/next/no-img-element */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import from main package
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { OrderStage, useOrder } from "@/providers";
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
  const { setCurrentOrder, setCurrentStage } = useOrder();

  const handleNewOrder = () => {
    setCurrentOrder(null);
    setCurrentStage(OrderStage.SELECTING_DISH);
    router.push("/order");
  };

  return (
    <div className=" relative h-screen md:h-[90vh] overflow-hidden">
      <div className="w-full ">
        <Swiper
          setWrapperSize={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          loop={true}
          centeredSlides={false}
          autoHeight={false}
          navigation={true}
          className="overflow-hidden"
        >
          <SwiperSlide className="w-full">
            <img
              className="object-cover md:object-top h-screen md:h-[90%] md:w-[100%] w-full hover:cursor-grab"
              src="/swiper/1.png"
              alt="Mobile image 1"
            />
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <img
              className="object-cover md:object-top h-screen md:h-[90%] md:w-[100%] w-full  hover:cursor-grab"
              src="/swiper/2.png"
              alt="Mobile image 2"
            />
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <img
              className="object-cover md:object-top h-screen  md:h-[90%] md:w-[100%] w-full hover:cursor-grab"
              src="/swiper/3.png"
              alt="Mobile image 3"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Overlay content*/}
      <div className="absolute  bottom-0 md:bottom-10 left-0 right-0 z-10 text-center md:m-10 m-4 rounded-b-lg pb-10">
        <p className="text-white mt-2 text-4xl  text-shadow-green-950 text-shadow-lg md:text-[2.2rem] font-extrabold max-w-2xl ">
          Make it a night to remember
        </p>
        <p className="text-white mt-2 text-xl">
          book your table and indulge in our curated food and cocktail menu.
        </p>
        <div className="flex flex-col justify-center items-center ">
          <div className="flex flex-col md:flex-row gap-4 mt-8 ">
            <Link className="" onClick={handleNewOrder} href={"/order"}>
              <button className="w-[170px]  shadow-xs shadow-black/40 bg-button-card text-white  md:py-2 py-3 px-2 rounded-lg hover:bg-button-primary/50 text-lg font-semibold cursor-pointer">
                Order Now
              </button>
            </Link>

            <Drawer>
              <DrawerTrigger className="w-[170px]  bg-black/40  text-white px-2 rounded-lg hover:bg-button-primary/50 text-lg font-semibold cursor-pointer">
                Already ordered?
              </DrawerTrigger>
              <DrawerContent className="bg-[#211b1c] py-3 md:py-3 fixed bottom-0 left-0 right-0 z-[100] max-h-[80vh] rounded-t-lg">
                <DrawerHeader>
                  <DrawerTitle className="text-white text-center">
                    Enter your order e-mail
                  </DrawerTitle>
                  <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <FindOrder />
                <DrawerFooter>
                  <DrawerClose></DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperComponent;
