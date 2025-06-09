import type { Metadata } from "next";
import Sidebar from "@/components/layout/sidebar";


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
    <div className="overflow-visible h-full">
      <div className="flex flex-col pl-2 pr-2 md:mt-20 min-h-screen md:flex-row gap-2 mx-auto  justify-start md:justify-center items-center md:items-start  w-full max-w-full md:max-w-[1200px] relative pt-20 ">
        <div className="shrink order-2 w-[100%] md:w-[30%] border md:h-[85%] border-gray-300 rounded-lg bg-white/40 backdrop-blur-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 fixed md:sticky md:top-10 bottom-0 left-0 right-0 z-50">
          <Sidebar/>
        </div>
        <div className="overflow-visible w-[100%] md:w-[50%] md:h-[85%] mb-10">
          {children}
        </div>
      </div>
    </div>
  );
}
