"use client"; // Client component banaya taake useCart use ho sake
import Link from "next/link";
import Image from "next/image";
import { ShoppingCartIcon, Menu, CheckIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useCart } from "@/context/CartContext"; // Cart context import kiya

export default function Searchbar() {
  const { cart } = useCart();

  // Total items calculate karne ke liye (e.g., agar user ne 2 Mustard oils liye hain)
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="w-full border-b-2 bg-[#F0F2F3] p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
        
        {/* Logo and Title */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/Rdlogo.png" alt="Logo" width={48} height={48} className="h-12 w-auto" />
          <h1 className="font-bold text-base sm:text-lg md:text-xl text-[#272343]">
            RD Organic Hair Oil
          </h1>
        </Link>

        {/* Dynamic Cart Section (Desktop) */}
        <div className="hidden md:flex items-center ml-auto">
          <Link href="/cart">
            <Button variant="outline" className="flex items-center gap-3 bg-white hover:bg-gray-100 rounded-lg px-4 py-5 shadow-sm border-none">
              <ShoppingCartIcon className="h-5 w-5 text-[#272343]" />
              <span className="font-medium text-[#272343]">Cart</span>
              {totalItems > 0 && (
                <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Cart Icon Shortcut */}
          <Link href="/cart" className="relative p-2">
            <ShoppingCartIcon className="h-6 w-6 text-[#272343]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64 sm:w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-center gap-2">
                  <Image src="/Rdlogo.png" alt="Logo" width={32} height={32} className="h-8 w-auto" /> RD Organic
                </SheetTitle>
              </SheetHeader>

              {/* Navigation Links */}
              <div className="flex flex-col gap-5 mt-8 text-center">
                <Link href="/" className="text-sm font-medium hover:text-emerald-600 transition-colors">RD Organic</Link>
                <Link href="/product" className="text-sm font-medium hover:text-emerald-600 transition-colors">Our Collection</Link>
                <Link href="/about" className="text-sm font-medium hover:text-emerald-600 transition-colors">About US</Link>
                <Link href="/contact" className="text-sm font-medium hover:text-emerald-600 transition-colors">Shopping Bag</Link>
              </div>

              {/* Mobile Cart Button inside Sheet */}
              <div className="mt-8">
                <Link href="/cart">
                  <Button className="w-full bg-[#272343] hover:bg-black text-white flex justify-center gap-3 rounded-xl py-6">
                    <ShoppingCartIcon size={20} />
                    View Bag ({totalItems})
                  </Button>
                </Link>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <Button variant="outline" size="icon" className="rounded-2xl">
                  <CheckIcon />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}