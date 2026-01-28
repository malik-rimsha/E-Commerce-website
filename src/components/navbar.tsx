import Link from "next/link"
export default function Navbar() {
    return (
        <div className=" w-full border-b-2 text-xs bg-[#FFFFFF] p-4">
            <div className=" hidden md:flex ml-32 gap-4 font-sans ">
                <Link href={'/'} className=" text-sm font-normal">RD Organic</Link>
                <Link href={'product'} className=" text-sm font-normal">Our Collection</Link>
                <Link href={'about'} className=" text-sm font-normal">About US</Link>
                <Link href={'contact'} className=" text-sm font-normal">Get In Touch</Link>
                <Link href={'cart'} className=" text-sm font-normal">Shopping Bag</Link>
                <p className=" text-sm font-normal   ml-96">Contact +923268683373 </p>
            </ div>
        </div>
    )
}