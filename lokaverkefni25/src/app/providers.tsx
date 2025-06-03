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
  initializeOrder: (dish: Dish) => void;
  searchValue: string;
  setSearchValue: (search: string) => void;
  searchIngredient: string;
  setSearchIngredient: (search: string) => void;
  orderDate: Date | null;
  setOrderDate: (date: Date | null) => void;
  // New form state
  orderEmail: string;
  setOrderEmail: (email: string) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
};

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined
);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchIngredient, setSearchIngredient] = useState("");
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [currentStage, setCurrentStage] = useState<OrderStage>(
    OrderStage.SELECTING_DISH
  );
  const [orderDate, setOrderDate] = useState<Date | null>(null);
  // New form state
  const [orderEmail, setOrderEmail] = useState("");
  const [guestCount, setGuestCount] = useState(1);

  const initializeOrder = (dish: Dish) => {
    const newOrder: Order = {
      id: 0,
      email: "",
      count: 1,
      date: new Date(),
      drinks: [],
      dish: {
        id: dish.idMeal,
        name: dish.strMeal,
        category: dish.strCategory,
        description: dish.strInstructions,
        imageSource: dish.strMealThumb,
        price: 0,
        area: dish.strArea
      },
    };
    setCurrentOrder(newOrder);
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
        orderDate,
        setOrderDate,
        // New form state
        orderEmail,
        setOrderEmail,
        guestCount,
        setGuestCount
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
