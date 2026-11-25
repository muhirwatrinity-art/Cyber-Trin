import React from 'react';
import { BookOpen, Bot, Briefcase, Home, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { PageId } from '../../types';

interface BottomNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  onNavigate,
}) => {
  const { dict } = useLanguage();

  const items: {
    id: PageId;
    label: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: 'home', label: dict.nav.home, icon: Home },
    { id: 'learn', label: dict.nav.learn, icon: BookOpen },
    { id: 'check', label: dict.nav.check, icon: ShieldCheck },
    { id: 'assistant', label: dict.nav.assistant, icon: Bot },
    { id: 'workspace', label: dict.nav.workspace, icon: Briefcase },
  ];

  const isActive = (id: PageId) => {
    if (id === 'check' && currentPage === 'passwords') return true;
    if (id === 'learn' && currentPage === 'quiz') return true;
    if (id === 'home' && currentPage === 'tips') return true;
    return currentPage === id;
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe no-print"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="grid grid-cols-5 h-16 items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={active ? 'page' : undefined}
              className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 px-1 transition-colors cursor-pointer ${
                active
                  ? 'text-[#0B3B8C] font-bold'
                  : 'text-slate-600 hover:text-[#0B3B8C] font-medium'
              }`}
            >
              <div
                className={`px-3 py-1 rounded-full transition-colors ${
                  active ? 'bg-[#FFF7ED] text-[#EA580C]' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] leading-tight truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
