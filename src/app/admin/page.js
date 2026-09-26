export default function Admin() {
  return (
    <main className="min-h-screen bg-white text-black">

      <header className="border-b px-6 py-6">
        <h1 className="text-2xl font-bold tracking-widest">
          DS WARDROBE ADMIN
        </h1>
      </header>

      <section className="px-6 py-12">

        <h2 className="text-4xl font-bold">
          ADMIN DASHBOARD
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="border p-6">
            <h3 className="text-xl font-semibold">
              Products
            </h3>
            <p className="mt-2 text-gray-600">
              Manage products and prices.
            </p>
          </div>

          <div className="border p-6">
            <h3 className="text-xl font-semibold">
              Inventory
            </h3>
            <p className="mt-2 text-gray-600">
              Manage product stock.
            </p>
          </div>

          <div className="border p-6">
            <h3 className="text-xl font-semibold">
              Orders
            </h3>
            <p className="mt-2 text-gray-600">
              View customer orders.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}