"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Trash2, ShoppingBag, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  promoPrice?: number;
  images: string[];
  category: {
    name: string;
  };
}

interface QuoteItem {
  productId: string;
  product: Product;
  quantity: number;
  bedSize?: string;
  design?: string;
  setType?: string;
  specialNotes?: string;
}

export default function RequestQuotePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<QuoteItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const addItemToQuote = (product: Product) => {
    const newItem: QuoteItem = {
      productId: product.id,
      product,
      quantity: 1,
    };
    setSelectedItems([...selectedItems, newItem]);
    setShowProductModal(false);
    toast.success(`${product.name} added to quote request`);
  };

  const updateItem = (index: number, field: keyof QuoteItem, value: any) => {
    const updated = [...selectedItems];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedItems(updated);
  };

  const removeItem = (index: number) => {
    const updated = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updated);
    toast.success("Item removed from quote");
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => {
      const price = item.product.promoPrice || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      toast.error("Please add at least one item to your quote request");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone,
          customerAddress: customerInfo.address || null,
          notes: customerInfo.notes || null,
          items: selectedItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            bedSize: item.bedSize,
            design: item.design,
            setType: item.setType,
            specialNotes: item.specialNotes,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit quote request");

      setSubmitted(true);
      toast.success("Quote request submitted successfully!");

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast.error("Failed to submit quote request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center"
        >
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quote Request Received!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your interest in JD Beddings & Interiors. We've received your quote request
              and will send you a detailed quotation via email within 24 hours.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
            <ul className="text-left text-blue-800 space-y-2 text-sm">
              <li>✓ You'll receive a confirmation email shortly</li>
              <li>✓ Our team will prepare your detailed quotation</li>
              <li>✓ We'll send the quote as a PDF to {customerInfo.email}</li>
              <li>✓ Feel free to contact us if you have any questions</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push("/products")}
              className="flex-1 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Browse Products
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 border-2 border-gray-900 text-gray-900 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Request Another Quote
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-4">
              Request a Quote
            </h1>
            <p className="text-xl text-gray-300">
              Get a personalized quotation for your home comfort needs
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="+234 800 000 0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address (Optional)
                </label>
                <input
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="Your address"
                />
              </div>
            </div>
          </div>

          {/* Selected Items */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Selected Items</h2>
              <button
                type="button"
                onClick={() => setShowProductModal(true)}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>

            {selectedItems.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No items added yet</p>
                <button
                  type="button"
                  onClick={() => setShowProductModal(true)}
                  className="inline-flex items-center gap-2 text-gray-900 font-medium hover:underline"
                >
                  <Plus className="w-4 h-4" />
                  Add your first product
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedItems.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                            <p className="text-sm text-gray-500">{item.product.category.name}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Quantity</label>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </div>

                          {item.product.category.name.toLowerCase().includes("bed") && (
                            <>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Bed Size</label>
                                <select
                                  value={item.bedSize || ""}
                                  onChange={(e) => updateItem(index, "bedSize", e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                >
                                  <option value="">Select</option>
                                  <option value="4x6">4x6 ft</option>
                                  <option value="6x6">6x6 ft</option>
                                  <option value="7x7">7x7 ft</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Design</label>
                                <select
                                  value={item.design || ""}
                                  onChange={(e) => updateItem(index, "design", e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                >
                                  <option value="">Select</option>
                                  <option value="plain">Plain</option>
                                  <option value="patterned">Patterned</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Type</label>
                                <select
                                  value={item.setType || ""}
                                  onChange={(e) => updateItem(index, "setType", e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                >
                                  <option value="">Select</option>
                                  <option value="bedspread">Bedspread</option>
                                  <option value="duvet">Duvet</option>
                                </select>
                              </div>
                            </>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Special Notes</label>
                          <input
                            type="text"
                            value={item.specialNotes || ""}
                            onChange={(e) => updateItem(index, "specialNotes", e.target.value)}
                            placeholder="Any special requirements..."
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">
                            ${(item.product.promoPrice || item.product.price).toFixed(2)} × {item.quantity} =
                            <span className="text-lg ml-2">
                              ${((item.product.promoPrice || item.product.price) * item.quantity).toFixed(2)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Estimated Total:</span>
                    <span className="text-gray-900">${calculateTotal().toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    *Final quote may vary based on customization and delivery location
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Notes</h2>
            <textarea
              value={customerInfo.notes}
              onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
              rows={4}
              placeholder="Any special requests or additional information..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <button
              type="submit"
              disabled={submitting || selectedItems.length === 0}
              className="w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Request Quote"}
            </button>
            <p className="text-sm text-gray-500 text-center mt-3">
              We'll send you a detailed quotation via email within 24 hours
            </p>
          </div>
        </form>
      </div>

      {/* Product Selection Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">Select Products</h3>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 bg-gray-100">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {product.promoPrice && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                            SALE
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                        <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            {product.promoPrice ? (
                              <>
                                <p className="text-lg font-bold text-red-600">${product.promoPrice.toFixed(2)}</p>
                                <p className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</p>
                              </>
                            ) : (
                              <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
                            )}
                          </div>
                          <button
                            onClick={() => addItemToQuote(product)}
                            disabled={selectedItems.some((item) => item.productId === product.id)}
                            className="bg-gray-900 text-white px-3 py-1 rounded hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {selectedItems.some((item) => item.productId === product.id) ? "Added" : "Add"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
