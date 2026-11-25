import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { LESSON_MODULES } from '../data/lessons';
import type { UserProgress } from '../types';
import {
  DEFAULT_PROGRESS,
  generateCertificateId,
  loadProgress,
  resetStoredProgress,
  saveProgress,
} from '../utils/storage';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';

interface ProgressContextValue {
  progress: UserProgress;
  setDisplayName: (name: string) => void;
  dismissWelcome: () => void;
  completeLesson: (lessonId: string, quizScorePercent?: number) => void;
  recordScamCheck: () => void;
  recordPasswordCheck: () => void;
  recordChallengeResult: (correctCount: number, totalQuestions: number) => void;
  resetAllProgress: () => void;
  isCertificateUnlocked: boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function evaluateBadgesAndCertificate(current: UserProgress): UserProgress {
  const badges = new Set(current.earnedBadges);
  const completed = new Set(current.completedLessons);

  if (current.scamChecksCompleted >= 1) {
    badges.add('scam_spotter');
  }
  if (completed.has('mobile-money')) {
    badges.add('mobile_money_guardian');
  }
  if (completed.has('phishing-links')) {
    badges.add('link_detective');
  }
  if (
    completed.has('passwords-accounts') &&
    current.passwordChecksCompleted >= 1
  ) {
    badges.add('password_protector');
  }
  if (completed.has('social-media') && completed.has('online-shopping')) {
    badges.add('social_media_defender');
  }

  const allLessonsDone = LESSON_MODULES.every((m) => completed.has(m.id));
  const quizPercent =
    current.challengeTotalQuestions > 0
      ? Math.round(
          (current.challengeHighScore / current.challengeTotalQuestions) * 100
        )
      : 0;
  const passedAssessment = quizPercent >= 70;

  let certificateId = current.certificateId;
  let certificateIssuedDate = current.certificateIssuedDate;

  if (allLessonsDone && passedAssessment) {
    badges.add('digital_safety_champion');
    if (!certificateId) {
      certificateId = generateCertificateId();
      certificateIssuedDate = new Date().toLocaleDateString('en-UG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  }

  return {
    ...current,
    earnedBadges: Array.from(badges),
    certificateId,
    certificateIssuedDate,
  };
}

function mergeProgress(local: UserProgress, remote: Partial<UserProgress>): UserProgress {
  const completedSet = new Set([
    ...local.completedLessons,
    ...(Array.isArray(remote.completedLessons) ? remote.completedLessons : []),
  ]);
  const mergedQuizScores = {
    ...(remote.lessonQuizScores || {}),
    ...local.lessonQuizScores,
  };
  const badgeSet = new Set([
    ...local.earnedBadges,
    ...(Array.isArray(remote.earnedBadges) ? remote.earnedBadges : []),
  ]);

  return evaluateBadgesAndCertificate({
    displayName: local.displayName || remote.displayName || '',
    completedLessons: Array.from(completedSet),
    lessonQuizScores: mergedQuizScores,
    challengeHighScore: Math.max(
      local.challengeHighScore,
      remote.challengeHighScore || 0
    ),
    challengeTotalQuestions: Math.max(
      local.challengeTotalQuestions,
      remote.challengeTotalQuestions || 0
    ),
    scamChecksCompleted: Math.max(
      local.scamChecksCompleted,
      remote.scamChecksCompleted || 0
    ),
    passwordChecksCompleted: Math.max(
      local.passwordChecksCompleted,
      remote.passwordChecksCompleted || 0
    ),
    points: Math.max(local.points, remote.points || 0),
    earnedBadges: Array.from(badgeSet),
    certificateId: local.certificateId || remote.certificateId || null,
    certificateIssuedDate:
      local.certificateIssuedDate || remote.certificateIssuedDate || null,
    welcomed: local.welcomed,
  });
}

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, getIdToken } = useAuth();
  const { lang } = useLanguage();
  const [progress, setProgress] = useState<UserProgress>(() =>
    evaluateBadgesAndCertificate(loadProgress())
  );
  const syncedUidRef = useRef<string | null>(null);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Sync with backend when user signs in
  useEffect(() => {
    if (!user) {
      syncedUidRef.current = null;
      return;
    }
    if (syncedUidRef.current === user.uid) return;
    syncedUidRef.current = user.uid;

    let cancelled = false;
    (async () => {
      try {
        const idToken = await getIdToken();
        if (!idToken || cancelled) return;
        const res = await fetch('/api/progress', {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (data.progress && !cancelled) {
          setProgress((prev) =>
            mergeProgress(prev, {
              ...data.progress,
              displayName: data.user?.displayName || prev.displayName,
            })
          );
        }
      } catch {
        // Offline-first: keep local progress silently if offline
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, getIdToken]);

  const syncToServer = async (next: UserProgress) => {
    if (!user) return;
    try {
      const idToken = await getIdToken();
      if (!idToken) return;
      await fetch('/api/progress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          ...next,
          preferredLang: lang,
        }),
      });
    } catch {
      // Offline fallback preserved
    }
  };

  const updateAndSync = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      void syncToServer(next);
      return next;
    });
  };

  const setDisplayName = (name: string) => {
    updateAndSync((prev) => ({
      ...prev,
      displayName: name.slice(0, 60),
    }));
  };

  const dismissWelcome = () => {
    setProgress((prev) => ({ ...prev, welcomed: true }));
  };

  const completeLesson = (lessonId: string, quizScorePercent?: number) => {
    updateAndSync((prev) => {
      const alreadyDone = prev.completedLessons.includes(lessonId);
      const completedLessons = alreadyDone
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId];
      const nextQuizScores = { ...prev.lessonQuizScores };
      if (typeof quizScorePercent === 'number') {
        nextQuizScores[lessonId] = Math.max(
          nextQuizScores[lessonId] || 0,
          quizScorePercent
        );
      }
      const addedPoints = alreadyDone ? 0 : 50;
      return evaluateBadgesAndCertificate({
        ...prev,
        completedLessons,
        lessonQuizScores: nextQuizScores,
        points: prev.points + addedPoints,
      });
    });
  };

