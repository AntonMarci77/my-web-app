import { cases } from "@/data/cases";
import CaseInteractive from "@/components/CaseInteractive";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return cases.map((c) => ({ id: String(c.id) }));
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const clinicalCase = cases.find((c) => c.id === Number(id));

  if (!clinicalCase) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors"
      >
        ← Spat na vsetky pripady
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {clinicalCase.category}
          </span>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              clinicalCase.difficulty === "easy"
                ? "bg-green-100 text-green-800"
                : clinicalCase.difficulty === "medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {clinicalCase.difficulty === "easy"
              ? "Lahka"
              : clinicalCase.difficulty === "medium"
              ? "Stredna"
              : "Tazka"}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          {clinicalCase.title}
        </h1>
      </div>

      <CaseInteractive clinicalCase={clinicalCase} />
    </div>
  );
}
