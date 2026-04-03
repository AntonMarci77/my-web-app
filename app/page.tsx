"use client";

import { useState, useEffect } from "react";
import { cases } from "@/data/cases";
import CaseCard from "@/components/CaseCard";

const categories = ["Vsetky", "Chrbtice", "Horna koncatina", "Dolna koncatina"];

function normalize(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Vsetky");
  const [completedCases, setCompletedCases] = useState<number[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("completedCases") || "[]");
    setCompletedCases(saved);
  }, []);

  const filteredCases =
    activeCategory === "Vsetky"
      ? cases
      : cases.filter((c) =>
          normalize(c.category).includes(normalize(activeCategory))
        );

  const progress = Math.round((completedCases.length / cases.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Klinicke pripady pre fyzioterapeutov
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Precvicte si diagnostiku na interaktivnych klinickych pripadoch.
          Vyhodnotte symptomy, zvolte spravne vysetrenia a stanovte diagnozu.
        </p>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-700">Vas postup</span>
          <span className="text-sm text-gray-500">
            {completedCases.length} / {cases.length} pripadov
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {completedCases.length > 0 && (
          <button
            onClick={() => {
              localStorage.removeItem("completedCases");
              setCompletedCases([]);
            }}
            className="mt-3 text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            Resetovat postup
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cases grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((c) => (
          <CaseCard
            key={c.id}
            clinicalCase={c}
            completed={completedCases.includes(c.id)}
          />
        ))}
      </div>
    </div>
  );
}
