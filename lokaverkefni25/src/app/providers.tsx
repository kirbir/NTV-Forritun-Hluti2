"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import { Order } from "@/types/types";

export enum OrderStage {
  SELECTING_DISH = "SELECTING_DISH",
  SELECTING_COCKTAILS = "SELECTING_COCKTAILS",
  FINISH_ORDER = "FINISH_ORDER",
  RECEIPT_SCREEN = "RECEIPT_SCREEN",
  CONFIRMATION = "CONFIRMATION",
}

interface OrderContextType {
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  currentStage: OrderStage;
  setCurrentStage: (stage: OrderStage) => void;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [currentStage, setCurrentStage] = useState<OrderStage>(
    OrderStage.SELECTING_DISH
  );

  return (
    <OrderContext.Provider
      value={{ currentOrder, setCurrentOrder, currentStage, setCurrentStage }}
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
