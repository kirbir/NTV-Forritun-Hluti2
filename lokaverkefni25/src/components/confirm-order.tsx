import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useOrder } from "../app/providers";
import { OrderContext } from "../app/providers";

const ConfirmOrder = () => {
  const { currentOrder, setCurrentOrder, setSubmitOrderForm,setCurrentStage } = useContext(OrderContext)!;
  const [formData, setFormData] = useState({
    guestCount: 1,
    email: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState({
    guestCount: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guestCount" ? parseInt(value) || 0 : value,
    }));
  };

  const submitForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }, []);

  
  useEffect(() => {
    setSubmitOrderForm(submitForm);
    return;
  }, [submitForm, setSubmitOrderForm]);

  const validateForm = () => {
    const newErrors = {
      guestCount: "",
      email: "",
    };
    let isValid = true;

    if (formData.guestCount < 1 || formData.guestCount > 10) {
      newErrors.guestCount = "Guest count must be between 1 and 10";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!currentOrder) return;

    const updatedOrder = {
      ...currentOrder,
      count: formData.guestCount,
      email: formData.email,
      date: formData.date
    };

    setCurrentOrder(updatedOrder);
    setCurrentStage(OrderStage.RECEIPT_SCREEN);
  };

  const updateDate = (newDate: Date | undefined) => {
    if (newDate) {
      setFormData(prev => ({
        ...prev,
        date: newDate
      }));
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>How many guests?</div>
      <form ref={formRef} onSubmit={handleSubmit} className="p-4 border">
        <div className="flex flex-col gap-2">
          <label htmlFor="guestCount">How many guests?</label>
          <input
            id="guestCount"
            name="guestCount"
            type="number"
            min="1"
            max="10"
            value={formData.guestCount}
            onChange={handleInputChange}
            className={`border p-2 rounded ${
              errors.guestCount ? "border-red-500" : ""
            }`}
            placeholder="Enter number of guests"
          />
          {errors.guestCount && (
            <span className="text-red-500 text-sm">{errors.guestCount}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`border p-2 rounded ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Enter e-mail address"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default ConfirmOrder;
