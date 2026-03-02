"use client";

import React, { useEffect, useState } from "react";
import { Zap, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";

interface Product {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount?: number; // Sanity screenshot ke mutabiq name change kiya
  imageUrl: string;
  slug: string;
  badge?: string;
}

export default function OurProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      // Query ko aapki Sanity fields ke mutabiq set kiya hai
      const data = await client.fetch(`*[_type == "products"]{
        _id,
        title,
        price,
        priceWithoutDiscount, 
        "imageUrl": image.asset->url,
        "slug": slug.current,
        badge
      }`);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <h1 className="text-3xl text-center font-semibold text-[#1C1B1F] tracking-tight mb-8">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group transition-all hover:shadow-md relative">
            
            {/* 1. Badge Section - Jaise aapne Studio mein 'New' likha hai */}
            {product.badge && (
              <Badge className="absolute left-3 top-3 bg-[#a75d24] hover:bg-red-700 z-10 text-[10px] px-2 font-bold uppercase text-white border-none">
                {product.badge}
              </Badge>
            )}

            {/* Image Section - Link Added */}
            <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] bg-[#F3F4F6] block overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </Link>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
              <Link href={`/products/${product.slug}`}>
                <h3 className="text-gray-800 font-bold text-lg mb-2 hover:text-[#272343] transition-colors cursor-pointer line-clamp-1">
                  {product.title}
                </h3>
              </Link>
              
              {/* 2. Price Section - Studio Fields ke mutabiq */}
              <div className="flex items-center gap-3 mb-6">
                <p className="text-[#272343] font-black text-xl">PKR {product.price}</p>
                
                {product.priceWithoutDiscount && (
                  <p className="text-sm text-red-500 line-through italic">
                    PKR {product.priceWithoutDiscount}
                  </p>
                )}
              </div>

              {/* Buttons Section */}
              <div className="mt-auto space-y-3">
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-[#F0F2F3] text-[#272343] py-3 rounded-md font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  ADD TO CART
                </button>

                <button 
                  onClick={() => {
                    addToCart(product); 
                    window.location.href = '/checkout'; 
                  }}
                  className="w-full bg-[#272343] text-white py-3 rounded-md font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#1a182d] transition-all active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}