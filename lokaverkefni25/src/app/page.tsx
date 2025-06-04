"use client";

import { useState, useRef } from "react";
import api from "@/api/api";
import Swiper from "@/components/ui/swiper";
import { OrderStage, useOrder } from "./providers";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { setCurrentOrder, setCurrentStage } = useOrder();
  const emailRef = useRef<HTMLInputElement>(null);



  const handleFindOrder = async () => {
    const email = emailRef.current?.value;
    if (!email) return;

    try {
      console.log(
        "Searching for existing order with API call to:",
        `/api/order/${email}`
      );
      const order = await api.getOrderByEmail(email);
      console.log("Response:", order);
      setCurrentOrder(order);
      setCurrentStage(OrderStage.SELECTING_DISH);
      router.push("/order");
    } catch (error) {
      console.log("Error details:", error);
    }
  };

  return (
    <div className="flex flex-col  md:flex-row md:gap-2  w-full md:max-w-[1200px] md:mx-auto justify-center h-full min-h-full">
      <div className="w-[100%] md:w-[40%] -mt-[90px] md:mt-0 z-0">
        <Swiper />
      </div>

      <div className="flex flex-col space-y-4 w-[100%] md:w-[40%]">
        <div className="flex flex-col order-2 gap-2 p-6 bg-card rounded-lg shadow-lg text-center">
          <h1 className="text-[2.5rem] font-extrabold">
            Already have an order?
          </h1>

          <input
            placeholder="Input e-mail address"
            ref={emailRef}
            type="text"
            className="w-full p-2 border rounded mt-4"
          />
          <button
            onClick={handleFindOrder}
            className="w-full bg-button-card text-white py-2 px-4 rounded hover:bg-button-primary/50"
          >
            Find my order
          </button>
        </div>
      </div>
    </div>
  );
}
