"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";

interface QuoteItem {
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

export default function QuotePage() {
  const router = useRouter();
  const [items, setItems] = useState<QuoteItem[]>([]);
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
    const storedItems = JSON.parse(localStorage.getItem("quoteItems") || "[]");
    setItems(storedItems);
  }, []);

  const updateItem = (index: number, updates: Partial<QuoteItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };
    setItems(newItems);
    localStorage.setItem("quoteItems", JSON.stringify(newItems));
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    localStorage.setItem("quoteItems", JSON.stringify(newItems));
  };

  const isBeddingCategory = (category: string) => {
    return ["Bedspread Sets", "Duvet Sets"].includes(category);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

      localStorage.removeItem("quoteItems");
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

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-2">Quote Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            We'll get back to you within 24 hours with a detailed quote.
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your quote request is empty</h2>
          <button
            onClick={() => router.push("/products")}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold mb-8">
          Request a Quote
        </h1>

        <div className="space-y-6">
          {/* Quote Items */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Selected Products</h2>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex gap-4 mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <p className="text-lg font-bold mt-2">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                      placeholder="Any special requirements or preferences..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Information */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Your Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                  rows={4}
                  placeholder="Any additional information or questions..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? "Submitting..." : "Submit Quote Request"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
