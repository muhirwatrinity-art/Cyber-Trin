import React, { useEffect, useState } from 'react';
import { RefreshCw, WifiOff } from 'lucide-react';
import { registerSW } from 'virtual:pwa-register';
import { BottomNav } from './components/layout/BottomNav';
import { Header } from './components/layout/Header';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ProgressProvider } from './context/ProgressContext';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { AcademyPage } from './pages/AcademyPage';
import { AssistantPage } from './pages/AssistantPage';
import { EmergencyHelpPage } from './pages/EmergencyHelpPage';
import { HomePage } from './pages/HomePage';
import { PasswordTesterPage } from './pages/PasswordTesterPage';
import { ProfilePage } from './pages/ProfilePage';
import { QuizPage } from './pages/QuizPage';
import { ScamCheckerPage } from './pages/ScamCheckerPage';
import { TipsPage } from './pages/TipsPage';
import { WorkspaceHubPage } from './pages/WorkspaceHubPage';
import type { PageId } from './types';

const VALID_PAGES: PageId[] = [
  'home',
  'learn',
  'check',
  'passwords',
  'help',
  'quiz',
  'tips',
  'profile',
  'assistant',
  'workspace',
];

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '') as PageId;
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

const AppShell: React.FC = () => {
  const { dict } = useLanguage();
  const isOnline = useOnlineStatus();
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [assistantPrompt, setAssistantPrompt] = useState<string | null>(null);
  const [assistantSeedKey, setAssistantSeedKey] = useState(0);
  const [updateReady, setUpdateReady] = useState(false);
  const [swUpdater, setSwUpdater] = useState<((reloadPage?: boolean) => Promise<void>) | null>(
    null
  );

  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        setUpdateReady(true);
      },
      onOfflineReady() {
        // App shell precached for offline access
      },
    });
    setSwUpdater(() => updateSW);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (page: PageId, lessonId?: string) => {
    setSelectedLessonId(lessonId || null);
    if (page !== 'assistant') {
      setAssistantPrompt(null);
    }
    setCurrentPage(page);
    if (window.location.hash !== `#${page}`) {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAssistantFromWorkspace = (prompt: string) => {
    setAssistantPrompt(prompt);
    setAssistantSeedKey((prev) => prev + 1);
    setCurrentPage('assistant');
    if (window.location.hash !== '#assistant') {
      window.location.hash = 'assistant';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0A0A0A]">
      <Header currentPage={currentPage} onNavigate={(p) => navigate(p)} />

      {/* Offline Status Banner */}
      {!isOnline && (
        <div
          className="bg-[#FFF7ED] border-b border-[#EA580C]/40 px-4 py-2.5 text-sm font-semibold text-[#0A0A0A] no-print"
          role="status"
          aria-live="polite"
        >
          <div className="max-w-7xl mx-auto flex items-center gap-2.5">
            <WifiOff className="w-4 h-4 text-[#EA580C] shrink-0" aria-hidden="true" />
            <span>{dict.status.offlineBanner}</span>
          </div>
        </div>
      )}

      {/* Safe Service Worker Update Banner */}
      {updateReady && swUpdater && (
        <div
          className="bg-[#0B3B8C] text-white px-4 py-2.5 text-sm border-b border-[#EA580C]/40 no-print"
          role="status"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <span>{dict.status.updateAvailable}</span>
            <button
              type="button"
              onClick={() => swUpdater(true)}
              className="inline-flex items-center gap-1.5 min-h-[36px] px-3.5 rounded-lg bg-[#EA580C] text-white font-bold text-xs hover:bg-[#C2410C] cursor-pointer whitespace-nowrap"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{dict.status.updateNow}</span>
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 md:pb-12">
        {currentPage === 'home' && <HomePage onNavigate={navigate} />}
        {currentPage === 'learn' && (
          <AcademyPage
            initialLessonId={selectedLessonId}
            onNavigate={(p) => navigate(p)}
          />
        )}
        {currentPage === 'check' && (
          <ScamCheckerPage onNavigate={(p) => navigate(p)} />
        )}
        {currentPage === 'passwords' && (
          <PasswordTesterPage onNavigate={(p) => navigate(p)} />
        )}
        {currentPage === 'assistant' && (
          <AssistantPage
            key={assistantSeedKey}
            initialPrompt={assistantPrompt}
          />
        )}
        {currentPage === 'workspace' && (
          <WorkspaceHubPage
            onAskAssistant={handleAskAssistantFromWorkspace}
            onNavigate={(p) => navigate(p)}
          />
        )}
        {currentPage === 'help' && <EmergencyHelpPage />}
        {currentPage === 'quiz' && <QuizPage onNavigate={(p) => navigate(p)} />}
        {currentPage === 'tips' && <TipsPage />}
        {currentPage === 'profile' && <ProfilePage />}
      </main>

      {/* Subtle Desktop & Print-Excluded Footer */}
      <footer className="hidden md:block border-t border-slate-200 bg-white no-print">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-600">
          <div>
            <span className="font-bold text-[#0B3B8C]">{dict.appName}</span>{' '}
            <span aria-hidden="true">·</span> {dict.tagline}{' '}
            <span aria-hidden="true">·</span> {dict.lugandaTagline}
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => navigate('assistant')}
              className="hover:text-[#0B3B8C] hover:underline cursor-pointer"
            >
              {dict.nav.assistant}
            </button>
            <button
              type="button"
              onClick={() => navigate('workspace')}
              className="hover:text-[#0B3B8C] hover:underline cursor-pointer"
            >
              {dict.nav.workspace}
            </button>
            <button
              type="button"
              onClick={() => navigate('passwords')}
              className="hover:text-[#0B3B8C] hover:underline cursor-pointer"
            >
              {dict.nav.passwords}
            </button>
            <button
              type="button"
              onClick={() => navigate('quiz')}
              className="hover:text-[#0B3B8C] hover:underline cursor-pointer"
            >
              {dict.nav.quiz}
            </button>
            <button
              type="button"
              onClick={() => navigate('tips')}
              className="hover:text-[#0B3B8C] hover:underline cursor-pointer"
            >
              {dict.nav.tips}
            </button>
            <button
              type="button"
              onClick={() => navigate('profile')}
              className="hover:text-[#0B3B8C] hover:underline cursor-pointer"
            >
              {dict.profile.privacyHeading}
            </button>
          </div>
        </div>
      </footer>

      <BottomNav currentPage={currentPage} onNavigate={(p) => navigate(p)} />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ProgressProvider>
          <AppShell />
        </ProgressProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
