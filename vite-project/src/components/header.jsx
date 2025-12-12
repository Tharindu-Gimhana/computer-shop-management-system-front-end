import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import UserData from "./userdata";

export default function Header() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <header className="w-full h-[100px] flex bg-[#051743] text-white items-center justify-between px-6 shadow-md fixed top-0 left-0 z-50">
      {/* Hamburger menu for mobile */}
      <GiHamburgerMenu
        className="lg:hidden text-2xl text-white cursor-pointer"
        onClick={() => setSideBarOpen(true)}
      />

      {/* Logo */}
      <img
        src="./src/assets/logo.png"
        alt="logo"
        className="h-[70%] flex cursor-pointer"
      />

      {/* Desktop navigation links */}
      <div className="hidden lg:flex w-full h-full justify-center items-center gap-[30px] text-xl">
        <Link to="/" className="text-white hover:text-amber-400 transition-colors">
          Home
        </Link>
        <Link to="/products" className="text-white hover:text-amber-400 transition-colors">
          Products
        </Link>
        <Link to="/about" className="text-white hover:text-amber-400 transition-colors">
          About
        </Link>
        <Link to="/contact" className="text-white hover:text-amber-400 transition-colors">
          Contact
        </Link>
      </div>

      {/* User data (desktop) */}
      <div className="hidden lg:flex absolute right-24 top-0 h-full items-center">
        <UserData />
      </div>

      {/* Shopping cart icon */}
      <Link
        to="/cart"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-2xl"
      >
        <BiShoppingBag />
      </Link>

      {/* Mobile sidebar */}
      {sideBarOpen && (
        <div className="fixed lg:hidden w-full h-screen top-0 left-0 bg-black/50 z-40">
          <div className="relative w-[250px] h-full bg-white shadow-lg">
            {/* Sidebar header */}
            <div className="w-full h-[100px] bg-accent flex items-center justify-between px-4">
              <img
                src="./src/assets/logo.png"
                alt="logo"
                className="h-[70%]"
              />
              <GiHamburgerMenu
                className="text-white text-2xl cursor-pointer"
                onClick={() => setSideBarOpen(false)}
              />
            </div>

            {/* Sidebar links */}
            <div className="flex flex-col mt-10 pl-6 gap-6 text-xl text-gray-800">
              <Link
                to="/"
                onClick={() => setSideBarOpen(false)}
                className="hover:text-amber-500 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setSideBarOpen(false)}
                className="hover:text-amber-500 transition-colors"
              >
                Products
              </Link>
              <Link
                to="/about"
                onClick={() => setSideBarOpen(false)}
                className="hover:text-amber-500 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setSideBarOpen(false)}
                className="hover:text-amber-500 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Click outside to close */}
          <div
            className="w-full h-full"
            onClick={() => setSideBarOpen(false)}
          ></div>
        </div>
      )}
    </header>
  );
}
