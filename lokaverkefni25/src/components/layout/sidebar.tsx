"use client";
import { OrderStage, useOrder } from "../../providers";
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
      if (error instanceof Error) {
        window.alert(error.message);
      } else {
       window.alert("An unexpected error occurred while processing your order.") 
      }
     return;
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
  }, [currentStage,setOrderProgress]);

  // Clean up the state and webapp after order, reset.
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
      <div className="flex justify-between items-center mb-4">
        {[
          { stage: OrderStage.SELECTING_DISH, label: "Dish" },
          { stage: OrderStage.SELECTING_COCKTAILS, label: "Drinks" },
          { stage: OrderStage.CONFIRM_ORDER, label: "Confirm" },
          { stage: OrderStage.RECEIPT_SCREEN, label: "Receipt" }
        ].map((step, index) => (
          <div key={step.stage} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentStage === step.stage 
                  ? 'bg-[#d06656] text-white scale-110 shadow-lg' 
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-sm mt-1 transition-colors duration-300 ${
              currentStage === step.stage ? 'text-[#d06656] font-semibold' : 'text-gray-600'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {currentStage === OrderStage.SELECTING_DISH && (
        <div className="flex flex-col gap-2 ">
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
          <details className="group w-full" open={!!currentOrder?.email}>
            <summary className="flex items-center gap-2 cursor-pointer hover:text-[#d06656] transition-colors duration-200 mb-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="group-open:rotate-180 transition-transform duration-200"
              >
                <path d="M8 2v4M16 2v4M3.5 9.5h17M21 19v-8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2Z" />
              </svg>
              <span className="font-semibold">Choose date</span>
            </summary>
            <div className="mt-4">
              <Calendar
                mode="single"
                selected={currentOrder?.date ? new Date(currentOrder.date): new Date()}
                onSelect={handleDateSelect}
                className="rounded-md shadow w-fit"
              />
            </div>
          </details>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-button-card text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={!currentOrder?.email || !currentOrder}
          >
            {currentOrder?.id ? "Update Order" : "Place Order"}
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
