"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Checkout() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [subtotal, setSubtotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>("SadaPay");
    const deliveryCharges = 200;

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(savedCart);
        const sum = savedCart.reduce((acc: number, item: any) => acc + (item.price * (item.quantity || 1)), 0);
        setSubtotal(sum);
    }, []);

    const total = subtotal + deliveryCharges;

    const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const name = formData.get("name") as string;
        const phone = formData.get("phone") as string;
        const city = formData.get("city") as string;
        const address = formData.get("address") as string;
        const transactionId = formData.get("transId") as string;

        // Validations
        if (phone.length !== 11) {
            alert("11-digit ka sahi phone number likhein.");
            return;
        }
        if (address.length < 15) {
            alert("Meharbani karke mukammal address likhein.");
            return;
        }

        setLoading(true);

        const payload = {
            customerInfo: {
                name: name,
                phone: phone,
                address: address,
                city: city,
            },
            cartItems: cartItems.map((item) => ({
                productName: item.title || item.name,
                quantity: item.quantity || 1,
                price: item.price,
                _id: item._id 
            })),
            totalPrice: total,
            paymentMethod: paymentMethod,
            transactionId: transactionId,
            status: "Awaiting Slip", // Status updated for verification
        };

        try {
            await axios.post(`/api/order`, payload);
            
            // WhatsApp Message Logic
            const message = `*NEW ORDER: RD ORGANIC*%0A%0A` +
                            `*Name:* ${name}%0A` +
                            `*Total:* Rs. ${total}%0A` +
                            `*TID:* ${transactionId}%0A%0A` +
                            `⚠️ *Please send your Transaction Slip (Digital Receipt) now.*`;
            
            const whatsappUrl = `https://wa.me/923268683373?text=${message}`;

            alert("Order Saved! Ab please WhatsApp par apni Transaction Slip share karein.");
            
            localStorage.removeItem("cart");
            window.location.href = whatsappUrl; // Redirect to WhatsApp
        } catch (err) {
            console.error("Order error:", err);
            alert("Order confirm nahi ho saka. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 mt-10 md:mt-20 text-black font-sans">
            <h1 className="text-2xl md:text-3xl font-black mb-6 text-[#272343] uppercase tracking-tighter italic text-center md:text-left">Checkout</h1>
            
            <form onSubmit={handleOrder} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h2 className="font-bold text-gray-400 text-xs uppercase tracking-[0.2em]">Shipping Details</h2>
                        <input name="name" placeholder="Full Name" className="w-full p-4 border rounded-xl text-black outline-[#272343] bg-gray-50 focus:bg-white transition-all text-sm" required />
                        <input name="phone" placeholder="Phone (03xxxxxxxxx)" className="w-full p-4 border rounded-xl text-black outline-[#272343] bg-gray-50 focus:bg-white transition-all text-sm" maxLength={11} required />
                        <input name="address" placeholder="Complete Street Address & Area" className="w-full p-4 border rounded-xl text-black outline-[#272343] bg-gray-50 focus:bg-white transition-all text-sm" minLength={15} required />
                        <select name="city" className="w-full p-4 border rounded-xl bg-gray-50 text-black outline-[#272343] font-bold cursor-pointer text-sm" required>
                            <option value="Karachi">Karachi</option>
                        </select>
                    </div>

                    <div className="bg-white border-2 border-[#272343] p-4 md:p-6 rounded-2xl shadow-xl space-y-4">
                        <h2 className="font-black text-[#272343] italic uppercase text-sm">Payment Method</h2>

                        <div className="flex gap-2">
                            {["SadaPay", "JazzCash"].map((method) => (
                                <button 
                                    key={method}
                                    type="button"
                                    onClick={() => setPaymentMethod(method)}
                                    className={`flex-1 py-2 rounded-lg font-bold text-xs border-2 transition-all ${paymentMethod === method ? "border-[#272343] bg-[#272343]/5 text-[#272343]" : "border-gray-200 text-gray-400"}`}
                                >
                                    {method}
                                </button>
                            ))}
                        </div>
                        
                        <div className="p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Send To ({paymentMethod}):</p>
                            <p className="text-xl font-black text-[#272343]">0326 8683373</p>
                            <p className="text-[10px] font-medium text-gray-600 uppercase">Title: <span className="font-bold text-black underline">RD ORGANIC</span></p>
                        </div>

                        <div className="pt-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Transaction ID (TID)</label>
                            <input name="transId" placeholder="Enter TRX ID" className="w-full p-4 border-2 border-[#272343]/30 rounded-xl text-black outline-[#272343] font-mono text-sm uppercase" required />
                            <p className="text-[9px] text-red-600 font-bold mt-2 uppercase">* Share Transaction Slip on WhatsApp after clicking confirm</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 border border-gray-200 rounded-2xl h-fit md:sticky md:top-24">
                    <h2 className="font-black mb-6 text-[#272343] border-b pb-4 text-xl uppercase italic">Order Summary</h2>
                    <div className="space-y-4 mb-8">
                        {cartItems.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                                <span className="text-black font-bold">{item.title || item.name} <span className="text-gray-400 text-xs ml-1">x{item.quantity || 1}</span></span>
                                <span className="font-bold">Rs. {item.price * (item.quantity || 1)}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="border-t-2 border-dashed pt-4 mb-8 space-y-2">
                        <div className="flex justify-between text-gray-500 text-sm">
                            <span>Subtotal:</span>
                            <span>Rs. {subtotal}</span>
                        </div>
                        <div className="flex justify-between text-[#272343] text-xl font-black pt-4 border-t border-gray-200 mt-2">
                            <span>Total Bill:</span>
                            <span>Rs. {total}</span>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-[#272343] text-white font-black p-5 rounded-xl shadow-2xl transition-all uppercase tracking-widest disabled:bg-gray-300">
                        {loading ? "Confirming..." : "Confirm & Share Slip"}
                    </button>
                    <p className="text-[8px] text-center mt-3 text-gray-400">RD ORGANIC HAIR CARE</p>
                </div>
            </form>
        </div>
    );
}