"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../ui/logo";

export default function Header() {


  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "text-black font-bold border-b-4 border-[#d06656]"
      : "text-black hover:text-[#d06656] hover:border-b-2 hover:border-[#d06656]";
  };

  return (
    <header className=" w-full h-[50px] max-w-6xl flex flex-col items-center justify-start pt-4 mx-auto px-2 md:mb-10">
      <nav className="flex flex-row w-full justify-evenly items-center backdrop-blur-sm z-100 mx-0  py-2 gap-2 md:gap-10 text-card">

            <Link
              href="/"
              className={`${isActive(
                "/"
              )} order-2 md:order-1 transition-colors duration-200 text-md `}
            >
              Home
            </Link>
            <Link
              href="/order"
              className={`${isActive(
                "/order"
              )} order-3 transition-colors duration-200 text-md`}
            >
              Order
            </Link>
            <div className="order-1 md:order-3 max-w-24 md:max-w-50">
              <Link
                href="/"
                className="text-[4rem] font-bold text-green-800 font-chicle"
              >
                <Logo />
              </Link>
            </div>
            <Link
              href="/my-orders"
              className={`${isActive(
                "/my-orders"
              )} order-3 md-order3 transition-colors duration-200 text-md`}
            >
              My orders
            </Link>
            <Link
              href="/contact"
              className={`${isActive(
                "/characters"
              )} order-4 transition-colors duration-200 text-md`}
            >
              Contact
            </Link>
         
      </nav>
    </header>
  );
}
