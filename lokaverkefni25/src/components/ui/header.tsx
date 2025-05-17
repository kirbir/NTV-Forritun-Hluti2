"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import HamburgerIcon from "./hamburger-icon";
import { usePathname } from "next/navigation";
import Logo from "./logo";

export default function Header() {
  //   const { isMenuOpen, toggleMenu, closeMenu } = useMenu();

  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "text-green-700 font-bold border-b-2 border-lime-700"
      : "text-green-700 hover:text-green-700 hover:border-b-2 hover:border-lime-700";
  };

  return (
    <header className="container w-screen h-[80px] max-w-6xl flex flex-col items-center justify-evenly mx-auto px-4">
      <nav className="flex flex-row mx-auto px-6 py-4 gap-10 border-red-400 border">
          <Link
            href="/order"
            className={`${isActive(
              "/"
            )} transition-colors duration-200 text-2xl`}
          >
            Home
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
