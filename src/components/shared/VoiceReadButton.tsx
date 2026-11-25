import React from 'react';
import { Volume2, Square, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useSpeech } from '../../hooks/useSpeech';

interface VoiceReadButtonProps {
  textToRead: string;
}

export const VoiceReadButton: React.FC<VoiceReadButtonProps> = ({
  textToRead,
}) => {
  const { lang, dict } = useLanguage();
  const { isSpeaking, voiceNotice, speak, stop } = useSpeech(lang);

  const handleClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(textToRead, {
        unsupported: dict.voice.unsupportedBrowser,
        noLugandaVoice: dict.voice.noLugandaVoice,
      });
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-2.5 min-h-[44px] px-4 py-2 rounded-xl font-semibold text-sm border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
          isSpeaking
            ? 'bg-[#EA580C] text-white border-[#EA580C] hover:bg-[#C2410C]'
            : 'bg-white text-[#0B3B8C] border-slate-300 hover:bg-blue-50'
        }`}
      >
        {isSpeaking ? (
          <>
            <Square className="w-4 h-4 fill-current shrink-0" aria-hidden="true" />
            <span>{dict.voice.stopReading}</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{dict.voice.readAloud}</span>
          </>
        )}
      </button>

      {voiceNotice && (
        <div
          className="flex items-start gap-2.5 rounded-xl bg-[#FFF7ED] border border-[#EA580C]/40 p-3 text-sm text-[#0A0A0A]"
          role="status"
        >
          <Info className="w-5 h-5 shrink-0 text-[#EA580C] mt-0.5" aria-hidden="true" />
          <p>{voiceNotice}</p>
        </div>
      )}
    </div>
  );
};
