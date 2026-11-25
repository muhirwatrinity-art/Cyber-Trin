import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { dict } = useLanguage();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#0B3B8C] text-white text-sm font-semibold hover:bg-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
      >
        <Download className="w-4 h-4 shrink-0 text-[#EA580C]" aria-hidden="true" />
        <span>{dict.status.installApp}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-[#0A0A0A] text-sm font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Smartphone className="w-4 h-4 shrink-0 text-[#0B3B8C]" aria-hidden="true" />
          <span>{dict.status.iosInstall}</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
          >
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
              <div className="flex items-start justify-between gap-4">
                <h3
                  id="ios-install-title"
                  className="text-xl font-bold text-[#0A0A0A]"
                >
                  {dict.status.iosGuideTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100"
                  aria-label={dict.status.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 space-y-3 text-base text-slate-700">
                <p>{dict.status.iosGuideStep1}</p>
                <p>{dict.status.iosGuideStep2}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full min-h-[48px] rounded-xl bg-[#0B3B8C] text-white font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer"
              >
                {dict.status.close}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
