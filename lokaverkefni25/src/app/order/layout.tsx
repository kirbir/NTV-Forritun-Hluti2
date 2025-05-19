import type { Metadata } from "next";
import OrderStatus from "@/components/order-status";
import { OrderProvider } from "../providers";

export const metadata: Metadata = {
  title: "Order a meal",
  description: "Lil' bits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >

        <OrderProvider>
        <div className="flex flex-row w-full justify-center items-center">
            <div className="w-[20%] border border-green-500"><OrderStatus/></div>
            <div className="w-[50%] border border-red-500">{children}</div>
        </div>
        </OrderProvider>
      </body>
    </html>
  );
}
