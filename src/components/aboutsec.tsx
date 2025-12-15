import React from "react";
import { FaTruck } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoFileTrayOutline } from "react-icons/io5";
import { BiSolidLeaf } from "react-icons/bi";

const AboutSection = () => {
    return (
        <div className="max-w-screen-xl mx-auto mt-32 px-6">
            <h2 className="text-[32px] font-semibold text-center mb-12">
                What makes our Brand Different
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-[#F9F9F9] p-6 text-center">
                    <h3 className="text-[20px] font-normal text-[#272343] flex items-center justify-center pt-5">
                        <FaTruck className="text-[#272343] mb-2" />
                       Organic Essence

                    </h3>
                    <p className="text-[16px] font-normal text-[#272343]  mt-4">
                       Every drop is made from handpicked mustard and taramira seeds — no chemicals, no preservatives, just natural goodness.

                    </p>
                </div>

                <div className="bg-[#F9F9F9] p-6 text-center">
                    <h3 className="text-[20px] font-normal text-[#272343] flex items-center justify-center pt-5">
                        <FaCheck className="text-[#272343] mr-2" />
                        Traditionally Crafted

                    </h3>
                    <p className="text-[16px] font-normal text-[#272343] mt-4 text-left">
                        Inspired by age-old beauty secrets, our oils are carefully prepared to retain every nutrient and benefit.

                    </p>
                </div>

                <div className="bg-[#F9F9F9] p-6 text-center">
                    <h3 className="text-[20px] font-normal text-[#272343] flex items-center justify-center pt-5">
                        <IoFileTrayOutline className="text-[#272343] mr-3" />
                        Naturally Affordable

                    </h3>
                    <p className="text-[16px] font-normal text-[#272343] mt-4">
                        We believe organic beauty should be accessible — that’s why our products offer the best quality at fair prices.

                    </p>
                </div>

                <div className="bg-[#F9F9F9] p-6 text-center">
                    <h3 className="text-[20px] font-normal text-[#272343] flex items-center justify-center pt-5">
                        <BiSolidLeaf className="text-[#272343] mr-3" />
                        Sustainable Wrap

                    </h3>
                    <p className="text-[16px] font-normal text-[#272343] mt-4">
                       We use recyclable materials to protect the planet while you protect your hair.

                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;