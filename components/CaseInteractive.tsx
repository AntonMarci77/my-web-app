"use client";

import { useState } from "react";
import { ClinicalCase, Examination } from "@/data/cases";
import Link from "next/link";

type Step = "symptoms" | "examinations" | "diagnosis" | "result";

export default function CaseInteractive({
  clinicalCase,
}: {
  clinicalCase: ClinicalCase;
}) {
  const [step, setStep] = useState<Step>("symptoms");
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [revealedExams, setRevealedExams] = useState<string[]>([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string | null>(null);
  const [score, setScore] = useState({ exams: 0, diagnosis: false });

  const toggleExam = (examId: string) => {
    setSelectedExams((prev) =>
      prev.includes(examId)
        ? prev.filter((id) => id !== examId)
        : [...prev, examId]
    );
  };

  const revealExamResult = (examId: string) => {
    if (!revealedExams.includes(examId)) {
      setRevealedExams((prev) => [...prev, examId]);
    }
  };

  const calculateExamScore = () => {
    const relevant = clinicalCase.examinations.filter((e) => e.isRelevant);
    const irrelevant = clinicalCase.examinations.filter((e) => !e.isRelevant);
    const correctlySelected = selectedExams.filter((id) =>
      relevant.some((e) => e.id === id)
    ).length;
    const incorrectlySelected = selectedExams.filter((id) =>
      irrelevant.some((e) => e.id === id)
    ).length;
    return Math.max(
      0,
      Math.round(
        ((correctlySelected - incorrectlySelected) / relevant.length) * 100
      )
    );
  };

  const handleSubmitExams = () => {
    const examScore = calculateExamScore();
    setScore((prev) => ({ ...prev, exams: examScore }));
    setStep("diagnosis");
  };

  const handleSubmitDiagnosis = () => {
    const isCorrect = selectedDiagnosis === clinicalCase.correctDiagnosis;
    setScore((prev) => ({ ...prev, diagnosis: isCorrect }));

    // Save completion to localStorage
    const completed = JSON.parse(localStorage.getItem("completedCases") || "[]");
    if (!completed.includes(clinicalCase.id)) {
      completed.push(clinicalCase.id);
      localStorage.setItem("completedCases", JSON.stringify(completed));
    }

    setStep("result");
  };

  const totalScore = Math.round(
    (score.exams + (score.diagnosis ? 100 : 0)) / 2
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="flex items-center mb-8 gap-2">
        {(["symptoms", "examinations", "diagnosis", "result"] as Step[]).map(
          (s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all ${
                  step === s
                    ? "bg-blue-600 text-white scale-110"
                    : (["symptoms", "examinations", "diagnosis", "result"].indexOf(step) > i)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {(["symptoms", "examinations", "diagnosis", "result"].indexOf(step) > i) ? "✓" : i + 1}
              </div>
              {i < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded ${
                    (["symptoms", "examinations", "diagnosis", "result"].indexOf(step) > i)
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          )
        )}
      </div>

      {/* Step labels */}
      <div className="flex mb-8 text-xs text-gray-500">
        <div className="flex-1 text-center">Symptomy</div>
        <div className="flex-1 text-center">Vysetrenia</div>
        <div className="flex-1 text-center">Diagnoza</div>
        <div className="flex-1 text-center">Vysledok</div>
      </div>

      {/* Patient info card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100">
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="bg-white px-3 py-1.5 rounded-lg font-medium text-gray-700">
            👤 {clinicalCase.patient.gender}, {clinicalCase.patient.age} rokov
          </span>
          <span className="bg-white px-3 py-1.5 rounded-lg font-medium text-gray-700">
            💼 {clinicalCase.patient.occupation}
          </span>
        </div>
      </div>

      {/* STEP 1: Symptoms */}
      {step === "symptoms" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Hlavna staznost
            </h2>
            <p className="text-lg text-blue-700 font-medium">
              &ldquo;{clinicalCase.chiefComplaint}&rdquo;
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Anamneza</h2>
            <p className="text-gray-700 leading-relaxed">
              {clinicalCase.history}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Symptomy pacienta
            </h2>
            <ul className="space-y-3">
              {clinicalCase.symptoms.map((symptom, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="text-gray-700">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setStep("examinations")}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Pokracovat k vysetreniam →
          </button>
        </div>
      )}

      {/* STEP 2: Examinations */}
      {step === "examinations" && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Vyberte relevantne vysetrenia
            </h2>
            <p className="text-gray-600">
              Oznacte vysetrenia, ktore by ste odporucili pre tohto pacienta.
              Po oznaceni kliknite na &ldquo;Zobrazit vysledok&rdquo; pre zobrazenie nalezu.
            </p>
          </div>

          <div className="grid gap-4">
            {clinicalCase.examinations.map((exam) => (
              <ExaminationCard
                key={exam.id}
                exam={exam}
                isSelected={selectedExams.includes(exam.id)}
                isRevealed={revealedExams.includes(exam.id)}
                onToggle={() => toggleExam(exam.id)}
                onReveal={() => revealExamResult(exam.id)}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep("symptoms")}
              className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-colors"
            >
              ← Spat
            </button>
            <button
              onClick={handleSubmitExams}
              disabled={selectedExams.length === 0}
              className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Potvrdit vysetrenia →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Diagnosis */}
      {step === "diagnosis" && (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Stanovte diagnozu
            </h2>
            <p className="text-gray-600">
              Na zaklade anamnézy, symptómov a výsledkov vyšetrení vyberte
              najspravnejsiu diagnozu.
            </p>
          </div>

          {/* Show selected exam results summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Zhrnutie vysetreni
            </h3>
            <div className="space-y-2">
              {clinicalCase.examinations
                .filter((e) => selectedExams.includes(e.id))
                .map((exam) => (
                  <div key={exam.id} className="text-sm">
                    <span className="font-medium text-gray-800">
                      {exam.name}:
                    </span>{" "}
                    <span className="text-gray-600">{exam.result}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="grid gap-3">
            {clinicalCase.diagnosisOptions.map((diagnosis) => (
              <button
                key={diagnosis}
                onClick={() => setSelectedDiagnosis(diagnosis)}
                className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${
                  selectedDiagnosis === diagnosis
                    ? "border-purple-500 bg-purple-50 text-purple-900"
                    : "border-gray-200 bg-white text-gray-700 hover:border-purple-300"
                }`}
              >
                {diagnosis}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep("examinations")}
              className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-colors"
            >
              ← Spat
            </button>
            <button
              onClick={handleSubmitDiagnosis}
              disabled={!selectedDiagnosis}
              className="flex-1 py-4 bg-purple-600 text-white rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Potvrdit diagnozu ✓
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Result */}
      {step === "result" && (
        <div className="space-y-6">
          {/* Score */}
          <div
            className={`rounded-2xl p-8 text-center ${
              totalScore >= 70
                ? "bg-green-50 border border-green-200"
                : totalScore >= 40
                ? "bg-yellow-50 border border-yellow-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="text-6xl font-bold mb-2">
              {totalScore >= 70 ? "🎉" : totalScore >= 40 ? "📝" : "📚"}
            </div>
            <div
              className={`text-5xl font-bold mb-2 ${
                totalScore >= 70
                  ? "text-green-600"
                  : totalScore >= 40
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {totalScore}%
            </div>
            <p className="text-gray-600 text-lg">
              {totalScore >= 70
                ? "Vyborne! Spravne ste urcili diagnozu."
                : totalScore >= 40
                ? "Dobry pokus, ale je priestor na zlepsenie."
                : "Skuste to znova a preštudujte si vysvetlenie."}
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {score.exams}%
              </div>
              <div className="text-sm text-gray-500">Vyber vysetreni</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold mb-1">
                {score.diagnosis ? (
                  <span className="text-green-600">Spravna</span>
                ) : (
                  <span className="text-red-600">Nespravna</span>
                )}
              </div>
              <div className="text-sm text-gray-500">Diagnoza</div>
            </div>
          </div>

          {/* Diagnosis feedback */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-2">Spravna diagnoza</h3>
            <p className="text-lg font-semibold text-green-700 mb-4">
              {clinicalCase.correctDiagnosis}
            </p>
            {selectedDiagnosis !== clinicalCase.correctDiagnosis && (
              <div className="bg-red-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-700">
                  <span className="font-medium">Vasa odpoved:</span>{" "}
                  {selectedDiagnosis}
                </p>
              </div>
            )}
            <h3 className="font-bold text-gray-900 mb-2">Vysvetlenie</h3>
            <p className="text-gray-700 leading-relaxed">
              {clinicalCase.explanation}
            </p>
          </div>

          {/* Exam review */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">
              Prehlad vysetreni
            </h3>
            <div className="space-y-3">
              {clinicalCase.examinations.map((exam) => {
                const wasSelected = selectedExams.includes(exam.id);
                const isCorrect = exam.isRelevant === wasSelected;
                return (
                  <div
                    key={exam.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      isCorrect ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    <span className="text-lg">{isCorrect ? "✓" : "✗"}</span>
                    <div className="flex-1">
                      <span className="font-medium text-gray-800">
                        {exam.name}
                      </span>
                      <span className="text-xs ml-2 text-gray-500">
                        {exam.isRelevant
                          ? "(relevantne)"
                          : "(nerelevantne)"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {wasSelected ? "Vybrane" : "Nevybrane"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                setStep("symptoms");
                setSelectedExams([]);
                setRevealedExams([]);
                setSelectedDiagnosis(null);
                setScore({ exams: 0, diagnosis: false });
              }}
              className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Skusit znova
            </button>
            <Link
              href="/"
              className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-colors text-center"
            >
              Vsetky pripady
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function ExaminationCard({
  exam,
  isSelected,
  isRevealed,
  onToggle,
  onReveal,
}: {
  exam: Examination;
  isSelected: boolean;
  isRevealed: boolean;
  onToggle: () => void;
  onReveal: () => void;
}) {
  return (
    <div
      className={`rounded-xl border-2 p-4 transition-all ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={onToggle}
          className="flex items-center gap-3 flex-1 text-left"
        >
          <div
            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
              isSelected
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-300"
            }`}
          >
            {isSelected && "✓"}
          </div>
          <span className="font-medium text-gray-800">{exam.name}</span>
        </button>
        {isSelected && !isRevealed && (
          <button
            onClick={onReveal}
            className="text-sm px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Zobrazit vysledok
          </button>
        )}
      </div>
      {isRevealed && (
        <div className="mt-3 pl-9 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
          {exam.result}
        </div>
      )}
    </div>
  );
}
