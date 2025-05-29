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
    <header className="container w-screen h-[80px] max-w-6xl flex flex-col items-center justify-evenly mx-auto px-4 mb-20">
      <nav className="flex flex-row mx-auto px-6 py-4 gap-10 text-black">
          <Link
            href="/"
            className={`${isActive(
              "/"
            )} transition-colors duration-200 text-2xl`}
          >
            Home
          </Link>
          <Link
            href="/order"
            className={`${isActive(
              "/order"
            )} transition-colors duration-200 text-2xl`}
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
            href="/characters"
            className={`${isActive(
              "/characters"
            )} transition-colors duration-200 text-2xl`}
          >
            Characters
          </Link>
      </nav>
    </header>
  );
}
