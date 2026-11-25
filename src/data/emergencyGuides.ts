import type { EmergencyGuide } from '../types';

export const EMERGENCY_GUIDES: EmergencyGuide[] = [
  {
    id: 'stolen-momo',
    iconName: 'wallet',
    title: {
      en: 'My mobile money has been stolen',
      lu: 'Ssente zange eza Mobile Money zibiddwa',
      needsNativeReview: true,
    },
    summary: {
      en: 'Act fast to freeze or protect your account and keep evidence.',
      lu: 'Kola amangu okukuuma akawunti yo n’okutereka obujulizi.',
      needsNativeReview: true,
    },
    steps: [
      {
        en: 'Stop communicating with the suspected fraudster immediately.',
        lu: 'Lekera awo okwogera n’omufere amangu ddala.',
        needsNativeReview: true,
      },
      {
        en: 'Contact your mobile money provider using independently verified official customer care channels (visit an official service centre or use the official telecom short code you already know).',
        lu: 'Kwatagana ne kampuni y’essimu yo ng’okozesa amakubo amatongole agakakasiddwa (genda ku ofiisi entongole oba kuba ennamba entongole gy’omanyi).',
        needsNativeReview: true,
      },
      {
        en: 'Request assistance to secure, suspend, or restrict the affected account and change your Mobile Money PIN immediately.',
        lu: 'Saba obuyambi okuggalawo oba okukuuma akawunti yo era okyuse PIN yo eya Mobile Money amangu.',
        needsNativeReview: true,
      },
      {
        en: 'Change related passwords if your email or banking app was also exposed.',
        lu: 'Kyusa passwords endala singa email oba bbanka yo nabyo byabadde mu bulabe.',
        needsNativeReview: true,
      },
      {
        en: 'Keep all transaction SMS messages, phone numbers, and screenshots as evidence.',
        lu: 'Tereka obubaka bwonna obwa SMS, ennamba z’amasimu, ne screenshots ng’obujulizi.',
        needsNativeReview: true,
      },
      {
        en: 'Report the incident to the appropriate authorities (such as your nearest local police station).',
        lu: 'Loopa ekikolwa kino eri abakulu abakwatibwako (nga poliisi ekuli okumpi).',
        needsNativeReview: true,
      },
    ],
    doNot: {
      en: 'Never pay anyone online or by phone who promises they can "recover" your stolen money for a fee.',
      lu: 'Tosasula muntu yenna ku mutimbagano oba ku ssimu asuubiza okukuzza ssente zo ezabbibwa.',
      needsNativeReview: true,
    },
    officialNote: {
      en: 'Use only official customer care channels published directly by your telecom provider or verified at a physical service centre.',
      lu: 'Kozesa amakubo amatongole gokka agaweebwa kampuni y’essimu yo oba ku ofiisi zaabwe.',
      needsNativeReview: true,
    },
  },
  {
    id: 'whatsapp-hacked',
    iconName: 'message',
    title: {
      en: 'My WhatsApp has been hacked',
      lu: 'WhatsApp yange etwaliddwa',
      needsNativeReview: true,
    },
    summary: {
      en: 'Warn contacts first, then re-register with your SIM card.',
      lu: 'Sooka olabule mikwano gyo, oluvannyuma oddemu oggulewo ne SIM kaadi yo.',
      needsNativeReview: true,
    },
    steps: [
      {
        en: 'Warn family, friends, and work groups via normal voice call or SMS that your WhatsApp was hijacked so they do not send money.',
        lu: 'Labula famire, mikwano gyo, ne guluupu ku ssimu oba SMS nti WhatsApp yo etwaliddwa baleme kusindika ssente.',
        needsNativeReview: true,
      },
      {
        en: 'Open WhatsApp on your phone, enter your phone number, and complete SMS verification with your SIM card to log the attacker out.',
        lu: 'Ggulawo WhatsApp ku ssimu yo, oyingize ennamba yo, okakase n’obubaka obujja ku SIM kaadi yo okuggyako omufere.',
        needsNativeReview: true,
      },
      {
        en: 'If a Two-Step Verification PIN was set by the hacker and you are locked out for 7 days, keep your SIM active and wait out the official WhatsApp reset window, or email WhatsApp official support.',
        lu: 'Singa omufere yateekako PIN ya Two-Step Verification, kuuma SIM kaadi yo ng’ekola olinde ennaku 7 ez’okuzzaawo obukuumi, oba wandikira obuyambi obutongole obwa WhatsApp.',
        needsNativeReview: true,
      },
      {
        en: 'Once back in, go to Settings > Account > Two-step verification and set your own 6-digit PIN and recovery email.',
        lu: 'Bw’oddamu okugifuna, genda mu Settings > Account > Two-step verification oteekeko PIN yo ey’ennamba 6.',
        needsNativeReview: true,
      },
      {
        en: 'Check Settings > Linked Devices and log out of any unknown browsers or computers.',
        lu: 'Kebera mu Linked Devices oggyeeko kompyuta oba ssimu ez’otomanyi.',
        needsNativeReview: true,
      },
    ],
    doNot: {
      en: 'Never share the 6-digit SMS registration code with anyone—even if a friend asks for it.',
      lu: 'Tokola muntu yenna ennamba 6 ezijja ku SMS okukakasa WhatsApp—wadde mukwano gwo.',
      needsNativeReview: true,
    },
    officialNote: {
      en: 'Only use the official WhatsApp app from Google Play Store or Apple App Store and official help pages inside the app.',
      lu: 'Kozesa app ya WhatsApp entongole yokka okuva mu Play Store oba App Store.',
      needsNativeReview: true,
    },
  },
  {
    id: 'facebook-hacked',
    iconName: 'user_x',
    title: {
      en: 'My Facebook account has been hacked',
      lu: 'Akawunti yange eya Facebook etwaliddwa',
      needsNativeReview: true,
    },
    summary: {
      en: 'Secure your email first, then recover and lock your Facebook account.',
      lu: 'Sooka okuume email yo, oluvannyuma ozzeeko akawunti yo eya Facebook.',
      needsNativeReview: true,
    },
    steps: [
      {
        en: 'Check if you still have access to the email address linked to your Facebook. Change your email password first using a strong passphrase.',
        lu: 'Kebera oba okyasobola okuggulawo email ekwatagana ne Facebook yo. Sooka okyuse password ya email yo.',
        needsNativeReview: true,
      },
      {
        en: 'Check your email inbox for a "Did you change your password/email?" security alert from Facebook and tap the official revert link inside that verified email if present.',
        lu: 'Kebera mu email yo oba mulimu obubaka obukubuuza oba gwe wakyusizza password, okoleko mangu.',
        needsNativeReview: true,
      },
      {
        en: 'Use Facebook’s official "Hacked Account" recovery path inside the official app or website.',
        lu: 'Kozesa ekkubo etongole erya Facebook ery’okuzzaawo akawunti etwaliddwa mu app entongole.',
        needsNativeReview: true,
      },
      {
        en: 'Once recovered, remove unknown phone numbers/emails, log out of all other sessions, and turn on Two-Factor Authentication.',
        lu: 'Bw’ogifuna, ggyako ennamba za masimu z’otomanyi, oggyeeko ssimu endala zonna, oteekeko Two-Factor Authentication.',
        needsNativeReview: true,
      },
      {
        en: 'Inform friends on your timeline or via SMS not to trust recent scam posts or loan messages.',
        lu: 'Tegeeza mikwano gyo baleme kwesiga bubaka obusaba ssente obwafulumiziddwa mu linnya lyo.',
        needsNativeReview: true,
      },
    ],
    doNot: {
      en: 'Do not send money or account codes to "account recovery experts" advertising in Facebook comments.',
      lu: 'Toweereza ssente oba obubaka bwa kyama eri abantu abasuubiza okuzzaawo akawunti mu comments za Facebook.',
      needsNativeReview: true,
    },
    officialNote: {
      en: 'Access Facebook recovery tools only through the official Facebook app or by typing the official address directly in your browser.',
      lu: 'Kozesa app ya Facebook entongole yokka oba wandiika erinnya lyayo etuufu mu browser.',
      needsNativeReview: true,
    },
  },
  {
    id: 'clicked-link',
    iconName: 'link',
    title: {
      en: 'I clicked a suspicious link',
      lu: 'Nnyize ku link ey’obulimba',
      needsNativeReview: true,
    },
    summary: {
      en: 'Close the page right away and protect any information you typed.',
      lu: 'Ggalawo olupapula olwo amangu era okuume byonna bye wabadde oyingiza.',
      needsNativeReview: true,
    },
    steps: [
      {
        en: 'Close the browser tab immediately. Do not tap "Allow", "Download", or enter any details.',
        lu: 'Ggalawo browser amangu. Tonyiga "Allow", "Download", era toyingiza kintu kyonna.',
        needsNativeReview: true,
      },
      {
        en: 'If you did NOT type any password or PIN and did NOT install an app, you are usually safe—clear your browser tabs and stay alert.',
        lu: 'Bwe waba tewayingizza password oba PIN era tewawanudde app, oyinza okuba nga oli mulamu—sangula olupapula olwo wegendereze.',
        needsNativeReview: true,
      },
      {
        en: 'If you typed a password, change that password immediately on the real official website or app—and change it anywhere else you reused it.',
        lu: 'Bwe waba wayingizza password, gikyuse amangu ku app oba website entuufu, n’awalala wonna gye wagikozesa.',
        needsNativeReview: true,
      },
      {
        en: 'If you typed a Mobile Money PIN or bank detail, change your PIN right away and inform your provider or bank.',
        lu: 'Bwe waba wayingizza PIN ya Mobile Money oba ebikwata ku bbanka, kyusa PIN amangu otegeeze kampuni oba bbanka yo.',
        needsNativeReview: true,
      },
      {
        en: 'If an unknown APK or file downloaded and installed, uninstall it immediately and run your phone’s built-in security check.',
        lu: 'Singa app gy’otomanyi yeeteeka ku ssimu yo, giggyeko amangu.',
        needsNativeReview: true,
      },
    ],
    doNot: {
      en: 'Do not click the link again to "check it" or forward it to friends.',
      lu: 'Toddamu kunyiga ku link eyo oba okugiweereza mikwano gyo.',
      needsNativeReview: true,
    },
    officialNote: {
      en: 'Only download apps from official stores like Google Play Store or Apple App Store.',
      lu: 'Wanula apps okuva mu maduuka amatongole nga Google Play Store oba Apple App Store gokka.',
      needsNativeReview: true,
    },
  },
  {
    id: 'online-threats',
    iconName: 'alert',
    title: {
      en: 'Someone is threatening me online',
      lu: 'Omuntu antiisatiisa ku mutimbagano',
      needsNativeReview: true,
    },
    summary: {
      en: 'Do not pay blackmailers. Save evidence, block, and seek support.',
      lu: 'Tosasula bakutiisatiisa. Tereka obujulizi, baziyize, era funa obuyambi.',
      needsNativeReview: true,
    },
    steps: [
      {
        en: 'Stop replying to the threats and do not send money—paying blackmailers almost always leads to more demands.',
        lu: 'Lekera awo okuddamu abakutiisatiisa era towa ssente—okusasula kuleeta okusaba okulala.',
        needsNativeReview: true,
      },
      {
        en: 'Take clear screenshots of all messages, usernames, profile links, phone numbers, and dates before blocking.',
        lu: 'Kwata screenshots ez’obubaka bwonna, amannya, ennamba za masimu n’ennaku z’omwezi nga tonnaziyiza.',
        needsNativeReview: true,
      },
      {
        en: 'Block the account and use the platform’s built-in Report button (WhatsApp, Facebook, TikTok, or X).',
        lu: 'Ziyiza (block) omuntu oyo era omuloopere mu app gy’okozesa.',
        needsNativeReview: true,
      },
      {
        en: 'Talk to a trusted family member, teacher, community leader, or counsellor—do not suffer alone in silence.',
        lu: 'Yogera n’omuntu gw’owulira nga wesiga mu famire, omusomesa, oba omukulembeze—tosiriikirira wekka.',
        needsNativeReview: true,
      },
      {
        en: 'If there is a physical threat, extortion, or sharing of private images, report to local authorities with your saved screenshots.',
        lu: 'Singa waliwo okutiisatiisa kw’obulamu oba okusaba ssente, loopa ku poliisi ng’olina obujulizi bwo.',
        needsNativeReview: true,
      },
    ],
    doNot: {
      en: 'Do not delete the threatening messages before saving screenshots, and never pay extortion money.',
      lu: 'Tosangula bubaka nga tonnakwata screenshots, era tosasula ssente za kutiisatiisa.',
      needsNativeReview: true,
    },
    officialNote: {
      en: 'For serious harassment or extortion, report directly to your nearest police station or trusted local support organisation.',
      lu: 'Okutiisatiisa okw’amaanyi kuloope ku poliisi ekuli okumpi oba ebitongole ebiyamba abantu.',
      needsNativeReview: true,
    },
  },
  {
    id: 'impersonation',
    iconName: 'users',
    title: {
      en: 'Someone is impersonating me',
      lu: 'Omuntu yeefudde nze ku mutimbagano',
      needsNativeReview: true,
    },
    summary: {
      en: 'Alert your network, gather screenshots, and report the fake profile.',
      lu: 'Tegeeza abantu bo, tereka screenshots, era oloopere akawunti ey’obulimba.',
      needsNativeReview: true,
    },
    steps: [
      {
        en: 'Take screenshots of the fake profile, its username/URL, and any scam posts or messages it sent.',
        lu: 'Kwata screenshots ez’akawunti ey’obulimba n’obubaka bwonna bwe eweereza.',
        needsNativeReview: true,
      },
      {
        en: 'Post a clear warning on your real social media and WhatsApp status letting friends and customers know about the fake account.',
        lu: 'Tegeeza mikwano gyo ne bakasitoma bo ku WhatsApp ne Facebook nti waliwo akawunti ey’obulimba ekozesa erinnya lyo.',
        needsNativeReview: true,
      },
      {
        en: 'Use the platform’s "Report Fake Account / Pretending to be me" tool, and ask a few trusted friends to report it too.',
        lu: 'Kozesa akabonero ka Report > Pretending to be me ku Facebook oba WhatsApp, osabe ne mikwano gyo bakikole.',
        needsNativeReview: true,
      },
      {
        en: 'Review your own privacy settings so strangers cannot easily download your photos or friends list.',
        lu: 'Kebera obukuumi bw’akawunti yo abantu b’otomanyi baleme kutwala bifaananyi byo.',
        needsNativeReview: true,
      },
    ],
    doNot: {
      en: 'Do not pay anyone who claims they can remove the fake account for money.',
      lu: 'Tosasula muntu yenna agamba nti ajja kuggyawo akawunti ey’obulimba ku ssente.',
      needsNativeReview: true,
    },
    officialNote: {
      en: 'If someone is using your name to defraud people of money, keep evidence and report to your local police station.',
      lu: 'Singa omuntu akozesa erinnya lyo okubba ssente, tereka obujulizi oloope ku poliisi.',
      needsNativeReview: true,
    },
  },
  {
    id: 'shared-pin',
    iconName: 'key',
    title: {
      en: 'I shared my PIN accidentally',
      lu: 'Nnabuulidde omuntu PIN yange mu bukyamu',
      needsNativeReview: true,
    },
    summary: {
      en: 'Change your PIN immediately before any money leaves your account.',
      lu: 'Kyusa PIN yo amangu ddala nga ssente tezinnaggyibwako.',
      needsNativeReview: true,
    },
    steps: [
      {
        en: 'Change your Mobile Money PIN or banking PIN immediately using your official phone menu or banking app.',
        lu: 'Kyusa PIN yo eya Mobile Money oba bbanka amangu ng’okozesa menu entongole ey’essimu yo.',
        needsNativeReview: true,
      },
      {
        en: 'Check your current balance and recent transaction history right away.',
        lu: 'Kebera ssente eziri ku akawunti yo n’ebikoleddwa kati.',
        needsNativeReview: true,
      },
      {
        en: 'If you also shared an OTP or password, change your email/app passwords immediately.',
        lu: 'Bwe waba wabuuliddeko ne OTP oba password, bikyuse amangu.',
        needsNativeReview: true,
      },
      {
        en: 'Contact your official telecom or bank customer care if you notice any unauthorized transaction or cannot change your PIN.',
        lu: 'Kwatagana ne kampuni y’essimu oba bbanka mu makubo amatongole singa olaba ssente ezivuddeko.',
        needsNativeReview: true,
      },
    ],
    doNot: {
      en: 'Do not choose an obvious replacement PIN like 1234, 0000, or your birth year.',
      lu: 'Tokozesa PIN ennyangu nga 1234, 0000, oba omwaka gwe wazaalibwamu.',
      needsNativeReview: true,
    },
    officialNote: {
      en: 'Change your PIN directly from your own phone menu—never ask a stranger or unverified caller to change it for you.',
      lu: 'Kyusa PIN yo wekka ku ssimu yo—tosaba muntu mulala kugikukyusiza.',
      needsNativeReview: true,
    },
  },
  {
    id: 'stolen-phone',
    iconName: 'smartphone',
    title: {
      en: 'My phone has been stolen',
      lu: 'Essimu yange ebiddwa',
      needsNativeReview: true,
    },
    summary: {
      en: 'Block your SIM card first so thieves cannot receive OTPs or reset accounts.',
      lu: 'Sooka ozziyeko SIM kaadi yo ababbi baleme kufuna OTP oba okukyusa passwords.',
      needsNativeReview: true,
    },
    steps: [
      {
        en: 'Borrow a trusted family member’s phone and contact your telecom provider immediately through official channels or visit an official service centre to block/suspend your SIM card.',
        lu: 'Kozesa essimu y’omuntu gw’owulira nga wesiga, okwatagane ne kampuni y’essimu oba ogende ku ofiisi entongole okuziyiza SIM kaadi yo.',
        needsNativeReview: true,
      },
      {
        en: 'Notify your bank if you have mobile banking apps installed on the stolen phone.',
        lu: 'Tegeeza bbanka yo singa essimu ebaddeko app za bbanka.',
        needsNativeReview: true,
      },
      {
        en: 'From another trusted device, sign in to your Google (Android) or Apple ID account to remotely lock or erase the stolen phone and change your Google/email password.',
        lu: 'Ku ssimu oba kompyuta endala eyesigika, genda mu akawunti yo eya Google oba Apple okusiba oba okusangula ebiri ku ssimu ebiddwa, era okyuse password.',
        needsNativeReview: true,
      },
      {
        en: 'Change passwords for WhatsApp (once SIM is replaced), Facebook, and email, and report the theft to your nearest police station.',
        lu: 'SIM kaadi bw’ezibwaawo, ddamu okukakasa WhatsApp, kyusa passwords za Facebook ne email, era oloope ku poliisi.',
        needsNativeReview: true,
      },
    ],
    doNot: {
      en: 'Do not wait until tomorrow to block your SIM card—thieves often try SIM swaps or OTP resets immediately.',
      lu: 'Tolinda kukeera okuziyiza SIM kaadi yo—ababbi batera okugikozesa amangu ddala.',
      needsNativeReview: true,
    },
    officialNote: {
      en: 'Keep a record of your phone’s IMEI number in a safe notebook at home before trouble happens, and report stolen devices through official police channels.',
      lu: 'Tereka ennamba ya IMEI y’essimu yo awaka mu kitabo ekiterekebwa, era oloope obubbi ku poliisi entongole.',
      needsNativeReview: true,
    },
  },
];
