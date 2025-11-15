"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, FileText } from "lucide-react";
import Image from "next/image";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  bedSize?: string;
  design?: string;
  setType?: string;
  specialNotes?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    if (storedItems.length === 0) {
      router.push("/cart");
    }
    setItems(storedItems);
  }, [router]);

  const updateItem = (index: number, updates: Partial<CartItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };
    setItems(newItems);
  };

  const isBeddingCategory = (category: string) => {
    return ["Bedspread Sets", "Duvet Sets"].includes(category);
  };

  const handleQuoteRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const quoteData = {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        customerAddress: customerInfo.address,
        notes: customerInfo.notes,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          bedSize: item.bedSize,
          design: item.design,
          setType: item.setType,
          specialNotes: item.specialNotes,
        })),
      };

      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteData),
      });

      if (!res.ok) throw new Error("Failed to submit quote");

      localStorage.removeItem("cartItems");
      window.dispatchEvent(new Event("storage"));
      setSuccess(true);

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("Failed to submit quote. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppCheckout = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

    let message = `Hi! I'd like to request a quote for the following items:\n\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: $${item.price.toFixed(2)}\n`;

      if (isBeddingCategory(item.category)) {
        if (item.bedSize) message += `   Bed Size: ${item.bedSize}\n`;
        if (item.design) message += `   Design: ${item.design}\n`;
        if (item.setType) message += `   Set Type: ${item.setType}\n`;
      }

      if (item.specialNotes) {
        message += `   Notes: ${item.specialNotes}\n`;
      }

      message += `\n`;
    });

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `Estimated Total: $${total.toFixed(2)}\n\n`;

    if (customerInfo.name) message += `Name: ${customerInfo.name}\n`;
    if (customerInfo.email) message += `Email: ${customerInfo.email}\n`;
    if (customerInfo.phone) message += `Phone: ${customerInfo.phone}\n`;
    if (customerInfo.address) message += `Address: ${customerInfo.address}\n`;
    if (customerInfo.notes) message += `\nAdditional Notes: ${customerInfo.notes}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-2">Quote Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            We'll review your request and get back to you within 24 hours with a detailed quote.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Order Items</h2>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex gap-4 mb-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <p className="text-sm mt-1">
                          Quantity: <span className="font-medium">{item.quantity}</span>
                        </p>
                        <p className="text-lg font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Bedding-specific fields */}
                    {isBeddingCategory(item.category) && (
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bed Size
                          </label>
                          <select
                            value={item.bedSize || ""}
                            onChange={(e) => updateItem(index, { bedSize: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                          >
                            <option value="">Select size</option>
                            <option value="4x6">4 x 6</option>
                            <option value="6x6">6 x 6</option>
                            <option value="7x7">7 x 7</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Design
                          </label>
                          <select
                            value={item.design || ""}
                            onChange={(e) => updateItem(index, { design: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                          >
                            <option value="">Select design</option>
                            <option value="plain">Plain</option>
                            <option value="patterned">Patterned</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Set Type
                          </label>
                          <select
                            value={item.setType || ""}
                            onChange={(e) => updateItem(index, { setType: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                          >
                            <option value="">Select type</option>
                            <option value="bedspread">Bedspread Set</option>
                            <option value="duvet">Duvet Set</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Notes (Optional)
                      </label>
                      <textarea
                        value={item.specialNotes || ""}
                        onChange={(e) => updateItem(index, { specialNotes: e.target.value })}
                        placeholder="Any special requirements..."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Your Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address (Optional)
                    </label>
                    <input
                      type="text"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="123 Main St"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    rows={3}
                    placeholder="Any additional information..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Checkout Options */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items ({items.length})</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-lg font-bold mb-2">
                  <span>Estimated Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Final price will be confirmed in your quote
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleQuoteRequest}
                  disabled={submitting || !customerInfo.name || !customerInfo.email || !customerInfo.phone}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  {submitting ? "Submitting..." : "Request Quote"}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send to WhatsApp
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Choose your preferred method to receive a personalized quote
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
