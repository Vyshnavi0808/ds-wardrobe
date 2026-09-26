"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Payment() {
  const { cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [placed, setPlaced] = useState(false);

  const total = cart.reduce((sum, product) => {
    const price = Number(
      String(product.price).replace("₹", "").replace(",", "")
    );

    return sum + price * (product.quantity || 1);
  }, 0);

  const placeOrder = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    setPlaced(true);
  };

  if (placed) {
    return (
      <main className="min-h-screen bg-white text-black">
        <header className="border-b px-6 py-6">
          <h1 className="text-2xl font-bold tracking-widest">
            DS WARDROBE
          </h1>
        </header>

        <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
          <div className="text-6xl">✓</div>

          <h2 className="mt-6 text-4xl font-bold">
            ORDER PLACED SUCCESSFULLY
          </h2>

          <p className="mt-4 text-gray-600">
            Thank you for shopping with DS Wardrobe.
          </p>

          <p className="mt-3 font-medium">
            Payment: {paymentMethod}
          </p>

          <a
            href="/shop"
            className="mt-8 bg-black px-8 py-4 text-white"
          >
            CONTINUE SHOPPING
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="border-b px-6 py-6">
        <h1 className="text-2xl font-bold tracking-widest">
          DS WARDROBE
        </h1>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-12">
        <h2 className="text-4xl font-bold">PAYMENT</h2>

        <div className="mt-8 border p-6">
          <h3 className="text-xl font-semibold">
            Order Summary
          </h3>

          <div className="mt-6 space-y-4">
            {cart.map((product, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-4"
              >
                <div>
                  <p className="font-medium">
                    {product.name}
                  </p>

                  <p className="text-sm text-gray-600">
                    Quantity: {product.quantity || 1}
                  </p>
                </div>

                <p>{product.price}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xl font-bold">
            Total: ₹{total.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="mt-8 border p-6">
          <h3 className="text-xl font-semibold">
            Select Payment Method
          </h3>

          <button
            type="button"
            onClick={() => setPaymentMethod("Card / UPI")}
            className={`mt-6 w-full border p-4 text-left ${
              paymentMethod === "Card / UPI"
                ? "border-black bg-gray-100"
                : ""
            }`}
          >
            💳 Card / UPI
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("Cash on Delivery")}
            className={`mt-4 w-full border p-4 text-left ${
              paymentMethod === "Cash on Delivery"
                ? "border-black bg-gray-100"
                : ""
            }`}
          >
            💵 Cash on Delivery
          </button>

          {paymentMethod && (
            <p className="mt-4 text-sm text-gray-600">
              Selected: {paymentMethod}
            </p>
          )}

          <button
            type="button"
            onClick={placeOrder}
            className="mt-8 w-full bg-black py-4 text-white"
          >
            PLACE ORDER
          </button>
        </div>
      </section>
    </main>
  );
}