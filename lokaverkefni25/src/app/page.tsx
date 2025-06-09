"use client";
import FindOrder from "@/components/features/find-order";
import Swiper from "@/components/ui/swiper";
import Image from "next/image";
import router from "next/router";
import api from "@/api/api";
import { Dish } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [randomDish, setRandomDish] = useState<Dish | null>(null);

  const handleNewOrder = () => {
    router.push("/order");
  };

  useEffect(() => {
    const getRandomDish = async () => {
      try {
        const randomDishResponse = await api.getRandomDish();
        // randomDish will be the selected dish of the order unless changed.
        setRandomDish(randomDishResponse);
        // Initialize the array that holds all data from all order steps with the selected dish.
        console.log("Random Dish API Response:", randomDishResponse);
      } catch (error) {
        console.error("Error in random dish api call:", error);
        window.alert(error);
      }
    };
    getRandomDish();
  }, []);

  return (
    <div className="overflow-hidden flex flex-col md:flex-row h-full md:w-full md:justify-center items-center  md:gap-8 md:mx-auto pt-20 ">
      <div className="overflow-hidden w-full md:w-[50%] h-full md:h-[95%] md:rounded-lg absolute top-0 md:static md:mt-0">
        <Swiper />
      </div>

      <div className="flex-col justify-between gap-2 hidden md:flex  md:w-[30%] h-[95%] ">
        <div className="order-1  flex hover:scale-98 ease-in-out hover:bg-card/85 transition-transform flex-col  gap-2 px-5 md:p-6 md:bg-card rounded-lg md:shadow-lg text-center">
          <h1 className="hidden md:block text-[1.5rem] font-extrabold">
          Book your table 
          </h1>
          <p>and indulge in our
          curated food and cocktail menu.</p>
          <Link className="w-xs" onClick={handleNewOrder} href={"/order"}>

            <div className="flex flex-col items-center relative">
              <Image
                className="relative rounded-lg"
                width={200}
                height={200}
                src={randomDish?.strMealThumb || "/placeholder-dish.png"}
                alt="Random dish from api"
              />
              <div className="w-[80%] absolute bottom-0 p-1 m-1 rounded-md backdrop-blur-sm">
                <h1 className="text-gray-200">
                {randomDish?.strMeal}
                </h1>
              </div>
            </div>
            <button className="w-xs  mx-auto shadow-md shadow-black bg-button-card text-white mt-8 py-3 px-2 rounded-lg hover:bg-button-primary/50 text-lg font-semibold cursor-pointer">
              Order Now
            </button>
          </Link>
        </div>
        <div className="order-2">
          <FindOrder />
        </div>
      </div>
    </div>
  );
}
