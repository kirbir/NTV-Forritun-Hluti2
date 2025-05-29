"use client";
import { useOrder } from "../app/providers";
import { format } from "date-fns";

const Receipt = () => {
  const { currentOrder, orderDate } = useOrder();

  if (!currentOrder) {
    return <div>No order found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Order Receipt</h1>
        <p className="text-gray-600">Thank you for your order!</p>
      </div>

      <div className="space-y-6">
        {/* Order Details */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">Order Details</h2>
          <p><span className="font-medium">Order ID:</span> #{currentOrder.id}</p>
          <p><span className="font-medium">Email:</span> {currentOrder.email}</p>
          <p><span className="font-medium">Date:</span> {orderDate ? format(orderDate, 'PPP') : 'Not specified'}</p>
          <p><span className="font-medium">Quantity:</span> {currentOrder.count}</p>
        </div>

        {/* Main Dish */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">Main Dish</h2>
          <div className="flex items-center space-x-4">
            <img 
              src={currentOrder.dish.imageSource} 
              alt={currentOrder.dish.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-medium">{currentOrder.dish.name}</h3>
              <p className="text-sm text-gray-600">{currentOrder.dish.category} - {currentOrder.dish.cousine}</p>
            </div>
          </div>
        </div>

        {/* Cocktails */}
        {currentOrder.drinks.length > 0 && (
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold mb-2">Selected Cocktails</h2>
            <div className="space-y-3">
              {currentOrder.drinks.map((drink) => (
                <div key={drink.id} className="flex items-center space-x-4">
                  <img 
                    src={drink.imageSource} 
                    alt={drink.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <p className="font-medium">{drink.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="text-right">
          <p className="text-lg font-semibold">
            Total Items: {currentOrder.drinks.length + 1}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;