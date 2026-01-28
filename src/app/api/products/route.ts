import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    {
      title: "RD Herbal Taramira",
      price: 999,
      imageUrl: "https://plus.unsplash.com/premium_photo-1676733536842-8877f0932252?q=80&w=1887&auto=format&fit=crop",
      description: "Organic herbal oil for hair growth and scalp health.",
      inventory: 100,
      badge: "New"
    },
    {
      title: "Twin Drop Of Gold",
      price: 1999,
      priceWithoutDiscount: 2199,
      imageUrl: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2070&auto=format&fit=crop",
      description: "Premium gold essence hair oil.",
      inventory: 50,
      badge: "Sale"
    },
    {
      title: "Mustard Luxe",
      price: 999,
      imageUrl: "https://images.unsplash.com/photo-1626015569425-99834891f153?q=80&w=2070&auto=format&fit=crop",
      description: "Luxurious mustard oil for deep nourishment.",
      inventory: 80
    },
    {
      title: "Mustard Classic",
      price: 999,
      imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1921&auto=format&fit=crop",
      description: "Classic mustard oil for everyday use.",
      inventory: 120
    },
    {
      title: "Twin Essence",
      price: 1999,
      imageUrl: "https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=1887&auto=format&fit=crop",
      description: "Natural essence for total hair repair.",
      inventory: 45,
      badge: "New"
    },
    {
      title: "Mustard Bloom",
      price: 999,
      priceWithoutDiscount: 1199,
      imageUrl: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=2070&auto=format&fit=crop",
      description: "Floral infused mustard oil.",
      inventory: 60,
      badge: "Sale"
    },
    {
      title: "Taramira Strong",
      price: 999,
      imageUrl: "https://images.unsplash.com/photo-1631671545643-d876408f62c5?q=80&w=1887&auto=format&fit=crop",
      description: "Extra strength Taramira extract.",
      inventory: 90
    },
    {
      title: "Taramira Mild",
      price: 999,
      imageUrl: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?q=80&w=1887&auto=format&fit=crop",
      description: "Gentle formula for daily scalp care.",
      inventory: 110
    },
    {
      title: "RD Herbal Mustard",
      price: 999,
      imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1921&auto=format&fit=crop",
      description: "Pure herbal mustard blend.",
      inventory: 70,
      badge: "New"
    },
    {
      title: "Taramira Revive",
      price: 999,
      priceWithoutDiscount: 1099,
      imageUrl: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=2070&auto=format&fit=crop",
      description: "Revitalizing oil for damaged hair.",
      inventory: 55,
      badge: "Sale"
    },
    {
      title: "Taramira Royal",
      price: 999,
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop",
      description: "Luxury royal edition hair oil.",
      inventory: 30
    },
    {
      title: "Mustard Royal",
      price: 999,
      imageUrl: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2070&auto=format&fit=crop",
      description: "Royal mustard oil for shining hair.",
      inventory: 25
    }
  ];

  return NextResponse.json(products);
}