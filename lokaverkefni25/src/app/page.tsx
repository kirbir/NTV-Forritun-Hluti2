"use client";

import SwiperComponent from "@/components/ui/swiper";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import api from "@/api/api";
import { Cocktails,Dish, Order } from "@/types/types";


export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrders, setShowOrders] = useState(false);
  const [randomDish, setRandomDish] = useState<Dish | null>(null)
  const [cocktails, setCocktails] = useState<Cocktails | null>(null)

  const getOrders = useCallback(async () => {
    try {
      const ordersResponse = await api.getOrders();
      setOrders(ordersResponse);
      console.log("API Response:", ordersResponse);
    } catch (error) {
      console.error("Error in getOrders:", error);
      window.alert(error);
    }
  }, []);

  const getRandomDIsh = useCallback(async () => {
    try {
      const randomDishResponse = await api.getRandomDish();
      setRandomDish(randomDishResponse);
      console.log("Random Dish API Response:", randomDishResponse);
    } catch (error) {
      console.error("Error in getRandomDish:", error);
      window.alert(error);
    }
  }, []);
  const getCocktails = useCallback(async () => {
    try {
      const cocktailsResponse = await api.getCocktails();
      setCocktails(cocktailsResponse);
      console.log("Random Dish API Response:", cocktailsResponse);
    } catch (error) {
      console.error("Error in getCocktails:", error);
      window.alert(error);
    }
  }, []);



  useEffect(() => {
    console.log('running useEffect for getOrders')
    getOrders();
    getRandomDIsh();
    getCocktails();
  },[getOrders,    getRandomDIsh, getCocktails]);

  const handleClick = () => {
    
    setShowOrders(true);
    getOrders();
    getRandomDIsh();
    getCocktails();
  };

  return (
    <div className="flex w-full mx-auto px-10">
      {/* Left side - Swiper */}
      <div className="w-1/2">
        <SwiperComponent />
      </div>

      {/* Right side - Content */}
      <div className="w-1/2 p-4 border-l border-red-500">
        <div className="mb-4">
          {orders && orders.length > 0 ? (
            <div>
              <p>{orders?.[0].email}</p>
    ðas
    
              <p>Cocktails</p>
              <p>Name: {cocktails?.strDrink}</p>
              <img src={cocktails?.strDrinkThumb} alt="cocktail api image" />
            </div>
          ) : (
            <p>Loading orders...</p>
          )}
        </div>

        <button
          onClick={handleClick}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          PUSH ME
        </button>
        <input
          placeholder="Input e-mail address"
          onChange={() => {}}
          type="text"
          className="w-full p-2 border rounded mt-4"
        />
      </div>
    </div>
  );
}
