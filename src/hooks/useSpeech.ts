import { useCallback, useEffect, useState } from 'react';
import type { Language } from '../types';

export function useSpeech(lang: Language) {
  const [isSupported] = useState(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupported) return;
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  useEffect(() => {
    setVoiceNotice(null);
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [lang, isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const hasLugandaVoice = voices.some((v) => {
    const code = v.lang.toLowerCase();
    return code === 'lg' || code.startsWith('lg-') || code.startsWith('lug');
  });

  const speak = useCallback(
    (
      text: string,
      messages: { unsupported: string; noLugandaVoice: string }
    ) => {
      if (!isSupported) {
        setVoiceNotice(messages.unsupported);
        return;
      }

      if (isSpeaking) {
        stop();
        return;
      }

      if (lang === 'lu') {
        const lugandaVoice = voices.find((v) => {
          const code = v.lang.toLowerCase();
          return code === 'lg' || code.startsWith('lg-') || code.startsWith('lug');
        });
        if (!lugandaVoice) {
          setVoiceNotice(messages.noLugandaVoice);
          return;
        }
        setVoiceNotice(null);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = lugandaVoice;
        utterance.lang = lugandaVoice.lang;
        utterance.rate = 0.94;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
        return;
      }

      // English speech synthesis
      setVoiceNotice(null);
      window.speechSynthesis.cancel();
      const englishVoice =
        voices.find((v) => v.lang.toLowerCase().startsWith('en-ug')) ||
        voices.find((v) => v.lang.toLowerCase().startsWith('en-gb')) ||
        voices.find((v) => v.lang.toLowerCase().startsWith('en'));

      const utterance = new SpeechSynthesisUtterance(text);
      if (englishVoice) {
        utterance.voice = englishVoice;
        utterance.lang = englishVoice.lang;
      } else {
        utterance.lang = 'en-US';
      }
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, isSpeaking, lang, stop, voices]
  );

  return {
    isSupported,
    isSpeaking,
    hasLugandaVoice,
    voiceNotice,
    speak,
    stop,
  };
}
