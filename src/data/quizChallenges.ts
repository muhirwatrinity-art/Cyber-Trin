import type { ChallengeQuestion, SafetyTip } from '../types';

export const CHALLENGE_QUESTIONS: ChallengeQuestion[] = [
  {
    id: 'ch-1',
    type: 'scenario',
    points: 20,
    prompt: {
      en: 'You receive a message saying you have won UGX 2,000,000. The sender asks you to pay UGX 10,000 to receive the prize. What should you do?',
      lu: 'Ofuna obubaka obugamba nti owangudde UGX 2,000,000. Abuweereza akusaba okusasula UGX 10,000 okufuna ekirabo. Kiki ky’olina okukola?',
      needsNativeReview: true,
    },
    options: [
      { en: 'Pay immediately before the offer ends.', lu: 'Sasula amangu ekirabo nga tekinnagwaako.' },
      { en: 'Send your Mobile Money PIN so they can deposit it.', lu: 'Weereza PIN yo eya Mobile Money basobole okugiteekako.' },
      { en: 'Stop and verify the offer independently—never pay a fee for a prize.', lu: 'Yimirira okeberere ddala mu makubo amatongole—tosasula ssente kufuna kirabo.' },
      { en: 'Forward the message to friends.', lu: 'Weereza obubaka eri mikwano gyo.' },
    ],
    correctIndex: 2,
    explanation: {
      en: 'Genuine promotions never require you to send money or pay a release fee to receive winnings. Stop and verify independently.',
      lu: 'Empaka entuufu tezisaba kusooka kusasula ssente okufuna obuwanguzi. Yimirira okeberere ddala.',
      needsNativeReview: true,
    },
  },
  {
    id: 'ch-2',
    type: 'true_false',
    points: 15,
    prompt: {
      en: 'True or False: If an SMS appears to show UGX 400,000 entering your Mobile Money account, you should send half back immediately if a stranger calls crying.',
      lu: 'Kituufu oba Si kituufu: Singa SMS eraga nti UGX 400,000 ziyingidde ku Mobile Money yo, olina okusindika ekitundu amangu singa omuntu akuba essimu ng’akaaba.',
      needsNativeReview: true,
    },
    options: [
      { en: 'True', lu: 'Kituufu' },
      { en: 'False — always check your real account balance first', lu: 'Si kituufu — sooka okeberere ssente eziri ku akawunti yo' },
    ],
    correctIndex: 1,
    explanation: {
      en: 'Fraudsters send fake SMS alerts and act emotional to rush you. Always verify your actual balance directly on your phone.',
      lu: 'Abafere baweereza SMS ez’obulimba ne balaga ennaku okukupapiriza. Bulijjo kebera ssente eziri ku akawunti yo.',
      needsNativeReview: true,
    },
  },
  {
    id: 'ch-3',
    type: 'warning_sign',
    points: 20,
    prompt: {
      en: 'Look at this link in a WhatsApp message: "http://airtel-ug-bonus-claim.xyz/pin". Which warning sign is clearest here?',
      lu: 'Tunuulira link eno mu WhatsApp: "http://airtel-ug-bonus-claim.xyz/pin". Akabonero ki akalabula akasinga okulabika?',
      needsNativeReview: true,
    },
    options: [
      { en: 'It is written in small letters.', lu: 'Ewandidiikiddwa mu nnyukuta entono.' },
      { en: 'It uses an unofficial lookalike domain (.xyz) and asks for a PIN.', lu: 'Ekozesa erinnya lya website eritali ttuufu (.xyz) era eyita PIN.' },
      { en: 'It arrived during the daytime.', lu: 'Yatuuse misana.' },
    ],
    correctIndex: 1,
    explanation: {
      en: 'Scammers attach telecom names to unrelated domains like .xyz or .top and ask for PINs or login details.',
      lu: 'Abafere bagatta amannya ga kampuni z’amasimu ku websites ezitali ntuufu nga .xyz ne basaba PIN.',
      needsNativeReview: true,
    },
  },
  {
    id: 'ch-4',
    type: 'multiple_choice',
    points: 15,
    prompt: {
      en: 'Which habit keeps your WhatsApp account safest from being taken over?',
      lu: 'Mpisa ki ekuuma WhatsApp yo obutatwalibwa bafere?',
      needsNativeReview: true,
    },
    options: [
      { en: 'Turning on Two-Step Verification and never sharing 6-digit SMS codes.', lu: 'Okuteekako Two-Step Verification n’obutawa muntu yenna nnamba 6 ez’oku SMS.' },
      { en: 'Sharing your verification code with people in your church or work group.', lu: 'Okugabana ennamba yo ey’okukakasa n’abantu mu guluupu.' },
      { en: 'Leaving your phone unlocked at a charging kiosk.', lu: 'Okuleka essimu yo nga nzigule awali okujjuza amasannyalaze.' },
    ],
    correctIndex: 0,
    explanation: {
      en: 'Two-Step Verification requires your personal 6-digit PIN even if someone gets hold of an SMS code.',
      lu: 'Two-Step Verification yeetaaga PIN yo ey’ekyama ne bwe wabaawo omuntu afuna SMS.',
      needsNativeReview: true,
    },
  },
  {
    id: 'ch-5',
    type: 'scenario',
    points: 20,
    prompt: {
      en: 'A friend on Facebook messages you: "Hey, join this forex group, send UGX 100,000 today and get UGX 250,000 tomorrow!" What should you suspect?',
      lu: 'Mukwano gwo ku Facebook akuwandiikira nti: "Yinga mu guluupu eno, sindika UGX 100,000 leero ofune UGX 250,000 enkya!" Kiki ky’olina okwekengera?',
      needsNativeReview: true,
    },
    options: [
      { en: 'Your friend’s account may be hacked or impersonated by a scammer.', lu: 'Akawunti ya mukwano gwo eyinza okuba nga yatwaliddwa oba yakoppeddwa omufere.' },
      { en: 'It is a guaranteed risk-free way to get rich overnight.', lu: 'Eyo ngeri ntuufu ey’okugaggawala mu kiro kimu.' },
    ],
    correctIndex: 0,
    explanation: {
      en: 'Hacked social accounts are frequently used to push "double your money" scams. Call your friend on their real number to warn them.',
      lu: 'Akawunti ezibiddwa zitera okukozesebwa okusaba ssente nga basuubiza amagoba ag’amangu. Kubira mukwano gwo essimu omulabule.',
      needsNativeReview: true,
    },
  },
  {
    id: 'ch-6',
    type: 'multiple_choice',
    points: 15,
    prompt: {
      en: 'You are buying shoes from an online seller on Instagram or Facebook. What is the safest way to pay?',
      lu: 'Ogula engatto okuva ku mutunzi w’oku Facebook oba Instagram. Engeri ki esinga obukuumi ey’okusasula?',
      needsNativeReview: true,
    },
    options: [
      { en: 'Send full Mobile Money in advance to a personal number you have never met.', lu: 'Sindika ssente zonna nga tonnalaba kintu ku nnamba y’omuntu gw’otomanyi.' },
      { en: 'Verify a real physical shop or pay only upon inspecting the item in person.', lu: 'Kakasa edduuka we liri oba sasula ng’omaze okukebera ekintu ku maaso.' },
    ],
    correctIndex: 1,
    explanation: {
      en: 'Inspecting goods on delivery or buying from verified physical shops protects you from disappearing sellers.',
      lu: 'Okukebera ekintu ng’okifunye oba okugula mu maduuka amakakasiddwa kikukuuma obutabbibwa.',
      needsNativeReview: true,
    },
  },
  {
    id: 'ch-7',
    type: 'true_false',
    points: 15,
    prompt: {
      en: 'True or False: Using one strong password like "Kampala2026!" for every single account (email, Facebook, banking) is completely safe.',
      lu: 'Kituufu oba Si kituufu: Okukozesa password emu ey’amaanyi nga "Kampala2026!" ku buli akawunti (email, Facebook, bbanka) kyangu era tekiina bulabe.',
      needsNativeReview: true,
    },
    options: [
      { en: 'True', lu: 'Kituufu' },
      { en: 'False — use a different password for important accounts', lu: 'Si kituufu — kozesa password ya njawulo ku buli akawunti nkulu' },
    ],
    correctIndex: 1,
    explanation: {
      en: 'If one website leaks your password, attackers try that same password on your email and banking accounts. Always use unique passphrases for key accounts.',
      lu: 'Singa password yo ebuzibwa ku mutimbagano gumu, ababbi bagigezesa ku email ne bbanka yo. Kozesa passwords za njawulo.',
      needsNativeReview: true,
    },
  },
  {
    id: 'ch-8',
    type: 'scenario',
    points: 20,
    prompt: {
      en: 'Your phone was stolen at a busy taxi park. What should be your very first step?',
      lu: 'Essimu yo ebiddwa mu paaka ya takisi. Kiki ky’olina okusooka okukola?',
      needsNativeReview: true,
    },
    options: [
      { en: 'Wait two days to see if someone calls you back.', lu: 'Linda ennaku bbiri olabe oba waliwo akukubira.' },
      { en: 'Immediately contact your telecom provider officially to block your SIM card and notify your bank.', lu: 'Kwatagana ne kampuni y’essimu yo amangu okuziyiza SIM kaadi yo era otegeeze bbanka yo.' },
    ],
    correctIndex: 1,
    explanation: {
      en: 'Blocking your SIM card immediately stops thieves from receiving Mobile Money or WhatsApp verification SMS codes.',
      lu: 'Okuziyiza SIM kaadi yo amangu kiziyiza ababbi okufuna obubaka bwa OTP oba okutwala WhatsApp yo.',
      needsNativeReview: true,
    },
  },
];

