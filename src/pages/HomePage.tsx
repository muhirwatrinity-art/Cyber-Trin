import React from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Bot,
  Briefcase,
  CheckCircle2,
  HelpCircle,
  KeyRound,
  LifeBuoy,
  Megaphone,
  SearchCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { LESSON_MODULES } from '../data/lessons';
import { SAFETY_TIPS } from '../data/quizChallenges';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import type { PageId } from '../types';
import { PWAInstallButton } from '../components/shared/PWAInstallButton';

interface HomePageProps {
  onNavigate: (page: PageId, lessonId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { dict, pick } = useLanguage();
  const { progress, dismissWelcome } = useProgress();

  // Deterministic daily tip based on day of month (works offline)
  const dayIndex = new Date().getDate() % SAFETY_TIPS.length;
  const dailyTip = SAFETY_TIPS[dayIndex];

  const completedCount = progress.completedLessons.length;
  const totalLessons = LESSON_MODULES.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <section className="rounded-3xl bg-[#0B3B8C] text-white p-6 sm:p-10 shadow-sm border border-[#0A0A0A]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#FFF7ED]">
              <span>{dict.appName}</span>
              <span aria-hidden="true">·</span>
              <span>{dict.home.heroSubheading}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-tight text-white">
              {dict.home.heroHeading}
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl leading-relaxed">
              {dict.home.heroSupport}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('learn')}
                className="inline-flex items-center gap-2.5 min-h-[48px] px-6 py-3 rounded-xl bg-[#EA580C] text-white font-bold text-base hover:bg-[#C2410C] transition-colors cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{dict.home.continueLearning}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('assistant')}
                className="inline-flex items-center gap-2.5 min-h-[48px] px-5 py-3 rounded-xl bg-white text-[#0A0A0A] font-bold text-base hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Bot className="w-5 h-5 shrink-0 text-[#0B3B8C]" aria-hidden="true" />
                <span>{dict.nav.assistant}</span>
              </button>
              <div className="lg:hidden">
                <PWAInstallButton />
              </div>
            </div>
          </div>

          {/* Concise Learning Progress Summary */}
          <div className="lg:col-span-4 rounded-2xl bg-[#0A0A0A]/35 border border-white/15 p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-bold text-white">
                {dict.home.progressHeading}
              </h2>
              <span className="text-sm font-semibold text-[#FFF7ED] tabular-nums">
                {completedCount}/{totalLessons}
              </span>
            </div>

            <div
              className="w-full h-3 rounded-full bg-white/15 overflow-hidden"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={dict.home.lessonsCompletedLabel}
            >
              <div
                className="h-full bg-[#EA580C] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1 text-sm">
              <div>
                <div className="text-blue-100">
                  {dict.home.lessonsCompletedLabel}
                </div>
                <div className="text-2xl font-bold text-white tabular-nums mt-0.5">
                  {completedCount} / {totalLessons}
                </div>
              </div>
              <div>
                <div className="text-blue-100">
                  {dict.home.badgesEarnedLabel}
                </div>
                <div className="text-2xl font-bold text-[#FFF7ED] tabular-nums mt-0.5">
                  {progress.earnedBadges.length} / 6
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcoming Introduction for First-Time Users */}
      {!progress.welcomed && (
        <section
          className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
          aria-label={dict.home.firstTimeTitle}
        >
          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-[#0A0A0A]">
              {dict.home.firstTimeTitle}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed max-w-3xl">
              {dict.home.firstTimeBody}
            </p>
          </div>
          <button
            type="button"
            onClick={dismissWelcome}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 bg-slate-50 text-[#0A0A0A] font-semibold text-sm hover:bg-slate-100 transition-colors shrink-0 cursor-pointer self-start sm:self-center"
          >
            <X className="w-4 h-4" aria-hidden="true" />
            <span>{dict.home.dismissWelcome}</span>
          </button>
        </section>
      )}

      {/* Three Primary Large Action Cards */}
      <section aria-label="Main Actions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: LEARN / YIGA */}
          <button
            type="button"
            onClick={() => onNavigate('learn')}
            className="group text-left rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs hover:border-[#0B3B8C] hover:shadow-md transition-all flex flex-col justify-between gap-5 cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0B3B8C] text-white flex items-center justify-center">
                <BookOpen className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-500">
                  {dict.home.cardLearnSub}
                </div>
                <h2 className="text-2xl font-bold text-[#0A0A0A] mt-0.5">
                  {dict.home.cardLearnTitle}
                </h2>
                <p className="text-base text-slate-700 mt-2 leading-relaxed">
                  {dict.home.cardLearnDesc}
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-bold text-[#0B3B8C] group-hover:translate-x-0.5 transition-transform">
              <span>{dict.academy.readLesson}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </div>
          </button>

          {/* Card 2: CHECK A MESSAGE / KEBERA OBUBAKA */}
          <button
            type="button"
            onClick={() => onNavigate('check')}
            className="group text-left rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs hover:border-[#EA580C] hover:shadow-md transition-all flex flex-col justify-between gap-5 cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#EA580C] text-white flex items-center justify-center">
                <SearchCheck className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-500">
                  {dict.home.cardCheckSub}
                </div>
                <h2 className="text-2xl font-bold text-[#0A0A0A] mt-0.5">
                  {dict.home.cardCheckTitle}
                </h2>
                <p className="text-base text-slate-700 mt-2 leading-relaxed">
                  {dict.home.cardCheckDesc}
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-bold text-[#EA580C] group-hover:translate-x-0.5 transition-transform">
              <span>{dict.scamChecker.checkButton}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </div>
          </button>

          {/* Card 3: GET HELP / FUNA OBUYAMBI */}
          <button
            type="button"
            onClick={() => onNavigate('help')}
            className="group text-left rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs hover:border-[#0A0A0A] hover:shadow-md transition-all flex flex-col justify-between gap-5 cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0A0A0A] text-white flex items-center justify-center">
                <LifeBuoy className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-500">
                  {dict.home.cardHelpSub}
                </div>
                <h2 className="text-2xl font-bold text-[#0A0A0A] mt-0.5">
                  {dict.home.cardHelpTitle}
                </h2>
                <p className="text-base text-slate-700 mt-2 leading-relaxed">
                  {dict.home.cardHelpDesc}
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-bold text-[#0A0A0A] group-hover:translate-x-0.5 transition-transform">
              <span>{dict.home.cardHelpTitle}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </div>
          </button>
        </div>
      </section>

      {/* AI Safety Assistant & Google Workspace Safety Hub */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-label="AI & Workspace Tools">
        <button
          type="button"
          onClick={() => onNavigate('assistant')}
          className="group text-left rounded-2xl bg-white border border-slate-200 p-6 hover:border-[#0B3B8C] hover:shadow-md transition-all flex items-start justify-between gap-4 cursor-pointer"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] text-[#0B3B8C] border border-[#0B3B8C]/20 flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-[#0A0A0A]">
                {dict.assistant.title}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {dict.assistant.subtitle}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B3B8C] pt-1">
                <span>{dict.assistant.send}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('workspace')}
          className="group text-left rounded-2xl bg-white border border-slate-200 p-6 hover:border-[#EA580C] hover:shadow-md transition-all flex items-start justify-between gap-4 cursor-pointer"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] text-[#EA580C] border border-[#EA580C]/25 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-[#0A0A0A]">
                {dict.workspace.title}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {dict.workspace.subtitle}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#EA580C] pt-1">
                <span>{dict.nav.workspace}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </button>
      </section>

      {/* Daily Safety Tip & Practical Safety Tools */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Daily Tip */}
        <div className="lg:col-span-5 rounded-2xl bg-[#FFF7ED] border border-[#EA580C]/35 p-6 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-[#EA580C]">
              <CheckCircle2 className="w-5 h-5 text-[#0B3B8C]" aria-hidden="true" />
              <span>{dict.home.dailyTipLabel}</span>
            </div>
            <h3 className="text-xl font-bold text-[#0A0A0A]">
              {pick(dailyTip.title)}
            </h3>
            <p className="text-base text-slate-800 leading-relaxed">
              {pick(dailyTip.body)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('tips')}
            className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-[#0B3B8C] hover:underline cursor-pointer self-start"
          >
            <Megaphone className="w-4 h-4" aria-hidden="true" />
            <span>{dict.home.toolTipsTitle}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Practical Tools */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-bold text-[#0A0A0A]">
            {dict.home.quickToolsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => onNavigate('passwords')}
              className="text-left rounded-2xl bg-white border border-slate-200 p-5 hover:border-[#0B3B8C] transition-colors flex items-start gap-4 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0B3B8C] flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#0A0A0A]">
                  {dict.home.toolPasswordTitle}
                </h3>
                <p className="text-sm text-slate-600 leading-snug">
                  {dict.home.toolPasswordDesc}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('quiz')}
              className="text-left rounded-2xl bg-white border border-slate-200 p-5 hover:border-[#0B3B8C] transition-colors flex items-start gap-4 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0B3B8C] flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#0A0A0A]">
                  {dict.home.toolQuizTitle}
                </h3>
                <p className="text-sm text-slate-600 leading-snug">
                  {dict.home.toolQuizDesc}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('tips')}
              className="text-left rounded-2xl bg-white border border-slate-200 p-5 hover:border-[#EA580C] transition-colors flex items-start gap-4 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#0A0A0A]">
                  {dict.home.toolTipsTitle}
                </h3>
                <p className="text-sm text-slate-600 leading-snug">
                  {dict.home.toolTipsDesc}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="text-left rounded-2xl bg-white border border-slate-200 p-5 hover:border-[#0A0A0A] transition-colors flex items-start gap-4 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 text-[#0A0A0A] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#0A0A0A]">
                  {dict.profile.badgesHeading}
                </h3>
                <p className="text-sm text-slate-600 leading-snug tabular-nums">
                  {progress.points} {dict.home.pointsLabel} ·{' '}
                  {progress.earnedBadges.length}/6 {dict.home.badgesEarnedLabel}
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
