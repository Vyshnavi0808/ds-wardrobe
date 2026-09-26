export default function Product() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="border-b px-6 py-6">
        <h1 className="text-2xl font-bold tracking-widest">
          DS WARDROBE
        </h1>
      </header>

      <section className="grid gap-10 px-6 py-12 md:grid-cols-2">
        <div className="flex h-[500px] items-center justify-center bg-neutral-200">
          <span className="text-gray-500">
            PRODUCT IMAGE
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm tracking-widest text-gray-500">
            DS WARDROBE
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Classic Shirt
          </h2>

          <p className="mt-4 text-2xl">
            ₹1,499
          </p>

          <p className="mt-6 leading-7 text-gray-600">
            A modern classic shirt designed for comfortable
            everyday styling.
          </p>

          <div className="mt-8">
            <p className="mb-3 font-medium">Select Size</p>

            <div className="flex gap-3">
              <button className="border px-5 py-3">S</button>
              <button className="border px-5 py-3">M</button>
              <button className="border px-5 py-3">L</button>
              <button className="border px-5 py-3">XL</button>
            </div>
          </div>

          <button className="mt-8 bg-black px-8 py-4 text-white">
            ADD TO CART
          </button>
        </div>
      </section>
    </main>
  );
}