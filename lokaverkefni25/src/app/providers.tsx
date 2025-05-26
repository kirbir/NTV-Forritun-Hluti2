"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Dish, Order } from "@/types/types";

export enum OrderStage {
  SELECTING_DISH = "SELECTING_DISH",
  SELECTING_COCKTAILS = "SELECTING_COCKTAILS",
  CONFIRM_ORDER = "CONFIRM_ORDER",
  RECEIPT_SCREEN = "RECEIPT_SCREEN",
  CONFIRMATION = "CONFIRMATION",
}

type OrderContextType = {
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  currentStage: OrderStage;
  setCurrentStage: (stage: OrderStage) => void;
  initializeOrder: (dish:Dish) => void;
  searchValue: string;
  setSearchValue: (search: string) => void;
  searchIngredient: string;
  setSearchIngredient: (search: string) => void;
  // orderProgress: number;
  // setOrderProgress: (value:number) => void;
};

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined
);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchIngredient, setSearchIngredient] = useState("");
  // const [orderProgress, setOrderProgress] = useState(0);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [currentStage, setCurrentStage] = useState<OrderStage>(
    OrderStage.SELECTING_DISH
  );
  const initializeOrder = (dish: Dish) => {
    const newOrder: Order = {
      id: 0,
      email: "",
      count: 1,
      date: new Date(),
      drinks: [],
      dish: {
        id: Number(dish.idMeal),
        category: dish.strCategory,
        cousine: dish.strArea,
        description: dish.strInstructions,
        imageSource: dish.strMealThumb,
        name: dish.strMeal,
        price: 0,
      },
    };
    setCurrentOrder(newOrder);
    console.log('Current order status:', currentOrder)
  };

  return (
    <OrderContext.Provider
      value={{
        currentOrder,
        setCurrentOrder,
        initializeOrder,
        currentStage,
        setCurrentStage,
        searchValue,
        setSearchValue,
        searchIngredient,
        setSearchIngredient,
        // orderProgress,
        // setOrderProgress(value) {
            
        // },
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// Custom hook to use the order context
export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
