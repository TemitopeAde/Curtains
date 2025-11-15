"use client";

import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Eye, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const router = useRouter();
  const currentPrice = product.promoPrice || product.price;
  const hasPromo = product.promoPrice && product.promoPrice < product.price;

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItem = cartItems.find((item: any) => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      toast.success("Updated cart", {
        description: `${product.name} quantity increased to ${existingItem.quantity}`,
        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
      });
    } else {
      cartItems.push({
        productId: product.id,
        name: product.name,
        price: currentPrice,
        image: product.images[0],
        category: product.category,
        quantity: 1,
      });
      toast.success("Added to cart", {
        description: `${product.name} has been added to your cart`,
        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
            >
              <Eye className="w-5 h-5 text-gray-700" />
            </button>
          )}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.featured && (
              <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </div>
            )}
            {hasPromo && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                SALE
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
          <h3 className="font-[family-name:var(--font-montserrat)] font-semibold text-lg mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center mb-3">
            {product.rating && (
              <>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating!)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  ({product.reviews})
                </span>
              </>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {hasPromo ? (
                <>
                  <p className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-red-600">
                    ${currentPrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-gray-900">
                  ${currentPrice.toFixed(2)}
                </p>
              )}
            </div>
            <button
              onClick={addToCart}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium flex items-center gap-1"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
