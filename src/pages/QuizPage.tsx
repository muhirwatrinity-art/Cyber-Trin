import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { CHALLENGE_QUESTIONS } from '../data/quizChallenges';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import type { PageId } from '../types';

interface QuizPageProps {
  onNavigate: (page: PageId) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ onNavigate }) => {
  const { dict, pick } = useLanguage();
  const { recordChallengeResult } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = CHALLENGE_QUESTIONS.length;
  const currentQ = CHALLENGE_QUESTIONS[currentIndex];
  const hasAnswered = selectedOption !== null;
  const isCorrect = selectedOption === currentQ.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    if (idx === currentQ.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < total) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setFinished(true);
      recordChallengeResult(correctCount, total);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setCorrectCount(0);
    setFinished(false);
  };

  if (finished) {
    const percent = Math.round((correctCount / total) * 100);
    const passed = percent >= 70;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <section
          className={`rounded-3xl border p-8 text-center space-y-5 ${
            passed
              ? 'bg-[#EFF6FF] border-[#0B3B8C]/40'
              : 'bg-[#FFF7ED] border-[#EA580C]/40'
          }`}
        >
          <div
            className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
              passed
                ? 'bg-[#0B3B8C] text-white'
                : 'bg-[#EA580C] text-white'
            }`}
          >
            <Award className="w-8 h-8" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <div className="text-4xl font-bold text-[#0A0A0A] tabular-nums">
              {correctCount} / {total} ({percent}%)
            </div>
            <h1 className="text-2xl font-bold text-[#0A0A0A]">
              {passed ? dict.quiz.passedTitle : dict.quiz.needsPracticeTitle}
            </h1>
            <p className="text-base text-slate-800 max-w-lg mx-auto leading-relaxed">
              {passed ? dict.quiz.passedBody : dict.quiz.needsPracticeBody}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-white border border-slate-300 text-[#0A0A0A] font-bold text-base hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" aria-hidden="true" />
              <span>{dict.quiz.restartQuiz}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate(passed ? 'profile' : 'learn')}
              className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-[#0B3B8C] text-white font-bold text-base hover:bg-[#1D4ED8] transition-colors cursor-pointer"
            >
              <span>{passed ? dict.nav.profile : dict.nav.learn}</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#0A0A0A]">{dict.quiz.title}</h1>
        <p className="text-lg text-slate-700">{dict.quiz.subtitle}</p>
      </div>

      {/* Progress & Score Bar */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between gap-4 text-sm font-semibold">
          <span className="text-slate-600 tabular-nums">
            {dict.quiz.questionOf} {currentIndex + 1} {dict.quiz.of} {total}{' '}
            <span aria-hidden="true">·</span> {dict.quiz.types[currentQ.type]}
          </span>
          <span className="text-[#0B3B8C] tabular-nums">
            {dict.quiz.scoreLabel}: {correctCount}/{total}
          </span>
        </div>

        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-[#0B3B8C] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A0A0A] leading-snug">
          {pick(currentQ.prompt)}
        </h2>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isRightOption = idx === currentQ.correctIndex;

            let style =
              'bg-slate-50 border-slate-300 text-[#0A0A0A] hover:bg-slate-100';
            if (hasAnswered) {
              if (isRightOption) {
                style =
                  'bg-[#EFF6FF] border-[#0B3B8C] text-[#0B3B8C] font-semibold';
              } else if (isSelected) {
                style = 'bg-[#FFF7ED] border-[#EA580C] text-[#0A0A0A] font-semibold';
              } else {
                style = 'bg-slate-50 border-slate-200 text-slate-500';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={hasAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left min-h-[52px] px-5 py-3.5 rounded-xl border text-base transition-colors flex items-center justify-between gap-3 ${
                  hasAnswered ? 'cursor-default' : 'cursor-pointer'
                } ${style}`}
              >
                <span>{pick(opt)}</span>
                {hasAnswered && isRightOption && (
                  <CheckCircle2
                    className="w-5 h-5 text-[#0B3B8C] shrink-0"
                    aria-hidden="true"
                  />
                )}
                {hasAnswered && isSelected && !isRightOption && (
                  <XCircle
                    className="w-5 h-5 text-[#EA580C] shrink-0"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Feedback */}
        {hasAnswered && (
          <div
            className={`rounded-2xl border p-5 space-y-2 ${
              isCorrect
                ? 'bg-[#EFF6FF] border-[#0B3B8C]/35 text-[#0A0A0A]'
                : 'bg-[#FFF7ED] border-[#EA580C]/45 text-[#0A0A0A]'
            }`}
            role="status"
          >
            <p className="font-bold text-base">
              {isCorrect
                ? dict.academy.correctFeedback
                : dict.academy.tryAgainFeedback}
            </p>
            <p className="text-base leading-relaxed">
              {pick(currentQ.explanation)}
            </p>
          </div>
        )}

        {hasAnswered && (
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-[#0B3B8C] text-white font-bold text-base hover:bg-[#1D4ED8] transition-colors cursor-pointer"
            >
              <span>
                {currentIndex + 1 < total
                  ? dict.quiz.nextQuestion
                  : dict.quiz.finishQuiz}
              </span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
