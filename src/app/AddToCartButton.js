"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ variantId, product, className, children }) {
  const { addToCart, loading: contextLoading } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);
    setAdded(false);

    const target = variantId || product;
    const success = await addToCart(target, 1);

    setIsAdding(false);

    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isAdding || contextLoading}
      style={{ color: "#ffffff" }}
      className={
        className ||
        "mt-4 block w-full bg-black py-3 text-center font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
      }
    >
      {isAdding ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="h-4 w-4 animate-spin text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          ADDING...
        </span>
      ) : added ? (
        "✓ ADDED TO CART"
      ) : (
        children || "ADD TO CART"
      )}
    </button>
  );
}
