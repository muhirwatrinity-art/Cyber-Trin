import React, { useState } from 'react';
import {
  Check,
  Copy,
  RefreshCw,
  Share2,
  ShieldCheck,
} from 'lucide-react';
import { SAFETY_TIPS } from '../data/quizChallenges';
import { useLanguage } from '../context/LanguageContext';

export const TipsPage: React.FC = () => {
  const { dict, pick } = useLanguage();
  const [tipIndex, setTipIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const featured = SAFETY_TIPS[tipIndex];

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % SAFETY_TIPS.length);
  };

  const buildShareMessage = (title: string, body: string) =>
    `SafeClick UG (${dict.tagline} / ${dict.lugandaTagline})\n\n${title}\n${body}`;

  const handleShareWhatsApp = async (id: string, title: string, body: string) => {
    const text = buildShareMessage(title, body);
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `SafeClick UG — ${title}`,
          text,
        });
        return;
      } catch {
        // User cancelled or fallback to copy/wa link below
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Ignore clipboard failures
    }
  };

  const handleCopy = async (id: string, title: string, body: string) => {
    const text = buildShareMessage(title, body);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Ignore clipboard failures
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1.5">
        <div className="text-sm font-semibold text-[#0B3B8C]">
          {dict.tips.subtitle}
        </div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">{dict.tips.title}</h1>
        <p className="text-lg text-slate-700 max-w-3xl">{dict.tips.intro}</p>
      </div>

      {/* Rotating Featured Tip */}
      <section className="rounded-3xl bg-[#0B3B8C] text-white p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-bold text-[#FFF7ED]">
            {dict.tips.featuredLabel} · {tipIndex + 1}/{SAFETY_TIPS.length}
          </span>
          <button
            type="button"
            onClick={handleNextTip}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-white/15 text-white font-semibold text-sm hover:bg-white/25 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span>{dict.tips.nextTip}</span>
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {pick(featured.title)}
          </h2>
          <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
            {pick(featured.body)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() =>
              handleShareWhatsApp(
                featured.id,
                pick(featured.title),
                pick(featured.body)
              )
            }
            className="inline-flex items-center gap-2 min-h-[48px] px-5 py-2.5 rounded-xl bg-[#EA580C] text-white font-bold text-base hover:bg-[#C2410C] transition-colors cursor-pointer"
          >
            <Share2 className="w-5 h-5" aria-hidden="true" />
            <span>{dict.tips.shareWhatsApp}</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleCopy(featured.id, pick(featured.title), pick(featured.body))
            }
            className="inline-flex items-center gap-2 min-h-[48px] px-5 py-2.5 rounded-xl bg-[#0A0A0A] text-white font-semibold text-base hover:bg-slate-900 transition-colors cursor-pointer"
          >
            {copiedId === featured.id ? (
              <>
                <Check className="w-5 h-5 text-[#EA580C]" aria-hidden="true" />
                <span>{dict.tips.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" aria-hidden="true" />
                <span>{dict.tips.copyTip}</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* All Practical Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SAFETY_TIPS.map((tip) => (
          <article
            key={tip.id}
            className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#0B3B8C]">
                <ShieldCheck className="w-5 h-5 shrink-0" aria-hidden="true" />
                <h3 className="text-lg font-bold text-[#0A0A0A]">
                  {pick(tip.title)}
                </h3>
              </div>
              <p className="text-base text-slate-700 leading-relaxed">
                {pick(tip.body)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() =>
                  handleShareWhatsApp(tip.id, pick(tip.title), pick(tip.body))
                }
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-[#EFF6FF] text-[#0B3B8C] font-semibold text-sm hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" aria-hidden="true" />
                <span>{dict.tips.shareWhatsApp}</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleCopy(tip.id, pick(tip.title), pick(tip.body))
                }
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-white border border-slate-200 text-[#0A0A0A] font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {copiedId === tip.id ? (
                  <>
                    <Check className="w-4 h-4 text-[#0B3B8C]" aria-hidden="true" />
                    <span>{dict.tips.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>{dict.tips.copyTip}</span>
                  </>
                )}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
