"use client";
import { useOrder } from "../../providers";
import { format } from "date-fns";
import Image from "next/image";

const Receipt = () => {
  const { currentOrder } = useOrder();

  if (!currentOrder) {
    return <div>No order found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg min-h-[800px] overflow-y-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Order Receipt</h1>
        <p className="text-gray-600">Thank you for your order!</p>
      </div>

      <div className="space-y-6">
        {/* Order Details */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">Order Details</h2>
          <p>
            <span className="font-medium">Order ID:</span> #{currentOrder.id}
          </p>
          <p>
            <span className="font-medium">Email:</span> {currentOrder.email}
          </p>
          <p>
            <span className="font-medium">Date:</span>{" "}
            {currentOrder.date
              ? format(currentOrder.date, "PPP")
              : "Not specified"}
          </p>
          <p>
            <span className="font-medium">Quantity:</span> {currentOrder.count}
          </p>
        </div>

        {/* Main Dish */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-2">Main Dish</h2>
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24">
              <Image
                src={currentOrder.dish.imageSource}
                alt={currentOrder.dish.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 96px) 100vw, 96px"
              />
            </div>
            <div>
              <h1 className="font-medium">{currentOrder.dish.name}</h1>
              <p className="text-sm text-gray-600">
                {currentOrder.dish.category} - {currentOrder.dish.area}
              </p>
            </div>
          </div>
        </div>

        {/* Cocktails */}
        {currentOrder.drinks.length > 0 && (
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold mb-2">Selected Cocktails</h2>
            <div className="space-y-3">
              {currentOrder.drinks.map((drink) => (
                <div
                  key={drink.idDrink}
                  className="flex items-center space-x-4"
                >
                  <div className="relative w-16 h-16">
                    <Image
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 64px) 100vw, 64px"
                    />
                  </div>
                  <p className="font-medium">{drink.strDrink}</p>
                  <p>Quantity: {drink.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="text-right">
          <p className="text-lg font-semibold">
            Total Items: {currentOrder.drinks.length + 1}
          </p>{" "}
          <p>
            Price:{" "}
            {currentOrder.dish.price +
              currentOrder.drinks.reduce(
                (total, drink) => total + drink.price * drink.quantity,
                0
              )}{" "}
            kr
          </p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
