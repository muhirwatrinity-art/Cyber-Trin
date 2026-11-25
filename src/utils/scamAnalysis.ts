import type { LocalizedText, ScamAnalysisResult, ScamIndicatorMatch } from '../types';

interface RuleDefinition {
  id: string;
  weight: number;
  pattern: RegExp;
  label: LocalizedText;
  explanation: LocalizedText;
}

const SCAM_RULES: RuleDefinition[] = [
  {
    id: 'pin_otp_request',
    weight: 4,
    pattern: /\b(pin|otp|secret\s*code|verification\s*code|passcode|password|atm\s*pin|momo\s*pin)\b/i,
    label: {
      en: 'Request for PIN, OTP, or password',
      lu: 'Okusaba PIN, OTP, oba password',
      needsNativeReview: true,
    },
    explanation: {
      en: 'Legitimate telecom companies, banks, and prize organizers never ask you to share your PIN, OTP, or password.',
      lu: 'Kampuni z’amasimu oba bbanka entuufu tezikusaba PIN yo, OTP, oba password.',
      needsNativeReview: true,
    },
  },
  {
    id: 'prize_claim',
    weight: 3,
    pattern: /\b(congratulations|you\s*(have\s*)?won|winner|lottery|jackpot|claim\s*your\s*prize|promo\s*winner|cash\s*prize|grant)\b/i,
    label: {
      en: 'Unexpected prize or cash-win claim',
      lu: 'Okusuubiza ekirabo oba ssente ze wawangudde',
      needsNativeReview: true,
    },
    explanation: {
      en: 'Messages claiming you won money or a grant you never applied for are one of the most common fraud tricks.',
      lu: 'Obubaka obugamba nti owangudde ssente ze totaasabye bubaawo nnyo mu bufere.',
      needsNativeReview: true,
    },
  },
  {
    id: 'advance_fee_or_transfer',
    weight: 3,
    pattern: /\b(send\s*(back|money|ugx|fee|deposit)|pay\s*(a\s*)?(fee|charge|ugx)|processing\s*fee|release\s*fee|mistakenly\s*sent|wrong\s*number|double\s*your\s*(money|cash))\b/i,
    label: {
      en: 'Unusual payment instruction or urgent money transfer',
      lu: 'Okupapiriza okusindika ssente oba okusasula fee',
      needsNativeReview: true,
    },
    explanation: {
      en: 'Asking you to pay a small fee to unlock a big prize, or rushing you to return "mistaken" Mobile Money to another number, is a major scam sign.',
      lu: 'Okukusaba okusasula ssente ntono okufuna ekinene oba okukupapiriza okuzza ssente ku nnamba endala kabonero k’obufere.',
      needsNativeReview: true,
    },
  },
  {
    id: 'urgency_threat',
    weight: 2,
    pattern: /\b(urgent|immediately|right\s*now|within\s*\d+\s*(min|hour)|before\s*midnight|account\s*(will\s*be\s*)?(suspended|blocked|closed|deactivated)|last\s*warning|expire\s*today)\b/i,
    label: {
      en: 'Urgency or account suspension threat',
      lu: 'Okupapiriza oba okutiisatiisa nti akawunti ejja kuggalwawo',
      needsNativeReview: true,
    },
    explanation: {
      en: 'Scammers create panic ("within 10 minutes" or "account blocked") so you act before checking calmly.',
      lu: 'Abafere baleeta okweraliikirira okukulemesa okulowoozaako n’okukebera.',
      needsNativeReview: true,
    },
  },
  {
    id: 'shortened_url',
    weight: 2,
    pattern: /\b(bit\.ly|tinyurl\.com|t\.co|rb\.gy|cutt\.ly|is\.gd|shorturl\.at)\b/i,
    label: {
      en: 'Shortened web link hiding destination',
      lu: 'Link ennyimpi ekweka website gye egenda',
      needsNativeReview: true,
    },
    explanation: {
      en: 'Shortened links hide the real website address, making it hard to tell if a page is genuine before tapping.',
      lu: 'Links ennyimpi zikweka erinnya lya website etuufu.',
      needsNativeReview: true,
    },
  },
  {
    id: 'suspicious_domain',
    weight: 3,
    pattern: /(https?:\/\/[^\s]*\.(xyz|top|tk|ml|ga|cf|gq|click|buzz|loan|win)\b)|(https?:\/\/[^\s]*(mtn|airtel|stanbic|centenary|dfcu|ura|nita|gov)[^\s]*-(free|bonus|promo|claim|login|verify|cash)[^\s]*)/i,
    label: {
      en: 'Suspicious or lookalike website domain',
      lu: 'Erinnya lya website eryefaananyiriza oba eryekengerwa',
      needsNativeReview: true,
    },
    explanation: {
      en: 'The link appears to use an unusual domain ending or combines a known brand name with words like "bonus", "claim", or "verify".',
      lu: 'Link eraga nga ekozesa ennyukuta ezitakwatagana oba egatta amannya g’ebitongole n’ebigambo nga "bonus" oba "claim".',
      needsNativeReview: true,
    },
  },
  {
    id: 'customer_care_impersonation',
    weight: 2,
    pattern: /\b(customer\s*care|support\s*agent|momo\s*agent|airtel\s*agent|telecom\s*staff|system\s*upgrade|sim\s*registration\s*update|verify\s*your\s*sim)\b/i,
    label: {
      en: 'Possible impersonation of customer care or agent',
      lu: 'Okwefuula omukozi wa customer care oba agent',
      needsNativeReview: true,
    },
    explanation: {
      en: 'Fraudsters often pretend to be customer care officers calling about a "system upgrade" or "SIM update" to trick you into sharing codes.',
      lu: 'Abafere batera okwefuula abakozi ba customer care nga boogera ku "system upgrade" okukubba obubaka.',
      needsNativeReview: true,
    },
  },
  {
    id: 'personal_info_request',
    weight: 2,
    pattern: /\b(nin|national\s*id|id\s*number|date\s*of\s*birth|dob|card\s*number|cvv|bank\s*details|full\s*name\s*and\s*number)\b/i,
    label: {
      en: 'Request for sensitive personal or ID details',
      lu: 'Okusaba ebikukwatako ebikulu nga NIN oba kaadi ya bbanka',
      needsNativeReview: true,
    },
    explanation: {
      en: 'Be cautious of unsolicited messages asking for your National ID (NIN), birth date, or bank card numbers.',
      lu: 'Wegendereze obubaka obukusaba NIN yo, olunaku lw’okuzaalibwa, oba ennamba ya kaadi ya bbanka.',
      needsNativeReview: true,
    },
  },
  {
    id: 'ugx_large_sum_lure',
    weight: 1,
    pattern: /\b(ugx|shs|ush)\s*[\d,]{5,}\b/i,
    label: {
      en: 'Large UGX money amount mentioned',
      lu: 'Omuwendo gwa ssente za UGX ogwogerwako',
      needsNativeReview: true,
    },
    explanation: {
      en: 'Messages promising or referencing large sums of UGX from unknown senders require careful independent verification.',
      lu: 'Obubaka obwogera ku ssente nnyingi okuva eri abantu b’otomanyi bwetaaga okukeberebwa.',
      needsNativeReview: true,
    },
  },
];

