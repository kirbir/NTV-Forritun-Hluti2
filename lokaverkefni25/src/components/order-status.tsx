"use client"
import { OrderContext, OrderStage } from '../app/providers';
import { useContext } from "react";
import ActionButton from '../app/order/components/action-button';


const OrderStatus = () => {
    // Get global variables from context component.
    const { currentOrder, setCurrentOrder, currentStage, setCurrentStage } = useContext(OrderContext);

return (
    <div>
        <p>Order Statu - {currentStage}</p>

        {(() => {
        switch (currentStage) {
          case OrderStage.SELECTING_DISH:
            return <ActionButton stage={OrderStage.SELECTING_COCKTAILS} primary={true} text='Select Cocktails'/>
          case 'SELECTING_COCKTAILS':
            return <ActionButton stage={OrderStage.FINISH_ORDER} primary={true} text='Confirm Order'/>
          case 'FINISH_ORDER':
            return <ActionButton stage={OrderStage.RECEIPT_SCREEN} primary={true} text='>Confirm and get Receipt'></ActionButton>
            case 'RECEIPT_SCREEN':
                return <p>Thank you for your order!</p>
          default:
            return null
        }
      })()}
    </div>
)
}

export default OrderStatus;