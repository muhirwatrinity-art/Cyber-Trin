import React, { useState } from 'react';
import {
  AlertOctagon,
  ArrowLeft,
  ArrowRight,
  Camera,
  Info,
  KeyRound,
  Link2Off,
  MessageSquareWarning,
  ShieldAlert,
  Smartphone,
  UserCheck,
  UserX,
  Wallet,
} from 'lucide-react';
import { EMERGENCY_GUIDES } from '../data/emergencyGuides';
import { useLanguage } from '../context/LanguageContext';
import { VoiceReadButton } from '../components/shared/VoiceReadButton';
import type { EmergencyGuide } from '../types';

const ICON_MAP: Record<
  EmergencyGuide['iconName'],
  React.FC<{ className?: string }>
> = {
  wallet: Wallet,
  message: MessageSquareWarning,
  user_x: UserX,
  link: Link2Off,
  alert: AlertOctagon,
  users: UserCheck,
  key: KeyRound,
  smartphone: Smartphone,
};

export const EmergencyHelpPage: React.FC = () => {
  const { dict, pick } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeGuide =
    EMERGENCY_GUIDES.find((g) => g.id === selectedId) || null;

  if (!activeGuide) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#0A0A0A]">
            {dict.emergency.title}
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl">
            {dict.emergency.subtitle}
          </p>
        </div>

        {/* Evidence Reminder */}
        <div className="rounded-2xl bg-[#FFF7ED] border border-[#EA580C]/40 p-4 flex items-start gap-3">
          <Camera className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-base font-medium text-[#0A0A0A]">
            {dict.emergency.evidenceTip}
          </p>
        </div>

        {/* 8 Large Touch-Friendly Emergency Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EMERGENCY_GUIDES.map((guide) => {
            const Icon = ICON_MAP[guide.iconName];
            return (
              <button
                key={guide.id}
                type="button"
                onClick={() => {
                  setSelectedId(guide.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left rounded-2xl bg-white border border-slate-200 p-6 hover:border-[#EA580C] hover:shadow-md transition-all flex items-start gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#EA580C] border border-[#EA580C]/35 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <h2 className="text-lg font-bold text-[#0A0A0A]">
                    {pick(guide.title)}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pick(guide.summary)}
                  </p>
                </div>
                <ArrowRight
                  className="w-5 h-5 text-[#0B3B8C] shrink-0 mt-1"
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>

        {/* Verified Contact Disclaimer */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#0B3B8C] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-slate-700 leading-relaxed">
            {dict.emergency.officialDisclaimer}
          </p>
        </div>
      </div>
    );
  }

  const speechText = [
    pick(activeGuide.title),
    pick(activeGuide.summary),
    `${dict.emergency.stepsHeading}. ${activeGuide.steps
      .map((s, idx) => `${idx + 1}. ${pick(s)}`)
      .join(' ')}`,
    `${dict.emergency.doNotHeading}. ${pick(activeGuide.doNot)}`,
  ].join(' ');

  return (
    <article className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-white border border-slate-300 text-[#0A0A0A] font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{dict.emergency.backToList}</span>
        </button>

        <VoiceReadButton textToRead={speechText} />
      </div>

      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-[#0A0A0A]">
          {pick(activeGuide.title)}
        </h1>
        <p className="text-lg text-slate-700">{pick(activeGuide.summary)}</p>
      </header>

      {/* Step-by-Step Guide */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
        <h2 className="text-xl font-bold text-[#0B3B8C]">
          {dict.emergency.stepsHeading}
        </h2>
        <ol className="space-y-4">
          {activeGuide.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3.5">
              <span className="w-8 h-8 rounded-full bg-[#0B3B8C] text-white font-bold text-sm flex items-center justify-center shrink-0 tabular-nums mt-0.5">
                {i + 1}
              </span>
              <span className="text-base text-slate-800 leading-relaxed">
                {pick(step)}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* What NOT to do */}
      <section className="rounded-2xl bg-[#FFF7ED] border border-[#EA580C] p-6 space-y-2">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-6 h-6 text-[#EA580C] shrink-0" aria-hidden="true" />
          <h2 className="text-lg font-bold text-[#EA580C]">
            {dict.emergency.doNotHeading}
          </h2>
        </div>
        <p className="text-base font-medium text-[#0A0A0A] leading-relaxed">
          {pick(activeGuide.doNot)}
        </p>
      </section>

      {/* Official Verification Note */}
      <section className="rounded-2xl bg-[#EFF6FF] border border-[#0B3B8C]/25 p-5 space-y-1.5">
        <h2 className="text-base font-bold text-[#0B3B8C]">
          {dict.emergency.officialHeading}
        </h2>
        <p className="text-sm text-[#0A0A0A] leading-relaxed">
          {pick(activeGuide.officialNote)}
        </p>
        <p className="text-sm text-slate-700 leading-relaxed pt-1">
          {dict.emergency.officialDisclaimer}
        </p>
      </section>
    </article>
  );
};