export interface SampleMessage {
  id: string;
  title: LocalizedText;
  text: string;
}

export const SAMPLE_SCAM_MESSAGES: SampleMessage[] = [
  {
    id: 'sample-prize',
    title: {
      en: 'Sample 1: Fake Prize SMS',
      lu: 'Ekyokulabirako 1: SMS y’Ekirabo ky’Obulimba',
    },
    text: 'CONGRATULATIONS! You have won UGX 2,000,000 in the Independence Mobile Promo. Send UGX 10,000 processing fee and your PIN immediately to claim via http://momo-promo-claim.xyz',
  },
  {
    id: 'sample-reversal',
    title: {
      en: 'Sample 2: Urgent Reversal Trap',
      lu: 'Ekyokulabirako 2: Okusaba Okuzza Ssente',
    },
    text: 'Customer care notice: UGX 350,000 was mistakenly sent to your number. Send back UGX 300,000 urgently within 10 minutes or your account will be blocked.',
  },
  {
    id: 'sample-suspicious-link',
    title: {
      en: 'Sample 3: Shortened Job / Grant Link',
      lu: 'Ekyokulabirako 3: Link Ennyimpi y’Omulimu',
    },
    text: 'Youth Scholarship & Government Grant open today! Apply before midnight at https://bit.ly/example-grant-ug and verify your National ID NIN.',
  },
  {
    id: 'sample-benign',
    title: {
      en: 'Sample 4: Everyday Family Text',
      lu: 'Ekyokulabirako 4: Obubaka bwa Bulijjo',
    },
    text: 'Hello Nakato, I have reached Kampala safely. Let us meet tomorrow morning at 9am near the market entrance.',
  },
];

