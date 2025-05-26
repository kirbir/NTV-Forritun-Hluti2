"use client";
import { Cocktails, Dish, } from "@/types/types";
import api from "@/api/api";
import { useEffect, useCallback, useState, useContext } from "react";
import { OrderContext, OrderStage } from "../../app/providers";
import CocktailSelect from "@/components/cocktail-select";
import ConfirmOrder from "@/components/confirm-order";

const Order = () => {
  const [randomDish, setRandomDish] = useState<Dish | null>(null);

  // Get global variables from context component.
  const { currentOrder, setCurrentOrder, currentStage, initializeOrder } =
    useContext(OrderContext);

  const getRandomDish = useCallback(async () => {
    try {
      const randomDishResponse = await api.getRandomDish();
      // randomDish will be the selected dish of the order
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
    console.log("Initial dish fetch running");
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
      {currentStage === "CONFIRM_ORDER" && <ConfirmOrder/>}
      {currentStage === "RECEIPT_SCREEN" && <div>Receipt Page</div>}
    </div>
  );
};
export default Order;
