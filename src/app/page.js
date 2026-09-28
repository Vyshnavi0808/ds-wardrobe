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
      `${MEDUSA_BACKEND_URL}/store/products?limit=8&fields=*variants,*variants.prices,*images`,
      {
        headers: {
          "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        `Home product request failed with HTTP ${response.status}.`
      );
      return [];
    }

    const data = await response.json();
    return data.products || [];
  } catch (err) {
    console.error("Home getProducts error:", err);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#f8f5f1] text-black">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xl font-bold tracking-[0.25em] text-black transition hover:opacity-80"
          >
            DS WARDROBE
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-xs font-semibold tracking-widest text-black hover:underline"
            >
              HOME
            </Link>

            <Link
              href="/shop"
              className="text-xs font-semibold tracking-widest text-black hover:underline"
            >
              SHOP
            </Link>

            <Link
              href="#new-arrivals"
              className="text-xs font-semibold tracking-widest text-black hover:underline"
            >
              NEW ARRIVALS
            </Link>

            <Link
              href="#featured-collections"
              className="text-xs font-semibold tracking-widest text-black hover:underline"
            >
              COLLECTIONS
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/shop"
              aria-label="Search"
              className="text-lg text-black transition hover:scale-110"
              title="Search"
            >
              🔍
            </Link>

            <Link
              href="/account"
              aria-label="Account"
              className="text-lg text-black transition hover:scale-110"
              title="Account"
            >
              👤
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              className="flex items-center gap-1 rounded-full bg-black px-4 py-2 text-xs font-medium text-white transition hover:bg-neutral-800"
            >
              🛒 <span>Cart</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-neutral-900 py-32 text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop')",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-neutral-300">
            THE NEW ESSENTIALS
          </p>

          <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
            DRESS YOUR STYLE
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-200">
            Discover curated fashion pieces created for modern, everyday
            comfort and timeless elegance.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-block bg-white px-10 py-4 text-sm font-bold shadow-lg transition hover:scale-105 hover:bg-neutral-200"
            style={{ color: "#000000" }}
          >
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section
        id="featured-collections"
        className="mx-auto max-w-7xl px-6 py-20"
      >
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">
          EXPLORE
        </p>

        <h2 className="mt-2 text-3xl font-bold text-black md:text-4xl">
          Featured Collections
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* WOMEN */}
          <Link
            href="/shop"
            className="group relative flex h-96 items-end overflow-hidden rounded-sm bg-neutral-900 p-6 shadow-md transition hover:shadow-xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-65 transition duration-500 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop')",
              }}
            />

            <div className="relative z-10 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                WOMEN
              </p>

              <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                WOMEN'S
              </h3>

              <span className="mt-2 inline-block text-xs font-medium underline">
                Explore Collection →
              </span>
            </div>
          </Link>

          {/* MEN */}
          <Link
            href="/shop"
            className="group relative flex h-96 items-end overflow-hidden rounded-sm bg-neutral-900 p-6 shadow-md transition hover:shadow-xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-65 transition duration-500 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop')",
              }}
            />

            <div className="relative z-10 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                MEN
              </p>

              <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                MEN'S
              </h3>

              <span className="mt-2 inline-block text-xs font-medium underline">
                Explore Collection →
              </span>
            </div>
          </Link>

          {/* NEW ARRIVALS */}
          <Link
            href="#new-arrivals"
            className="group relative flex h-96 items-end overflow-hidden rounded-sm bg-neutral-900 p-6 shadow-md transition hover:shadow-xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-65 transition duration-500 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop')",
              }}
            />

            <div className="relative z-10 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                LATEST
              </p>

              <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                NEW ARRIVALS
              </h3>

              <span className="mt-2 inline-block text-xs font-medium underline">
                Shop New →
              </span>
            </div>
          </Link>

          {/* BEST SELLERS */}
          <Link
            href="/shop"
            className="group relative flex h-96 items-end overflow-hidden rounded-sm bg-neutral-900 p-6 shadow-md transition hover:shadow-xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-65 transition duration-500 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop')",
              }}
            />

            <div className="relative z-10 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                POPULAR
              </p>

              <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                BEST SELLERS
              </h3>

              <span className="mt-2 inline-block text-xs font-medium underline">
                Discover Best →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section
        id="new-arrivals"
        className="border-b border-t border-neutral-100 bg-white px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">
                CURATED SELECTION
              </p>

              <h2 className="mt-2 text-3xl font-bold text-black md:text-4xl">
                New Arrivals
              </h2>
            </div>

            <Link
              href="/shop"
              className="hidden text-xs font-bold tracking-widest text-black underline hover:opacity-75 sm:block"
            >
              VIEW ALL →
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="mt-10 rounded-sm border border-neutral-200 bg-[#f8f5f1] p-12 text-center">
              <h3 className="text-lg font-semibold text-black">
                Products are loading from your Medusa store.
              </h3>

              <p className="mt-2 text-sm text-neutral-600">
                Ensure Medusa backend is active and products are created.
              </p>

              <Link
                href="/shop"
                className="mt-6 inline-block bg-black px-8 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800"
              >
                GO TO SHOP
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
              {products.slice(0, 8).map((product) => {
                const image =
                  product.thumbnail ||
                  product.images?.[0]?.url ||
                  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop";

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
                    className="flex flex-col justify-between border border-neutral-100 bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    <div>
                      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-neutral-100">
                        <img
                          src={image}
                          alt={product.title}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />

                        <span className="absolute left-3 top-3 bg-black px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                          NEW
                        </span>
                      </div>

                      <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                        DS WARDROBE
                      </p>

                      <h3 className="mt-1 text-sm font-semibold text-black">
                        {product.title}
                      </h3>

                      {formattedPrice && (
                        <p className="mt-1 text-xs font-semibold text-neutral-700">
                          {formattedPrice}
                        </p>
                      )}
                    </div>

                    <AddToCartButton
                      variantId={variantId}
                      product={product}
                      className="mt-4 block w-full bg-black py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white transition hover:bg-neutral-800 disabled:opacity-50"
                    >
                      ADD TO CART
                    </AddToCartButton>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* PROMOTIONAL SECTION */}
      <section className="bg-black px-6 py-28 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-neutral-400">
            ESSENTIAL STYLE
          </p>

          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            FRESH STYLES. EASY SHOPPING.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-neutral-300">
            Explore our curated fashion collection and find pieces created for
            your everyday style and long-lasting comfort.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-block bg-white px-10 py-4 text-xs font-bold uppercase tracking-widest transition hover:bg-neutral-200"
            style={{ color: "#000000" }}
          >
            EXPLORE SHOP
          </Link>
        </div>
      </section>

      {/* SOCIAL SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">
          FOLLOW DS WARDROBE
        </p>

        <h2 className="mt-3 text-3xl font-bold text-black md:text-4xl">
          STYLE. FASHION. EVERYDAY.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-600">
          Follow DS Wardrobe for new collections, fashion updates, lookbooks,
          and latest arrivals.
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-block border-2 border-black bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-black hover:text-white"
        >
          SHOP COLLECTION
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800 bg-neutral-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold tracking-[0.25em] text-white">
                DS WARDROBE
              </h2>

              <p className="mt-2 text-xs text-neutral-400">
                Modern fashion essentials for everyday style.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 text-xs font-semibold tracking-wider text-neutral-300">
              <Link href="/" className="hover:text-white hover:underline">
                HOME
              </Link>

              <Link href="/shop" className="hover:text-white hover:underline">
                SHOP
              </Link>

              <Link
                href="/account"
                className="hover:text-white hover:underline"
              >
                ACCOUNT
              </Link>

              <Link href="/cart" className="hover:text-white hover:underline">
                CART
              </Link>

              <Link
                href="/tracking"
                className="hover:text-white hover:underline"
              >
                TRACK ORDER
              </Link>

              <Link href="/admin" className="hover:text-white hover:underline">
                ADMIN
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-neutral-800 pt-8 text-center text-xs text-neutral-500 md:text-left">
            ©️ 2026 DS Wardrobe. All rights reserved. Powered by Medusa v2 &
            Next.js.
          </div>
        </div>
      </footer>
    </main>
  );
}