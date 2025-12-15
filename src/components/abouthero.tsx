
import React from "react"; 
import Image from "next/image";
// import { Link } from "lucide-react";
import Link from "next/link";

const AboutHero = () => {
    return (
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center bg-white mt-16 md:mt-32 px-4">
            {/* Left Section */}
            <div className="w-full md:w-[650px] h-auto md:h-[478px] bg-[#F0F2F3] p-6 flex flex-col justify-start items-start text-left text-[#272343]">
                <h1 className="text-[24px] md:text-[32px] font-bold pl-4 md:pl-6 pt-8 md:pt-12">
                    About Us -  RD Organic Hair Oil
                </h1>
                <p className="text-[16px] md:text-[18px] font-normal pt-4 pl-4 md:pl-6 pb-4 md:pb-8">
                   At R D Organic Hair Oil, we believe that true beauty begins with nature.
Our mission is to bring you pure, organic, and chemical-free hair oils that nourish your scalp, strengthen your roots, and bring a natural shine to your hair.
Each bottle is made with cold-pressed ingredients and traditional techniques, blending purity with care — because your hair deserves nothing less than nature’s best.

                </p>
                <div className="pl-4 md:pl-6">
              <Link href={'product'}>
               <button className="bg-[#272343] hover:bg-gray-500 transition-colors duration-300 text-white px-6 md:px-8 py-3 md:py-4 text-[14px] md:text-[16px] font-medium rounded-lg shadow-md hover:shadow-lg">
              View Collection
        
               </button>
               </Link>
</div>  
            </div>

            {/* Right Section */}
            <div className="w-full md:w-[619px] h-auto md:h-[478px] mt-6 md:mt-0 md:ml-6">
                <Image
                    src="/p5.png"
                    alt="img"
                    width={619}
                    height={478}
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
};

export default AboutHero;