  const recordScamCheck = () => {
    updateAndSync((prev) => {
      const firstTime = prev.scamChecksCompleted === 0;
      return evaluateBadgesAndCertificate({
        ...prev,
        scamChecksCompleted: prev.scamChecksCompleted + 1,
        points: prev.points + (firstTime ? 25 : 5),
      });
    });
  };

  const recordPasswordCheck = () => {
    updateAndSync((prev) => {
      const firstTime = prev.passwordChecksCompleted === 0;
      return evaluateBadgesAndCertificate({
        ...prev,
        passwordChecksCompleted: prev.passwordChecksCompleted + 1,
        points: prev.points + (firstTime ? 20 : 0),
      });
    });
  };

  const recordChallengeResult = (
    correctCount: number,
    totalQuestions: number
  ) => {
    updateAndSync((prev) => {
      const nextHighScore = Math.max(prev.challengeHighScore, correctCount);
      const addedPoints = correctCount * 15;
      return evaluateBadgesAndCertificate({
        ...prev,
        challengeHighScore: nextHighScore,
        challengeTotalQuestions: totalQuestions,
        points: prev.points + addedPoints,
      });
    });
  };

  const resetAllProgress = () => {
    const fresh = resetStoredProgress();
    setProgress({ ...DEFAULT_PROGRESS, ...fresh });
    if (user) {
      void (async () => {
        try {
          const idToken = await getIdToken();
          if (!idToken) return;
          await fetch('/api/progress', {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${idToken}` },
          });
        } catch {
          // Ignore offline
        }
      })();
    }
  };

  const allLessonsDone = LESSON_MODULES.every((m) =>
    progress.completedLessons.includes(m.id)
  );
  const quizPercent =
    progress.challengeTotalQuestions > 0
      ? Math.round(
          (progress.challengeHighScore / progress.challengeTotalQuestions) * 100
        )
      : 0;

  return (
    <ProgressContext.Provider
      value={{
        progress,
        setDisplayName,
        dismissWelcome,
        completeLesson,
        recordScamCheck,
        recordPasswordCheck,
        recordChallengeResult,
        resetAllProgress,
        isCertificateUnlocked: allLessonsDone && quizPercent >= 70,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return ctx;
}
