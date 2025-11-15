"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import RotatingText from "@/components/animations/RotatingText";
import NewsletterForm from "@/components/NewsletterForm";
import { products } from "@/lib/products";
import { Product } from "@/lib/types";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const featuredProducts = products.filter(p => p.featured);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your Space with{" "}
              <RotatingText
                words={["Luxury", "Elegance", "Style", "Quality"]}
                duration={2500}
                className="text-amber-400"
              />
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Discover our premium collection of{" "}
              <RotatingText
                words={["curtains", "bedding", "towels", "home decor"]}
                duration={3000}
                className="font-semibold"
              />
              .
              Elevate your living space with timeless elegance and unmatched quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-200 font-[family-name:var(--font-montserrat)] font-semibold group"
              >
                Shop Collection
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#featured"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-200 font-[family-name:var(--font-montserrat)] font-semibold"
              >
                View Featured
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                description: "Carefully curated products made from the finest materials",
                icon: "✨"
              },
              {
                title: "Fast Delivery",
                description: "Free shipping on orders over $100",
                icon: "🚚"
              },
              {
                title: "Satisfaction Guaranteed",
                description: "30-day money-back guarantee on all products",
                icon: "🛡️"
              }
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.2} direction="up">
                <div className="text-center p-6">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <ScrollReveal direction="up">
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Handpicked selections from our premium collection
              </p>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>

          <ScrollReveal direction="up">
            <div className="text-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-[family-name:var(--font-montserrat)] font-semibold group"
              >
                View All Products
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-xl text-gray-600">
                Find exactly what you need for every room
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Bedding", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500", count: "8 items" },
              { name: "Curtains & Blinds", image: "https://images.unsplash.com/photo-1547819374-5fc8cb0d7680?w=500", count: "4 items" },
              { name: "Bath & Towels", image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500", count: "6 items" },
              { name: "Home Decor", image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500", count: "6 items" }
            ].map((category, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <Link
                  href="/products"
                  className="group relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold mb-1">
                      {category.name}
                    </h3>
                    <p className="text-gray-200">{category.count}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-gray-300 mb-8">
                Subscribe to our newsletter for exclusive offers and interior design tips
              </p>
              <NewsletterForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}
