import type { Language, UserProgress } from '../types';

const PROGRESS_KEY = 'safeclick_ug_progress_v1';
const LANGUAGE_KEY = 'safeclick_ug_lang_v1';

export const DEFAULT_PROGRESS: UserProgress = {
  displayName: '',
  completedLessons: [],
  lessonQuizScores: {},
  challengeHighScore: 0,
  challengeTotalQuestions: 0,
  scamChecksCompleted: 0,
  passwordChecksCompleted: 0,
  points: 0,
  earnedBadges: [],
  certificateId: null,
  certificateIssuedDate: null,
  welcomed: false,
};

export function loadProgress(): UserProgress {
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons
        : [],
      earnedBadges: Array.isArray(parsed.earnedBadges)
        ? parsed.earnedBadges
        : [],
      lessonQuizScores:
        parsed.lessonQuizScores && typeof parsed.lessonQuizScores === 'object'
          ? parsed.lessonQuizScores
          : {},
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota errors gracefully in private/restricted browsers
  }
}

export function resetStoredProgress(): UserProgress {
  try {
    window.localStorage.removeItem(PROGRESS_KEY);
  } catch {
    // Ignore
  }
  return { ...DEFAULT_PROGRESS };
}

export function loadLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_KEY);
    return stored === 'lu' ? 'lu' : 'en';
  } catch {
    return 'en';
  }
}

export function saveLanguage(lang: Language): void {
  try {
    window.localStorage.setItem(LANGUAGE_KEY, lang);
  } catch {
    // Ignore
  }
}

export function generateCertificateId(): string {
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  const year = new Date().getFullYear();
  return `SCUG-${year}-${randomPart}`;
}
