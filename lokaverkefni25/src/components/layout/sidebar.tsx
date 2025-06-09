"use client";
import { OrderStage, useOrder } from "../../app/providers";
import ActionButton from "../ui/action-button";
import FilterCocktails from "../features/filter-cocktails";
import { Calendar } from "../ui/calendar";
import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import api from "@/api/api";

const Sidebar = () => {
  // Get global variables from context component.
  const {
    setOrderDate,
    currentOrder,
    setCurrentOrder,
    currentStage,
    setCurrentStage,

  } = useOrder();

  const [orderProgress, setOrderProgress] = useState(0);

  const handlePlaceOrder = async () => {
    if (!currentOrder) return;

    try {
      const isExistingOrder = currentOrder.id && currentOrder.id > 0;


      if (isExistingOrder) {
        const updatedOrders = await api.updateOrder(currentOrder);
        // updateOrder returns an array, find the updated order
        const updatedOrder = updatedOrders?.find(order => order.email === currentOrder.email);
        if (updatedOrder) {
          setCurrentOrder(updatedOrder);
          setCurrentStage(OrderStage.RECEIPT_SCREEN);
        }
      } else {
        const createdOrder = await api.createOrder(currentOrder);
        if (createdOrder) {
          setCurrentOrder(createdOrder);
          setCurrentStage(OrderStage.RECEIPT_SCREEN);
        }
      }
    } catch (error) {
      console.error("Failed to process order:", error);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    const selectedDate = date || new Date();
    if (currentOrder) {
      setCurrentOrder({
        ...currentOrder,
        date: selectedDate 
      
      });
      setOrderDate(selectedDate);
    }
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

  // Clean up state and webapp after order, reset.
  useEffect(() => {
    if (currentStage === OrderStage.RECEIPT_SCREEN) {
      const timer = setTimeout(() => {
        // Only reset if still on receipt screen (user hasn't navigated away)
        if (currentStage === OrderStage.RECEIPT_SCREEN) {
          setCurrentOrder(null);
          setCurrentStage(OrderStage.SELECTING_DISH);
        }
      }, 20000);
  
      return () => clearTimeout(timer);
    }
  }, [currentStage, setCurrentOrder, setCurrentStage]);

  return (
    <div className="flex flex-col gap-2 ">
      <p>Order Status - {currentStage}</p>

      {currentStage === OrderStage.SELECTING_DISH && (
        <div className="min-h-[20vh] ">
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
        <div className="flex flex-col gap-2 justify-center items-center">
          <Calendar
            mode="single"
            selected={currentOrder?.date ? new Date(currentOrder.date): new Date()}
            onSelect={handleDateSelect}
            className="rounded-md shadow w-fit"
          />
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-button-card text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={!currentOrder?.email || !currentOrder}
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
