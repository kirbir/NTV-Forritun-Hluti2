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
  },[getOrders,    getRandomDIsh]);

  const handleClick = () => {
    
    setShowOrders(true);
    getOrders();
    getRandomDIsh();
    getCocktails();
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center mt-20 border border-red-400">
      <div className="w-auto h-auto">
        <SwiperComponent />
      </div>
      <button onClick={handleClick}>PUSH ME</button>
      <div>
        {orders && orders.length > 0 ? (
       <div>
         <p>{orders?.[0].email }</p>
         <p>{randomDish?.strMeal}</p>
         <p>Cocktails</p>
         <p>Name: {cocktails?.strDrink}</p>
         <img src={cocktails?.strDrinkThumb} alt="cocktail api image" />
       </div>
        ) : (
        <p>Loading orders...</p>
       )}
        {/* {showOrders &&
          orders?.map((orderItem,index) => (
            <div key={orderItem[index].id}>
              <p>{orderItem.}</p>
              <br></br>
              {user.age}
              <br />
            </div>
          ))} */}
      </div>
      <input
        placeholder={'Input e-mail address'}
        onChange={() => {}}
        type="text"
      />
    </div>
  );
}
