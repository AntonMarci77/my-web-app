import Link from "next/link";
import { ClinicalCase } from "@/data/cases";

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

const difficultyLabels = {
  easy: "Lahka",
  medium: "Stredna",
  hard: "Tazka",
};

const categoryIcons: Record<string, string> = {
  Chrbtice: "🦴",
  "Horna koncatina": "💪",
  "Dolna koncatina": "🦵",
};

function getCategoryIcon(category: string): string {
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }
  return "🩺";
}

export default function CaseCard({
  clinicalCase,
  completed,
}: {
  clinicalCase: ClinicalCase;
  completed: boolean;
}) {
  return (
    <Link href={`/case/${clinicalCase.id}`}>
      <div
        className={`group relative rounded-2xl border p-6 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
          completed
            ? "border-green-200 bg-green-50"
            : "border-gray-200 bg-white hover:border-blue-300"
        }`}
      >
        {completed && (
          <div className="absolute top-4 right-4 text-green-500 text-2xl">
            ✓
          </div>
        )}
        <div className="text-3xl mb-3">{getCategoryIcon(clinicalCase.category)}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {clinicalCase.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{clinicalCase.category}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {clinicalCase.chiefComplaint}
        </p>
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              difficultyColors[clinicalCase.difficulty]
            }`}
          >
            {difficultyLabels[clinicalCase.difficulty]}
          </span>
          <span className="text-sm text-gray-400">
            {clinicalCase.patient.age}r, {clinicalCase.patient.gender}
          </span>
        </div>
      </div>
    </Link>
  );
}
