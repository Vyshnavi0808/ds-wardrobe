"use client";

import { useCart } from "@/context/CartContext";

export default function Checkout() {
  const { cart } = useCart();

  const total = cart.reduce((sum, product) => {
    const price = Number(product.price.replace("₹", "").replace(",", ""));
    const quantity = product.quantity || 1;

    return sum + price * quantity;
  }, 0);
  return (
    <main className="min-h-screen bg-white text-black">

      <header className="border-b px-6 py-6">
        <h1 className="text-2xl font-bold tracking-widest">
          DS WARDROBE
        </h1>
      </header>

      <section className="px-6 py-12">

        <h2 className="text-4xl font-bold">
          CHECKOUT
        </h2>

        {cart.length === 0 ? (
          <div className="mt-6">
            <p className="text-gray-600">
              Your cart is empty.
            </p>

            <a
              href="/shop"
              className="mt-6 inline-block bg-black px-8 py-4 text-white"
            >
              GO TO SHOP
            </a>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 md:grid-cols-2">

            <div>
              <h3 className="text-2xl font-semibold">
                Delivery Details
              </h3>

              <div className="mt-6 space-y-4">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border p-4"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border p-4"
                />

                <input
                  type="text"
                  placeholder="Address"
                  className="w-full border p-4"
                />

                <input
                  type="text"
                  placeholder="City"
                  className="w-full border p-4"
                />

                <input
                  type="text"
                  placeholder="PIN Code"
                  className="w-full border p-4"
                />

              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold">
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
              <a
  href="/payment"
  className="mt-8 block w-full bg-black px-4 py-4 text-center font-semibold"
  style={{ color: "white" }}
>
  CONTINUE TO PAYMENT
</a>

            </div>

          </div>
        )}

      </section>

    </main>
  );
}