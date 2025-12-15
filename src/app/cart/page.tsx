import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-medium pl-3 mb-6">Bag</h2>

          {/* Item 1 */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-orange-200 rounded">
                <Image src="/p3.png" alt="product image" width={150} height={150} />
              </div>
              <div>
                <h3 className="text-base font-normal text-[#272343] mb-3">
                  Mustard Royal
                </h3>
                <p className="text-sm text-gray-500 mb-1">Earth&apos;s Nectar</p>
                <div className="flex space-x-8">
                  <p className="text-sm font-normal text-[#757575]">Size: 100ml</p>
                  <p className="text-sm font-normal text-[#757575]">Quantity: 1</p>
                </div>
                <div className="flex gap-3 mt-3">
                  <CiHeart className="text-gray-500" />
                  <RiDeleteBin6Line className="text-gray-500" />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <p className="text-base font-normal text-[#111111]">MRP:</p>
              <p className="text-base font-normal text-[#111111]">PKR 999</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-300 rounded">
                <Image src="/p5.png" alt="product image" width={150} height={150} />
              </div>
              <div>
                <h3 className="text-base font-normal text-[#272343] mb-3">
                  Twin Essence
                </h3>
                <p className="text-sm font-normal text-[#757575] mb-1">Core Ingredient</p>
                <div className="flex space-x-8">
                  <p className="text-sm font-normal text-[#757575]">Size: 100ml</p>
                  <p className="text-sm font-normal text-[#757575]">Quantity: 1</p>
                </div>
                <div className="flex gap-3 mt-3">
                  <CiHeart className="text-gray-500" />
                  <RiDeleteBin6Line className="text-gray-500" />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <p className="text-base font-normal text-[#111111]">MRP:</p>
              <p className="text-base font-normal text-[#111111]">PKR 1999</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Summary</h2>
          <div className="flex justify-between mb-4">
            <p className="text-lg">Subtotal</p>
            <p className="text-lg font-semibold">$198.00</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-lg">Estimated Delivery & Handling</p>
            <p className="text-lg font-semibold text-green-500">Free</p>
          </div>
          <hr className="mb-4" />
          <div className="flex justify-between mb-6">
            <p className="text-xl font-bold">Total</p>
            <p className="text-xl font-bold">$198.00</p>
          </div>
          <button className="w-full md:w-[334.67px] h-[60px] rounded-[30px] text-white bg-[#272343] hover:bg-gray-500">
            Member Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
