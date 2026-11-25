import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Download,
  KeyRound,
  Link2,
  Lock,
  LogOut,
  Printer,
  SearchCheck,
  ShieldCheck,
  Trash2,
  Users,
  Wallet,
} from 'lucide-react';
import { BADGES } from '../data/badges';
import { LESSON_MODULES } from '../data/lessons';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { GoogleSignInButton } from '../components/shared/GoogleSignInButton';
import { UgandaFlag } from '../components/shared/UgandaFlag';
import type { BadgeDefinition } from '../types';
import { downloadCertificatePng } from '../utils/certificateCanvas';

const BADGE_ICONS: Record<
  BadgeDefinition['iconName'],
  React.FC<{ className?: string }>
> = {
  search: SearchCheck,
  key: KeyRound,
  link: Link2,
  wallet: Wallet,
  users: Users,
  award: Award,
};

export const ProfilePage: React.FC = () => {
  const { lang, setLanguage, dict, pick } = useLanguage();
  const { user, isSigningIn, signIn, signOut } = useAuth();
  const {
    progress,
    setDisplayName,
    resetAllProgress,
    isCertificateUnlocked,
  } = useProgress();

  const [nameInput, setNameInput] = useState(progress.displayName);
  const [nameSaved, setNameSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const quizPercent =
    progress.challengeTotalQuestions > 0
      ? Math.round(
          (progress.challengeHighScore / progress.challengeTotalQuestions) * 100
        )
      : 0;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayName(nameInput.trim());
    setNameSaved(true);
    setTimeout(() => setNameSaved(false), 2500);
  };

  const handleDownloadCertificate = () => {
    if (!progress.certificateId) return;
    downloadCertificatePng({
      learnerName: progress.displayName || 'SafeClick UG Learner',
      completionDate:
        progress.certificateIssuedDate ||
        new Date().toLocaleDateString('en-UG'),
      certificateId: progress.certificateId,
      completedCount: progress.completedLessons.length,
      quizScorePercent: quizPercent,
      lang,
    });
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 no-print">
        <h1 className="text-3xl font-bold text-[#0A0A0A]">
          {dict.profile.title}
        </h1>
        <p className="text-lg text-slate-700">{dict.profile.subtitle}</p>
      </div>

      {/* Summary Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 no-print">
        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <div className="text-sm text-slate-600">{dict.profile.statsLessons}</div>
          <div className="text-3xl font-bold text-[#0B3B8C] tabular-nums mt-1">
            {progress.completedLessons.length} / {LESSON_MODULES.length}
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <div className="text-sm text-slate-600">{dict.profile.statsQuizBest}</div>
          <div className="text-3xl font-bold text-[#0A0A0A] tabular-nums mt-1">
            {quizPercent}%
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <div className="text-sm text-slate-600">{dict.profile.statsPoints}</div>
          <div className="text-3xl font-bold text-[#EA580C] tabular-nums mt-1">
            {progress.points}
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <div className="text-sm text-slate-600">{dict.profile.statsBadges}</div>
          <div className="text-3xl font-bold text-[#0B3B8C] tabular-nums mt-1">
            {progress.earnedBadges.length} / {BADGES.length}
          </div>
        </div>
      </section>

      {/* Google Account & Cloud Sync */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-[#0A0A0A]">
            {dict.workspace.signInTitle}
          </h2>
          <p className="text-sm text-slate-600">
            {user
              ? `${user.email || user.displayName || 'Google Account'}`
              : dict.workspace.signInDesc}
          </p>
        </div>

        {user ? (
          <button
            type="button"
            onClick={() => void signOut()}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 bg-white text-[#0A0A0A] text-sm font-semibold hover:bg-slate-50 cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            <span>{dict.workspace.signOut}</span>
          </button>
        ) : (
          <GoogleSignInButton
            onClick={() => void signIn()}
            disabled={isSigningIn}
          />
        )}
      </section>

      {/* Profile Settings: Name & Language */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
        <form
          onSubmit={handleSaveName}
          className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 space-y-4"
        >
          <label
            htmlFor="learner-display-name"
            className="block text-base font-bold text-[#0A0A0A]"
          >
            {dict.profile.displayNameLabel}
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="learner-display-name"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder={dict.profile.displayNamePlaceholder}
              className="flex-1 min-h-[48px] rounded-xl border border-slate-300 bg-slate-50 px-4 text-base text-[#0A0A0A] focus:bg-white focus:border-[#0B3B8C]"
            />
            <button
              type="submit"
              className="min-h-[48px] px-6 rounded-xl bg-[#0B3B8C] text-white font-bold text-base hover:bg-[#1D4ED8] transition-colors cursor-pointer"
            >
              {dict.profile.saveName}
            </button>
          </div>
          {nameSaved && (
            <p className="text-sm font-semibold text-[#0B3B8C]" role="status">
              {dict.profile.savedNotice}
            </p>
          )}
        </form>

        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
          <h2 className="text-base font-bold text-[#0A0A0A]">
            {dict.profile.languageLabel}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`min-h-[48px] rounded-xl border font-bold text-base transition-colors cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#0B3B8C] text-white border-[#0B3B8C]'
                  : 'bg-slate-50 text-[#0A0A0A] border-slate-300 hover:bg-slate-100'
              }`}
            >
              English (EN)
            </button>
            <button
              type="button"
              onClick={() => setLanguage('lu')}
              className={`min-h-[48px] rounded-xl border font-bold text-base transition-colors cursor-pointer ${
                lang === 'lu'
                  ? 'bg-[#0B3B8C] text-white border-[#0B3B8C]'
                  : 'bg-slate-50 text-[#0A0A0A] border-slate-300 hover:bg-slate-100'
              }`}
            >
              Luganda (LU)
            </button>
          </div>
        </div>
      </section>

      {/* Earned & Available Badges */}
      <section className="space-y-4 no-print">
        <h2 className="text-2xl font-bold text-[#0A0A0A]">
          {dict.profile.badgesHeading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BADGES.map((badge) => {
            const isEarned = progress.earnedBadges.includes(badge.id);
            const Icon = BADGE_ICONS[badge.iconName];

            return (
              <div
                key={badge.id}
                className={`rounded-2xl border p-5 flex items-start gap-4 ${
                  isEarned
                    ? 'bg-white border-[#0B3B8C]/40 shadow-2xs'
                    : 'bg-slate-100/70 border-slate-200 opacity-80'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isEarned
                      ? 'bg-[#0B3B8C] text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold">
                    {isEarned ? (
                      <span className="inline-flex items-center gap-1 text-[#0B3B8C]">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{dict.profile.earnedTag}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{dict.profile.lockedTag}</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#0A0A0A]">
                    {pick(badge.title)}
                  </h3>
                  <p className="text-sm text-slate-600 leading-snug">
                    {pick(badge.description)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Printable Certificate Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#0A0A0A] no-print">
          {dict.profile.certificateHeading}
        </h2>

        {isCertificateUnlocked && progress.certificateId ? (
          <div className="space-y-4">
            <div className="print-certificate rounded-3xl bg-white border-4 border-[#0B3B8C] p-6 sm:p-10 shadow-sm space-y-6 text-center relative overflow-hidden">
              <div className="h-2 w-full grid grid-cols-4 rounded-full overflow-hidden">
                <div className="bg-[#0B3B8C]" />
                <div className="bg-[#EA580C]" />
                <div className="bg-[#0A0A0A]" />
                <div className="bg-[#0B3B8C]" />
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <UgandaFlag className="w-10 h-[27px]" />
                <span className="text-xl font-bold text-[#0B3B8C]">
                  SAFECLICK UG
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A]">
                  DIGITAL SAFETY CHAMPION
                </h3>
                <p className="text-lg sm:text-xl font-bold text-[#EA580C]">
                  CHAMPION WA DIGITAL SAFETY
                </p>
              </div>

              <div className="py-4 border-y border-slate-200 space-y-2 max-w-xl mx-auto">
                <p className="text-sm text-slate-600">
                  {lang === 'lu'
                    ? 'Satifikeeti eno eweebwa:'
                    : 'Awarded to:'}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-[#0B3B8C]">
                  {progress.displayName || 'SafeClick UG Learner'}
                </p>
                <p className="text-base text-slate-700 pt-1">
                  {lang === 'lu'
                    ? `Olw'okumaliriza emisomo gyonna ${progress.completedLessons.length}/6 n'okuyita mu kugezesebwa (${quizPercent}%).`
                    : `For completing all ${progress.completedLessons.length}/6 Digital Safety Academy modules and passing the assessment (${quizPercent}%).`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto text-sm">
                <div>
                  <span className="text-slate-500 block">Date</span>
                  <span className="font-bold text-[#0A0A0A]">
                    {progress.certificateIssuedDate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Certificate ID</span>
                  <span className="font-mono font-bold text-[#0A0A0A]">
                    {progress.certificateId}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 max-w-2xl mx-auto pt-2">
                {dict.profile.certificateDisclaimer}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 no-print">
              <button
                type="button"
                onClick={handleDownloadCertificate}
                className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-[#0B3B8C] text-white font-bold text-base hover:bg-[#1D4ED8] transition-colors cursor-pointer"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                <span>{dict.profile.downloadCertificate}</span>
              </button>

              <button
                type="button"
                onClick={handlePrintCertificate}
                className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-white border border-slate-300 text-[#0A0A0A] font-bold text-base hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Printer className="w-5 h-5" aria-hidden="true" />
                <span>{dict.profile.printCertificate}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 no-print">
            <div className="flex items-start gap-3">
              <Award className="w-6 h-6 text-[#0B3B8C] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-2">
                <p className="text-base text-slate-800">
                  {dict.profile.certificateLocked}
                </p>
                <div className="flex flex-wrap gap-4 text-sm font-semibold text-[#0B3B8C] tabular-nums">
                  <span>
                    {dict.profile.certificateProgressLessons}:{' '}
                    {progress.completedLessons.length}/{LESSON_MODULES.length}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {dict.profile.certificateProgressQuiz}: {quizPercent}% (70%+ required)
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              {dict.profile.certificateDisclaimer}
            </p>
          </div>
        )}
      </section>

      {/* Privacy Notice & Reset Data */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
        <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200 p-6 space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0B3B8C]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#0A0A0A]">
              {dict.profile.privacyHeading}
            </h2>
          </div>
          <p className="text-base text-slate-700 leading-relaxed">
            {dict.profile.privacyBody}
          </p>
        </div>

        <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#0A0A0A]">
              {dict.profile.resetHeading}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-xl border border-[#EA580C] bg-[#FFF7ED] text-[#EA580C] font-bold text-base hover:bg-orange-100 transition-colors cursor-pointer"
          >
            <Trash2 className="w-5 h-5" aria-hidden="true" />
            <span>{dict.profile.resetButton}</span>
          </button>
        </div>
      </section>

      {/* Accessible Confirmation Modal for Reset */}
      {confirmReset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-modal-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 id="reset-modal-title" className="text-xl font-bold text-[#0A0A0A]">
              {dict.profile.resetConfirmTitle}
            </h3>
            <p className="text-base text-slate-700 leading-relaxed">
              {dict.profile.resetConfirmBody}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  resetAllProgress();
                  setNameInput('');
                  setConfirmReset(false);
                }}
                className="flex-1 min-h-[48px] rounded-xl bg-[#EA580C] text-white font-bold text-base hover:bg-[#C2410C] transition-colors cursor-pointer"
              >
                {dict.profile.resetConfirmYes}
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="flex-1 min-h-[48px] rounded-xl bg-slate-100 text-[#0A0A0A] font-semibold text-base hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {dict.profile.resetConfirmCancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
