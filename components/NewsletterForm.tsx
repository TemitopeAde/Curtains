"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      toast.success("Successfully subscribed!", {
        description: "Check your email for a welcome message with exclusive offers.",
        duration: 5000,
      });

      setEmail("");
      setName("");
    } catch (err) {
      toast.error("Subscription failed", {
        description: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-5 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 border border-gray-200"
            disabled={loading}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-5 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 border border-gray-200"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-3.5 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-[family-name:var(--font-montserrat)] font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Subscribe
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
