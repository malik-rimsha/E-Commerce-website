
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDescriptionPage({ params }: { params: Promise<{ slug: string }> }) {
  
  const { slug } = await params;
  const product = await client.fetch(`*[_type == "products" && slug.current == $slug][0]{
    _id,
    title,
    price,
    description,
    "imageUrl": image.asset->url,
    originalPrice
  }`, { slug });

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative aspect-square">
          <Image 
            src={product.imageUrl} 
            alt={product.title} 
            fill 
            className="object-cover rounded-lg" 
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-[#1C1B1F] mb-4">{product.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-semibold text-emerald-600">PKR {product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">PKR {product.originalPrice}</span>
            )}
          </div>
          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>
          
          <AddToCartButton product={product} />

        </div>
      </div>
    </div>
  );
}