"use client";
import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const delivery = cart.length > 0 ? 200 : 0;
  const total = subtotal + delivery;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-medium pl-3 mb-6">Bag</h2>

          {cart.length === 0 ? (
            <p className="pl-3 text-gray-500">Your bag is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden relative">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-base font-normal text-[#272343] mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">Organic Hair Oil</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center border rounded-md px-2 py-1 gap-3">
                            <button 
                                onClick={() => updateQuantity(item._id, 'minus')}
                                className="text-lg font-bold hover:text-emerald-600 px-1"
                            > - </button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item._id, 'plus')}
                                className="text-lg font-bold hover:text-emerald-600 px-1"
                            > + </button>
                        </div>
                        <p className="text-xs text-gray-400">Size: 100ml</p>
                    </div>

                    <div className="flex gap-4">
                      <CiHeart className="text-gray-500 cursor-pointer hover:text-red-500" size={20} />
                      <RiDeleteBin6Line 
                        className="text-gray-500 cursor-pointer hover:text-red-600" 
                        size={20} 
                        onClick={() => removeFromCart(item._id)}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase">MRP</p>
                  <p className="text-base font-semibold text-[#111111]">PKR {item.price * item.quantity}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-bold mb-6">Summary</h2>
          <div className="flex justify-between mb-4">
            <p className="text-lg">Subtotal</p>
            <p className="text-lg font-semibold">PKR {subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-lg text-gray-600">Delivery</p>
            <p className="text-lg font-semibold text-green-600">PKR {delivery}</p>
          </div>
          <hr className="mb-4" />
          <div className="flex justify-between mb-6">
            <p className="text-xl font-bold">Total</p>
            <p className="text-xl font-bold text-[#111111]">PKR {total.toFixed(2)}</p>
          </div>

{/* // Aapke button wala section kuch aisa dikhna chahiye: */}
<Link href="/checkout">
  

          <button className="w-full h-[60px] rounded-[30px] text-white bg-[#272343] hover:bg-black transition-colors font-medium">
            Member Checkout
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;