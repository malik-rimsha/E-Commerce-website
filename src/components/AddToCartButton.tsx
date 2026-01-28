"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation"; // Router import kiya navigation ke liye

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const router = useRouter(); // Router initialize kiya

  const handleAddToCart = () => {
    // 1. Product ko cart mein add karein
    addToCart(product);
    
    // 2. Foran cart page par redirect karein
    router.push("/cart");
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="bg-[#272343] text-white py-3 px-8 rounded-lg hover:bg-gray-500 transition-all w-full md:w-fit font-bold"
    >
      Add to Cart
    </button>
  );
}