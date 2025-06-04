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

      <div className="flex flex-col md:flex-row gap-2 mx-auto  justify-center items-center md:items-start pt-5 w-full max-w-full md:max-w-[1200px] relative">
        <div className="order-2 w-[100%] md:w-[30%] border border-gray-300 rounded-lg bg-white drop-shadow-sm p-4 sticky shadow-lg bottom-0 md:top-5 z-500">
          <Sidebar/>
        </div>
        <div className="w-[100%] md:w-[70%] mb-10">
          {children}
        </div>
      </div>

  );
}
