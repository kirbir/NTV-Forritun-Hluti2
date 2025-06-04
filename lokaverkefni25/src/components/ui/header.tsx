"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";

export default function Header() {


  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "text-black font-bold border-b-2 border-lime-700"
      : "text-black hover:text-green-700 hover:border-b-2 hover:border-lime-700";
  };

  return (
    <header className="container w-screen h-[50px] max-w-6xl flex flex-col items-center justify-evenly mx-auto px-2 mb-10">
      <nav className="flex flex-row backdrop-blur-sm z-100  mx-auto px-6 py-4 gap-4 md:gap-10 text-black">
          <Link
            href="/"
            className={`${isActive(
              "/"
            )} transition-colors duration-200 text-md`}
          >
            Home
          </Link>
          <Link
            href="/order"
            className={`${isActive(
              "/order"
            )} transition-colors duration-200 text-md`}
          >
            Order
          </Link>
          <Link
            href="/"
            className="text-[4rem] font-bold text-green-800 font-chicle"
          >
            <Logo />
          </Link>
          <Link
            href="/my-orders"
            className={`${isActive(
              "/my-orders"
            )} transition-colors duration-200 text-md`}
          >
            My orders
          </Link>
          <Link
            href="/contact"
            className={`${isActive(
              "/characters"
            )} transition-colors duration-200 text-md`}
          >
            Contact
          </Link>
      </nav>
    </header>
  );
}
