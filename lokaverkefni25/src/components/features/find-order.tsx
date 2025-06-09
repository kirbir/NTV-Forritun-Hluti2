"use client"
import { useOrder, OrderStage } from "@/app/providers";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import api from "@/api/api";

const FindOrder = () => {
  const router = useRouter();
  const { setCurrentOrder, setCurrentStage } = useOrder();
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Small delay to ensure the drawer is fully opened
    const timer = setTimeout(() => {
      emailRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleFindOrder = async () => {
    const email = emailRef.current?.value;
    if (!email) return;

    try {
      console.log("API call to look up existing order:", `/api/order/${email}`);
      const order = await api.getOrderByEmail(email);
      console.log("Response:", order);
      setCurrentOrder(order);
      setCurrentStage(OrderStage.SELECTING_DISH);
      window.alert(
        `Order found for: ${order.email}. You will now be redirected to the order process where you can update your order details.`
      );
      router.push("/order");
    } catch (error) {
      console.log("Error details:", error);
      window.alert("No order found.");
    }
  };

  return (
    <div className="flex flex-col mx-auto space-y-4 w-[100%] md:w-[100%]">
      <div className="flex grow flex-col hover:scale-98 ease-in-out hover:bg-card/85 transition-transform order-2 gap-2 px-5 md:p-6 md:bg-card rounded-lg md:shadow-lg text-center">
        <h1 className="hidden md:block text-[1.5rem] font-extrabold">Existing order?</h1>
        <p className="text-gray-300 md:text-button-primary">Type your e-mail to update existing order details.</p>
        <div className="relative mt-4">
          <input
            placeholder="example@email.com"
            ref={emailRef}
            type="text"
            className="w-full text-gray-200 pr-12 pl-3 text-center placeholder:text-gray-400 py-2 border-2 rounded"
            onKeyDown={(e) => e.key === "Enter" && handleFindOrder()}
          />
          <button
            onClick={handleFindOrder}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-300 md:text-gray-600 hover:text-blue-500 rounded"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindOrder;
