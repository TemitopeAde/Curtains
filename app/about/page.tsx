"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold text-white mb-4">
              About Us
            </h1>
            <p className="text-xl text-gray-200">
              Creating soft, beautiful, and timeless spaces
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                <strong>JD Beddings & Interiors</strong> is a home-comfort brand dedicated to creating soft, beautiful,
                and timeless spaces. Based in Nigeria, we specialize in premium bedding, luxury curtains, bath essentials,
                and interior décor pieces that elevate your everyday living.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                We believe your home should feel like peace — a place where comfort meets elegance. From the fabrics we
                source to the craftsmanship behind every stitch, we create pieces that transform your space effortlessly.
                Our goal is simple: to bring warmth, beauty, and harmony into every home, the JD way.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal direction="left" delay={0.2}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-5xl mb-4">✨</div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  To be the leading home-comfort and curtain brand known for creating soft, elegant, and timeless
                  spaces that inspire peace, beauty, and well-being in every home.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-5xl mb-4">🌸</div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  At JD Beddings & Interiors, our mission is to transform homes through premium bedding, bespoke curtain
                  services, luxury bath essentials, and curated décor items. We are committed to delivering comfort,
                  craftsmanship, and elegance — one space at a time — while ensuring every customer experiences warmth,
                  trust, and the signature JD touch.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-gray-900 mb-4">
                🛏 What We Offer
              </h2>
              <p className="text-xl text-gray-600">
                Premium products for every room in your home
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-semibold text-gray-900 mb-3">
                  Bedding Essentials
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Premium bedsheets & duvet sets</li>
                  <li>• Pillowcases & hotel-quality pillows</li>
                  <li>• Soft blankets for cozy nights</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-semibold text-gray-900 mb-3">
                  Curtains & Window Styling
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Custom-made curtains</li>
                  <li>• Ready-to-install curtains</li>
                  <li>• Professional installation & styling</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-semibold text-gray-900 mb-3">
                  Bath Essentials
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• High-quality, absorbent towels</li>
                  <li>• Luxury bathrobes</li>
                  <li>• Spa-inspired bath pieces that add comfort to your routine</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-semibold text-gray-900 mb-3">
                  Interior Décor Items
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Throw pillows</li>
                  <li>• Center rugs</li>
                  <li>• Home décor accessories that elevate any space</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up">
            <div className="text-5xl mb-6">💫</div>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold mb-6">
              Our Promise
            </h2>
            <p className="text-xl leading-relaxed mb-8 text-gray-200">
              We don't just sell bedding and décor — we create comfort experiences. Every JD product is crafted
              with intention, designed to bring softness, beauty, and calm into your everyday life.
            </p>
            <p className="text-2xl font-[family-name:var(--font-playfair)] italic text-amber-400">
              Because your home should always feel like luxury.<br />
              Your home should always feel like JD.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
