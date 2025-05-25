"use client";
import { OrderStage, useOrder } from "../app/providers";
import ActionButton from "./ui/action-button";
import FilterCocktails from "./filter-cocktails";

const Sidebar = () => {
  // Get global variables from context component.
  const { currentOrder, setCurrentOrder, currentStage, setCurrentStage } =
    useOrder();

  return (
    <div>
      <p>Order Status - {currentStage}</p>

      {currentStage === OrderStage.SELECTING_DISH && (
        <ActionButton
          stage={OrderStage.SELECTING_COCKTAILS}
          variant={"navigation"}
          text="Select Cocktails"
        />
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
        <ActionButton
          stage={OrderStage.RECEIPT_SCREEN}
          variant={"navigation"}
          text="Confirm and get Receipt"
        />
      )}

      {currentStage === OrderStage.RECEIPT_SCREEN && (
        <p>Thank you for your order!</p>
      )}
    </div>
  );
};

export default Sidebar;
