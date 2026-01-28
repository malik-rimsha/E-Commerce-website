export default function ShippingPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-24 px-6 text-[#272343]">
      <h1 className="text-4xl font-black mb-8 uppercase italic tracking-tighter border-b-4 border-[#272343] inline-block">Shipping & Returns</h1>
      <div className="space-y-6 text-gray-700">
        <h2 className="text-xl font-bold text-[#272343]">Shipping Policy</h2>
        <ul className="list-disc ml-5 space-y-2">
          <li>Delivery Location: Karachi only.</li>
          <li>Delivery Time: 2 to 4 working days.</li>
          <li>Standard Shipping Fee: Rs. 200.</li>
        </ul>

        <h2 className="text-xl font-bold text-[#272343]">Return & Refund</h2>
        <p>Since our products are organic hair oils, we only accept returns if:</p>
        <ul className="list-disc ml-5 space-y-2">
          <li>The wrong product was delivered.</li>
        </ul>
        <p className="font-bold">Note: Please record an unboxing video as proof for any claim.</p>
      </div>
    </div>
  );
}