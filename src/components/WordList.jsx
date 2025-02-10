"use client";

import { useState } from "react";
import { words } from "../data/words";

export default function WordList() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWords = words.filter((word) => {
    const matchesFilter = filter === "all" || word.type === filter;
    const matchesSearch =
      word.japanese.includes(searchTerm) ||
      word.romaji.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search words..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "hiragana"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("hiragana")}
          >
            Hiragana
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "katakana"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("katakana")}
          >
            Katakana
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWords
          .sort(() => Math.random() - 0.5)
          .map((word) => {
            return (
              <div
                key={word.id}
                className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300 group relative cursor-pointer"
              >
                <div className="text-2xl font-bold mb-2 text-indigo-900">
                  {word.japanese}
                </div>
                <div className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {word.romaji}
                </div>
                <div className="text-sm text-gray-400 mt-1 capitalize">
                  {word.type}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
