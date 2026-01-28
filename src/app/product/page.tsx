"use client"; 

import React, { useEffect, useState } from "react";
import Newsletter from "@/components/news";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Zap, Plus } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client"; 
import { useCart } from "@/context/CartContext"; 

interface Product {
  _id: string;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  slug: string;
  isNew?: boolean;
  isSale?: boolean;
}

export default function AllProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart(); //

  
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(`*[_type == "products"]{
        _id,
        title,
        price,
        originalPrice,
        "imageUrl": image.asset->url,
        "slug": slug.current,
        isNew,
        isSale
      }`);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-12 py-12 md:py-20">
      <h1 className="text-2xl md:text-4xl text-center font-bold text-[#1C1B1F] tracking-tight mb-12 mt-6">
        Our Premium Collection
      </h1>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {products.map((product) => (
          <div key={product._id} className="group relative flex flex-col h-full bg-white border border-gray-100 rounded-xl p-3 hover:shadow-2xl transition-all duration-300">
            
            {/* Image Section */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-[#F5F5F5]">
              {product.isNew && <Badge className="absolute left-2 top-2 bg-[#272343] z-10 text-[10px] px-2">NEW</Badge>}
              {product.isSale && <Badge className="absolute left-2 top-2 bg-red-500 z-10 text-[10px] px-2">SALE</Badge>}
              
              <Link href={`/products/${product.slug}`} className="block h-full w-full">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  height={400}
                  width={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </Link>
            </div>

            {/* Content Section */}
            <div className="mt-4 flex flex-col flex-grow">
              <h3 className="text-sm font-bold text-[#1C1B1F] line-clamp-1">{product.title}</h3>
              
              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-extrabold text-[#272343]">PKR {product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">PKR {product.originalPrice}</span>
                )}
              </div>

              {/* Action Buttons Section */}
              <div className="mt-5 flex flex-col gap-2">
                
                {/* Add to Cart - Functionality Added */}
                <button 
                  onClick={() => addToCart(product)} // Click par function chalega
                  className="w-full flex items-center justify-center gap-2 bg-[#F0F2F3] text-[#272343] py-2.5 rounded-lg text-xs font-bold hover:bg-[#e2e5e7] transition-all active:scale-95 border border-gray-200"
                >
                  <Plus className="h-4 w-4" />
                  ADD TO CART
                </button>

                {/* Buy Now */}
                <Link href={`/checkout?id=${product._id}`} className="w-full">
                
                    <button 
  onClick={() => {
    addToCart(product); 
    window.location.href = '/checkout'; 
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

      <div className="mt-24">
        <Newsletter />
      </div>
    </div>
  );
}