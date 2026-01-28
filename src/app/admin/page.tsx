"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { createClient } from "@sanity/client";

// TypeScript Interface - Added transactionId and paymentMethod
interface Order {
    _id: string;
    _createdAt: string;
    customerName?: string; 
    phone?: string;
    address?: string;
    city?: string;
    totalPrice: number;
    status: string;
    paymentMethod?: string;
    transactionId?: string; // Naya field
    cartItems: {
        quantity: number;
        productName?: string;
    }[];
}

const writeClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN, 
    useCdn: false,
    apiVersion: '2023-05-03',
});

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            setIsLoggedIn(true);
            sessionStorage.setItem("adminLogin", "true");
        } else {
            alert("Ghalat Password!");
        }
    };

    useEffect(() => {
        const loggedIn = sessionStorage.getItem("adminLogin");
        if (loggedIn === "true") setIsLoggedIn(true);
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            const fetchOrders = async () => {
                try {
                    // Added transactionId and paymentMethod in Query
                    const query = `*[_type == "order"] | order(_createdAt desc) {
                        _id,
                        _createdAt,
                        customerName,
                        phone,
                        address,
                        city,
                        totalPrice,
                        status,
                        paymentMethod,
                        transactionId,
                        "cartItems": cartItems[] {
                            quantity,
                            "productName": coalesce(productName, product->title, "Unknown Product")
                        }
                    }`;
                    const data = await client.fetch(query);
                    setOrders(data);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchOrders();
        }
    }, [isLoggedIn]);

    const updateStatus = async (orderId: string, newStatus: string) => {
        try {
            await writeClient.patch(orderId).set({ status: newStatus }).commit();
            setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, status: newStatus } : o));
            alert("Status updated!");
        } catch (error) {
            alert("Update fail!");
        }
    };

    const deleteOrder = async (orderId: string) => {
        if (!confirm("Delete this order?")) return;
        try {
            await writeClient.delete(orderId);
            setOrders((prev) => prev.filter((o) => o._id !== orderId));
            alert("Deleted!");
        } catch (error) {
            alert("Delete failed!");
        }
    };

    const filteredOrders = filter === "All" ? orders : orders.filter((o) => o.status === filter);

    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                <form onSubmit={handleLogin} className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border-t-8 border-[#272343] w-full max-w-md">
                    <h2 className="text-xl md:text-2xl font-black mb-6 text-center text-[#272343] uppercase tracking-tight">Admin Portal</h2>
                    <input type="password" placeholder="Enter Admin Password" className="w-full p-4 border rounded-xl mb-4 text-black outline-[#272343] bg-gray-50 text-sm" onChange={(e) => setPassword(e.target.value)} required />
                    <button className="w-full bg-[#272343] text-white py-4 rounded-xl font-black hover:bg-gray-400 transition-all duration-300 uppercase tracking-widest text-sm">Login to Dashboard</button>
                </form>
            </div>
        );
    }

    if (loading) return <div className="flex justify-center items-center min-h-screen text-[#272343] font-black italic text-lg md:text-xl animate-pulse tracking-widest uppercase">Fetching Orders...</div>;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-black">
            <nav className="bg-[#272343] text-white p-4 flex flex-col lg:flex-row justify-between items-center shadow-lg sticky top-0 z-50 gap-4">
                <h1 className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-center lg:text-left">RD Organic <span className="text-gray-400">Admin</span></h1>
                <div className="flex flex-wrap justify-center gap-2 items-center w-full lg:w-auto">
                    {["All", "Pending", "Dispatch", "Success"].map((status) => (
                        <button key={status} onClick={() => setFilter(status)} className={`px-3 py-1.5 rounded-lg text-[9px] md:text-[10px] font-bold transition-all duration-300 uppercase tracking-widest ${filter === status ? "bg-white text-[#272343] shadow-inner scale-95" : "bg-[#3a355c] text-white hover:bg-gray-400"}`}>
                            {status}
                        </button>
                    ))}
                    <button onClick={() => {sessionStorage.removeItem("adminLogin"); setIsLoggedIn(false);}} className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-[9px] md:text-[10px] font-black hover:bg-red-600 transition-colors uppercase">Logout</button>
                </div>
            </nav>

            <div className="p-4 md:p-6 lg:p-8">
                {/* Desktop View */}
                <div className="hidden lg:block bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-center">
                            <thead className="bg-gray-100 text-[#272343] font-black border-b border-gray-200 uppercase text-[10px] tracking-[0.15em]">
                                <tr>
                                    <th className="p-5">ID</th>
                                    <th className="p-5 text-left">Customer</th>
                                    <th className="p-5 text-left">Payment & TID</th>
                                    <th className="p-5 text-left">Address</th>
                                    <th className="p-5 text-left">Products</th>
                                    <th className="p-5">Bill</th>
                                    <th className="p-5">Status</th>
                                    <th className="p-5">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition-all text-sm">
                                        <td className="p-4 text-[10px] font-mono text-gray-400 italic">#{order._id.slice(-5)}</td>
                                        <td className="p-4 text-left">
                                            <span className="text-[#272343] font-black block uppercase text-xs">{order.customerName}</span>
                                            <span className="text-[11px] text-blue-600 font-bold">{order.phone}</span>
                                        </td>
                                        {/* Payment Column */}
                                        <td className="p-4 text-left">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase block">{order.paymentMethod || 'N/A'}</span>
                                            {order.transactionId ? (
                                                <span className="bg-yellow-100 text-yellow-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded mt-1 inline-block border border-yellow-200">
                                                    ID: {order.transactionId}
                                                </span>
                                            ) : (
                                                <span className="text-red-400 text-[10px] italic">No TID</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-left">
                                            <span className="font-black text-[#272343] text-[10px] uppercase">{order.city}</span><br/>
                                            <span className="text-[10px] text-gray-500 line-clamp-1">{order.address}</span>
                                        </td>
                                        <td className="p-4 bg-gray-50/50">
                                            {order.cartItems?.map((item, idx) => (
                                                <div key={idx} className="text-[11px] border-b border-gray-200 last:border-0 py-1 font-bold text-[#272343] uppercase">
                                                    {item.productName} <span className="text-gray-400 font-normal">x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="p-4 font-black text-[#272343] italic">Rs. {order.totalPrice}</td>
                                        <td className="p-4">
                                            <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} className="p-2 rounded-lg text-[10px] font-black border-2 outline-none">
                                                <option value="Pending">PENDING</option>
                                                <option value="Dispatch">DISPATCH</option>
                                                <option value="Success">SUCCESS</option>
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <button onClick={() => deleteOrder(order._id)} className="bg-red-50 text-red-600 p-2 rounded-lg text-[9px] font-black uppercase hover:bg-red-100">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile View */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredOrders.map((order) => (
                        <div key={order._id} className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">
                            <div className="flex justify-between items-center mb-4 border-b pb-2">
                                <span className="text-[10px] font-mono text-gray-400">#{order._id.slice(-5)}</span>
                                {order.transactionId && (
                                    <span className="bg-yellow-100 text-yellow-800 text-[9px] font-bold px-2 py-0.5 rounded border border-yellow-200 uppercase">
                                        TID: {order.transactionId}
                                    </span>
                                )}
                            </div>
                            <div className="mb-4">
                                <h3 className="text-[#272343] font-black uppercase text-sm">{order.customerName}</h3>
                                <p className="text-blue-600 font-bold text-xs">{order.phone}</p>
                                <p className="text-[11px] text-gray-500 mt-1">{order.address}, <span className="font-bold uppercase">{order.city}</span></p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-xl mb-4">
                                {order.cartItems?.map((item, idx) => (
                                    <div key={idx} className="text-[11px] font-bold text-[#272343] flex justify-between uppercase border-b border-gray-100 last:border-0 py-1">
                                        <span>{item.productName}</span>
                                        <span className="italic text-gray-400">x{item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t">
                                <p className="font-black text-[#272343] text-lg">Rs. {order.totalPrice}</p>
                                <div className="flex gap-2">
                                    <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} className="p-2 rounded-lg text-[10px] font-black border-2 outline-none">
                                        <option value="Pending">PENDING</option>
                                        <option value="Dispatch">DISPATCH</option>
                                        <option value="Success">SUCCESS</option>
                                    </select>
                                    <button onClick={() => deleteOrder(order._id)} className="bg-red-50 text-red-600 p-2 rounded-lg text-[10px] font-black">X</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}