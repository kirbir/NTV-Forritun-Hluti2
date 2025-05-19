"use client";
import { Cocktails, Dish, OrderData } from "@/types/types";
import api from "@/api/api";
import { useEffect, useCallback, useState } from "react";
import { OrderProvider } from "../providers";

const Order = () => {
  const [randomDish, setRandomDish] = useState<Dish | null>(null);

  const getRandomDish = useCallback(async () => {
    try {
      const randomDishResponse = await api.getRandomDish();
      setRandomDish(randomDishResponse);
      console.log("Random Dish API Response:", randomDishResponse);
    } catch (error) {
      console.error("Error in getRandomDish:", error);
      window.alert(error);
    }
  }, []);

  useEffect(() => {
    getRandomDish();
    
    console.log('useEffect running now')
  }, []);

  return (
    <div>
      <p>Your dish</p>
      <p>{randomDish?.strMeal}</p>
      <button onClick={getRandomDish} className="border p-2 bg-green-600">
        Next dish
      </button>
      
      <div>
      <h2>{randomDish?.strInstructions.slice(0,100)}</h2>
      <img src={randomDish?.strMealThumb} alt="Random dish from api" />

      </div>
    </div>
  );
};

export default Order;
