"use client";
import { OrderStage, useOrder } from "../app/providers";
import ActionButton from "./ui/action-button";
import FilterCocktails from "./filter-cocktails";
import { Button } from "@/components/ui/button";
import { Calendar } from "./ui/calendar";
import React, { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

const Sidebar = () => {
  // Get global variables from context component.
  const { currentOrder, setCurrentOrder, currentStage, setCurrentStage } =
    useOrder();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [orderProgress, setOrderProgress] = useState(0);

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
    <div>
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
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
          />
          <ActionButton
            stage={OrderStage.RECEIPT_SCREEN}
            variant={"navigation"}
            text="Confirm and get Receipt"
          />
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
