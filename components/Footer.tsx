import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-4">
              JD Beddings & Interiors
            </h3>
            <p className="text-sm mb-4 leading-relaxed">
              A home-comfort brand dedicated to creating soft, beautiful, and timeless spaces.
              Based in Nigeria, we specialize in premium bedding, luxury curtains, bath essentials,
              and interior décor pieces that elevate your everyday living.
            </p>
            <p className="text-sm italic text-gray-300">
              Your home should feel like peace — where comfort meets elegance.
            </p>
          </div>

          {/* Shop Section */}
          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Bedding Essentials</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Curtains & Window Styling</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Bath Essentials</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Interior Décor</Link></li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Custom Curtains</Link></li>
            </ul>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <span className="mr-2">✨</span>
                Our Vision
              </h4>
              <p className="text-sm leading-relaxed">
                To be the leading home-comfort and curtain brand known for creating soft, elegant,
                and timeless spaces that inspire peace, beauty, and well-being in every home.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <span className="mr-2">🌸</span>
                Our Mission
              </h4>
              <p className="text-sm leading-relaxed">
                To transform homes through premium bedding, bespoke curtain services, luxury bath essentials,
                and curated décor items. We deliver comfort, craftsmanship, and elegance — one space at a time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="mb-4 md:mb-0">
              &copy; 2025 JD Beddings & Interiors. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Shipping Info</Link>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-xs italic text-gray-500">
              Because your home should always feel like luxury. Your home should always feel like JD.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
