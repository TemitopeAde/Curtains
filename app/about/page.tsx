"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1600')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold text-white mb-6">
              About Us
            </h1>
            <div className="h-1 w-24 bg-amber-400 mx-auto mb-8"></div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                JD Beddings & Interiors is a home-comfort brand dedicated to creating soft, beautiful, and timeless spaces.
                Based in Nigeria, we specialize in premium bedding, luxury curtains, bath essentials, and interior décor pieces
                that elevate your everyday living.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We believe your home should feel like peace — a place where comfort meets elegance. From the fabrics we source
                to the craftsmanship behind every stitch, we create pieces that transform your space effortlessly. Our goal is
                simple: to bring warmth, beauty, and harmony into every home, the JD way.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">✨</div>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be the leading home-comfort and curtain brand known for creating soft, elegant, and timeless spaces
                that inspire peace, beauty, and well-being in every home.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🌸</div>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                At JD Beddings & Interiors, our mission is to transform homes through premium bedding, bespoke curtain services,
                luxury bath essentials, and curated décor items. We are committed to delivering comfort, craftsmanship, and
                elegance — one space at a time — while ensuring every customer experiences warmth, trust, and the signature JD touch.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <div className="text-5xl mb-4">🛏</div>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-gray-900 mb-6">
                What We Offer
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="left" delay={0.1}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-gray-900 mb-4">
                  Bedding Essentials
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Premium bedsheets & duvet sets</li>
                  <li>• Pillowcases & hotel-quality pillows</li>
                  <li>• Soft blankets for cozy nights</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-gray-900 mb-4">
                  Curtains & Window Styling
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Custom-made curtains</li>
                  <li>• Ready-to-install curtains</li>
                  <li>• Professional installation & styling</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.3}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-gray-900 mb-4">
                  Bath Essentials
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• High-quality, absorbent towels</li>
                  <li>• Luxury bathrobes</li>
                  <li>• Spa-inspired bath pieces</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-gray-900 mb-4">
                  Interior Décor Items
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Throw pillows</li>
                  <li>• Center rugs</li>
                  <li>• Home décor accessories</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center">
              <div className="text-5xl mb-6">💫</div>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white mb-6">
                Our Promise
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed mb-6">
                We don't just sell bedding and décor — we create comfort experiences. Every JD product is crafted with
                intention, designed to bring softness, beauty, and calm into your everyday life.
              </p>
              <p className="text-2xl font-[family-name:var(--font-playfair)] text-amber-400 font-semibold">
                Because your home should always feel like luxury.<br />
                Your home should always feel like JD.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
