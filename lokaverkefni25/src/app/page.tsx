"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import api from "@/api/api";
import type { Cocktails, Dish, Order } from "@/types/types";
import Swiper from "@/components/ui/swiper";
import { OrderStage, useOrder } from "./providers";
import router from "next/router";

export default function Home() {
  const { setCurrentOrder, setCurrentStage } = useOrder();
  const emailRef = useRef<HTMLInputElement>(null);

  const handleFindOrder = async () => {
    const email = emailRef.current?.value;
    if (!email) return;

    try {
      console.log("Making API call to:", `/api/order/${email}`);
      const order = await api.getOrderByEmail(email);
      console.log("Response:", order);
      setCurrentOrder(order);
      setCurrentStage(OrderStage.SELECTING_DISH);
      router.push("/order");
    } catch (error) {
      console.log("Error details:", error);
    }
  };
  // const [orders, setOrders] = useState<Order[]>([]);
  // const [showOrders, setShowOrders] = useState(false);
  // const [randomDish, setRandomDish] = useState<Dish | null>(null);
  // const [cocktails, setCocktails] = useState<Cocktails | null>(null);

  // const getOrders = useCallback(async () => {
  //   try {
  //     const ordersResponse = await api.getOrders();
  //     setOrders(ordersResponse);
  //     console.log("API Response:", ordersResponse);
  //   } catch (error) {
  //     console.error("Error in getOrders:", error);
  //     window.alert(error);
  //   }
  // }, []);

  // const getRandomDIsh = useCallback(async () => {
  //   try {
  //     const randomDishResponse = await api.getRandomDish();
  //     setRandomDish(randomDishResponse);
  //     console.log("Random Dish API Response:", randomDishResponse);
  //   } catch (error) {
  //     console.error("Error in getRandomDish:", error);
  //     window.alert(error);
  //   }
  // }, []);
  // const getCocktails = useCallback(async () => {
  //   try {
  //     const cocktailsResponse = await api.getCocktails();
  //     setCocktails(cocktailsResponse);
  //     console.log("Random Dish API Response:", cocktailsResponse);
  //   } catch (error) {
  //     console.error("Error in getCocktails:", error);
  //     window.alert(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log("running useEffect for getOrders");
  //   getOrders();
  //   getRandomDIsh();
  // }, [getOrders, getRandomDIsh, getCocktails]);

  // const handleClick = () => {
  //   setShowOrders(true);
  //   getOrders();
  //   getRandomDIsh();
  // };

  return (
    <div className="flex flex-col mx-4 md:flex-row space-x-4 w-full max-w-[1200px] md:mx-auto justify-center h-full min-h-full">
      <div className="flex flex-col space-y-4 w-[100%] md:w-[40%]">
        <div className="flex flex-col grow bg-card p-6 rounded-md">
          <h1 className="text-[2.5rem] font-extrabold text-center">
            Order now
          </h1>
          <p>
            Make it a night to remember — book your table and indulge in our
            curated food and cocktail menu.
          </p>
          <button
            // onClick={}
            className="w-full bg-button-card text-white mt-auto py-2 px-4 rounded hover:bg-button-primary/50"
          >
            Order Now
          </button>
        </div>

        <div className="flex flex-col gap-2 p-6 bg-card rounded-lg shadow-lg text-center">
          <h1 className="text-[2.5rem] font-extrabold">
            Already have an order?
          </h1>

          <input
            placeholder="Input e-mail address"
            ref={emailRef}
            onChange={(e) => {}}
            type="text"
            className="w-full p-2 border rounded mt-4"
          />
          <button
            onClick={handleFindOrder}
            className="w-full bg-button-card text-white py-2 px-4 rounded hover:bg-button-primary/50"
          >
            PUSH ME
          </button>
        </div>
      </div>

      <div className="w-[40%]">
        <Swiper />
      </div>
    </div>
  );
}