export function analyzeMessageLocally(rawInput: string): ScamAnalysisResult {
  const cleaned = rawInput.trim();
  const indicators: ScamIndicatorMatch[] = [];
  let score = 0;

  for (const rule of SCAM_RULES) {
    if (rule.pattern.test(cleaned)) {
      indicators.push({
        id: rule.id,
        label: rule.label,
        explanation: rule.explanation,
        weight: rule.weight,
      });
      score += rule.weight;
    }
  }

  let riskLevel: ScamAnalysisResult['riskLevel'] = 'low';
  if (score >= 4) {
    riskLevel = 'high';
  } else if (score >= 1) {
    riskLevel = 'medium';
  }

  const nextSteps: LocalizedText[] =
    riskLevel === 'high'
      ? [
          {
            en: 'Do NOT click any links, do NOT reply, and do NOT send money or your PIN.',
            lu: 'TONYIGA ku link yonna, TODDAMU bubaka, era TOWEEREZA ssente oba PIN yo.',
            needsNativeReview: true,
          },
          {
            en: 'If it claims to be from a telecom, bank, or friend, check independently using the official app, menu, or a voice call.',
            lu: 'Singa bagamba bava mu bbanka, kampuni y’essimu, oba mukwano gwo, kebera ng’okozesa app entongole oba kubira mukwano gwo essimu.',
            needsNativeReview: true,
          },
          {
            en: 'Delete or block the sender after saving a screenshot if you plan to warn others or report.',
            lu: 'Tereka screenshot singa oyagala okulabula abalala, oluvannyuma oziyize omusindisi.',
            needsNativeReview: true,
          },
        ]
      : riskLevel === 'medium'
      ? [
          {
            en: 'Pause before tapping or replying. Verify the sender through an official phone number or known contact.',
            lu: 'Yimirira nga tonnanyiga oba okuddamu. Kakasa omusindisi ng’okozesa ennamba entongole oba gy’omanyi.',
            needsNativeReview: true,
          },
          {
            en: 'Never enter your PIN, OTP, National ID, or bank details on unfamiliar pages.',
            lu: 'Toyingiza PIN, OTP, NIN, oba ebikwata ku bbanka ku mpapula z’otomanyi.',
            needsNativeReview: true,
          },
        ]
      : [
          {
            en: 'Even when no obvious keywords appear, always verify unexpected requests for money or personal info directly.',
            lu: 'Ne bwe wataba bigambo birabula, bulijjo kakasa okusaba kwonna okw’amangu okw’okutwala ssente oba bwiino.',
            needsNativeReview: true,
          },
          {
            en: 'Check the sender’s phone number or full website address carefully before trusting it.',
            lu: 'Kebera bulungi ennamba y’omusindisi oba erinnya lya website nga tonnakwesiga.',
            needsNativeReview: true,
          },
        ];

  return {
    riskLevel,
    score,
    indicators,
    nextSteps,
    checkedLength: cleaned.length,
  };
}
