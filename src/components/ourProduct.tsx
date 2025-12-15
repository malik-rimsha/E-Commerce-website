import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
}

export default function OurProduct() {
  const products: Product[] = [
    {
      id: 1,
      title: "Taramira Mild",
      price: 999,
      image: "/p8.png",
      isNew: true,
    },
    {
      id: 2,
      title: "  Twin Drop Of Gold",
      price: 1999,
      originalPrice: 2100,
      image: "/p2.png",
      isSale: true,
    },
    {
      id: 3,
      title: "  Mustard Royal",
      price: 999,
      image: "/p10.png",
    },
    {
      id: 4,
      title: "Mustard Classic",
      price: 999,
      image: "/p4.png",
    },
    {
      id: 5,
      title: "Taramira Royal",
      price: 999,
      image: "/p9.png",
      isNew: true,
    },
    {
      id: 6,
      title: "Mustard Bloom",
      price: 999,
      originalPrice: 1099,
      image: "/p6.png",
      isSale: true,
    },
    {
      id: 8,
      title: "Twin Essence",
      price: 1999,
      image: "/p5.png",
    },
    {
      id: 7,
      title: "Taramira Strong",
      price: 999,
      image: "/p7.png",
    },
   
  ];

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-20">
      <h1 className="text-3xl text-center font-semibold text-[#1C1B1F] tracking-tight  mb-8">
        {" "}
        Our Products
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="group relative rounded-lg bg-white">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              {product.isNew && (
                <Badge className="absolute left-3 top-3 bg-[#272343] hover:bg-emerald-600">
                  New
                </Badge>
              )}
              {product.isSale && (
                <Badge className="absolute left-3 top-3 bg-[#272343] hover:bg-orange-600">
                  Sales
                </Badge>
              )}
              <Link href={"components/productDectription/discription"}>
                <Image
                  src={product.image}
                  alt={product.title}
                  height={400}
                  width={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm text-[#1C1B1F]">{product.title}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-lg font-medium text-[#1C1B1F]">
                    PKR {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      PKR {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <button className="rounded-full bg-[#272343] p-2 text-white transition-colors hover:bg-gray-500">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Add to cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}