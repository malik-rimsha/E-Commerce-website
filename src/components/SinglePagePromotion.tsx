import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

export default async function SinglePagePromotion() {
  const products = await client.fetch(`*[_type == "products"][0...5]{
    _id,
    title,
    price,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }`);

  return (
    <div className="lg:mx-20 sm:mx-10 mx-3 lg:mt-10 mt-5 mb-10 lg:mb-24">
      <div className="head flex md:flex-row flex-col gap-3 justify-between items-center">
        <h3 className="uppercase lg:text-[28px] text-[18px] font-bold text-black">
          Featured Products
        </h3>
        <Link
          href="/product"
          className="text-black font-bold lg:text-[18px] text-sm lg:border-b-2 border-b lg:pb-1 border-black"
        >
          View All
        </Link>
      </div>

      <div className="images mt-12 gap-7 overflow-x-scroll scrollbar-hide flex">
        {products.map((prod: any) => (
         
          <Link href={`/products/${prod.slug}`} key={prod._id} className="flex-shrink-0">
            <div className="w-[220px] h-[220px] hover:drop-shadow-md relative">
              <Image
                src={prod.imageUrl}
                alt={prod.title}
                fill
                className="rounded-lg object-cover"
                priority
              />
            </div>
            <div className="flex flex-col gap-1 mt-3 w-[220px]">
              <div className="flex justify-between">
                <span className="text-[#272343] font-medium truncate">{prod.title}</span>
                <span className="text-black font-bold">PKR {prod.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}