import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  XCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import type { PageId } from '../types';
import { analyzePasswordLocally } from '../utils/passwordStrength';

interface PasswordTesterPageProps {
  onNavigate: (page: PageId) => void;
}

export const PasswordTesterPage: React.FC<PasswordTesterPageProps> = ({
  onNavigate,
}) => {
  const { dict, pick } = useLanguage();
  const { recordPasswordCheck } = useProgress();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [recordedOnce, setRecordedOnce] = useState(false);

  // Clear password automatically when leaving the page
  useEffect(() => {
    return () => {
      setPassword('');
    };
  }, []);

  const handleChange = (val: string) => {
    setPassword(val);
    if (val.length >= 4 && !recordedOnce) {
      recordPasswordCheck();
      setRecordedOnce(true);
    }
  };

  const analysis = password ? analyzePasswordLocally(password) : null;

  const strengthConfig = {
    weak: {
      label: dict.passwordTester.weak,
      color: 'text-[#EA580C]',
      barColor: 'bg-[#EA580C]',
      bg: 'bg-[#FFF7ED] border-[#EA580C]',
      bars: 1,
      Icon: ShieldAlert,
    },
    fair: {
      label: dict.passwordTester.fair,
      color: 'text-[#0A0A0A]',
      barColor: 'bg-[#EA580C]',
      bg: 'bg-[#FFF7ED]/70 border-[#EA580C]/50',
      bars: 2,
      Icon: AlertTriangle,
    },
    strong: {
      label: dict.passwordTester.strong,
      color: 'text-[#0B3B8C]',
      barColor: 'bg-[#1D4ED8]',
      bg: 'bg-[#EFF6FF] border-[#0B3B8C]/40',
      bars: 3,
      Icon: ShieldCheck,
    },
    very_strong: {
      label: dict.passwordTester.very_strong,
      color: 'text-[#0B3B8C]',
      barColor: 'bg-[#0B3B8C]',
      bg: 'bg-[#EFF6FF] border-[#0B3B8C]',
      bars: 4,
      Icon: ShieldCheck,
    },
  };

  const checklistRows = analysis
    ? [
        { ok: analysis.checks.minLength, label: dict.passwordTester.checkMinLength },
        { ok: analysis.checks.longPassphrase, label: dict.passwordTester.checkLongPassphrase },
        { ok: analysis.checks.hasUpper, label: dict.passwordTester.checkUpper },
        { ok: analysis.checks.hasLower, label: dict.passwordTester.checkLower },
        { ok: analysis.checks.hasNumber, label: dict.passwordTester.checkNumber },
        { ok: analysis.checks.hasSymbol, label: dict.passwordTester.checkSymbol },
        { ok: analysis.checks.noCommonPattern, label: dict.passwordTester.checkNoCommon },
        { ok: analysis.checks.noRepeatedChars, label: dict.passwordTester.checkNoRepeat },
      ]
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        type="button"
        onClick={() => onNavigate('check')}
        className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-white border border-slate-300 text-[#0A0A0A] font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        <span>{dict.scamChecker.title}</span>
      </button>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#0A0A0A]">
          {dict.passwordTester.title}
        </h1>
        <p className="text-lg text-slate-700">{dict.passwordTester.subtitle}</p>
      </div>

      {/* Strict Local Privacy Guarantee */}
      <div className="rounded-2xl bg-[#EFF6FF] border border-[#0B3B8C]/25 p-4 flex items-start gap-3">
        <Lock className="w-5 h-5 text-[#0B3B8C] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm font-medium text-[#0A0A0A] leading-relaxed">
          {dict.passwordTester.privacyBox}
        </p>
      </div>

      {/* Input Card */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5">
        <label
          htmlFor="password-test-input"
          className="block text-base font-bold text-[#0A0A0A]"
        >
          {dict.passwordTester.inputLabel}
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              id="password-test-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={dict.passwordTester.placeholder}
              autoComplete="off"
              spellCheck={false}
              className="w-full min-h-[52px] rounded-xl border border-slate-300 bg-slate-50 px-4 pr-24 text-base font-mono text-[#0A0A0A] placeholder:font-sans placeholder:text-slate-400 focus:bg-white focus:border-[#0B3B8C]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 min-h-[38px] px-3 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0B3B8C] hover:bg-blue-50 cursor-pointer"
            >
              {showPassword ? (
                <>
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                  <span>{dict.passwordTester.hide}</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  <span>{dict.passwordTester.show}</span>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setPassword('')}
            className="inline-flex items-center justify-center gap-2 min-h-[52px] px-5 rounded-xl border border-slate-300 bg-white text-[#0A0A0A] font-semibold text-base hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            <span>{dict.passwordTester.clear}</span>
          </button>
        </div>

        {/* Strength Meter */}
        {analysis && (
          <div
            className={`rounded-2xl border p-5 space-y-4 ${
              strengthConfig[analysis.level].bg
            }`}
            aria-live="polite"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                {React.createElement(strengthConfig[analysis.level].Icon, {
                  className: `w-6 h-6 ${strengthConfig[analysis.level].color}`,
                  'aria-hidden': 'true',
                })}
                <div>
                  <div className="text-xs font-semibold text-slate-600">
                    {dict.passwordTester.strengthLabel}
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      strengthConfig[analysis.level].color
                    }`}
                  >
                    {strengthConfig[analysis.level].label}
                  </div>
                </div>
              </div>
              <span className="text-sm font-mono font-semibold text-slate-700 tabular-nums">
                {password.length} chars
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2.5 rounded-full transition-colors ${
                    step <= strengthConfig[analysis.level].bars
                      ? strengthConfig[analysis.level].barColor
                      : 'bg-white/80 border border-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Breakdown & Improvement Suggestions */}
      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#0A0A0A]">
              {dict.passwordTester.checklistHeading}
            </h2>
            <ul className="space-y-2.5">
              {checklistRows.map((row, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-slate-800"
                >
                  {row.ok ? (
                    <CheckCircle2
                      className="w-5 h-5 text-[#0B3B8C] shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircle
                      className="w-5 h-5 text-[#EA580C] shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <span>{row.label}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#0A0A0A]">
              {dict.passwordTester.improveHeading}
            </h2>
            {analysis.suggestions.length > 0 ? (
              <ul className="space-y-2.5 list-disc pl-5 text-sm text-slate-800">
                {analysis.suggestions.map((sug, i) => (
                  <li key={i} className="leading-relaxed">
                    {pick(sug)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-base font-medium text-[#0B3B8C]">
                {dict.passwordTester.very_strong}
              </p>
            )}
          </section>
        </div>
      )}

      {/* Passphrase Guidance */}
      <section className="rounded-2xl bg-[#FFF7ED] border border-[#EA580C]/35 p-6 space-y-2">
        <h2 className="text-lg font-bold text-[#0A0A0A]">
          {dict.passwordTester.passphraseTipTitle}
        </h2>
        <p className="text-base text-slate-800 leading-relaxed">
          {dict.passwordTester.passphraseTipBody}
        </p>
      </section>
    </div>
  );
};
