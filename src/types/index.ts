export type Language = 'en' | 'lu';

export interface LocalizedText {
  en: string;
  lu: string;
  /** True when Luganda phrasing should be reviewed by a native Luganda speaker */
  needsNativeReview?: boolean;
}

export type PageId =
  | 'home'
  | 'learn'
  | 'check'
  | 'passwords'
  | 'help'
  | 'quiz'
  | 'tips'
  | 'assistant'
  | 'workspace'
  | 'profile';

export interface LessonQuizQuestion {
  id: string;
  question: LocalizedText;
  options: LocalizedText[];
  correctIndex: number;
  explanation: LocalizedText;
}

export interface LessonModule {
  id: string;
  number: string;
  character: string;
  setting: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  illustrationId:
    | 'mobile_money'
    | 'passwords'
    | 'phishing'
    | 'social_media'
    | 'online_shopping'
    | 'hacked_recovery';
  illustrationAlt: LocalizedText;
  story: LocalizedText;
  whatHappened: LocalizedText;
  warningSigns: LocalizedText[];
  whatToDo: LocalizedText[];
  safetyTip: LocalizedText;
  quiz: LessonQuizQuestion[];
}

export interface EmergencyGuide {
  id: string;
  iconName:
    | 'wallet'
    | 'message'
    | 'user_x'
    | 'link'
    | 'alert'
    | 'users'
    | 'key'
    | 'smartphone';
  title: LocalizedText;
  summary: LocalizedText;
  steps: LocalizedText[];
  doNot: LocalizedText;
  officialNote: LocalizedText;
}

export type RiskLevel = 'high' | 'medium' | 'low';

export interface ScamIndicatorMatch {
  id: string;
  label: LocalizedText;
  explanation: LocalizedText;
  weight: number;
}

export interface ScamAnalysisResult {
  riskLevel: RiskLevel;
  score: number;
  indicators: ScamIndicatorMatch[];
  nextSteps: LocalizedText[];
  checkedLength: number;
}

export type PasswordStrengthLevel = 'weak' | 'fair' | 'strong' | 'very_strong';

export interface PasswordAnalysisResult {
  level: PasswordStrengthLevel;
  score: number;
  checks: {
    minLength: boolean;
    longPassphrase: boolean;
    hasUpper: boolean;
    hasLower: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
    noCommonPattern: boolean;
    noRepeatedChars: boolean;
  };
  suggestions: LocalizedText[];
}

export interface ChallengeQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'scenario' | 'warning_sign';
  prompt: LocalizedText;
  options: LocalizedText[];
  correctIndex: number;
  explanation: LocalizedText;
  points: number;
}

export interface BadgeDefinition {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  iconName: 'search' | 'key' | 'link' | 'wallet' | 'users' | 'award';
}

export interface SafetyTip {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
}

export interface UserProgress {
  displayName: string;
  completedLessons: string[];
  lessonQuizScores: Record<string, number>;
  challengeHighScore: number;
  challengeTotalQuestions: number;
  scamChecksCompleted: number;
  passwordChecksCompleted: number;
  points: number;
  earnedBadges: string[];
  certificateId: string | null;
  certificateIssuedDate: string | null;
  welcomed: boolean;
}
