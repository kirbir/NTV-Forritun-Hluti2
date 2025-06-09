"use client"
import { useOrder, OrderStage } from "@/app/providers";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import api from "@/api/api";

const FindOrder = () => {
  const router = useRouter();
  const { setCurrentOrder, setCurrentStage } = useOrder();
  const emailRef = useRef<HTMLInputElement>(null);

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
        `Order found for: ${order.email}. Yoyu will now be redirected to the order process where you can update your order details.`
      );
      router.push("/order");
    } catch (error) {
      console.log("Error details:", error);
      window.alert("No order found.");
    }
  };

  return (
    <div className=" md:static  flex flex-col mx-auto space-y-4 w-[100%] md:w-[100%]">
      <div className="flex flex-col order-2 gap-2 px-5 md:p-6 md:bg-card rounded-lg md:shadow-lg text-center">
        <h1 className="hidden md:block text-[2.2rem] font-extrabold">Already have an order?</h1>
        <p>Type your e-mail to update existing order details.</p>
        <div className="relative mt-4">
          <input
            placeholder="Input e-mail address"
            ref={emailRef}
            type="text"
            className="w-full pr-12 pl-3 placeholder:text-gray-300 py-2 border-2 rounded"
            onKeyDown={(e) => e.key === "Enter" && handleFindOrder()}
          />
          <button
            onClick={handleFindOrder}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded"
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
