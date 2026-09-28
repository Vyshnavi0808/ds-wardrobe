import Link from "next/link";
import AddToCartButton from "@/app/AddToCartButton";
import {
  MEDUSA_BACKEND_URL,
  MEDUSA_PUBLISHABLE_KEY,
} from "@/lib/medusa";

export const dynamic = "force-dynamic";

async function getProducts() {
  if (!MEDUSA_BACKEND_URL || !MEDUSA_PUBLISHABLE_KEY) {
    console.error(
      "Medusa backend URL and publishable key must be configured."
    );
    return [];
  }

  try {
    const response = await fetch(
      `${MEDUSA_BACKEND_URL}/store/products?limit=50&fields=*variants,*variants.prices,*images`,
      {
        headers: {
          "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        `Shop product request failed with HTTP ${response.status}.`
      );
      return [];
    }

    const data = await response.json();
    return data.products || [];
  } catch (err) {
    console.error("Shop getProducts error:", err);
    return [];
  }
}

export default async function Shop() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#f8f5f1] text-black">
      <header className="border-b bg-white px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-[0.2em]"
          >
            DS WARDROBE
          </Link>

          <Link
            href="/cart"
            className="text-sm font-medium hover:underline"
          >
            🛒 Cart
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm tracking-[0.3em] text-gray-500">
          DS WARDROBE
        </p>

        <h1 className="mt-3 text-5xl font-bold">
          SHOP
        </h1>

        {products.length === 0 ? (
          <div className="mt-10 border bg-white p-10 text-center">
            <h2 className="text-lg font-semibold">
              No products found.
            </h2>

            <p className="mt-2 text-gray-500">
              Make sure Medusa backend is running on port 9000
              and products are created.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const image =
                product.thumbnail ||
                product.images?.[0]?.url ||
                "";

              const variantId = product.variants?.[0]?.id;

              const rawPrice =
                product.variants?.[0]?.calculated_price
                  ?.calculated_amount ||
                product.variants?.[0]?.prices?.[0]?.amount ||
                0;

              const formattedPrice =
                rawPrice > 0
                  ? `₹${rawPrice.toLocaleString("en-IN")}`
                  : "";

              return (
                <article
                  key={product.id}
                  className="flex flex-col justify-between border border-neutral-100 bg-white p-4 shadow-sm"
                >
                  <div>
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      {image ? (
                        <img
                          src={image}
                          alt={product.title}
                          className="h-full w-full object-cover transition duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    <h2 className="mt-4 text-base font-semibold">
                      {product.title}
                    </h2>

                    {formattedPrice && (
                      <p className="mt-1 text-sm font-medium text-gray-700">
                        {formattedPrice}
                      </p>
                    )}
                  </div>

                  <AddToCartButton
                    variantId={variantId}
                    product={product}
                  >
                    ADD TO CART
                  </AddToCartButton>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}