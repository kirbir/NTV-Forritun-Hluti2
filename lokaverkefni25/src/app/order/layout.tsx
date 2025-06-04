import type { Metadata } from "next";
import Sidebar from "@/components/sidebar";


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

      <div className="flex flex-col md:flex-row gap-4 p-2 justify-center items-start pt-5 w-full max-w-[1200px]">
        <div className="order-2 w-[100%] md:w-[30%] border border-gray-300 rounded-lg bg-white drop-shadow-sm p-4">
          <Sidebar/>
        </div>
        <div className="w-[100%] md:w-[70%] mb-10">
          {children}
        </div>
      </div>

  );
}
