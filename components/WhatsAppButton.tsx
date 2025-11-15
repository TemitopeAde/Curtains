"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  product?: any;
  className?: string;
}

export default function WhatsAppButton({ product, className = "" }: WhatsAppButtonProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  const handleWhatsAppClick = () => {
    let message = "Hi, I'm interested in your products!";

    if (product) {
      message = `Hi, I'm interested in:\n\n${product.name}\nPrice: $${product.price.toFixed(2)}\n\nCan you provide more information?`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`inline-flex items-center justify-center gap-2 bg-green-500 text-white py-4 px-6 rounded-lg hover:bg-green-600 transition-colors font-medium ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      Chat on WhatsApp
    </button>
  );
}
