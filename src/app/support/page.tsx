export default function Support() {
  return (
    <div className="max-w-4xl mx-auto py-24 px-6 text-[#272343] text-center">
      <h1 className="text-4xl font-black mb-4 uppercase italic tracking-tighter">Need Help?</h1>
      <p className="text-gray-600 mb-12">our is always there for you.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="bg-gray-50 p-8 rounded-2xl border-2 border-[#272343]">
          <h2 className="font-black text-lg mb-2 uppercase">WhatsApp Support</h2>
          <p className="text-gray-600 mb-4">Fastest way to get in touch for order tracking.</p>
          <a href="https://wa.me/923268683373" className="text-[#272343] font-bold text-xl underline">+92 326 8683373</a>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-2xl border-2 border-[#272343]">
          <h2 className="font-black text-lg mb-2 uppercase">Order Queries</h2>
          <p className="text-gray-600 mb-4">Send us your order ID for any issues.</p>
          <p className="text-[#272343] font-bold text-xl uppercase italic">RD Organic Hair Oil</p>
        </div>
      </div>
    </div>
  );
}