"use client";
import { OrderStage, useOrder } from "../app/providers";
import ActionButton from "./ui/action-button";
import FilterCocktails from "./filter-cocktails";
import { Button } from "@/components/ui/button";
import { Calendar } from "./ui/calendar";
import React, { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import api from "@/api/api";

const Sidebar = () => {
  // Get global variables from context component.
  const {
    orderDate,
    setOrderDate,
    currentOrder,
    setCurrentOrder,
    currentStage,
    setCurrentStage,
    orderEmail,
    guestCount,
  } = useOrder();

  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [orderProgress, setOrderProgress] = useState(0);

  const handlePlaceOrder = async () => {
    if (!currentOrder || !orderEmail || !orderDate) return;

    try {
      const createOrder = {
        ...currentOrder,
        email: orderEmail,
        count: guestCount,
        date: orderDate,
      };

      const createdOrder = await api.createOrder(createOrder);
      if (createdOrder) {
        setCurrentOrder(createdOrder);
        setCurrentStage(OrderStage.RECEIPT_SCREEN);
      }
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setOrderDate(date || null);
  };

  useEffect(() => {
    switch (currentStage) {
      case OrderStage.SELECTING_DISH:
        setOrderProgress(10);
        break;
      case OrderStage.SELECTING_COCKTAILS:
        setOrderProgress(35);
        break;
      case OrderStage.CONFIRM_ORDER:
        setOrderProgress(60);
        break;
      case OrderStage.RECEIPT_SCREEN:
        setOrderProgress(100);
        break;
    }
  }, [currentStage]);

  return (
    <div className="flex flex-col gap-2">
      <p>Order Status - {currentStage}</p>

      {currentStage === OrderStage.SELECTING_DISH && (
        <div>
          <ActionButton
            stage={OrderStage.SELECTING_COCKTAILS}
            variant={"navigation"}
            text="Select Cocktails"
          />
          <div className="flex flex-row mt-2 items-center space-x-1.5">
            <p>
              <strong>1/4</strong>
            </p>
            <Progress value={orderProgress} />
          </div>
        </div>
      )}

      {currentStage === OrderStage.SELECTING_COCKTAILS && (
        <div className="flex flex-col gap-2">
          <FilterCocktails />
          <ActionButton
            stage={OrderStage.CONFIRM_ORDER}
            variant={"navigation"}
            text="Confirm Order"
          />
          <div className="flex flex-row mt-2 items-center space-x-1.5">
            <p>
              <strong>2/4</strong>
            </p>
            <Progress value={orderProgress} />
          </div>
        </div>
      )}

      {currentStage === OrderStage.CONFIRM_ORDER && (
        <div>
          <Calendar
            mode="single"
            selected={orderDate || new Date()}
            onSelect={handleDateSelect}
            className="rounded-md border shadow"
          />
          {/* <ActionButton
            stage={OrderStage.RECEIPT_SCREEN}
            variant={"place-order"}
            text="Place Order"
          /> */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={!orderEmail || !currentOrder}
          >
            Place Order
          </button>
          <div className="flex flex-row mt-2 items-center space-x-1.5">
            <p>
              <strong>3/4</strong>
            </p>
            <Progress value={orderProgress} />
          </div>
        </div>
      )}

      {currentStage === OrderStage.RECEIPT_SCREEN && (
        <div>
          <p>Thank you for your order!</p>
          <div className="flex flex-row mt-2 items-center space-x-1.5">
            <p>
              <strong>4/4</strong>
            </p>
            <Progress value={orderProgress} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
