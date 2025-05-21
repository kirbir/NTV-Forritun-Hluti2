"use client";
import { Cocktails, Dish, OrderData } from "@/types/types";
import api from "@/api/api";
import { useEffect, useCallback, useState, useContext } from "react";
import { OrderContext, OrderStage } from "../../app/providers";
import CocktailSelect from "@/components/cocktail-select";

const Order = () => {
  const [randomDish, setRandomDish] = useState<Dish | null>(null);

  // Get global variables from context component.
  const { currentOrder, setCurrentOrder, currentStage } =
    useContext(OrderContext);

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

    console.log("useEffect running now");
  }, []);

  return (
    <div>
      {currentStage === "SELECTING_DISH" && (
        <div>
          <p>Your dish</p>
          <p>{randomDish?.strMeal}</p>
          <button onClick={getRandomDish} className="border p-2 bg-green-600">
            Next dish
          </button>

          <div>
            <h2>{randomDish?.strInstructions.slice(0, 100)}</h2>
            <img src={randomDish?.strMealThumb} alt="Random dish from api" />
          </div>
        </div>
      )}
      {currentStage === "SELECTING_COCKTAILS" && <div><CocktailSelect/></div>}
      {currentStage === "CONFIRM_ORDER" && <div>Confirm Order Page</div>}
      {currentStage === "RECEIPT_SCREEN" && <div>Receipt Page</div>}
    </div>
  );
};
export default Order;
