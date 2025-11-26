"use client";

import { useState } from "react";
import Link from "next/link";

interface Beverage {
  id: string;
  name: string;
}

export default function ComparePage() {
  const [beverages, setBeverages] = useState<Beverage[]>([
    { id: "1", name: "" },
    { id: "2", name: "" },
  ]);
  const [comparison, setComparison] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const addBeverage = () => {
    setBeverages([
      ...beverages,
      { id: (beverages.length + 1).toString(), name: "" },
    ]);
  };

  const removeBeverage = (id: string) => {
    if (beverages.length > 2) {
      setBeverages(beverages.filter((b) => b.id !== id));
    }
  };

  const updateBeverage = (id: string, name: string) => {
    setBeverages(
      beverages.map((b) => (b.id === id ? { ...b, name } : b))
    );
  };

  const cleanMarkdown = (text: string) => {
    return text
      .replace(/\*\*/g, "") // Remove bold markers (**)
      .replace(/\*/g, ""); // Remove italic markers (*)
  };

  const handleCompare = async () => {
    const filledBeverages = beverages
      .filter((b) => b.name.trim())
      .map((b) => b.name);

    if (filledBeverages.length < 2) {
      alert("Add at least 2 drinks to compare! 🍻");
      return;
    }

    if (filledBeverages.length > 10) {
      alert("Please compare up to 10 beverages at a time 😊");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ beverages: filledBeverages }),
      });

      const data = await response.json();
      const cleanedComparison = cleanMarkdown(
        data.comparison || "Couldn't compare those drinks 😅"
      );
      setComparison(cleanedComparison);
    } catch (error) {
      setComparison("Oops! Network error bro 😢 Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <nav className="flex justify-between items-center px-6 md:px-8 py-5 bg-white dark:bg-gray-950 border-b-2 border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 hover:opacity-75 transition">
          <span className="text-3xl">🍺</span>
          <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white">
            BeverageCompare
          </h1>
        </Link>
        <div className="flex gap-2 md:gap-4">
          <Link href="/chat">
            <button className="px-3 md:px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold transition text-sm md:text-base">
              Chat
            </button>
          </Link>
          <Link href="/">
            <button className="px-3 md:px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition text-sm md:text-base font-semibold">
              Home
            </button>
          </Link>
        </div>
      </nav>

      <main className="px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-3">
              Compare Beverages
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
              Find the perfect drink for you. Compare prices, types, and get expert recommendations.
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl border-2 border-blue-200 dark:border-blue-800 shadow-lg p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
              Add Beverages
            </h3>
            <p className="text-gray-600 dark:text-gray-500 text-sm md:text-base mb-6">
              Enter 2 or more drinks to compare (up to 10)
            </p>

            <div className="space-y-4 mb-6">
              {beverages.map((beverage, index) => (
                <div key={beverage.id} className="flex gap-2 md:gap-4 items-center">
                  <span className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 w-8 md:w-10 shrink-0">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={beverage.name}
                    onChange={(e) => updateBeverage(beverage.id, e.target.value)}
                    placeholder={`Beverage ${index + 1}... (e.g., Old Monk)`}
                    className="flex-1 px-4 md:px-5 py-3 rounded-xl border-2 border-blue-300 dark:border-blue-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition placeholder-gray-500 text-sm md:text-base"
                  />
                  {beverages.length > 2 && (
                    <button
                      onClick={() => removeBeverage(beverage.id)}
                      className="px-3 md:px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition text-sm md:text-base hover:shadow-lg"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 mb-6">
              {beverages.length < 10 && (
                <button
                  onClick={addBeverage}
                  className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition hover:shadow-lg text-sm md:text-base"
                >
                  + Add Beverage
                </button>
              )}
            </div>

            <button
              onClick={handleCompare}
              disabled={isLoading}
              className="w-full px-6 py-4 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-base md:text-lg transition hover:shadow-lg"
            >
              {isLoading ? "Analyzing..." : "Compare Now"}
            </button>
          </div>

          {/* Comparison Result */}
          {comparison && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              {/* Main Comparison Card */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
                <div className="p-6 md:p-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-8 flex items-center gap-3">
                    <span>📊</span> Detailed Comparison
                  </h2>

                  {/* Render comparison content with better table format */}
                  <div className="space-y-8">
                    {/* Parse and render different sections */}
                    {comparison.split("\n\n").map((section, idx) => {
                      const lines = section.trim().split("\n");
                      const sectionTitle = lines[0];
                      const content = lines.slice(1);

                      // Check section type
                      if (sectionTitle.includes("|")) {
                        // Table section
                        return (
                          <div key={idx} className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr>
                                  {sectionTitle.split("|").map((header, hIdx) => (
                                    <th
                                      key={hIdx}
                                      className="bg-linear-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 text-white px-4 py-3 text-left font-bold border border-blue-600 dark:border-blue-800"
                                    >
                                      {header.trim()}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {content.map((row, rIdx) => {
                                  if (!row.trim()) return null;
                                  return (
                                    <tr
                                      key={rIdx}
                                      className={
                                        rIdx % 2 === 0
                                          ? "bg-gray-50 dark:bg-gray-700"
                                          : "bg-white dark:bg-gray-800"
                                      }
                                    >
                                      {row.split("|").map((cell, cIdx) => (
                                        <td
                                          key={cIdx}
                                          className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                                        >
                                          {cell.trim()}
                                        </td>
                                      ))}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        );
                      } else {
                        // Regular section with title
                        let bgColor = "bg-gray-50 dark:bg-gray-700";
                        let titleColor = "text-gray-900 dark:text-white";
                        let icon = "📝";

                        if (sectionTitle.toLowerCase().includes("pros")) {
                          bgColor = "bg-green-50 dark:bg-green-900/20";
                          titleColor = "text-green-900 dark:text-green-100";
                          icon = "✅";
                        } else if (sectionTitle.toLowerCase().includes("cons")) {
                          bgColor = "bg-red-50 dark:bg-red-900/20";
                          titleColor = "text-red-900 dark:text-red-100";
                          icon = "⚠️";
                        } else if (sectionTitle.toLowerCase().includes("recommendation")) {
                          bgColor = "bg-green-50 dark:bg-green-900/20";
                          titleColor = "text-green-900 dark:text-green-100";
                          icon = "🏆";
                        }

                        return (
                          <div
                            key={idx}
                            className={`${bgColor} border-2 border-gray-300 dark:border-gray-600 rounded-2xl p-5 md:p-6`}
                          >
                            <h3 className={`text-xl md:text-2xl font-bold ${titleColor} mb-4 flex items-center gap-2`}>
                              <span className="text-2xl">{icon}</span>
                              {sectionTitle}
                            </h3>
                            <div className="space-y-3 text-gray-700 dark:text-gray-200 text-base">
                              {content.map((line, lineIdx) => (
                                <div key={lineIdx} className="flex gap-3">
                                  {line.trim().startsWith("-") ? (
                                    <>
                                      <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                                      <span>{line.trim().substring(1).trim()}</span>
                                    </>
                                  ) : (
                                    <span>{line.trim()}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>

                {/* Footer tip */}
                <div className="bg-blue-100 dark:bg-blue-900/30 border-t-2 border-blue-300 dark:border-blue-700 px-6 md:px-10 py-5">
                  <p className="text-blue-900 dark:text-blue-100 text-sm md:text-base font-medium">
                    💡 Prices vary by location. Check local shops for current rates!
                  </p>
                </div>
              </div>

              {/* Compare Again Button */}
              <button
                onClick={() => {
                  setComparison("");
                  setBeverages([
                    { id: "1", name: "" },
                    { id: "2", name: "" },
                  ]);
                }}
                className="w-full px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold transition"
              >
                ← Compare Different Beverages
              </button>
            </div>
          )}

          {/* Empty State */}
          {!comparison && !isLoading && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg font-medium">
                Add beverages above and click "Compare Now" to see detailed analysis
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
