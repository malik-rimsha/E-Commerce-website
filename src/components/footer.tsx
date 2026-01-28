"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link"; 
import {
    FaFacebookF,
    FaInstagram,
    FaTiktok, // TikTok icon import kiya
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 px-4 sm:px-12 md:px-28">
            <div className="mx-auto py-12">
                <div className="flex flex-wrap justify-between gap-8">
                    {/* Brand Section */}
                    <div className="flex flex-col items-start w-full sm:w-1/2 md:w-1/5">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/RDlogo.png"
                                alt="logo"
                                width={80}
                                height={40}
                            />
                        </div>
                        <p className="mt-4 text-gray-500 text-sm md:text-base">
                            Nurturing your hair with nature&apos;s finest. RD Organic Hair Oil – Where
                            Purity meets Perfection.
                        </p>
                        
                        {/* Social Icons Section - Updated */}
                        <div className="flex gap-4 mt-4">
                            {/* Facebook */}
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-[#272343] text-xl border-2 border-transparent rounded-full hover:border-[#272343]"
                            >
                                <FaFacebookF />
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/rdorganichairoil?igsh=MXRlYm12ZHRxM2cyaA=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-[#272343] text-xl border-2 border-transparent rounded-full hover:border-[#272343]"
                            >
                                <FaInstagram />
                            </a>

                            {/* TikTok */}
                            <a
                                href="https://tiktok.com/@rd.organic.hair.oil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-[#272343] text-xl border-2 border-transparent rounded-full hover:border-[#272343]"
                            >
                                <FaTiktok />
                            </a>
                        </div>
                    </div>

                    {/* Category Section (No changes) */}
                    <div className="w-full sm:w-1/2 md:w-1/5">
                        <h4 className="text-lg font-semibold text-[#9A9CAA]">Category</h4>
                        <ul className="mt-4 text-[#272343] space-y-2">
                            {[
                                "Taramira Strong",
                                "Taramira Mild",
                                "Twin Drop Of Gold",
                                "Mustard Royal",
                                "Mustard Classic",
                                "Twin Essence",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="hover:text-[#272343] hover:underline hover:underline-offset-4"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Section (Working Links) */}
                    <div className="w-full sm:w-1/2 md:w-1/5">
                        <h4 className="text-lg font-semibold text-[#9A9CAA]">Support</h4>
                        <ul className="mt-4 text-[#272343] space-y-2 font-medium">
                            <li>
                                <Link href="/support" className="hover:text-[#272343] hover:underline hover:underline-offset-4 cursor-pointer">
                                    Help & Support
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-[#272343] hover:underline hover:underline-offset-4 cursor-pointer">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="hover:text-[#272343] hover:underline hover:underline-offset-4 cursor-pointer">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="hover:text-[#272343] hover:underline hover:underline-offset-4 cursor-pointer">
                                    Shipping & Returns
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="w-full sm:w-1/2 md:w-1/5">
                        <h4 className="text-lg font-semibold text-[#9A9CAA]">Stay Natural</h4>
                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-4 py-2 w-full border text-[#9A9CAA] border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none"
                            />
                            <button className="bg-[#272343] text-white px-6 py-2 rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-gray-500">
                                Subscribe
                            </button>
                        </div>
                        <p className="mt-4 text-gray-500 text-sm md:text-base">
                            Blending tradition and purity to bring you healthier, stronger hair.
                        </p>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-wrap justify-between items-center text-[#9A9CAA] border-t pt-8 mt-8">
                    <p className="w-full text-center sm:w-auto">
                        © 2026 - R D Organic Hair Oil - Designed & Developed by{" "}
                        <a href="#" className="text-[#272343] hover:underline">
                            RD Team
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}