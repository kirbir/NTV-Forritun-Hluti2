"use client";
import { Dish } from "@/types/types";
import api from "@/api/api";
import Image from "next/image";
import { useEffect, useCallback, useState } from "react";
import { useOrder } from "../../app/providers";
import CocktailSelect from "@/components/cocktail-select";
import ConfirmOrder from "@/components/confirm-order";
import Receipt from "@/components/receipt-screen";

const Order = () => {
  const [randomDish, setRandomDish] = useState<Dish | null>(null);

  // Get global variables from context component.
  const { currentStage, initializeOrder } = useOrder();

  const getRandomDish = useCallback(async () => {
    try {
      const randomDishResponse = await api.getRandomDish();
      // randomDish will be the selected dish of the order unless changed.
      setRandomDish(randomDishResponse);
      // Initialize the array that holds all data from all order steps with the selected dish.
      initializeOrder(randomDishResponse);
      console.log("Random Dish API Response:", randomDishResponse);
    } catch (error) {
      console.error("Error in random dish api call:", error);
      window.alert(error);
    }
  }, [initializeOrder]);

  useEffect(() => {
    const fetchInitialDish = async () => {
      try {
        const randomDishResponse = await api.getRandomDish();
        setRandomDish(randomDishResponse);
        initializeOrder(randomDishResponse);
        console.log("Initial Dish API Response:", randomDishResponse);
      } catch (error) {
        console.error("Error in fetchInitialDish:", error);
        window.alert(error);
      }
    };

    fetchInitialDish();
  }, []);

  return (
    <div>
      {currentStage === "SELECTING_DISH" && (
        <div className="relative max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <p>Selected dish</p>
          <h2>{randomDish?.strMeal}</h2>
          <div className="flex flex-col justify-center absolute top-0 right-0">
            <button onClick={getRandomDish} className="border border-gray-400 rounded-md text-right text-2xl p-1 m-1">
              <span className="text-xl"> Next dish</span>⏭️
            </button>
          </div>

          <div className="relative w-[100%]">
            <Image
            className=""
              width={800}
              height={800}
              src={randomDish?.strMealThumb || "/placeholder-dish.png"}
              alt="Random dish from api"
            />
            <div className="absolute bottom-0 p-2 m-2 rounded-md backdrop-blur-sm">
              <h3 >{randomDish?.strInstructions.slice(0, 100)}</h3>
            </div>
          </div>
        </div>
      )}
      {currentStage === "SELECTING_COCKTAILS" && (
        <div>
          <CocktailSelect />
        </div>
      )}
      {currentStage === "CONFIRM_ORDER" && <ConfirmOrder />}
      {currentStage === "RECEIPT_SCREEN" && <Receipt />}
    </div>
  );
};
export default Order;
