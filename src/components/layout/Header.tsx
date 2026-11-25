import React from 'react';
import { LifeBuoy, User, Wifi, WifiOff } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import type { PageId } from '../../types';
import { PWAInstallButton } from '../shared/PWAInstallButton';
import { SafeClickLogo } from '../shared/SafeClickLogo';
import { UgandaFlag } from '../shared/UgandaFlag';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
}) => {
  const { lang, setLanguage, dict } = useLanguage();
  const isOnline = useOnlineStatus();

  const desktopLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: dict.nav.home },
    { id: 'learn', label: dict.nav.learn },
    { id: 'check', label: dict.nav.check },
    { id: 'assistant', label: dict.nav.assistant },
    { id: 'workspace', label: dict.nav.workspace },
    { id: 'help', label: dict.nav.help },
  ];

  const isNavActive = (id: PageId) => {
    if (id === 'check' && currentPage === 'passwords') return true;
    if (id === 'learn' && currentPage === 'quiz') return true;
    if (id === 'home' && currentPage === 'tips') return true;
    return currentPage === id;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between gap-3 md:gap-6">
        {/* Zone 1: Brand + Official Uganda Flag */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 min-h-[44px] cursor-pointer text-left"
            aria-label={dict.appName}
          >
            <SafeClickLogo />
          </button>
          <UgandaFlag className="w-8 h-[21px] sm:w-9 sm:h-6" />
        </div>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-4 lg:gap-6 overflow-x-auto"
          aria-label="Primary Navigation"
        >
          {desktopLinks.map((item) => {
            const active = isNavActive(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`min-h-[44px] px-1 text-sm lg:text-base font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                  active
                    ? 'text-[#0B3B8C] border-[#EA580C]'
                    : 'text-slate-700 border-transparent hover:text-[#0B3B8C] hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Status, Language Switcher, Install, Help (mobile) & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Online / Offline Status with icon + text */}
          <div
            className={`hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap shrink-0 ${
              isOnline ? 'text-[#0B3B8C]' : 'text-[#EA580C]'
            }`}
            role="status"
            aria-live="polite"
          >
            {isOnline ? (
              <Wifi className="w-4 h-4 shrink-0" aria-hidden="true" />
            ) : (
              <WifiOff className="w-4 h-4 shrink-0" aria-hidden="true" />
            )}
            <span>{isOnline ? dict.status.online : dict.status.offline}</span>
          </div>

          {/* Language Toggle EN / LU */}
          <div
            className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 shrink-0"
            role="group"
            aria-label="Language Switcher"
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-pressed={lang === 'en'}
              className={`min-h-[36px] min-w-[38px] px-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                lang === 'en'
                  ? 'bg-[#0B3B8C] text-white shadow-2xs'
                  : 'text-[#0A0A0A] hover:text-[#0B3B8C]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('lu')}
              aria-pressed={lang === 'lu'}
              className={`min-h-[36px] min-w-[38px] px-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                lang === 'lu'
                  ? 'bg-[#0B3B8C] text-white shadow-2xs'
                  : 'text-[#0A0A0A] hover:text-[#0B3B8C]'
              }`}
            >
              LU
            </button>
          </div>

          <div className="hidden lg:block">
            <PWAInstallButton />
          </div>

          <button
            type="button"
            onClick={() => onNavigate('help')}
            className={`md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
              currentPage === 'help'
                ? 'bg-[#FFF7ED] text-[#EA580C]'
                : 'text-[#0A0A0A] hover:bg-slate-100'
            }`}
            aria-label={dict.nav.help}
          >
            <LifeBuoy className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
              currentPage === 'profile'
                ? 'bg-[#0B3B8C] text-white'
                : 'text-[#0A0A0A] hover:bg-slate-100 border border-transparent md:border-slate-200'
            }`}
            aria-label={dict.nav.profile}
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
