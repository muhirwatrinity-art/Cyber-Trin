import React, { useState } from 'react';
import {
  Bot,
  Lock,
  RotateCcw,
  Send,
  Sparkles,
  User,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

interface AssistantPageProps {
  initialPrompt?: string | null;
}

export const AssistantPage: React.FC<AssistantPageProps> = ({
  initialPrompt,
}) => {
  const { lang, dict } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'model',
      text: dict.assistant.welcomeMessage,
    },
  ]);
  const [input, setInput] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          lang,
          history: messages
            .filter((m) => m.id !== 'welcome' && !m.isError)
            .map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || dict.assistant.errorFallback);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          role: 'model',
          text: data.reply,
        },
      ]);
    } catch (err: unknown) {
      const errMsg =
        err instanceof Error ? err.message : dict.assistant.errorFallback;
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model',
          text: errMsg,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: dict.assistant.welcomeMessage,
      },
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold text-[#0A0A0A]">
            {dict.assistant.title}
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl">
            {dict.assistant.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-white border border-slate-300 text-[#0A0A0A] font-semibold text-sm hover:bg-slate-50 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>{dict.assistant.clearChat}</span>
        </button>
      </div>

      {/* Strict Privacy Reminder */}
      <div className="rounded-2xl bg-[#FFF7ED] border border-[#EA580C]/40 p-4 flex items-start gap-3">
        <Lock className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm font-semibold text-[#0A0A0A]">
          {dict.assistant.privacyNote}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Quick Prompt Starters */}
        <aside className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
          <div className="flex items-center gap-2 text-base font-bold text-[#0B3B8C]">
            <Sparkles className="w-5 h-5 text-[#EA580C]" aria-hidden="true" />
            <h2>{dict.assistant.promptsHeading}</h2>
          </div>
          <div className="space-y-2.5">
            {dict.assistant.samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isLoading}
                onClick={() => void sendMessage(prompt)}
                className="w-full text-left min-h-[44px] p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-[#0A0A0A] hover:border-[#0B3B8C] hover:bg-blue-50/50 transition-colors cursor-pointer disabled:opacity-60"
              >
                {prompt}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Thread & Input */}
        <section className="lg:col-span-8 rounded-2xl bg-white border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-5 sm:p-6 space-y-4 max-h-[520px] overflow-y-auto bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  msg.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.role === 'user'
                      ? 'bg-[#EA580C] text-white'
                      : 'bg-[#0B3B8C] text-white'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Bot className="w-5 h-5" aria-hidden="true" />
                  )}
                </div>

                <div
                  className={`rounded-2xl px-4 py-3 text-base leading-relaxed max-w-[85%] whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-[#0A0A0A] text-white'
                      : msg.isError
                      ? 'bg-orange-50 border border-[#EA580C] text-[#0A0A0A]'
                      : 'bg-white border border-slate-200 text-[#0A0A0A]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3" role="status">
                <div className="w-9 h-9 rounded-xl bg-[#0B3B8C] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-white border border-slate-200 text-sm font-semibold text-slate-600">
                  {dict.assistant.sending}
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={dict.assistant.placeholder}
              aria-label={dict.assistant.placeholder}
              className="flex-1 min-h-[48px] rounded-xl border border-slate-300 bg-slate-50 px-4 text-base text-[#0A0A0A] focus:bg-white focus:border-[#0B3B8C]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl bg-[#0B3B8C] text-white font-bold text-base hover:bg-[#1D4ED8] disabled:opacity-50 transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>{dict.assistant.send}</span>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};
