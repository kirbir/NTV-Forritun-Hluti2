"use client"
import { Cocktails, Dish, OrderData } from "@/types/types";
import api from "@/api/api";
import { useEffect, useCallback, useState } from "react";

const Order = () => {
    const [randomDish, setRandomDish] = useState<Dish | null>(null)

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

      useEffect(()=> {
getRandomDIsh();
      },[])

    return (
       <div>
        <p>Your dish</p>
        <p>{randomDish?.strMeal}</p>
        <button className="">Next dish</button>
       </div>
    )
}

export default Order;