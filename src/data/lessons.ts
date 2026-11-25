import type { LessonModule } from '../types';

export const LESSON_MODULES: LessonModule[] = [
  {
    id: 'mobile-money',
    number: '01',
    character: 'Nambi',
    setting: {
      en: 'Owino Market Stall, Kampala',
      lu: 'Ku mudaala mu Katale e Kampala',
      needsNativeReview: true,
    },
    title: {
      en: 'Mobile Money Security',
      lu: 'Obukuumi bwa Mobile Money',
    },
    subtitle: {
      en: 'Fake reversal calls, prize scams, and protecting your PIN',
      lu: 'Essimu ez’okulimba okuzza ssente, ebirabo by’obulimba n’okukuuma PIN yo',
      needsNativeReview: true,
    },
    illustrationId: 'mobile_money',
    illustrationAlt: {
      en: 'Illustration of Nambi at her market stall checking her real Mobile Money balance on her phone instead of trusting a suspicious caller.',
      lu: 'Ekifaananyi kya Nambi ku mudaala gwe ng’akebera ssente ze ezituufu ku ssimu ye mu kifo ky’okukkiriza omuntu amukubidde.',
      needsNativeReview: true,
    },
    story: {
      en: 'Nambi sells fresh vegetables at her market stall. One busy afternoon, she receives an SMS that looks like a Mobile Money deposit of UGX 350,000. Seconds later, a man calls sounding stressed: "Sister, I mistakenly sent UGX 350,000 to your number instead of my sick mother. Please send UGX 300,000 back to this other Airtel number right now and keep UGX 50,000 for yourself!"',
      lu: 'Nambi atunda nva mu katale. Olweggulo lumu ng’aliko emirimu mingi, afuna obubaka bwa SMS obulabika ng’obwa Mobile Money obulaga nti afunye UGX 350,000. Nga wayise sikonda ntono, omusajja akuba essimu ng’alaga obweraliikirivu nti: "Mwannyinaze, nsobezza ne nkuweereza UGX 350,000 mu kifo kya maama wange omulwadde. Nkwegayiridde nzirizaako UGX 300,000 ku nnamba endala eno kati, osigaze UGX 50,000!"',
      needsNativeReview: true,
    },
    whatHappened: {
      en: 'The SMS was typed by a fraudster using an ordinary phone number or misleading sender name—no real money entered Nambi’s account. Fraudsters also pretend to be MTN MoMo or Airtel Money customer care agents claiming you won a promotion, asking you to read your PIN or dial strange codes.',
      lu: 'Obubaka bwa SMS bwawandiikibwa mufere ng’akozesa essimu eya bulijjo—tewali ssente ntuufu zaayingira ku akawunti ya Nambi. Abafere era beeyita bakozi ba MTN MoMo oba Airtel Money ne bakugamba nti owangudde ekirabo, ne bakusaba okubabuulira PIN yo oba okunyiga nnamba ze bakulagira.',
      needsNativeReview: true,
    },
    warningSigns: [
      {
        en: 'An SMS arrived from a normal 10-digit phone number instead of the official telecom alert channel.',
        lu: 'Obubaka bwavudde ku nnamba ya ssimu eya bulijjo mu kifo ky’olukalala lw’obubaka obutongole.',
        needsNativeReview: true,
      },
      {
        en: 'The caller creates urgency and begs you to send money to a different number immediately.',
        lu: 'Omukubi akupapiriza okusindika ssente ku nnamba endala amangu ddala.',
        needsNativeReview: true,
      },
      {
        en: 'Anyone claiming you won money or asking for your Mobile Money PIN or secret code (OTP).',
        lu: 'Omuntu yenna akugamba nti owangudde ssente oba akusaba PIN yo eya Mobile Money oba akabonero ak’ekyama.',
        needsNativeReview: true,
      },
    ],
    whatToDo: [
      {
        en: 'Check your actual Mobile Money balance directly on your phone using the official menu before believing any SMS.',
        lu: 'Sooka okeberere ddala ssente eziri ku akawunti yo ku ssimu yo ng’okozesa menu entongole nga tonnakkiriza bubaka bwonna.',
        needsNativeReview: true,
      },
      {
        en: 'Never send money back to a stranger. Real mistakes should be handled through official customer care reversal processes.',
        lu: 'Toweereza muntu gwe tomanyi ssente. Ensobi entuufu zitererezebwa okuyita mu bakozi ba kampuni y’essimu abatongole.',
        needsNativeReview: true,
      },
      {
        en: 'Hang up immediately if someone asks for your PIN, and contact official telecom support independently.',
        lu: 'Ggyaako essimu amangu singa omuntu akusaba PIN yo, era weekubire ku nnamba entongole eya kampuni y’essimu.',
        needsNativeReview: true,
      },
    ],
    safetyTip: {
      en: 'Never share your Mobile Money PIN with anyone—not even a friend, agent, or someone claiming to work for a telecom company.',
      lu: 'Tokola muntu yenna PIN yo eya Mobile Money—wadde mukwano gwo, agent, oba omuntu eyeeyita omukozi wa kampuni y’essimu.',
      needsNativeReview: true,
    },
    quiz: [
      {
        id: 'mm-q1',
        question: {
          en: 'Someone calls Nambi saying they sent UGX 200,000 by mistake and asks her to send it to another number right now. What should she do first?',
          lu: 'Omuntu akubira Nambi ng’agamba nti yamusindikira UGX 200,000 mu nsobi n’amusaba azizze ku nnamba endala kati. Kiki ky’alina okusooka okukola?',
          needsNativeReview: true,
        },
        options: [
          {
            en: 'Send the money quickly to be kind.',
            lu: 'Sindika ssente amangu okuyamba omuntu.',
          },
          {
            en: 'Check her real Mobile Money balance first and never trust only an SMS.',
            lu: 'Sooka okeberere ssente eziri ku akawunti ye nga tonnasindika kintu kyonna.',
          },
          {
            en: 'Tell the caller her PIN so they can reverse it themselves.',
            lu: 'Buulira omukubi PIN yo agikoleko yekka.',
          },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Always verify your real balance directly on your phone. Scammers often send fake text messages that look like real deposits.',
          lu: 'Bulijjo kebera ssente ezaali ku akawunti yo ku ssimu. Abafere batera okuweereza obubaka obw’obulimba obulabika ng’obutuufu.',
          needsNativeReview: true,
        },
      },
      {
        id: 'mm-q2',
        question: {
          en: 'True or False: Genuine MTN MoMo or Airtel Money staff need your 4-digit PIN over the phone to fix your account.',
          lu: 'Kituufu oba Si kituufu: Abakozi abatuufu aba MTN MoMo oba Airtel Money beetaaga PIN yo ku ssimu okutereeza akawunti yo.',
          needsNativeReview: true,
        },
        options: [
          { en: 'True', lu: 'Kituufu' },
          { en: 'False — real staff never ask for your PIN', lu: 'Si kituufu — abakozi abatuufu tebasaba PIN yo' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Official telecom staff will never ask for your Mobile Money PIN or secret verification code.',
          lu: 'Abakozi abatongole tebayinza kukusaba PIN yo eya Mobile Money oba akabonero ak’ekyama.',
          needsNativeReview: true,
        },
      },
    ],
  },
  {
    id: 'passwords-accounts',
    number: '02',
    character: 'Musa',
    setting: {
      en: 'University Campus Hostel, Makerere',
      lu: 'Ku kisulo ky’abayizi ba yunivasite',
      needsNativeReview: true,
    },
    title: {
      en: 'Password & Account Security',
      lu: 'Obukuumi bwa Password n’Akawunti',
    },
    subtitle: {
      en: 'Strong passphrases, two-factor protection, and keeping WhatsApp safe',
      lu: 'Passwords ez’amaanyi, obukuumi obw’emirundi ebiri n’okukuuma WhatsApp',
      needsNativeReview: true,
    },
    illustrationId: 'passwords',
    illustrationAlt: {
      en: 'Illustration of Musa creating a strong passphrase lock and enabling two-step verification on his smartphone.',
      lu: 'Ekifaananyi kya Musa ng’akola password ey’amaanyi era ng’ateekako obukuumi obw’emirundi ebiri ku ssimu ye.',
      needsNativeReview: true,
    },
    story: {
      en: 'Musa used "musa1999" as the password for his email, Facebook, and campus portal. When he logged in on a shared cyber café computer and forgot to sign out, someone changed his Facebook password and started messaging his classmates asking for UGX 50,000 emergency loans in his name.',
      lu: 'Musa yali akozesa "musa1999" nga password ya email ye, Facebook, n’omutimbagano gw’essomero. Lwe yakozesa kompyuta y’ekibuga n’erabira okuggalawo, omuntu yakyusa password ya Facebook ye n’atandika okusaba bayizi banne looni ya UGX 50,000 mu linnya lye.',
      needsNativeReview: true,
    },
    whatHappened: {
      en: 'Using simple passwords like your name, birth year, or "123456" makes it very easy for thieves to guess. Reusing the same password across many accounts means one leak unlocks everything—including email, Facebook, and account recovery.',
      lu: 'Okukozesa passwords ennyangu ng’erinnya lyo, omwaka gw’okuzaalibwa, oba "123456" kyangu okuteebereza. Okukozesa password emu ku akawunti nnyingi kitegeeza nti bw’ebbibwa emu, byonna bigguka.',
      needsNativeReview: true,
    },
    warningSigns: [
      {
        en: 'Passwords made from your name, phone number, birthday, or simple sequences like "12345678".',
        lu: 'Passwords ezirina erinnya lyo, ennamba y’essimu, olunaku lw’okuzaalibwa, oba "12345678".',
        needsNativeReview: true,
      },
      {
        en: 'Using the exact same password for your email, Facebook, and banking apps.',
        lu: 'Okukozesa password y’emu ku email, Facebook, ne bbanka.',
        needsNativeReview: true,
      },
      {
        en: 'WhatsApp or Facebook without Two-Step Verification (2FA) turned on.',
        lu: 'WhatsApp oba Facebook nga terina bukuumi bwa mirundi ebiri (Two-Step Verification).',
        needsNativeReview: true,
      },
    ],
    whatToDo: [
      {
        en: 'Create a long passphrase with 3 or 4 unrelated words, numbers, and symbols (e.g., "Matooke-Lake-49!").',
        lu: 'Kola password empanvu ng’ogatta ebigambo 3 oba 4 ebitali bya bulijjo, ennamba n’obubonero (nga "Matooke-Lake-49!").',
        needsNativeReview: true,
      },
      {
        en: 'Turn on Two-Step Verification inside WhatsApp (Settings > Account > Two-step verification) and Facebook.',
        lu: 'Teekako Two-Step Verification mu WhatsApp (Settings > Account > Two-step verification) ne ku Facebook.',
        needsNativeReview: true,
      },
      {
        en: 'Never share your password or 6-digit SMS verification code with anyone, and always log out on shared computers.',
        lu: 'Tokola muntu yenna password yo oba ennamba 6 ezikuggyira ku SMS, era ggalawo bulijjo bw’okozesa kompyuta y’awamu.',
        needsNativeReview: true,
      },
    ],
    safetyTip: {
      en: 'Think of your password like the padlock on your shop: a long, unique passphrase protects your whole digital life.',
      lu: 'Lowooza ku password yo nga kufulu y’edduuka lyo: password empanvu ey’enjawulo ekuuma ebintu byo byonna eby’oku mutimbagano.',
      needsNativeReview: true,
    },
    quiz: [
      {
        id: 'pw-q1',
        question: {
          en: 'Which of these is the strongest password?',
          lu: 'Ku zino wammanga, password ki esinga amaanyi?',
        },
        options: [
          { en: 'kampala2000', lu: 'kampala2000' },
          { en: '123456789', lu: '123456789' },
          { en: 'Boda-Rain-78!Coffee', lu: 'Boda-Rain-78!Coffee' },
        ],
        correctIndex: 2,
        explanation: {
          en: 'A long passphrase combining multiple words, numbers, and symbols is much harder for thieves and computers to guess.',
          lu: 'Ebigambo ebiwanvu ebigattiddwamu ennamba n’obubonero bizibu nnyo okuteebereza.',
          needsNativeReview: true,
        },
      },
      {
        id: 'pw-q2',
        question: {
          en: 'Why should you turn on Two-Step Verification on WhatsApp?',
          lu: 'Lwaki olina okuteekako Two-Step Verification ku WhatsApp?',
        },
        options: [
          {
            en: 'It stops thieves from hijacking your WhatsApp even if they trick you out of an SMS code.',
            lu: 'Eziyiza ababbi okutwala WhatsApp yo ne bwe bafuna obubaka bwa SMS.',
          },
          {
            en: 'It makes mobile data free.',
            lu: 'Efuyira data wa bwereere.',
          },
        ],
        correctIndex: 0,
        explanation: {
          en: 'Two-Step Verification adds a private 6-digit PIN that you choose yourself, blocking strangers from activating your account on another phone.',
          lu: 'Two-Step Verification eyongerako ennamba yo ey’ekyama eziyiza omuntu omulala okuggulawo WhatsApp yo ku ssimu endala.',
          needsNativeReview: true,
        },
      },
    ],
  },
  {
    id: 'phishing-links',
    number: '03',
    character: 'Kato',
    setting: {
      en: 'Boda Boda Stage, Wakiso',
      lu: 'Ku siteegi ya Boda Boda',
      needsNativeReview: true,
    },
    title: {
      en: 'Phishing & Fake Links',
      lu: 'Links ez’Obulimba n’Okubuzaabuza',
    },
    subtitle: {
      en: 'Spotting fake job offers, scholarships, and lookalike websites',
      lu: 'Okulaba emirimu egy’obulimba, sikaala n’empapula z’omutimbagano ezefaananyiriza',
      needsNativeReview: true,
    },
    illustrationId: 'phishing',
    illustrationAlt: {
      en: 'Illustration of Kato pausing to inspect a suspicious shortened prize link on his phone before clicking.',
      lu: 'Ekifaananyi kya Kato ng’ayimirira okwetegereza link ey’obulimba ku ssimu ye nga tannaginyiga.',
      needsNativeReview: true,
    },
    story: {
      en: 'While waiting at the boda boda stage, Kato receives a WhatsApp message in a group: "GOVERNMENT YOUTH GRANT UGX 850,000! Click mtn-uganda-free-cash.example-site.net and enter your phone number and Mobile Money PIN before midnight!" Kato notices the website name looks strange.',
      lu: 'Ng’alinda abasaabaze ku siteegi, Kato afuna obubaka mu guluupu ya WhatsApp obugamba nti: "SSENTE Z’ABAVUBUKA UGX 850,000! Nyiga wano oyingize ennamba y’essimu ne PIN yo eya Mobile Money nga ssaawa mukaaga ez’ekiro tezinnatuuka!" Kato alaba erinnya lya website nga likyankalanye.',
      needsNativeReview: true,
    },
    whatHappened: {
      en: 'That message is a "phishing" trap. Criminals create fake pages for prizes, jobs, NGOs, scholarships, or banks using misspelled or lookalike links (like "stanbic-ug-login.xyz") to steal your details or trick you into paying a "processing fee".',
      lu: 'Obubaka obwo butego bwa "phishing". Abafere bakola empapula ez’obulimba ezeeyita ez’emirimu, sikaala, oba bbanka nga bakozesa amannya agakyamye okubba ebikukwatako oba okukusasulisa ssente.',
      needsNativeReview: true,
    },
    warningSigns: [
      {
        en: 'Misspelled or unusual website addresses trying to imitate a bank, telecom, or government office.',
        lu: 'Website ezirina ennyukuta ezikyamye nga zeefaananyiriza bbanka, kampuni y’essimu, oba gavumenti.',
        needsNativeReview: true,
      },
      {
        en: 'Shortened links (like bit.ly) combined with promises of free money, sudden scholarships, or instant jobs.',
        lu: 'Links ennyimpi ezireeta ebisuubizo bya ssente ez’obwereere, sikaala, oba emirimu egy’amangu.',
        needsNativeReview: true,
      },
      {
        en: 'A form asking for your Mobile Money PIN, ATM card numbers, or asking you to pay a registration fee first.',
        lu: 'Foomu ekusaba PIN ya Mobile Money, ennamba ya kaadi ya bbanka, oba okusooka okusasula ssente.',
        needsNativeReview: true,
      },
    ],
    whatToDo: [
      {
        en: 'Check before you click. Look closely at the full website address.',
        lu: 'Kebera nga tonnanyiga. Wetegereze bulungi erinnya lya website lyonna.',
      },
      {
        en: 'Never enter a PIN, password, or bank details on a link sent through WhatsApp or SMS.',
        lu: 'Toyingiza PIN, password, oba ebikwata ku bbanka ku link ekuweerezeddwa ku WhatsApp oba SMS.',
        needsNativeReview: true,
      },
      {
        en: 'If you want to apply for a job or scholarship, open a new browser tab and search for the organization’s official website yourself.',
        lu: 'Bw’oba oyagala okusaba omulimu oba sikaala, ggulawo browser mpya weenoonyeze website entongole ey’ekitongole ekyo.',
        needsNativeReview: true,
      },
    ],
    safetyTip: {
      en: 'Check before you click. Real jobs and genuine grants never ask you to enter your Mobile Money PIN or pay a fee to get paid.',
      lu: 'Kebera nga tonnanyiga. Emirimu emituufu n’obuyambi tebikugamba kuyingiza PIN ya Mobile Money oba kusooka kusasula ssente.',
      needsNativeReview: true,
    },
    quiz: [
      {
        id: 'ph-q1',
        question: {
          en: 'You receive a link promising a sudden UGX 500,000 scholarship if you forward the message to 10 WhatsApp groups and enter your phone PIN. What is this?',
          lu: 'Ofuna link esuubiza sikaala ya UGX 500,000 singa ogiweereza mu guluupu 10 eza WhatsApp n’oyingiza PIN yo. Kino kiki?',
          needsNativeReview: true,
        },
        options: [
          {
            en: 'A genuine government scholarship.',
            lu: 'Sikaala entuufu eya gavumenti.',
          },
          {
            en: 'A phishing scam trying to spread fake links and steal information.',
            lu: 'Bufere bwa phishing obw’okubba ebikukwatako n’okusaasaanya links ez’obulimba.',
          },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Genuine scholarships never require forwarding WhatsApp chain messages or entering a Mobile Money PIN.',
          lu: 'Sikaala entuufu tezisaba kuweereza bubaka mu guluupu za WhatsApp oba kuyingiza PIN yo.',
          needsNativeReview: true,
        },
      },
      {
        id: 'ph-q2',
        question: {
          en: 'What is the safest way to check an offer from your bank or telecom?',
          lu: 'Engeri ki esinga obukuumi ey’okukebera ekisuubizo okuva mu bbanka oba kampuni y’essimu?',
          needsNativeReview: true,
        },
        options: [
          {
            en: 'Tap the link inside the random SMS immediately.',
            lu: 'Nyiga link eri mu SMS amangu.',
          },
          {
            en: 'Use the official mobile app, official USSD menu, or visit the official website directly.',
            lu: 'Kozesa app entongole, menu entongole ey’essimu, oba website entongole.',
          },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Going directly to the official app or website prevents fake lookalike sites from tricking you.',
          lu: 'Okugenda butereevu ku app oba website entongole kikukuuma obutagwa mu butego bwa website ez’obulimba.',
          needsNativeReview: true,
        },
      },
    ],
  },
  {
    id: 'social-media',
    number: '04',
    character: 'Amina',
    setting: {
      en: 'Small Tailoring Shop, Jinja',
      lu: 'Ku dduuka ly’okutunga engoye, Jinja',
      needsNativeReview: true,
    },
    title: {
      en: 'Social Media Safety',
      lu: 'Obukuumi ku Mitimbagano gy’Abantu',
    },
    subtitle: {
      en: 'WhatsApp impersonation, Facebook privacy, and fake investment friends',
      lu: 'Abafere ku WhatsApp, okukuuma Facebook n’abantu ab’obulimba ku mutimbagano',
      needsNativeReview: true,
    },
    illustrationId: 'social_media',
    illustrationAlt: {
      en: 'Illustration of Amina adjusting her social media privacy settings and verifying a friend request on her phone.',
      lu: 'Ekifaananyi kya Amina ng’atereeza obukuumi bwa Facebook n’okukebera omuntu amuwandiikidde ku ssimu.',
      needsNativeReview: true,
    },
    story: {
      en: 'Amina uses Facebook and WhatsApp to show customers her dresses. One day, a stranger copies her profile photo and creates a second Facebook account with her name, messaging her friends about a "fast forex investment that doubles UGX 100,000 in 24 hours." Another friend calls Amina to warn her.',
      lu: 'Amina akozesa Facebook ne WhatsApp okulaga bakasitoma be engoye z’atunga. Lumu, omuntu gw’atamanyi akoppa ekifaananyi kye n’akola akawunti endala mu linnya lye, n’atandika okuweereza mikwano gye obubaka bw’okukuba ssente emirundi ebiri mu ssaawa 24.',
      needsNativeReview: true,
    },
    whatHappened: {
      en: 'Public photos and personal details make impersonation easy. Scammers also build fake online romances or promise "double your money" investments to steal Mobile Money from trusting people.',
      lu: 'Ebifaananyi ebiteekebwa mu lujjudde byanguyiza abafere okwefuula ggwe. Abafere era bakola emikwano egy’obulimba oba ne basuubiza okuddiramu ssente emirundi ebiri okubba abantu.',
      needsNativeReview: true,
    },
    warningSigns: [
      {
        en: 'A friend suddenly messages from a new number or duplicate account asking for urgent money.',
        lu: 'Mukwano gwo akuweereza obubaka okuva ku nnamba empya oba akawunti endala ng’asaba ssente ez’amangu.',
        needsNativeReview: true,
      },
      {
        en: 'Strangers promising guaranteed quick profits from crypto, forex, or investment groups.',
        lu: 'Abantu b’otomanyi abasuubiza amagoba ag’amangu mu nsiike za ssente ez’oku mutimbagano.',
        needsNativeReview: true,
      },
      {
        en: 'Someone pressuring you to send private photos or threatening to share personal secrets.',
        lu: 'Omuntu akukaka okumuweereza ebifaananyi eby’ekyama oba akutiisatiisa okubisaasaanya.',
        needsNativeReview: true,
      },
    ],
    whatToDo: [
      {
        en: 'Set your Facebook and WhatsApp profile privacy so strangers cannot download your personal info or add you to random groups.',
        lu: 'Teeka obukuumi ku Facebook ne WhatsApp yo abantu b’otomanyi baleme kutwala bwiino bwo oba okukuteeka mu guluupu z’otomanyi.',
        needsNativeReview: true,
      },
      {
        en: 'If a friend asks for money on WhatsApp or Facebook, call their known phone number by voice before sending anything.',
        lu: 'Mukwano gwo bw’akusaba ssente ku WhatsApp oba Facebook, sooka omukubire essimu ku nnamba gy’omanyi owulire eddoboozi lye nga tonnasindika.',
        needsNativeReview: true,
      },
      {
        en: 'Block and report impersonators or anyone harassing you, and save screenshots as evidence.',
        lu: 'Ziyiza (block) era oloopere abaakoppa erinnya lyo oba abakutawaanya, era tereka ebifaananyi by’obubaka (screenshots).',
        needsNativeReview: true,
      },
    ],
    safetyTip: {
      en: 'If a friend messages asking for emergency Mobile Money, always call their real voice number to confirm it is truly them.',
      lu: 'Mukwano gwo bw’akuwandiikira ng’asaba ssente z’amangu, mukubire essimu yo eya bulijjo okakase nti ye ddala.',
      needsNativeReview: true,
    },
    quiz: [
      {
        id: 'sm-q1',
        question: {
          en: 'Your cousin messages you from a new WhatsApp number saying they lost their phone and need UGX 150,000 urgently. What should you do?',
          lu: 'Kizibwe wo akuweereza obubaka okuva ku nnamba ya WhatsApp empya ng’agamba nti essimu ye yabula era yeetaaga UGX 150,000 amangu. Okola ki?',
          needsNativeReview: true,
        },
        options: [
          {
            en: 'Call their old number or a family member to verify first.',
            lu: 'Kubira ku nnamba ye enkadde oba omuntu w’ewammwe okakase.',
          },
          {
            en: 'Send the money immediately without checking.',
            lu: 'Sindika ssente amangu nga tonnakebera.',
          },
        ],
        correctIndex: 0,
        explanation: {
          en: 'Impersonators often pretend to be a relative using a "new number." A quick voice call to another family member or the old number exposes the trick.',
          lu: 'Abafere batera okwefuula abooluganda nga bakozesa "nnamba empya". Okukuba essimu okakasa kuziyiza obufere.',
          needsNativeReview: true,
        },
      },
      {
        id: 'sm-q2',
        question: {
          en: 'True or False: An online investment group promising to double UGX 100,000 into UGX 200,000 in 24 hours is safe to join.',
          lu: 'Kituufu oba Si kituufu: Guluupu ey’oku mutimbagano esuubiza okukubisaamu UGX 100,000 ne zifuuka UGX 200,000 mu ssaawa 24 ya bwesigwa.',
          needsNativeReview: true,
        },
        options: [
          { en: 'True', lu: 'Kituufu' },
          { en: 'False — "double your money" schemes are classic scams', lu: 'Si kituufu — okusuubiza okukubisaamu ssente amangu buba bufere' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Guaranteed rapid doubling of money is a classic fraud sign. Real businesses do not guarantee instant doubled returns.',
          lu: 'Okusuubiza amagoba ag’amangu agataliimu kubuusabuusa kabonero ka bufere.',
          needsNativeReview: true,
        },
      },
    ],
  },
  {
    id: 'online-shopping',
    number: '05',
    character: 'Sarah',
    setting: {
      en: 'Kampala Taxi Park & Local Delivery',
      lu: 'Mu Paaka ya Takisi mu Kampala',
      needsNativeReview: true,
    },
    title: {
      en: 'Online Shopping & Digital Payments',
      lu: 'Okugula ku Mutimbagano n’Okusasula',
    },
    subtitle: {
      en: 'Verifying sellers, avoiding advance-payment traps, and fake delivery alerts',
      lu: 'Okukakasa abatunda, okwewala okusasula nga tonnalaba kintu n’obubaka bw’okutuusa ebintu obw’obulimba',
      needsNativeReview: true,
    },
    illustrationId: 'online_shopping',
    illustrationAlt: {
      en: 'Illustration of Sarah verifying a seller and inspecting goods before paying instead of sending money in advance to a stranger.',
      lu: 'Ekifaananyi kya Sarah ng’akakasa omutunzi era ng’akebera ekintu nga tannasasula mu kifo ky’okusooka okuweereza ssente.',
      needsNativeReview: true,
    },
    story: {
      en: 'Sarah sees a smartphone advertised on social media for half the normal Kampala shop price. The seller insists: "Pay UGX 250,000 Mobile Money deposit right now so our boda rider can leave the park—no cash on delivery!" When Sarah asks to meet at their physical shop first, the seller blocks her.',
      lu: 'Sarah alaba essimu etundibwa ku mutimbagano ku bbeeyi ya kitundu ku ey’omu maduuka ga Kampala. Omutunzi amugamba nti: "Sooka osindike UGX 250,000 ku Mobile Money kati omuvuzi wa boda asobole okugisimbulako—tetukkiriza kusasula ng’etuuse!" Sarah bw’asaba basisinkane ku dduuka lyabwe, omutunzi amuziyiza (block).',
      needsNativeReview: true,
    },
    whatHappened: {
      en: 'Fake online shops copy real store photos and offer unrealistically low prices to hook buyers. Once you pay in advance to a personal Mobile Money number, they disappear or send an empty box.',
      lu: 'Amaduuka ag’obulimba ku mutimbagano gakoppa ebifaananyi by’amaduuka amatuufu ne gateekawo ebbeeyi entono okusikiriza abaguzi. Bw’omala okusasula nga tonnalaba kintu, babulawo.',
      needsNativeReview: true,
    },
    warningSigns: [
      {
        en: 'Prices way below normal market value with pressure to "pay deposit today before stock finishes."',
        lu: 'Ebbeeyi eri wansi ennyo okusinga ey’omu katale ng’omutunzi akupapiriza okusooka okusasula.',
        needsNativeReview: true,
      },
      {
        en: 'Refusal to allow inspection on delivery or refusal to share a verifiable physical shop address.',
        lu: 'Okugaana okukebera ekintu nga bakikuleetedde oba okugaana okulaga edduuka we liri.',
        needsNativeReview: true,
      },
      {
        en: 'Fake delivery SMS messages asking for extra "clearance fees" via a suspicious link.',
        lu: 'Obubaka bw’obulimba obukugamba okusasula ssente endala okuyita ku link okufuna ekintu kyo.',
        needsNativeReview: true,
      },
    ],
    whatToDo: [
      {
        en: 'Pay on delivery after inspecting the item in person, or buy from well-known shops with a real physical address.',
        lu: 'Sasula ng’ekintu kituuse era ng’omaze okukikebera, oba gula mu maduuka amamanyiddwa agalina ekifo we gali.',
        needsNativeReview: true,
      },
      {
        en: 'Verify the seller’s real business reputation, reviews, and location before sending any deposit.',
        lu: 'Kebera erinnya ly’omutunzi, ebimwogerwako, n’ekifo w’akolera nga tonnasindika ssente.',
        needsNativeReview: true,
      },
      {
        en: 'Never enter card details or Mobile Money PINs into random delivery links.',
        lu: 'Toyingiza bwiino wa kaadi ya bbanka oba PIN ya Mobile Money ku links ezitakakasiddwa.',
        needsNativeReview: true,
      },
    ],
    safetyTip: {
      en: 'If an online price looks too good to be true and the seller refuses inspection before payment, walk away.',
      lu: 'Ebbeeyi bw’elabika ng’esukkulumye obulungi ate ng’omutunzi agaana okukebera ekintu nga tonnasasula, kireke.',
      needsNativeReview: true,
    },
    quiz: [
      {
        id: 'os-q1',
        question: {
          en: 'An online seller refuses to show a physical shop and demands full Mobile Money payment before sending a boda rider. What should you do?',
          lu: 'Omutunzi w’oku mutimbagano agaana okulaga edduuka lye n’asaba osindike ssente zonna nga tannatuma boda. Okola ki?',
          needsNativeReview: true,
        },
        options: [
          {
            en: 'Do not send money in advance; buy from a verified seller or pay only after inspection.',
            lu: 'Toweereza ssente nga tonnalaba kintu; gula awali obukakafu oba sasula ng’omaze okukebera.',
          },
          {
            en: 'Send half the money and hope they are honest.',
            lu: 'Weereza ekitundu kya ssente olinde oba mwesigwa.',
          },
        ],
        correctIndex: 0,
        explanation: {
          en: 'Refusing physical verification or inspection on delivery is a major warning sign of an online marketplace scam.',
          lu: 'Okugaana okukeberebwa oba okulaga ekifo we bakolera kabonero kanene ak’obufere.',
          needsNativeReview: true,
        },
      },
      {
        id: 'os-q2',
        question: {
          en: 'Why should you keep screenshots of chats and payment receipts when shopping online?',
          lu: 'Lwaki kikulu okutereka ebifaananyi by’ebyo bye mwogeddeko n’ebiwandiiko by’okusasula ng’ogula ku mutimbagano?',
          needsNativeReview: true,
        },
        options: [
          {
            en: 'They serve as clear evidence if there is a dispute or fraud report.',
            lu: 'Biyamba nga obujulizi singa wabaawo okwemulugunya oba obufere.',
          },
          {
            en: 'They make delivery faster.',
            lu: 'Bireeta ekintu mangu.',
          },
        ],
        correctIndex: 0,
        explanation: {
          en: 'Saved receipts, seller phone numbers, and chat screenshots are vital evidence if anything goes wrong.',
          lu: 'Ebiwandiiko by’okusasula n’ebifaananyi by’obubaka bya mugaso nnyo nga obujulizi singa wabaawo ekizibu.',
          needsNativeReview: true,
        },
      },
    ],
  },
  {
    id: 'what-to-do-hacked',
    number: '06',
    character: 'Okello',
    setting: {
      en: 'Village Trading Centre, Gulu / Lira Road',
      lu: 'Mu Trading Centre y’ekyalo',
      needsNativeReview: true,
    },
    title: {
      en: 'What To Do When Hacked',
      lu: 'Ky’olina Okukola ng’Akawunti Yo Etwaliddwa',
    },
    subtitle: {
      en: 'Calm step-by-step recovery for WhatsApp, Facebook, email, and evidence',
      lu: 'Emitendera emikkakkamu egy’okuddamu okufuna WhatsApp, Facebook, email n’okutereka obujulizi',
      needsNativeReview: true,
    },
    illustrationId: 'hacked_recovery',
    illustrationAlt: {
      en: 'Illustration of Okello following a calm step-by-step recovery checklist on his tablet and phone to secure his accounts.',
      lu: 'Ekifaananyi kya Okello ng’agoberera emitendera emikkakkamu okuddamu okukuuma akawunti ze.',
      needsNativeReview: true,
    },
    story: {
      en: 'Okello runs a small hardware shop in a trading centre. One morning, WhatsApp logs him out suddenly and his friends start calling to ask why he is begging for money on WhatsApp. Instead of panicking or paying a stranger online who promises to "hack it back," Okello follows a calm recovery checklist.',
      lu: 'Okello alina edduuka ly’ebikozesebwa mu trading centre. Enkya emu, WhatsApp emuggyawo mu bwangu era mikwano gye ne batandika okumukubira nga bamubuuza lwaki asaba ssente ku WhatsApp. Mu kifo ky’okweraliikirira oba okusasula omufere asuubiza okugimuzzaako, Okello agoberera emitendera gy’okuddamu okufuna akawunti ye.',
      needsNativeReview: true,
    },
    whatHappened: {
      en: 'Someone tricked Okello’s account using a verification code or leaked password. When an account is taken over, fast and calm steps protect both your money and your contacts—and you must never pay fake "recovery agents" on social media.',
      lu: 'Omuntu yatwala akawunti ya Okello ng’akozesa akabonero ak’okukakasa oba password eyabbibwa. Akawunti bw’etwalibwa, okukola amangu mu bukkakkamu kikuuma ssente zo ne mikwano gyo.',
      needsNativeReview: true,
    },
    warningSigns: [
      {
        en: 'You are suddenly logged out of WhatsApp, Facebook, or Gmail without doing it yourself.',
        lu: 'Ova mu WhatsApp, Facebook, oba Gmail nga tokyekoledde.',
        needsNativeReview: true,
      },
      {
        en: 'Friends report receiving strange money requests or links from your account.',
        lu: 'Mikwano gyo bakugamba nti bafuna obubaka obusaba ssente oba links okuva ku akawunti yo.',
        needsNativeReview: true,
      },
      {
        en: 'Emails or SMS alerts saying your password or phone number was changed.',
        lu: 'Obubaka obulaga nti password yo oba ennamba y’essimu yakyusiddwa.',
        needsNativeReview: true,
      },
    ],
    whatToDo: [
      {
        en: '1. Warn your family and friends immediately by voice call or SMS so they do not send money to the impostor.',
        lu: '1. Labula famire ne mikwano gyo amangu ku ssimu oba SMS baleme kusindikira mufere ssente.',
        needsNativeReview: true,
      },
      {
        en: '2. Re-verify your WhatsApp with your own SIM card, or secure your Gmail/Facebook password from a safe device and turn on Two-Step Verification.',
        lu: '2. Ddamu okukakasa WhatsApp yo ne SIM kaadi yo, oba kyusa password ya Gmail ne Facebook ku ssimu etali mu bulabe oteekeko Two-Step Verification.',
        needsNativeReview: true,
      },
      {
        en: '3. Save screenshots and transaction details, and report Mobile Money theft or threats through official telecom, bank, and police channels. Never pay anyone promising to "hack back" an account.',
        lu: '3. Tereka ebifaananyi by’obubaka n’ennamba, era loopa obubbi mu makubo amatongole ga kampuni y’essimu, bbanka, oba poliisi. Tosasula muntu yenna asuubiza okuzza ssente oba akawunti.',
        needsNativeReview: true,
      },
    ],
    safetyTip: {
      en: 'Keep calm, warn your contacts, change passwords starting with your email, and preserve screenshots as evidence.',
      lu: 'Kakkana, labula abantu bo, kyusa passwords ng’otandikira ku email yo, era tereka obujulizi.',
      needsNativeReview: true,
    },
    quiz: [
      {
        id: 'hk-q1',
        question: {
          en: 'If your WhatsApp or Facebook is hacked, what should you do FIRST for your friends and family?',
          lu: 'Singa WhatsApp oba Facebook yo etwalibwa, kiki ky’olina okusooka okukolera mikwano gyo ne famire?',
          needsNativeReview: true,
        },
        options: [
          {
            en: 'Warn them via a call or SMS not to send any money to messages from your account.',
            lu: 'Balabule ku ssimu oba SMS baleme kusindika ssente eri obubaka obuva ku akawunti yo.',
          },
          {
            en: 'Say nothing and wait a week.',
            lu: 'Siriikirira olinde wiiki emu.',
          },
        ],
        correctIndex: 0,
        explanation: {
          en: 'Hackers immediately ask your contacts for emergency loans. Warning your contacts right away stops your friends from losing money.',
          lu: 'Ababbi basooka kusaba mikwano gyo ssente ez’amangu. Okubalabula amangu kubayamba obutafirwa ssente.',
          needsNativeReview: true,
        },
      },
      {
        id: 'hk-q2',
        question: {
          en: 'Someone comments on social media claiming they are a "cyber hacker" who can recover your stolen Mobile Money for a small fee. What should you do?',
          lu: 'Omuntu awandiika ku mutimbagano ng’agamba nti asobola okuzza ssente zo ezabbibwa singa osooka omusasula. Okola ki?',
          needsNativeReview: true,
        },
        options: [
          {
            en: 'Pay them quickly to get your money back.',
            lu: 'Musasule amangu akuzizze ssente zo.',
          },
          {
            en: 'Ignore and block them—that is a second scam targeting victims.',
            lu: 'Muleke era omuziyize—obwo bufere bwa mulundi gwakubiri.',
          },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Nobody on social media can magically recover stolen money for a fee. Only work through official telecom, bank, and law enforcement channels.',
          lu: 'Tewali muntu ku mutimbagano ayinza okuzza ssente ezabbibwa ng’akusasulisa. Goberera amakubo amatongole gokka.',
          needsNativeReview: true,
        },
      },
    ],
  },
];
