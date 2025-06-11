import type { Metadata } from "next";
import Sidebar from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "Lil' bits resteraunt",
  description: "Order a brilliant meal with cocktails",
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

      <div className="relative overflow-visible flex flex-col pl-2 pr-2 min-h-screen md:flex-row gap-2 mx-auto  justify-start md:justify-center items-center md:items-start  w-full max-w-full md:max-w-[1200px]  pt-10 ">
        <div className="self-start z-55 order-2 w-[100%] md:h-[100%] md:w-[30%] fixed md:sticky md:top-16 md:right-0 bottom-0 left-0 right-0">
          <Sidebar />
        </div>
        <div className="overflow-visible w-[100%] md:w-[50%] md:h-[85%] mb-10 rounded-lg ">
          {children}
        </div>
      </div>

  );
}
