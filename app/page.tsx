"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🍺</span>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            BeverageCompare
          </h1>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl">
          <div className="mb-6 inline-block">
            <span className="text-6xl">🍷</span>
          </div>
          <h2 className="text-6xl font-bold text-black dark:text-white mb-6 leading-tight">
            Smart Beverage Pricing & Comparisons
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Find real-time prices for your favorite alcoholic beverages and get AI-powered recommendations
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500">
            Make smarter drinking choices with instant comparisons
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mb-16">
          {/* Price Lookup Card */}
          <Link href="/chat" className="group">
            <div className="bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-3xl border-2 border-amber-200 dark:border-amber-800/50 p-10 text-center hover:border-amber-400 dark:hover:border-amber-600 transition-all cursor-pointer hover:shadow-lg">
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">
                💰
              </div>
              <h3 className="text-3xl font-bold text-black dark:text-white mb-4">
                Check Prices
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-base leading-relaxed">
                Ask our AI chatbot about the current price of any beverage. Get instant, accurate results in seconds.
              </p>
              <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-lg">
                Open Chat →
              </button>
            </div>
          </Link>

          {/* Compare Card */}
          <Link href="/compare" className="group">
            <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-3xl border-2 border-blue-200 dark:border-blue-800/50 p-10 text-center hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer hover:shadow-lg">
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">
                ⚖️
              </div>
              <h3 className="text-3xl font-bold text-black dark:text-white mb-4">
                Compare Beverages
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-base leading-relaxed">
                Compare multiple drinks side-by-side. Get AI-powered recommendations on which beverage is the best choice.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-lg">
                Start Comparing →
              </button>
            </div>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="text-center border-t border-gray-200 dark:border-gray-800 pt-8 w-full">
          <p className="text-gray-600 dark:text-gray-400 font-semibold">
            Your trusted companion for beverage choices
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 BeverageCompare. Find beverage prices & compare drinks with AI-powered recommendations.
          </p>
        </div>
      </footer>
    </div>
  );
}
