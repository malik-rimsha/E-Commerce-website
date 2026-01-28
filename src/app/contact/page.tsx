"use client";
import React, { useState } from "react";
import { Poppins } from "next/font/google";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import ContactSection from "@/components/contactsection";
import axios from "axios";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600"] });

const Page = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        try {
            const response = await axios.post("/api/contact", data);
            if (response.status === 200) {
                alert("Thank you! Your message has been sent successfully.");
                (e.target as HTMLFormElement).reset();
            }
        } catch (error) {
            console.error(error);
            alert("Sorry, something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto mt-24 px-4 sm:px-6 ">
            <h1 className="font-semibold text-4xl text-center sm:text-3xl text-[#272343]">
                Get In Touch With Us
            </h1>

            <p className="text-[16px] text-[#9F9F9F] font-normal text-center mt-[30px] max-w-2xl mx-auto">
                For More Information About Our Product & Services. Please Feel Free To
                Drop Us An Email. Our Staff Always Be There To Help You Out.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[60px]">
                {/* Contact Info Left Side */}
                <div className="flex flex-col space-y-8 px-6 md:px-10">
                    <div className="flex items-start space-x-4">
                        <FaMapMarkerAlt className="text-[#272343] text-2xl mt-1" />
                        <div>
                            <h2 className={`${poppins.className} text-[20px] font-medium`}>Address</h2>
                            <p className="text-gray-600 text-[14px]">https://RDOrganicHairOil.com</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <FaPhone className="text-[#272343] text-2xl mt-1" />
                        <div>
                            <h2 className={`${poppins.className} text-[20px] font-medium`}>Phone</h2>
                            <p className="text-gray-600 text-[14px]">
                                Mobile: +(92) 3268683373 <br /> Hotline: +(92) 3268683373
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <GoClockFill className="text-[#272343] text-2xl mt-1" />
                        <div>
                            <h2 className={`${poppins.className} text-[20px] font-medium`}>Working Time</h2>
                            <p className="text-gray-600 text-[14px]">
                                Open 24 Hours — Nature’s Care Never Closes.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form Right Side */}
                <div className="bg-white p-8 border rounded-xl shadow-sm">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className={`${poppins.className} block text-[16px] font-medium mb-2`}>Your name</label>
                            <input name="name" type="text" placeholder="Abc" className="w-full h-[65px] p-4 border border-gray-300 rounded-[10px] outline-none focus:border-[#272343]" required />
                        </div>

                        <div className="mb-6">
                            <label className={`${poppins.className} block text-[16px] font-medium mb-2`}>Email address</label>
                            <input name="email" type="email" placeholder="Abc@def.com" className="w-full h-[65px] p-4 border border-gray-300 rounded-[10px] outline-none focus:border-[#272343]" required />
                        </div>

                        <div className="mb-6">
                            <label className={`${poppins.className} block text-[16px] font-medium mb-2`}>Subject</label>
                            <input name="subject" type="text" placeholder="This is optional" className="w-full h-[65px] p-4 border border-gray-300 rounded-[10px] outline-none focus:border-[#272343]" />
                        </div>

                        <div className="mb-8">
                            <label className={`${poppins.className} block text-[16px] font-medium mb-2`}>Message</label>
                            <textarea name="message" placeholder="Hi! I’d like to ask about..." className="w-full h-[120px] p-4 border border-gray-300 rounded-[10px] outline-none focus:border-[#272343]" rows={4} required></textarea>
                        </div>

                        <button 
                            disabled={loading}
                            type="submit" 
                            className="w-full md:w-[237px] h-[55px] bg-[#272343] hover:bg-black text-white rounded-[5px] font-medium transition-all disabled:bg-gray-400"
                        >
                            {loading ? "Sending..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>

            <ContactSection />
        </div>
    );
};

export default Page;