export const SAFETY_TIPS: SafetyTip[] = [
  {
    id: 'tip-pin',
    title: {
      en: 'Never share your Mobile Money PIN',
      lu: 'Tokola muntu yenna PIN yo eya Mobile Money',
    },
    body: {
      en: 'Your PIN is private—no telecom worker, prize giver, or friend ever needs it to send you money.',
      lu: 'PIN yo ya kyama—tewali mukozi wa kampuni ya ssimu oba mukwano gwo agyeetaaga okukusindikira ssente.',
      needsNativeReview: true,
    },
  },
  {
    id: 'tip-verify-money',
    title: {
      en: 'Verify before sending money',
      lu: 'Kebera nga tonnasindika ssente',
    },
    body: {
      en: 'Always check your real balance on your phone before trusting an SMS or returning "mistaken" Mobile Money.',
      lu: 'Bulijjo kebera ssente eziri ku akawunti yo nga tonnakkiriza SMS oba okuzza ssente ezirabika nga zisobye.',
      needsNativeReview: true,
    },
  },
  {
    id: 'tip-prizes',
    title: {
      en: 'Do not trust unexpected prize messages',
      lu: 'Towuliriza bubaka bw’ebirabo bye totaataddeko',
    },
    body: {
      en: 'If you did not enter a competition, you did not win. Never pay a small fee to claim a big prize.',
      lu: 'Bwe waba teweetabye mu mpaka, tewangudde. Tosasula ssente ntono okufuna ekirabo ekinene.',
      needsNativeReview: true,
    },
  },
  {
    id: 'tip-whatsapp',
    title: {
      en: 'Protect your WhatsApp account',
      lu: 'Kuuma akawunti yo eya WhatsApp',
    },
    body: {
      en: 'Turn on Two-Step Verification in WhatsApp Settings and never read 6-digit SMS codes to anyone.',
      lu: 'Teekako Two-Step Verification mu WhatsApp Settings era tobuulira muntu yenna nnamba 6 ez’oku SMS.',
      needsNativeReview: true,
    },
  },
  {
    id: 'tip-links',
    title: {
      en: 'Check before you click unknown links',
      lu: 'Kebera nga tonnanyiga ku links z’otomanyi',
    },
    body: {
      en: 'Inspect website addresses carefully. Fake job, bank, and grant links often use strange spellings.',
      lu: 'Wetegereze amannya ga websites. Links z’emirimu oba bbanka ez’obulimba zitera okuba n’ennyukuta ezikyamye.',
      needsNativeReview: true,
    },
  },
  {
    id: 'tip-passwords',
    title: {
      en: 'Use different passwords for important accounts',
      lu: 'Kozesa passwords za njawulo ku akawunti enkulu',
    },
    body: {
      en: 'Build long passphrases with 3 or 4 words and symbols, and never reuse your email password everywhere.',
      lu: 'Kola passwords empanvu nga zirimu ebigambo 3 oba 4 n’obubonero, era tozikozesa wamu buli wamu.',
      needsNativeReview: true,
    },
  },
  {
    id: 'tip-report',
    title: {
      en: 'Save evidence and report suspicious activities',
      lu: 'Tereka obujulizi era oloope ebyekengerwa',
    },
    body: {
      en: 'Keep screenshots, numbers, and messages before blocking fraudsters, and warn your family and community.',
      lu: 'Tereka screenshots n’ennamba nga tonnaziyiza bafere, era olabule famire yo n’ekitundu.',
      needsNativeReview: true,
    },
  },
];
