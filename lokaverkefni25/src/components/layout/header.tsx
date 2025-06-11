"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../ui/logo";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import FindOrder from "../features/find-order";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "text-black font-bold border-b-4 border-[#d06656]"
      : "text-black hover:text-[#d06656] hover:border-b-4 hover:border-[#d06656]";
  };

  return (
    <header className="w-full h-[50px] md:sticky max-w-6xl md:max-w-screen flex flex-col items-center justify-center mx-auto px-2 md:mb-2 static md:top-0 z-50">
      <nav className="flex flex-row md:py-2 w-full justify-between md:justify-around items-center backdrop-blur-sm z-40 mx-0 gap-2 md:gap-10 text-card flex-nowrap">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-black hover:text-[#d06656] z-50"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center w-full">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`${isActive(
                "/"
              )} transition-colors duration-200 text-md md:text-md md:font-semibold`}
            >
              Home
            </Link>
            <Link
              href="/order"
              className={`${isActive(
                "/order"
              )} transition-colors duration-200 text-md md:text-md md:font-semibold`}
            >
              Order now
            </Link>
          </div>

          <div className="mx-8">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Drawer>
              <DrawerTrigger className={`${isActive(
                "/my-orders"
              )} transition-colors duration-200 text-md md:text-md md:font-semibold`}>
                My orders
              </DrawerTrigger>
              <DrawerContent className="bg-[#211b1c] fixed bottom-0 left-0 right-0 z-[100] max-h-[80vh] rounded-t-lg">
                <DrawerHeader>
                  <DrawerTitle className="text-white text-center">
                    Enter your order e-mail
                  </DrawerTitle>
                  <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <FindOrder />
                <DrawerFooter>
                  <DrawerClose></DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            <Link
              href="/contact"
              className={`${isActive(
                "/contact"
              )} transition-colors duration-200 text-md md:text-md md:font-semibold`}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Logo for mobile */}
        <div className="md:hidden">
          <Link
            href="/"
            className="text-[2rem] font-bold text-green-800 font-chicle"
          >
            <Logo />
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full pt-16">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 text-black hover:text-[#d06656]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-col items-center space-y-8">
            <Link
              href="/"
              className={`${isActive(
                "/"
              )} text-2xl transition-colors duration-200`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/order"
              className={`${isActive(
                "/order"
              )} text-2xl transition-colors duration-200`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Order
            </Link>
            <Drawer>
              <DrawerTrigger 
                className={`${isActive(
                  "/my-orders"
                )} text-2xl transition-colors duration-200`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My orders
              </DrawerTrigger>
              <DrawerContent className="bg-[#211b1c] fixed bottom-0 left-0 right-0 z-[100] max-h-[80vh] rounded-t-lg">
                <DrawerHeader>
                  <DrawerTitle className="text-white text-center">
                    Enter your order e-mail
                  </DrawerTitle>
                  <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <FindOrder />
                <DrawerFooter>
                  <DrawerClose></DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <Link
              href="/contact"
              className={`${isActive(
                "/contact"
              )} text-2xl transition-colors duration-200`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
