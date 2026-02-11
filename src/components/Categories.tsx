import Image from "next/image";
// import Link from "next/link"; // <-- Link import hata diya gaya

export default function Categories() {
  const categories = [
    {
      name: "Tramira Royal",
      // products: "3,584 Products",
      image: "/p9.png",
      // href: "/categories/Tramira Royal", // <-- href property hata di gayi
    },
    {
      name: "Twin Essence",
      // products: "157 Products",
      image: "/p5.png",
      // href: "/categories/Twin Essence", // <-- href property hata di gayi
    },
    {
      name: "Mustard Royal",
      // products: "154 Products",
      image: "/p10.png",
      // href: "/categories/Mustard Royal", // <-- href property hata di gayi
    },
  ];

  return (
    <section className="w-full px-4 py-[7rem] md:px-6">
      <div className="max-w-screen-lg mx-auto ">
        <h2 className="text-3xl font-bold tracking-tight mb-8">
          Top Categories
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
      
            <div
              key={category.name} // Key ko 'div' mein rakha gaya for list rendering best practice
              className="group relative overflow-hidden rounded-lg cursor-default" // cursor-default add kiya gaya taaki yeh clickable na lage
            >
              <div className="aspect-[4/3] w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  // 'group-hover:scale-105' animation ab bhi rahegi, sirf click functionality band hui hai
                  className="object-cover transition-transform duration-300 group-hover:scale-105" 
                  priority
                  width={400}
                  height={400}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 p-6">
                  <h3 className="mb-2 font-inter text-xl font-medium text-white">
                    {category.name}
                  </h3>
                  <p className="font-inter text-sm text-gray-200">
                    {/* products count yahan aa sakta tha agar uncommented hota */}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}