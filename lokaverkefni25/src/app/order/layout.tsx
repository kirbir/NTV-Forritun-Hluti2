import type { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import { OrderProvider } from "../providers";

export const metadata: Metadata = {
  title: "Order a meal",
  description: "Lil' bits",
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrderProvider>
      <div className="flex flex-row gap-4 mx-auto justify-center items-start pt-5 w-full max-w-[1200px]">
        <div className="w-[100%] md:w-[20%] border border-gray-300 rounded-lg bg-white drop-shadow-sm p-4">
          <Sidebar/>
        </div>
        <div className="w-[100%] md:w-[70%]">
          {children}
        </div>
      </div>
    </OrderProvider>
  );
}
