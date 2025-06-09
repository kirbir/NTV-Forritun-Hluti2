import { useState } from "react";
import { useOrder } from "../../providers";
import Image from "next/image";

const ConfirmOrder = () => {
  const { currentOrder, setCurrentOrder } = useOrder();

  // if user has searched for existing order, work with that state in currentOrder state. Fallback is a new order.
  const email = currentOrder?.email || "";
  const guestCount = currentOrder?.count || 1;
  // Remove unused date variable

  const updateOrderField = (field: string, value: string | number | Date) => {
    if (currentOrder) {
      setCurrentOrder({
        ...currentOrder,
        [field]: value,
      });
      // Validate the field after updating
      validateInput(
        field,
        typeof value === "object" ? value.toString() : value
      );
    }
  };

  const [errors, setErrors] = useState({
    guestCount: "",
    email: "",
  });

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
      }
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="flex flex-col gap-4 relative max-w-2xl mx-auto p-6 bg-white/60 backdrop-blur-2xl rounded-lg shadow-lg mb-20">
      <div className="border-b pb-4">
        <h2>Your selection</h2>

        <h2 className="text-lg font-semibold mb-2">Main Dish</h2>
        {currentOrder && (
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
        )}
        {currentOrder && currentOrder.drinks.length > 0 && (
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
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="guestCount">How many guests?</label>
        <input
          id="guestCount"
          type="number"
          min="1"
          max="10"
          value={guestCount}
          onChange={(e) => updateOrderField("count", Number(e.target.value))}
          className={`border p-2 rounded ${
            errors.guestCount ? "border-red-500" : ""
          }`}
        />
        {errors.guestCount && (
          <span className="text-red-500 text-sm">{errors.guestCount}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => updateOrderField("email", e.target.value)}
          onBlur={(e) => validateInput("email", e.target.value)}
          className={`border p-2 rounded ${
            errors.email ? "border-red-500" : ""
          }`}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>
    </div>
  );
};

export default ConfirmOrder;
