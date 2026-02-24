
import React from "react"

export default function Topbar() {
    return (
        // Maine 'hidden md:flex' ko hata kar sirf 'flex' kar diya hai taake mobile par bhi dikhayi de
        <div className="w-full bg-[#272343] flex items-center p-2 md:p-4 justify-between">
            <div className="max-w-7xl mx-auto flex items-center justify-center font-bold">
                <p className="text-white text-[10px] sm:text-xs md:text-sm text-center uppercase tracking-wider">
                    Welcome To RD Organic Hair Oil
                </p>
            </div>
        </div>
    )
}