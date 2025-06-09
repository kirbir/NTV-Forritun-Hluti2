"use client";
import { Dish } from "@/types/types";
import api from "@/api/api";
import Image from "next/image";
import { useEffect, useCallback, useState } from "react";
import { useOrder } from "../../providers";
import ConfirmOrder from "@/components/features/confirm-order";
import Receipt from "@/components/features/receipt-screen";
import SelectCocktails from "@/components/features/select-cocktails";
import NextIcon from "@/components/ui/icons/next-icon";
import CheckedIcon from "@/components/ui/icons/checked-icon";

const Order = () => {
  const [randomDish, setRandomDish] = useState<Dish | null>(null);

  // Get global variables from context component.
  const { currentStage, initializeOrder, currentOrder } = useOrder();

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
    // Only fetch a new dish if there's no existing order
    if (!currentOrder) {
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
    } else {
      // If there's an existing order, set the dish from that order
      const existingDish: Dish = {
        idMeal: currentOrder.dish.id,
        strMeal: currentOrder.dish.name,
        strCategory: currentOrder.dish.category,
        strArea: currentOrder.dish.area,
        strInstructions: currentOrder.dish.description || "",
        strMealThumb: currentOrder.dish.imageSource,
      };
      setRandomDish(existingDish);
    }
  }, [currentOrder, initializeOrder]);

  return (
    <div className="">
      {currentStage === "SELECTING_DISH" && (
        <div className="relative  mx-auto p-6  rounded-lg bg-white/40 backdrop-blur-2xl shadow-lg">
          <h2 className="mb-5 text-[1.5rem] md:text-[2rem]">
            {randomDish?.strMeal}
          </h2>

          <div className="relative w-[100%]">
            <Image
              className="rounded-lg  shadow-sm"
              width={600}
              height={600}
              src={randomDish?.strMealThumb || "/placeholder-dish.png"}
              alt="Random dish from api"
            />
            <div className=" p-1 m-1 rounded-md ">
              <h3 className="text-sm md:text-xl text-button-primary">
                {randomDish?.strInstructions?.slice(0, 100) || ""}
              </h3>
            </div>
            <div className="flex flex-row absolute top-0 left-0 p-1 m-2 bg-black/40 rounded-full">
              <CheckedIcon />
              <p className="text-green-300 text-md pl-1">Selected dish</p>
            </div>
            <div className="flex flex-col  justify-center absolute top-0 right-0">
              <button
                onClick={getRandomDish}
                className="text-right text-lg p-1 m-1 group"
              >
                <span className="text-sm md:text-md font-semibold border rounded-full bg-sky-700/70 text-white text-shadow-2xs shadow-black p-1 flex items-center gap-1 transition-all duration-300 hover:bg-sky-500 ">
                  See next dish
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    <NextIcon />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
      {currentStage === "SELECTING_COCKTAILS" && (
        <div>
          <SelectCocktails />
        </div>
      )}
      {currentStage === "CONFIRM_ORDER" && <ConfirmOrder />}
      {currentStage === "RECEIPT_SCREEN" && <Receipt />}
    </div>
  );
};
export default Order;
