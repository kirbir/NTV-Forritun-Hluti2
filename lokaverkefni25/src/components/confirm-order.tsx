import {  useState } from "react";
import { useOrder} from "../app/providers";

const ConfirmOrder = () => {
  const { 
    currentOrder,
    setCurrentOrder,
  } = useOrder();

  // if user has searched for existing order, work with that state in currentOrder state. Fallback is a new order.
  const email = currentOrder?.email || ""; 
  const guestCount = currentOrder?.count || 1;
  const date = currentOrder?.date || new Date();

  const updateOrderField = (field: string, value: any) => {
    if (currentOrder) {
      setCurrentOrder({
        ...currentOrder,
        [field]: value
      });
    }
  };

  const [errors, setErrors] = useState({
    guestCount: "",
    email: "",
  });

  const validateInput = (name: string, value: string | number) => {
    if (name === 'guestCount' && (Number(value) < 1 || Number(value) > 10)) {
      setErrors(prev => ({...prev, guestCount: "Guest count must be between 1 and 10"}));
    } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) {
      setErrors(prev => ({...prev, email: "Please enter a valid email"}));
    } else {
      setErrors(prev => ({...prev, [name]: ""}));
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="guestCount">How many guests?</label>
        <input
          id="guestCount"
          type="number"
          min="1"
          max="10"
          value={guestCount}
          onChange={(e) => updateOrderField('count', Number(e.target.value))}
          className={`border p-2 rounded ${errors.guestCount ? "border-red-500" : ""}`}
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
          onChange={(e) => updateOrderField('email', e.target.value)}
          className={`border p-2 rounded ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>
    </div>
  );
};

export default ConfirmOrder;
