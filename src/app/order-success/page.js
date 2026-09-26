export default function OrderSuccess() {
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
          Payment: Cash on Delivery
        </p>

        <a
          href="/shop"
          className="mt-8 inline-block bg-black px-8 py-4 text-center font-semibold"
          style={{ color: "#ffffff" }}
        >
          CONTINUE SHOPPING
        </a>

        <a
          href="/tracking"
          className="mt-5 inline-block text-black underline"
        >
          TRACK ORDER
        </a>
      </section>
    </main>
  );
}