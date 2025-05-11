"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || (path === "/characters" && pathname.startsWith("/characters"))
      ? "text-green-100 font-bold border-b-2 border-lime-600" 
      : "text-green-100 hover:text-green-300 hover:border-b-2 hover:border-lime-600";
  };

  return (
    <header >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center">
            <Link href="/" className="text-4xl font-bold text-green-800 font-chicle">
              Shreks World
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`${isActive("/")} transition-colors duration-200 text-2xl`}
            >
              Home
            </Link>
            <Link 
              href="/characters" 
              className={`${isActive("/characters")} transition-colors duration-200 text-2xl`}
            >
              Characters
            </Link>
       
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-green-300 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;