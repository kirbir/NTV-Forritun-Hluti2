"use client";
import { OrderStage, useOrder } from "../../providers";
import ActionButton from "../ui/action-button";
import FilterCocktails from "../features/filter-cocktails";
import { Calendar } from "../ui/calendar";
import React, { useEffect, useState } from "react";
import api from "@/api/api";
import Link from "next/link";

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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [errors, setErrors] = useState({
    guestCount: "",
    email: "",
  });

  const handlePlaceOrder = async () => {
    console.log("currentOrder state at beginning of handlePlaceOrder: ", currentOrder);
    if (!currentOrder) return;

    try {
      const isExistingOrder = currentOrder.id && currentOrder.id > 0;

      if (isExistingOrder) {
        const updatedOrders = await api.updateOrder(currentOrder);
        // updateOrder returns an array, find the updated order
        const updatedOrder = updatedOrders?.find(
          (order) => order.email === currentOrder.email
        );
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
        window.alert(
          "An unexpected error occurred while processing your order."
        );
      }
      return;
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && date < new Date()) {
      window.alert("Please select a future date");
      return;
    }
    const selectedDate = date || new Date();
    if (currentOrder) {
      setCurrentOrder({
        ...currentOrder,
        date: selectedDate,
      });
      setOrderDate(selectedDate);
    }
  };

  const validateInput = (name: string, value: string | number) => {
    if (name === "guestCount" && (Number(value) < 1 || Number(value) > 10)) {
      setErrors((prev) => ({
        ...prev,
        guestCount: "Guest count must be between 1 and 10",
      }));
    } else if (name === "email") {
      const emailValue = String(value);
      // Basic email format validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
      } else {
        // Clear any existing email errors if the format is valid
        setErrors((prev) => ({ ...prev, email: "" }));
        // Open the calendar when email is valid
        setIsCalendarOpen(true);
      }
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
  }, [currentStage, setOrderProgress]);

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
          { stage: OrderStage.RECEIPT_SCREEN, label: "Receipt" },
        ].map((step, index) => (
          <div key={step.stage} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentStage === step.stage
                  ? "bg-[#d06656] text-white scale-110 shadow-lg"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`text-sm mt-1 transition-colors duration-300 ${
                currentStage === step.stage
                  ? "text-[#d06656] font-semibold"
                  : "text-gray-600"
              }`}
            >
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
        </div>
      )}

      {currentStage === OrderStage.CONFIRM_ORDER && (
        <div className="flex flex-col gap-2 justify-center items-center">
          <details
            className="group w-full"
            open={!!currentOrder?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentOrder.email)}
            onToggle={(e) => {
              setIsCalendarOpen(e.currentTarget.open);
            }}
          >
            <summary className="flex items-center gap-2 cursor-pointer hover:text-[#d06656] transition-colors duration-200 mb-2">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 1024 1024"
                className="group-open:rotate-180 transition-transform duration-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <path
                  d="M897.9 369.2H205c-33.8 0-61.4-27.6-61.4-61.4s27.6-61.4 61.4-61.4h692.9c33.8 0 61.4 27.6 61.4 61.4s-27.6 61.4-61.4 61.4z"
                  fill="#FFB89A"
                />
                <path
                  d="M807 171H703.3c-16.6 0-30 13.4-30 30s13.4 30 30 30H807c31.6 0 57.4 24 57.4 53.4v42.3H125.2v-42.3c0-29.5 25.7-53.4 57.4-53.4H293c16.6 0 30-13.4 30-30s-13.4-30-30-30H182.5c-64.7 0-117.4 50.9-117.4 113.4v527.7c0 62.5 52.7 113.4 117.4 113.4H807c64.7 0 117.4-50.9 117.4-113.4V284.5c0-62.6-52.7-113.5-117.4-113.5z m0 694.6H182.5c-31.6 0-57.4-24-57.4-53.4V386.8h739.2v425.4c0.1 29.5-25.7 53.4-57.3 53.4z"
                  fill="#45484C"
                />
                <path
                  d="M447.6 217.1c-12.4-6.1-27-2.8-35.7 7.1-2.2-6.7-4-16.2-4-28.1 0-13 2.2-23 4.6-29.8 9.5 8.1 23.5 9.6 34.9 2.8 14.2-8.5 18.8-27 10.3-41.2-15.5-25.9-35.9-29.7-46.6-29.7-36.6 0-63.1 41.2-63.1 97.8s26.4 98 63 98c20.6 0 39-13.4 50.4-36.7 7.3-14.9 1.1-32.9-13.8-40.2zM635.9 218.5c-12.4-6.1-27-2.8-35.7 7.1-2.2-6.7-4-16.2-4-28.1 0-13 2.2-23 4.6-29.8 9.5 8.1 23.5 9.6 34.9 2.8 14.2-8.5 18.8-27 10.3-41.2-15.5-25.9-35.9-29.7-46.6-29.7-36.6 0-63.1 41.2-63.1 97.8s26.5 97.8 63.1 97.8c20.6 0 39-13.4 50.4-36.7 7.1-14.7 0.9-32.7-13.9-40z"
                  fill="#45484C"
                />
                <path
                  d="M700.2 514.5H200.5c-16.6 0-30 13.4-30 30s13.4 30 30 30h499.7c16.6 0 30-13.4 30-30s-13.5-30-30-30zM668.4 689.8h-74c-16.6 0-30 13.4-30 30s13.4 30 30 30h74c16.6 0 30-13.4 30-30s-13.4-30-30-30zM479.3 689.8H200.5c-16.6 0-30 13.4-30 30s13.4 30 30 30h278.8c16.6 0 30-13.4 30-30s-13.4-30-30-30z"
                  fill="#33CC99"
                />
              </svg>
              <span className="font-semibold">Choose date</span>
            </summary>
            <div className="mt-4 rounded-lg p-4">
              <Calendar
                mode="single"
                selected={currentOrder?.date ? new Date(currentOrder.date) : new Date()}
                onSelect={handleDateSelect}
                className="mx-auto rounded-md bg-transparent shadow w-fit"
              />
            </div>
          </details>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-button-card hover:bg-button-primary/50 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={
              !currentOrder?.email ||
              !currentOrder ||
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentOrder.email)
            }
          >
            {currentOrder?.id ? "Update Order" : "Place Order"}
          </button>
        </div>
      )}

      {currentStage === OrderStage.RECEIPT_SCREEN && (
        <div>
          <p>Thank you for your order!</p>
          <Link className="underline" href="/">Click here to return.</Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
