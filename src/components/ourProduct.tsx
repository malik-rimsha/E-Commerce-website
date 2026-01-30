"use client";

import React, { useEffect, useState } from "react";
import { Zap, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { useCart } from "@/context/CartContext";

interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  slug: string;
}

export default function OurProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(`*[_type == "products"]{
        _id,
        title,
        price,
        "imageUrl": image.asset->url,
        "slug": slug.current
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
          <div key={product._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
            
            {/* Image Section */}
            <div className="relative aspect-[4/5] bg-[#F3F4F6]">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-gray-800 font-bold text-lg mb-2">{product.title}</h3>
              <p className="text-[#272343] font-black text-xl mb-6">PKR {product.price}</p>

              {/* Buttons Section */}
              <div className="mt-auto space-y-3">
                {/* Add to Cart Button (Light) */}
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-[#F0F2F3] text-[#272343] py-3 rounded-md font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  ADD TO CART
                </button>
                <Link href={`/checkout?id=${product._id}`} className="block">
                 
                 
                 <button 
                  onClick={() => {
                 addToCart(product); // Pehle cart mein add karein
                  window.location.href = '/checkout'; // Phir checkout par bhej dein
                   }}
                    className="w-full bg-[#272343] text-white py-3 rounded-md font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#1a182d] transition-colors"
>
                      <Zap className="w-4 h-4 fill-white" />
                      BUY NOW
                       </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}