export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto py-24 px-6 text-[#272343]">
      <h1 className="text-4xl font-black mb-8 uppercase italic tracking-tighter border-b-4 border-[#272343] inline-block">Terms & Conditions</h1>
      <div className="space-y-6 text-gray-700">
        <h2 className="text-xl font-bold text-[#272343]">1. Orders & Delivery</h2>
        <p>By placing an order, you agree to provide accurate information. Currently, we are only delivering in **Karachi**. Orders are typically delivered within 2-4 working days.</p>

        <h2 className="text-xl font-bold text-[#272343]">2. Pricing</h2>
        <p>All prices listed on the website are in PKR. Delivery charges are extra unless stated otherwise in a promotion.</p>

        <h2 className="text-xl font-bold text-[#272343]">3. Payment</h2>
        <p>We accept payments via SadaPay and JazzCash. Orders will only be confirmed once the Transaction ID or screenshot is verified via WhatsApp.</p>
      </div>
    </div>
  );
}