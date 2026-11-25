import type { LocalizedText, PasswordAnalysisResult, PasswordStrengthLevel } from '../types';

const COMMON_PATTERNS = [
  '123456',
  '12345678',
  '123456789',
  'password',
  'qwerty',
  'admin',
  'letmein',
  'welcome',
  'kampala',
  'uganda',
  'iloveyou',
  'mobilemoney',
  '000000',
  '111111',
  'abcdef',
];

export function analyzePasswordLocally(password: string): PasswordAnalysisResult {
  const lower = password.toLowerCase();
  const minLength = password.length >= 8;
  const longPassphrase = password.length >= 12;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const containsCommonWord = COMMON_PATTERNS.some((p) => lower.includes(p));
  const looksLikeBirthYearOnly = /^(19\d\d|20\d\d)$/.test(password.trim());
  const noCommonPattern = password.length > 0 && !containsCommonWord && !looksLikeBirthYearOnly;

  const hasRepeatedChars = /(.)\1{2,}/.test(password);
  const hasSequentialDigits = /(0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321)/.test(
    password
  );
  const noRepeatedChars = password.length > 0 && !hasRepeatedChars && !hasSequentialDigits;

  let score = 0;
  if (minLength) score += 2;
  if (longPassphrase) score += 2;
  if (password.length >= 16) score += 1;
  if (hasUpper) score += 1;
  if (hasLower) score += 1;
  if (hasNumber) score += 1;
  if (hasSymbol) score += 1;
  if (!noCommonPattern) score -= 3;
  if (!noRepeatedChars) score -= 2;

  score = Math.max(0, Math.min(9, score));

  let level: PasswordStrengthLevel = 'weak';
  if (password.length < 8 || !noCommonPattern || score <= 3) {
    level = 'weak';
  } else if (score <= 5) {
    level = 'fair';
  } else if (score <= 7) {
    level = 'strong';
  } else {
    level = 'very_strong';
  }

  const suggestions: LocalizedText[] = [];
  if (!minLength) {
    suggestions.push({
      en: 'Make it longer—aim for at least 12 characters using 3 or 4 everyday words.',
      lu: 'Giwanvuye—gezaako okutuuka ku nnyukuta 12 ng’ogatta ebigambo 3 oba 4.',
      needsNativeReview: true,
    });
  } else if (!longPassphrase) {
    suggestions.push({
      en: 'Adding 4 more characters (to reach 12+) makes your password much harder to crack.',
      lu: 'Okwongerako ennyukuta 4 okutuuka ku 12+ kizibuwa nnyo okugiteebereza.',
      needsNativeReview: true,
    });
  }
  if (!hasUpper || !hasLower) {
    suggestions.push({
      en: 'Mix BOTH uppercase (A–Z) and lowercase (a–z) letters.',
      lu: 'Gattamu ennyukuta ennene (A–Z) n’entono (a–z).',
      needsNativeReview: true,
    });
  }
  if (!hasNumber) {
    suggestions.push({
      en: 'Add numbers that are not your birth year or phone number.',
      lu: 'Ongeramu ennamba ezitali mwaka gwo gw’okuzaalibwa oba nnamba ya ssimu.',
      needsNativeReview: true,
    });
  }
  if (!hasSymbol) {
    suggestions.push({
      en: 'Include a symbol such as !, @, #, or - between words.',
      lu: 'Teekamu obubonero nga !, @, #, oba - wakati w’ebigambo.',
      needsNativeReview: true,
    });
  }
  if (!noCommonPattern) {
    suggestions.push({
      en: 'Avoid common words like "password", "kampala", "uganda", or "123456".',
      lu: 'Weewale ebigambo ebyangu nga "password", "kampala", "uganda", oba "123456".',
      needsNativeReview: true,
    });
  }
  if (!noRepeatedChars) {
    suggestions.push({
      en: 'Avoid repeated characters ("aaa", "111") or number runs ("1234").',
      lu: 'Weewale ennyukuta eziddiringana ("aaa", "111") oba ennamba eziriraanagana ("1234").',
      needsNativeReview: true,
    });
  }

  return {
    level,
    score,
    checks: {
      minLength,
      longPassphrase,
      hasUpper,
      hasLower,
      hasNumber,
      hasSymbol,
      noCommonPattern,
      noRepeatedChars,
    },
    suggestions,
  };
}
