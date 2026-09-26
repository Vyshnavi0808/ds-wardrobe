"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Cart() {
  const {
    cart,
    loading,
    error,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <main className="min-h-screen bg-white text-black">

      <header className="border-b px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-widest text-black hover:opacity-80" style={{ color: "#000000" }}>
            DS WARDROBE
          </Link>
          <Link href="/shop" className="text-sm font-medium text-black hover:underline" style={{ color: "#000000" }}>
            SHOP
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="text-4xl font-bold text-black">
          YOUR CART
        </h2>

        {error && (
          <div className="mt-4 border border-red-200 bg-red-50 p-4 text-sm text-red-600 font-medium">
            {error}
          </div>
        )}

        {loading && cart.length === 0 ? (
          <div className="py-12 text-center text-neutral-600 font-medium">
            Loading your Medusa cart...
          </div>
        ) : cart.length === 0 ? (
          <div>
            <p className="mt-4 text-neutral-600">
              Your cart is currently empty.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block bg-black px-8 py-4 text-xs font-bold uppercase tracking-widest transition hover:bg-neutral-800"
              style={{ color: "#ffffff" }}
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="mt-8">

            <p className="mb-6 text-neutral-600 font-medium">
              You have {cart.length} item(s) in your cart.
            </p>

            <div className="space-y-4">

              {cart.map((product, index) => (
                <div
                  key={product.id || index}
                  className="flex items-center justify-between border-b border-neutral-200 py-4"
                >

                  <div className="flex items-center gap-4">
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="h-16 w-16 bg-neutral-100 object-cover rounded-sm"
                      />
                    ) : null}

                    <div>
                      <h3 className="font-semibold text-black">
                        {product.name}
                      </h3>

                      <p className="text-neutral-700 font-medium">
                        {product.price}
                      </p>

                      <div className="mt-3 flex items-center gap-3">

                        <button
                          type="button"
                          onClick={() => decreaseQuantity(product.id || index)}
                          disabled={loading}
                          className="border border-neutral-300 bg-neutral-100 px-3 py-1 text-sm font-bold text-black hover:bg-neutral-200 disabled:opacity-50"
                          style={{ color: "#000000" }}
                        >
                          −
                        </button>

                        <span className="font-semibold text-black">
                          {product.quantity || 1}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(product.id || index)}
                          disabled={loading}
                          className="border border-neutral-300 bg-neutral-100 px-3 py-1 text-sm font-bold text-black hover:bg-neutral-200 disabled:opacity-50"
                          style={{ color: "#000000" }}
                        >
                          +
                        </button>

                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id || index)}
                        disabled={loading}
                        className="mt-2 text-xs font-bold text-red-600 underline hover:text-red-800 disabled:opacity-50"
                        style={{ color: "#dc2626" }}
                      >
                        Remove
                      </button>

                    </div>
                  </div>

                </div>
              ))}

            </div>

            <div className="mt-8 border-t border-neutral-200 pt-6">
              <Link
                href="/checkout"
                className="inline-block bg-black px-8 py-4 text-xs font-bold uppercase tracking-widest transition hover:bg-neutral-800"
                style={{ color: "#ffffff" }}
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>

          </div>
        )}

      </section>

    </main>
  );
}


