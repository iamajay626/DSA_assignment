"use client";

import { useState } from "react";
import Link from "next/link";
const Layout = () => {
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-md mb-4">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">Vehicle Repair </Link>

          {/* Hamburger Icon for mobile */}
          <button
            className="lg:hidden block focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Toggle navigation"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6">
           
            <Link href="/component" className="hover:text-blue-200 transition duration-200">Components</Link>
            <Link href="/issues" className="hover:text-blue-200 transition duration-200">Issues</Link>
            <Link href="/vehicles" className="hover:text-blue-200 transition duration-200">Vehicle</Link>
            <Link href="/payments" className="hover:text-blue-200 transition duration-200">Payments</Link>
            <Link href="/revenue" className="hover:text-blue-200 transition duration-200">Revenue</Link>

           
          </div>
        </div>

        {/* Mobile Menu (visible when isMobileMenuOpen is true) */}
        <div
          className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"} bg-blue-600 py-4 px-6`}
        >
         
          <Link href="/component" className="block text-white py-2 hover:bg-blue-500 transition duration-200">Components</Link>
          <Link href="/issues" className="block text-white py-2 hover:bg-blue-500 transition duration-200">Issues</Link>
          <Link href="/vehicles" className="block text-white py-2 hover:bg-blue-500 transition duration-200">Vehicle</Link>
          <Link href="/payments" className="block text-white py-2 hover:bg-blue-500 transition duration-200">Payments</Link>
          <Link href="/revenue" className="block text-white py-2 hover:bg-blue-500 transition duration-200">Revenue</Link>

        </div>
      </nav>
    </>
  );
};

export default Layout;
