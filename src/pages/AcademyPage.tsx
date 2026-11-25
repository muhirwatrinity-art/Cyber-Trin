import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';
import { LESSON_MODULES } from '../data/lessons';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { LessonIllustration } from '../components/academy/LessonIllustration';
import { VoiceReadButton } from '../components/shared/VoiceReadButton';
import type { PageId } from '../types';

interface AcademyPageProps {
  initialLessonId?: string | null;
  onNavigate: (page: PageId) => void;
}

export const AcademyPage: React.FC<AcademyPageProps> = ({
  initialLessonId,
  onNavigate,
}) => {
  const { dict, pick } = useLanguage();
  const { progress, completeLesson } = useProgress();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(
    initialLessonId || null
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    if (initialLessonId) {
      setSelectedLessonId(initialLessonId);
    }
  }, [initialLessonId]);

  const activeLesson = LESSON_MODULES.find((m) => m.id === selectedLessonId) || null;
  const allLessonsCompleted = LESSON_MODULES.every((m) =>
    progress.completedLessons.includes(m.id)
  );

  if (!activeLesson) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#0A0A0A]">
            {dict.academy.title}
          </h1>
          <p className="text-lg text-slate-700">{dict.academy.subtitle}</p>
        </div>

        {allLessonsCompleted && (
          <div className="rounded-2xl bg-[#EFF6FF] border border-[#0B3B8C]/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="w-6 h-6 text-[#0B3B8C] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-base font-medium text-[#0A0A0A]">
                {dict.academy.allDoneBanner}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('quiz')}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0B3B8C] text-white font-semibold text-sm hover:bg-[#1D4ED8] transition-colors shrink-0 cursor-pointer"
            >
              {dict.home.toolQuizTitle}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LESSON_MODULES.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => {
                  setSelectedAnswers({});
                  setSelectedLessonId(lesson.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left rounded-2xl bg-white border border-slate-200 p-6 hover:border-[#0B3B8C] hover:shadow-md transition-all flex flex-col justify-between gap-5 cursor-pointer"
              >
                <div className="space-y-3">
                  {/* Unboxed typographic metadata */}
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-semibold text-slate-500 tabular-nums">
                      {dict.academy.notStartedTag} {lesson.number}
                    </span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#0B3B8C]">
                        <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                        <span>{dict.academy.completedTag}</span>
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-[#0A0A0A]">
                    {pick(lesson.title)}
                  </h2>

                  <p className="text-base text-slate-700 leading-relaxed">
                    {pick(lesson.subtitle)}
                  </p>

                  <p className="text-sm text-slate-500">
                    {lesson.character} <span aria-hidden="true">·</span>{' '}
                    {pick(lesson.setting)}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-sm font-bold text-[#0B3B8C]">
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  <span>{dict.academy.readLesson}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const currentIdx = LESSON_MODULES.findIndex((m) => m.id === activeLesson.id);
  const nextModule =
    currentIdx >= 0 && currentIdx < LESSON_MODULES.length - 1
      ? LESSON_MODULES[currentIdx + 1]
      : null;

  const isCompleted = progress.completedLessons.includes(activeLesson.id);

  const fullSpeechText = [
    pick(activeLesson.title),
    `${dict.academy.storyHeading}. ${pick(activeLesson.story)}`,
    `${dict.academy.whatHappenedHeading}. ${pick(activeLesson.whatHappened)}`,
    `${dict.academy.warningSignsHeading}. ${activeLesson.warningSigns.map(pick).join('. ')}`,
    `${dict.academy.whatToDoHeading}. ${activeLesson.whatToDo.map(pick).join('. ')}`,
    `${dict.academy.practicalTipHeading}. ${pick(activeLesson.safetyTip)}`,
  ].join(' ');

  const handleCompleteLesson = () => {
    let correct = 0;
    activeLesson.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct += 1;
      }
    });
    const scorePct = Math.round((correct / activeLesson.quiz.length) * 100);
    completeLesson(activeLesson.id, scorePct);
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setSelectedLessonId(null)}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-white border border-slate-300 text-[#0A0A0A] font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{dict.academy.backToModules}</span>
        </button>

        <VoiceReadButton textToRead={fullSpeechText} />
      </div>

      {/* Lesson Header */}
      <header className="space-y-2">
        <div className="text-sm font-semibold text-[#0B3B8C]">
          {dict.academy.notStartedTag} {activeLesson.number}{' '}
          <span aria-hidden="true">·</span> {activeLesson.character}{' '}
          <span aria-hidden="true">·</span> {pick(activeLesson.setting)}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0A0A]">
          {pick(activeLesson.title)}
        </h1>
        <p className="text-lg text-slate-700">{pick(activeLesson.subtitle)}</p>
      </header>

      {/* Illustration */}
      <LessonIllustration
        illustrationId={activeLesson.illustrationId}
        alt={pick(activeLesson.illustrationAlt)}
      />

      {/* Story + What Happened */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
          <h2 className="text-xl font-bold text-[#0B3B8C]">
            {dict.academy.storyHeading}
          </h2>
          <p className="text-base text-slate-800 leading-relaxed">
            {pick(activeLesson.story)}
          </p>
        </section>

        <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
          <h2 className="text-xl font-bold text-[#0B3B8C]">
            {dict.academy.whatHappenedHeading}
          </h2>
          <p className="text-base text-slate-800 leading-relaxed">
            {pick(activeLesson.whatHappened)}
          </p>
        </section>
      </div>

      {/* Warning Signs */}
      <section className="rounded-2xl bg-[#FFF7ED] border border-[#EA580C]/40 p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-6 h-6 text-[#EA580C] shrink-0" aria-hidden="true" />
          <h2 className="text-xl font-bold text-[#0A0A0A]">
            {dict.academy.warningSignsHeading}
          </h2>
        </div>
        <ul className="space-y-3 list-disc pl-6 text-base text-slate-800">
          {activeLesson.warningSigns.map((sign, i) => (
            <li key={i} className="leading-relaxed">
              {pick(sign)}
            </li>
          ))}
        </ul>
      </section>

      {/* What To Do */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-[#0B3B8C] shrink-0" aria-hidden="true" />
          <h2 className="text-xl font-bold text-[#0A0A0A]">
            {dict.academy.whatToDoHeading}
          </h2>
        </div>
        <ol className="space-y-3 list-decimal pl-6 text-base text-slate-800">
          {activeLesson.whatToDo.map((step, i) => (
            <li key={i} className="leading-relaxed">
              {pick(step)}
            </li>
          ))}
        </ol>
      </section>

      {/* Practical Safety Tip */}
      <section className="rounded-2xl bg-[#EFF6FF] border border-[#0B3B8C]/25 p-6 space-y-2">
        <div className="flex items-center gap-2.5">
          <Lightbulb className="w-6 h-6 text-[#EA580C] shrink-0" aria-hidden="true" />
          <h2 className="text-xl font-bold text-[#0A0A0A]">
            {dict.academy.practicalTipHeading}
          </h2>
        </div>
        <p className="text-base font-medium text-[#0A0A0A] leading-relaxed">
          {pick(activeLesson.safetyTip)}
        </p>
      </section>

      {/* Short Lesson Quiz */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[#0A0A0A]">
            {dict.academy.quizHeading}
          </h2>
          <p className="text-base text-slate-600">{dict.academy.quizInstruction}</p>
        </div>

        <div className="space-y-6">
          {activeLesson.quiz.map((q, qIndex) => {
            const chosen = selectedAnswers[q.id];
            const hasAnswered = typeof chosen === 'number';
            const isRight = chosen === q.correctIndex;

            return (
              <div
                key={q.id}
                className="pt-4 border-t border-slate-200 first:border-t-0 first:pt-0 space-y-3"
              >
                <p className="text-base font-bold text-[#0A0A0A]">
                  {qIndex + 1}. {pick(q.question)}
                </p>
                <div className="space-y-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    let btnStyle =
                      'bg-slate-50 border-slate-300 text-[#0A0A0A] hover:bg-slate-100';
                    if (hasAnswered && isSelected) {
                      btnStyle = isRight
                        ? 'bg-[#EFF6FF] border-[#0B3B8C] text-[#0B3B8C] font-semibold'
                        : 'bg-[#FFF7ED] border-[#EA580C] text-[#0A0A0A] font-semibold';
                    } else if (hasAnswered && optIdx === q.correctIndex) {
                      btnStyle =
                        'bg-[#EFF6FF]/70 border-[#0B3B8C] text-[#0B3B8C]';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() =>
                          setSelectedAnswers((prev) => ({
                            ...prev,
                            [q.id]: optIdx,
                          }))
                        }
                        className={`w-full text-left min-h-[48px] px-4 py-3 rounded-xl border text-base transition-colors cursor-pointer ${btnStyle}`}
                      >
                        {pick(opt)}
                      </button>
                    );
                  })}
                </div>

                {hasAnswered && (
                  <div
                    className={`rounded-xl p-4 text-sm font-medium border ${
                      isRight
                        ? 'bg-[#EFF6FF] border-[#0B3B8C]/30 text-[#0A0A0A]'
                        : 'bg-[#FFF7ED] border-[#EA580C]/40 text-[#0A0A0A]'
                    }`}
                    role="status"
                  >
                    <p className="font-bold mb-1">
                      {isRight
                        ? dict.academy.correctFeedback
                        : dict.academy.tryAgainFeedback}
                    </p>
                    <p>{pick(q.explanation)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Completion & Next Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={handleCompleteLesson}
          className={`inline-flex items-center justify-center gap-2.5 min-h-[52px] px-6 py-3 rounded-xl font-bold text-base transition-colors cursor-pointer ${
            isCompleted
              ? 'bg-[#0A0A0A] text-white hover:bg-slate-800'
              : 'bg-[#0B3B8C] text-white hover:bg-[#1D4ED8]'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          <span>
            {isCompleted
              ? dict.academy.lessonCompletedBtn
              : dict.academy.markComplete}
          </span>
        </button>

        {nextModule ? (
          <button
            type="button"
            onClick={() => {
              setSelectedAnswers({});
              setSelectedLessonId(nextModule.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-xl bg-white border border-slate-300 text-[#0A0A0A] font-bold text-base hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span>
              {dict.academy.nextModule}: {nextModule.number}
            </span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onNavigate('quiz')}
            className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-xl bg-[#EA580C] text-white font-bold text-base hover:bg-[#C2410C] transition-colors cursor-pointer"
          >
            <span>{dict.home.toolQuizTitle}</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
};
