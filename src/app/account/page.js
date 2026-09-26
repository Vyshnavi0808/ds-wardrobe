export default function Account() {
  return (
    <main className="min-h-screen bg-white text-black">

      <header className="border-b px-6 py-6">
        <h1 className="text-2xl font-bold tracking-widest">
          DS WARDROBE
        </h1>
      </header>

      <section className="mx-auto max-w-md px-6 py-12">

        <h2 className="text-4xl font-bold">
          MY ACCOUNT
        </h2>

        <div className="mt-8 space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-4"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4"
          />

          <button
            className="w-full bg-black py-4"
            style={{ color: "white" }}
          >
            LOGIN
          </button>

        </div>

        <p className="mt-6 text-center text-gray-600">
          New customer? Create an account
        </p>

      </section>

    </main>
  );
}