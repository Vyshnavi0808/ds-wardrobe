"use client";

import { useState } from "react";
import Link from "next/link";

export default function Tracking() {
  const [searchId, setSearchId] = useState("");
  const [trackedOrder, setTrackedOrder] = useState({
    id: "#DS2026001",
    status: "Preparing Order",
    step: 2,
    date: "September 26, 2026",
    items: "Classic Shirt x 1",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setTrackedOrder({
      id: searchId.toUpperCase().startsWith("#") ? searchId.toUpperCase() : `#${searchId.toUpperCase()}`,
      status: "Order Confirmed",
      step: 1,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      items: "Medusa Wardrobe Items",
    });
  };

  return (
    <main className="min-h-screen bg-[#f8f5f1] text-black">
      {/* HEADER */}
      <header className="border-b bg-white px-6 py-6 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-[0.25em] text-black hover:opacity-80">
            DS WARDROBE
          </Link>
          <Link href="/shop" className="text-xs font-semibold tracking-wider text-black hover:underline">
            ← SHOP
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <h2 className="text-4xl font-extrabold tracking-tight text-black text-center">
          ORDER TRACKING
        </h2>
        <p className="mt-2 text-center text-xs text-neutral-500 uppercase tracking-widest">
          Enter your Order ID to check current status
        </p>

        {/* SEARCH FORM */}
        <form onSubmit={handleSearch} className="mt-8 flex gap-3">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="e.g. #DS2026001"
            className="w-full border border-neutral-300 bg-white p-4 text-sm text-black placeholder-neutral-400 focus:border-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-black px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-neutral-800"
          >
            TRACK
          </button>
        </form>

        {/* ORDER DISPLAY */}
        <div className="mt-8 border border-neutral-200 bg-white p-8 rounded-sm shadow-sm">
          <div className="flex flex-wrap items-center justify-between border-b pb-4 gap-2">
            <div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                ORDER NUMBER
              </p>
              <p className="mt-1 text-2xl font-extrabold text-black">
                {trackedOrder.id}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-black px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                {trackedOrder.status}
              </span>
            </div>
          </div>

          {/* TIMELINE PROGRESS */}
          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                ✓
              </div>
              <div>
                <p className="font-bold text-black text-sm">Order Confirmed</p>
                <p className="text-xs text-neutral-500">
                  Your order has been received and verified.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${trackedOrder.step >= 2 ? "bg-black text-white" : "bg-neutral-200 text-neutral-500"}`}>
                {trackedOrder.step >= 2 ? "✓" : "2"}
              </div>
              <div>
                <p className="font-bold text-black text-sm">Preparing Order</p>
                <p className="text-xs text-neutral-500">
                  Items are being selected and packed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${trackedOrder.step >= 3 ? "bg-black text-white" : "bg-neutral-200 text-neutral-500"}`}>
                {trackedOrder.step >= 3 ? "✓" : "3"}
              </div>
              <div>
                <p className="font-bold text-black text-sm">Shipped</p>
                <p className="text-xs text-neutral-500">
                  Courier dispatch pending.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${trackedOrder.step >= 4 ? "bg-black text-white" : "bg-neutral-200 text-neutral-500"}`}>
                {trackedOrder.step >= 4 ? "✓" : "4"}
              </div>
              <div>
                <p className="font-bold text-black text-sm">Delivered</p>
                <p className="text-xs text-neutral-500">
                  Package delivered to your shipping address.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/shop"
          className="mt-8 block w-full bg-black py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition hover:bg-neutral-800"
        >
          CONTINUE SHOPPING
        </Link>
      </section>
    </main>
  );
}