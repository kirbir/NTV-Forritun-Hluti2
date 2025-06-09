"use client";
import { Dish } from "@/types/types";
import api from "@/api/api";
import Image from "next/image";
import { useEffect, useCallback, useState } from "react";
import { useOrder } from "../../app/providers";
import CocktailSelect from "@/components/features/select-cocktails";
import ConfirmOrder from "@/app/order/confirm-order";
import Receipt from "@/app/order/receipt-screen";
import SelectCocktails from "@/components/features/select-cocktails";

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
        strInstructions: currentOrder.dish.description,
        strMealThumb: currentOrder.dish.imageSource,
      };
      setRandomDish(existingDish);
    }
  }, [currentOrder, initializeOrder]);

  return (
    <div className="">
      {currentStage === "SELECTING_DISH" && (
        <div className="relative  mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-5 text-[2rem]">{randomDish?.strMeal}</h2>
          <div className="flex flex-col  justify-center absolute top-0 right-0">
            <button
              onClick={getRandomDish}
              className="text-right text-lg p-1 m-1 group"
            >
              <span className="text-md font-semibold border border-blue-500 rounded-full bg-blue-400 text-white pb-1 pt-1 pl-2 pr-2 flex items-center gap-1 transition-all duration-300 hover:bg-blue-500">
                Next dish 
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </button>
          </div>

          <div className="relative w-[100%]">
            <Image
              className="rounded-lg inset-shadow-2xs shadow-black/55"
              width={600}
              height={600}
              src={randomDish?.strMealThumb || "/placeholder-dish.png"}
              alt="Random dish from api"
            />
            <div className="absolute bottom-0 p-2 m-2 rounded-md backdrop-blur-sm">
              <h3>{randomDish?.strInstructions.slice(0, 100)}</h3>
            </div>
            <div className="flex flex-row absolute top-5 left-5 pl-2 pr-2 pt-1 pb-1 bg-black/40 rounded-full">
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 1024 1024"
                className="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M511.64164 924.327835c-228.816869 0-414.989937-186.16283-414.989937-414.989937S282.825796 94.347961 511.64164 94.347961c102.396724 0 200.763434 37.621642 276.975315 105.931176 9.47913 8.499272 10.266498 23.077351 1.755963 32.556481-8.488009 9.501656-23.054826 10.266498-32.556481 1.778489-67.723871-60.721519-155.148319-94.156494-246.174797-94.156494-203.396868 0-368.880285 165.482394-368.880285 368.880285S308.243749 878.218184 511.64164 878.218184c199.164126 0 361.089542-155.779033 368.60998-354.639065 0.49556-12.720751 11.032364-22.863359 23.910794-22.177356 12.720751 0.484298 22.649367 11.190043 22.15483 23.910794-8.465484 223.74966-190.609564 399.015278-414.675604 399.015278z"
                    fill="#22C67F"
                  ></path>
                  <path
                    d="M960.926616 327.538868l-65.210232-65.209209-350.956149 350.956149-244.56832-244.566273-65.210233 65.209209 309.745789 309.743741 0.032764-0.031741 0.03174 0.031741z"
                    fill="#74E8AE"
                  ></path>
                </g>
              </svg>
              <p className="text-green-300 text-md pl-1">Selected dish</p>
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
