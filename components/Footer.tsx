import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-4">
              JD Beddings & Interiors
            </h3>
            <p className="text-sm leading-relaxed">
              Creating soft, beautiful, and timeless spaces. Premium bedding, luxury curtains, and interior décor that bring comfort and elegance to your home.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Bedding</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Curtains</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Bath Essentials</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Home Décor</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Our Vision</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center">
            <p className="text-sm mb-2">&copy; 2025 JD Beddings & Interiors. All rights reserved.</p>
            <p className="text-xs text-gray-500">Your home should always feel like luxury. Your home should always feel like JD.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
