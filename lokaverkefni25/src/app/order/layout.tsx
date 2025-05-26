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
      <div className="flex flex-col gap-4 md:flex-row md:justify-center md:items-start pt-5 w-full justify-start items-center">
        <div className="w-[100%] md:w-[20%] border border-gray-300 rounded-lg bg-white drop-shadow-sm p-4">
          <Sidebar/>
        </div>
        <div className="w-[100%] md:w-[50%] ">
          {children}
        </div>
      </div>
    </OrderProvider>
  );
}
