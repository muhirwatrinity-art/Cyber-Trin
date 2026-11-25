import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Info,
  KeyRound,
  Lock,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import type { PageId, ScamAnalysisResult } from '../types';
import {
  analyzeMessageLocally,
  SAMPLE_SCAM_MESSAGES,
} from '../utils/scamAnalysis';

interface ScamCheckerPageProps {
  onNavigate: (page: PageId) => void;
}

export const ScamCheckerPage: React.FC<ScamCheckerPageProps> = ({
  onNavigate,
}) => {
  const { dict, pick } = useLanguage();
  const { recordScamCheck } = useProgress();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ScamAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      setError(dict.scamChecker.emptyError);
      setResult(null);
      return;
    }
    setError(null);
    const analysis = analyzeMessageLocally(input);
    setResult(analysis);
    recordScamCheck();
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
    setError(null);
  };

  const handleUseSample = (text: string) => {
    setInput(text);
    setError(null);
    const analysis = analyzeMessageLocally(text);
    setResult(analysis);
    recordScamCheck();
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#0A0A0A]">
          {dict.scamChecker.title}
        </h1>
        <p className="text-lg text-slate-700 max-w-3xl">
          {dict.scamChecker.subtitle}
        </p>
      </div>

      {/* Privacy & Educational Notice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#EFF6FF] border border-[#0B3B8C]/25 p-4 flex items-start gap-3">
          <Lock className="w-5 h-5 text-[#0B3B8C] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm font-medium text-[#0A0A0A] leading-relaxed">
            {dict.scamChecker.privacyPromise}
          </p>
        </div>
        <div className="rounded-2xl bg-[#FFF7ED] border border-[#EA580C]/35 p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm text-[#0A0A0A] leading-relaxed">
            <span className="font-bold">{dict.scamChecker.disclaimerTitle}: </span>
            <span>{dict.scamChecker.disclaimerBody}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Form */}
        <div className="lg:col-span-7 space-y-5">
          <form
            onSubmit={handleAnalyze}
            className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4"
          >
            <label
              htmlFor="scam-message-input"
              className="block text-base font-bold text-[#0A0A0A]"
            >
              {dict.scamChecker.inputLabel}
            </label>
            <textarea
              id="scam-message-input"
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={dict.scamChecker.placeholder}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-base text-[#0A0A0A] placeholder:text-slate-400 focus:bg-white focus:border-[#0B3B8C]"
            />

            {error && (
              <p className="text-sm font-semibold text-[#EA580C]" role="alert">
                {error}
              </p>
            )}

            <p className="text-sm text-slate-600">
              {dict.scamChecker.neverShareReminder}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-[#0B3B8C] text-white font-bold text-base hover:bg-[#1D4ED8] transition-colors cursor-pointer"
              >
                <SearchCheck className="w-5 h-5" aria-hidden="true" />
                <span>{dict.scamChecker.checkButton}</span>
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-xl bg-white border border-slate-300 text-[#0A0A0A] font-semibold text-base hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                <span>{dict.scamChecker.clearButton}</span>
              </button>
            </div>
          </form>

          {/* Sample Messages */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
            <h2 className="text-base font-bold text-[#0A0A0A]">
              {dict.scamChecker.samplesHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SAMPLE_SCAM_MESSAGES.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleUseSample(sample.text)}
                  className="text-left min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-[#0A0A0A] hover:bg-[#EFF6FF] hover:border-[#0B3B8C]/40 transition-colors cursor-pointer"
                >
                  {pick(sample.title)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Result Panel */}
        <div className="lg:col-span-5 space-y-5">
          {result ? (
            <section
              className={`rounded-2xl border p-6 space-y-5 ${
                result.riskLevel === 'high'
                  ? 'bg-[#FFF7ED] border-[#EA580C]'
                  : result.riskLevel === 'medium'
                  ? 'bg-[#FFF7ED]/70 border-[#EA580C]/50'
                  : 'bg-[#EFF6FF] border-[#0B3B8C]/40'
              }`}
              aria-live="polite"
            >
              {/* Dual-coded risk badge: Icon + Bold Label + Color */}
              <div className="flex items-start gap-3.5">
                {result.riskLevel === 'high' && (
                  <ShieldAlert
                    className="w-8 h-8 text-[#EA580C] shrink-0"
                    aria-hidden="true"
                  />
                )}
                {result.riskLevel === 'medium' && (
                  <AlertTriangle
                    className="w-8 h-8 text-[#EA580C] shrink-0"
                    aria-hidden="true"
                  />
                )}
                {result.riskLevel === 'low' && (
                  <ShieldCheck
                    className="w-8 h-8 text-[#0B3B8C] shrink-0"
                    aria-hidden="true"
                  />
                )}

                <div className="space-y-1">
                  <h2
                    className={`text-xl font-bold ${
                      result.riskLevel === 'low'
                        ? 'text-[#0B3B8C]'
                        : 'text-[#EA580C]'
                    }`}
                  >
                    {result.riskLevel === 'high'
                      ? dict.scamChecker.resultHighTitle
                      : result.riskLevel === 'medium'
                      ? dict.scamChecker.resultMediumTitle
                      : dict.scamChecker.resultLowTitle}
                  </h2>
                  <p className="text-base text-[#0A0A0A] leading-relaxed">
                    {result.riskLevel === 'high'
                      ? dict.scamChecker.resultHighDesc
                      : result.riskLevel === 'medium'
                      ? dict.scamChecker.resultMediumDesc
                      : dict.scamChecker.resultLowDesc}
                  </p>
                </div>
              </div>

              {/* Exact Warning Signs Identified */}
              <div className="space-y-2.5 pt-2 border-t border-black/10">
                <h3 className="text-base font-bold text-[#0A0A0A]">
                  {dict.scamChecker.signsFoundHeading}
                </h3>
                {result.indicators.length > 0 ? (
                  <ul className="space-y-2.5">
                    {result.indicators.map((ind) => (
                      <li
                        key={ind.id}
                        className="rounded-xl bg-white border border-black/10 p-3.5 text-sm"
                      >
                        <div className="font-bold text-[#0A0A0A]">
                          {pick(ind.label)}
                        </div>
                        <p className="text-slate-700 mt-1">
                          {pick(ind.explanation)}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {dict.scamChecker.noSignsNote}
                  </p>
                )}
              </div>

              {/* Practical Next Steps */}
              <div className="space-y-2 pt-2 border-t border-black/10">
                <h3 className="text-base font-bold text-[#0A0A0A]">
                  {dict.scamChecker.nextStepsHeading}
                </h3>
                <ul className="space-y-2 list-disc pl-5 text-sm text-[#0A0A0A]">
                  {result.nextSteps.map((step, i) => (
                    <li key={i}>{pick(step)}</li>
                  ))}
                </ul>
              </div>
            </section>
          ) : (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3 text-slate-700">
              <h2 className="text-lg font-bold text-[#0A0A0A]">
                {dict.scamChecker.disclaimerTitle}
              </h2>
              <p className="text-base leading-relaxed">
                {dict.scamChecker.disclaimerBody}
              </p>
            </div>
          )}

          {/* Cross-link to Password Strength Tester */}
          <button
            type="button"
            onClick={() => onNavigate('passwords')}
            className="w-full text-left rounded-2xl bg-white border border-slate-200 p-5 hover:border-[#0B3B8C] transition-colors flex items-center justify-between gap-4 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#0B3B8C] text-white flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-base font-bold text-[#0A0A0A]">
                  {dict.home.toolPasswordTitle}
                </div>
                <div className="text-sm text-slate-600">
                  {dict.home.toolPasswordDesc}
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#0B3B8C] shrink-0" aria-hidden="true" />
          </button>

          {/* Cross-link to AI Safety Assistant */}
          <button
            type="button"
            onClick={() => onNavigate('assistant')}
            className="w-full text-left rounded-2xl bg-white border border-slate-200 p-5 hover:border-[#EA580C] transition-colors flex items-center justify-between gap-4 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#EA580C] text-white flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-base font-bold text-[#0A0A0A]">
                  {dict.assistant.title}
                </div>
                <div className="text-sm text-slate-600">
                  {dict.assistant.subtitle}
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#EA580C] shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
