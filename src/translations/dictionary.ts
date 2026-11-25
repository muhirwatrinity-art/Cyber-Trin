import type { Language } from '../types';

/**
 * SafeClick UG Translation Dictionary
 * Note: Luganda translations marked with [REVIEW] in comments should be reviewed
 * by a native Luganda speaker for regional dialect nuance before national rollout.
 * Technical terms (PIN, OTP, WhatsApp, Facebook, Mobile Money) are kept in familiar
 * everyday Ugandan usage rather than literal translations.
 */
export const translations = {
  en: {
    appName: 'SafeClick UG',
    tagline: 'Stay Safe Online.',
    lugandaTagline: 'Weerinde Ku Mutimbagano.',
    nav: {
      home: 'Home',
      learn: 'Learn',
      check: 'Check',
      help: 'Help',
      profile: 'Profile',
      passwords: 'Passwords',
      quiz: 'Quiz',
      tips: 'Tips',
      assistant: 'AI Assistant',
      workspace: 'Workspace',
    },
    assistant: {
      title: 'AI Safety Assistant',
      subtitle:
        'Ask any question about Mobile Money, suspicious messages, passwords, or account recovery in English or Luganda.',
      privacyNote:
        'Never type your Mobile Money PIN, bank PIN, OTP, or real password into any chat.',
      placeholder: 'Ask a digital safety question or paste a suspicious text...',
      send: 'Ask Assistant',
      sending: 'Thinking...',
      clearChat: 'New Chat',
      promptsHeading: 'Quick Questions',
      samplePrompts: [
        'Someone called saying they sent Mobile Money by mistake. What should I do?',
        'How do I turn on Two-Step Verification on WhatsApp?',
        'What are the warning signs of a fake job or scholarship link?',
        'My Facebook was hacked. What steps should I follow first?',
      ],
      welcomeMessage:
        'Hello! I am your SafeClick UG AI Safety Assistant. Ask me anything about protecting your Mobile Money, WhatsApp, Facebook, links, or passwords.',
      errorFallback: 'Could not get a reply right now. Check your connection and try again.',
    },
    workspace: {
      title: 'Google Workspace Safety Hub',
      subtitle:
        'Connect your Google account with permission to scan suspicious emails in Gmail, log safety reports to Google Sheets, schedule workshops on Google Calendar, and start Google Meet clinics.',
      signInTitle: 'Connect Your Google Account',
      signInDesc:
        'Sign in with Google to access Gmail, Google Sheets, Google Calendar, and Google Meet directly from SafeClick UG.',
      signOut: 'Sign Out',
      reconnectPrompt: 'Your Workspace session needs a fresh sign-in to access Google APIs.',
      reconnectBtn: 'Reconnect Google Workspace',
      tabs: {
        gmail: 'Gmail',
        sheets: 'Sheets',
        calendar: 'Calendar',
        meet: 'Meet',
      },
      gmail: {
        heading: 'Gmail Scam Scanner & Safety Alerts',
        loadInbox: 'Refresh Inbox',
        scanBtn: 'Scan with SafeClick',
        askAiBtn: 'Ask AI About Email',
        composeHeading: 'Send a Safety Alert Email',
        toLabel: 'Recipient Email',
        subjectLabel: 'Subject',
        bodyLabel: 'Message',
        sendBtn: 'Review & Send Email',
        confirmTitle: 'Confirm Sending Email',
        confirmDesc: 'Please confirm that you want to send this email from your Gmail account:',
        sentSuccess: 'Email sent successfully via Gmail.',
        emptyInbox: 'No messages loaded yet. Tap Refresh Inbox to view recent emails.',
      },
      sheets: {
        heading: 'Google Sheets Safety & Training Log',
        loadSheets: 'Load My Spreadsheets',
        createSheet: 'Create SafeClick Log Sheet',
        createConfirmTitle: 'Create New Google Sheet?',
        createConfirmDesc: 'This will create a new spreadsheet named "SafeClick UG Safety Log" in your Google Drive.',
        selectSheet: 'Select a spreadsheet',
        selectTab: 'Sheet Tab',
        previewHeading: 'Spreadsheet Rows',
        appendHeading: 'Log a Safety Entry to Sheet',
        categoryLabel: 'Category',
        riskLabel: 'Status / Risk',
        notesLabel: 'Notes / Summary',
        appendBtn: 'Review & Append Row',
        appendConfirmTitle: 'Confirm Adding Row to Google Sheets',
        appendConfirmDesc: 'Please confirm appending this new row to your selected Google Sheet:',
        appendSuccess: 'Row added to Google Sheet successfully.',
      },
      calendar: {
        heading: 'Google Calendar Safety Workshops',
        loadEvents: 'Refresh Events',
        createHeading: 'Schedule a Digital Safety Workshop or Reminder',
        titleLabel: 'Event Title',
        dateLabel: 'Date',
        timeLabel: 'Start Time',
        descLabel: 'Description',
        addMeetLabel: 'Also create a Google Meet link for this event',
        createBtn: 'Review & Schedule Event',
        createConfirmTitle: 'Confirm Calendar Event',
        createConfirmDesc: 'Please confirm adding this event to your primary Google Calendar:',
        deleteConfirmTitle: 'Delete Calendar Event?',
        deleteConfirmDesc: 'Are you sure you want to permanently remove this event from your Google Calendar?',
        deleteBtn: 'Delete',
        createdSuccess: 'Calendar event created.',
        deletedSuccess: 'Calendar event deleted.',
      },
      meet: {
        heading: 'Google Meet Digital Safety Clinics',
        desc: 'Start an instant Google Meet room for community training, school digital safety sessions, or family help calls.',
        createBtn: 'Create Safety Clinic Meet',
        createConfirmTitle: 'Create Google Meet Room?',
        createConfirmDesc: 'This will create a new Google Meet space on your Google account.',
        joinBtn: 'Join Meet Space',
        copyLink: 'Copy Meet Link',
        copied: 'Meet link copied!',
        recentMeetings: 'Saved Clinic Sessions',
      },
      confirmAction: 'Confirm',
      cancelAction: 'Cancel',
    },
    status: {
      online: 'Online',
      offline: 'Offline',
      offlineBanner: 'You are offline. Lessons, quizzes, and tools continue working on your phone.',
      installApp: 'Install App',
      installed: 'Installed',
      iosInstall: 'Install on iPhone',
      iosGuideTitle: 'Add SafeClick UG to Home Screen',
      iosGuideStep1: '1. Tap the Share button at the bottom of Safari.',
      iosGuideStep2: '2. Scroll down and tap "Add to Home Screen".',
      close: 'Close',
      updateAvailable: 'A newer version of SafeClick UG is ready.',
      updateNow: 'Update',
    },
    home: {
      firstTimeTitle: 'New to SafeClick UG?',
      firstTimeBody:
        'Start with Lesson 1 on Mobile Money Security, or paste any suspicious SMS into the Message Checker. Everything works offline and stays private on your phone.',
      dismissWelcome: 'Got it',
      heroHeading: 'Stay Safe Online.',
      heroSubheading: 'Weerinde Ku Mutimbagano.',
      heroSupport:
        'Learn how to protect your money, phone, accounts and personal information.',
      cardLearnTitle: 'Learn',
      cardLearnSub: 'Yiga',
      cardLearnDesc: 'Learn how to stay safe online through simple lessons.',
      cardCheckTitle: 'Check a Message',
      cardCheckSub: 'Kebera Obubaka',
      cardCheckDesc: 'Check suspicious SMS messages, links and online offers.',
      cardHelpTitle: 'Get Help',
      cardHelpSub: 'Funa Obuyambi',
      cardHelpDesc: 'Learn what to do when something goes wrong.',
      quickToolsTitle: 'Practical Safety Tools',
      toolPasswordTitle: 'Password Strength Tester',
      toolPasswordDesc: 'Test if a password is easy to guess, 100% privately on your device.',
      toolQuizTitle: 'Quiz & Safety Challenges',
      toolQuizDesc: 'Practice spotting scams with real Ugandan examples and earn badges.',
      toolTipsTitle: 'Community Safety Tips',
      toolTipsDesc: 'Stay Alert — share clear safety reminders with family on WhatsApp.',
      dailyTipLabel: 'Daily Safety Tip',
      progressHeading: 'Your Learning Progress',
      lessonsCompletedLabel: 'Lessons completed',
      badgesEarnedLabel: 'Badges earned',
      pointsLabel: 'Safety points',
      continueLearning: 'Open Digital Safety Academy',
    },
    academy: {
      title: 'Digital Safety Academy',
      subtitle: 'Six practical lessons built around everyday life in Uganda.',
      completedTag: 'Completed',
      notStartedTag: 'Lesson',
      readLesson: 'Open Lesson',
      backToModules: 'All 6 Modules',
      storyHeading: 'Real-Life Story',
      whatHappenedHeading: 'What happened?',
      warningSignsHeading: 'Warning Signs to Watch For',
      whatToDoHeading: 'What should the person do?',
      practicalTipHeading: 'Practical Safety Tip',
      quizHeading: 'Quick Check',
      quizInstruction: 'Answer these quick questions to check your understanding.',
      correctFeedback: 'Correct!',
      tryAgainFeedback: 'Not quite. Read the explanation below and try again.',
      markComplete: 'Mark Lesson Complete',
      lessonCompletedBtn: 'Lesson Completed',
      nextModule: 'Next Module',
      allDoneBanner:
        'You have completed all 6 lessons! Take the Final Quiz Challenge or view your certificate in Profile.',
    },
    scamChecker: {
      title: 'Smart Scam Checker',
      subtitle:
        'Paste a suspicious SMS, WhatsApp message, website link, or prize offer to check for common warning signs.',
      privacyPromise:
        'Private on your device: Messages are checked locally in your browser. Nothing is uploaded, saved, or sent to any server.',
      disclaimerTitle: 'Educational Screening Tool',
      disclaimerBody:
        'This tool highlights common scam clues for learning. Keyword checks cannot prove a message is safe or fraudulent. Always verify independently using official channels.',
      inputLabel: 'Message, link, or offer to check',
      placeholder:
        'Example: Congratulations! You won UGX 2,000,000. Send UGX 10,000 fee or your PIN to claim...',
      checkButton: 'Check Message',
      clearButton: 'Clear',
      samplesHeading: 'Try Sample Messages',
      resultHighTitle: 'HIGH RISK',
      resultHighDesc:
        'This message contains strong warning signs. Do not click the link or send money until you verify it.',
      resultMediumTitle: 'SUSPICIOUS',
      resultMediumDesc:
        'This message needs further checking. Be careful before taking action.',
      resultLowTitle: 'NO OBVIOUS WARNING SIGNS',
      resultLowDesc:
        'No obvious warning signs were detected. However, this does not prove the message is safe.',
      signsFoundHeading: 'Warning signs identified',
      noSignsNote:
        'Even without obvious keywords, fraudsters can still use polite messages, known names, or new tricks. Never share your PIN or OTP.',
      nextStepsHeading: 'Recommended Next Steps',
      neverShareReminder:
        'SafeClick UG will never ask for your Mobile Money PIN, bank PIN, OTP, or account password.',
      emptyError: 'Please paste a message or link first before checking.',
    },
    passwordTester: {
      title: 'Password Strength Tester',
      subtitle:
        'Check how strong a sample password is before you use it for email, Facebook, or banking.',
      privacyBox:
        '100% Local & Private: Your password is never stored, logged, or sent anywhere. It clears automatically when you leave this page.',
      inputLabel: 'Type a sample password or passphrase to test',
      placeholder: 'Try a 3-word passphrase like: Mango!Kampala2026',
      show: 'Show',
      hide: 'Hide',
      clear: 'Clear',
      strengthLabel: 'Password Strength',
      weak: 'Weak',
      fair: 'Fair',
      strong: 'Strong',
      very_strong: 'Very Strong',
      checklistHeading: 'What we checked',
      checkMinLength: 'At least 8 characters',
      checkLongPassphrase: '12 or more characters (recommended)',
      checkUpper: 'Contains uppercase letters (A–Z)',
      checkLower: 'Contains lowercase letters (a–z)',
      checkNumber: 'Contains numbers (0–9)',
      checkSymbol: 'Contains special symbols (! @ # $)',
      checkNoCommon: 'Avoids common words or sequences (123456, password, uganda)',
      checkNoRepeat: 'Avoids repeated characters (aaa, 111)',
      improveHeading: 'How to make it stronger',
      passphraseTipTitle: 'Tip: Use a Long Passphrase',
      passphraseTipBody:
        'Instead of a short word or your birth year, join 3–4 everyday words you can remember (for example: Matooke-River-74!) and use a different password for each important account. Consider a trusted password manager.',
    },
    emergency: {
      title: 'Emergency Digital Help',
      subtitle:
        'Stay calm. Choose what happened below for clear step-by-step instructions.',
      backToList: 'All Emergency Situations',
      stepsHeading: 'Step-by-Step Action Plan',
      doNotHeading: 'Important: What NOT to do',
      officialHeading: 'Official Verification Note',
      officialDisclaimer:
        'SafeClick UG does not display unverified emergency phone numbers. Always dial the official short code or visit an official service centre of your telecom, bank, or local police station directly.',
      evidenceTip:
        'Keep screenshots, caller numbers, and transaction messages before deleting anything.',
    },
    quiz: {
      title: 'Interactive Quiz & Challenges',
      subtitle:
        'Test your digital safety skills with real Ugandan scenarios and earn points.',
      questionOf: 'Question',
      of: 'of',
      scoreLabel: 'Score',
      nextQuestion: 'Next Question',
      finishQuiz: 'See Final Results',
      restartQuiz: 'Try Challenge Again',
      passedTitle: 'Well Done! Assessment Passed',
      needsPracticeTitle: 'Keep Practicing — You Are Getting Stronger',
      passedBody:
        'You scored 70% or higher! Complete all 6 lessons in Learn to unlock your Digital Safety Champion certificate.',
      needsPracticeBody:
        'Review the lessons in the Digital Safety Academy and try again to reach 70% or higher.',
      types: {
        multiple_choice: 'Multiple Choice',
        true_false: 'True or False',
        scenario: 'Real-Life Scenario',
        warning_sign: 'Spot the Warning Sign',
      },
    },
    tips: {
      title: 'Stay Alert',
      subtitle: 'Sigala ng’oli mwegendereza',
      intro:
        'Simple daily reminders you can read and share with family, friends, or your community group on WhatsApp.',
      featuredLabel: 'Featured Reminder',
      nextTip: 'Next Tip',
      shareWhatsApp: 'Share via WhatsApp',
      copyTip: 'Copy Tip',
      copied: 'Copied!',
    },
    profile: {
      title: 'Your Profile & Certificate',
      subtitle: 'Your progress is saved safely on this phone. No account sign-up is needed.',
      displayNameLabel: 'Preferred Display Name (for your certificate)',
      displayNamePlaceholder: 'Enter your name (e.g., Sarah Namukasa)',
      saveName: 'Save Name',
      savedNotice: 'Name saved!',
      languageLabel: 'App Language',
      statsLessons: 'Lessons Done',
      statsQuizBest: 'Best Quiz Score',
      statsPoints: 'Total Points',
      statsBadges: 'Badges Earned',
      badgesHeading: 'Earned & Available Badges',
      earnedTag: 'Earned',
      lockedTag: 'Locked',
      certificateHeading: 'Digital Safety Champion Certificate',
      certificateLocked:
        'Complete all 6 lessons and score at least 70% on the Interactive Quiz to unlock your printable certificate.',
      certificateProgressLessons: 'Lessons completed',
      certificateProgressQuiz: 'Quiz high score',
      certificateDisclaimer:
        'Educational Completion Notice: This certificate recognizes completion of SafeClick UG community learning modules. It is an educational achievement and not a government-accredited professional qualification.',
      downloadCertificate: 'Download Certificate (PNG)',
      printCertificate: 'Print Certificate',
      privacyHeading: 'Privacy & Data Storage Notice',
      privacyBody:
        'SafeClick UG works offline and respects your privacy. We do not ask for your phone number, email, national ID, or PIN. Your display name, completed lessons, and quiz scores are stored only inside your browser on this device. Scam Checker messages and Password Tester inputs are never saved or sent anywhere.',
      resetHeading: 'Reset Learning Data',
      resetButton: 'Reset All Progress',
      resetConfirmTitle: 'Reset your learning progress?',
      resetConfirmBody:
        'This will clear your completed lessons, quiz scores, badges, and certificate from this device.',
      resetConfirmYes: 'Yes, Reset Data',
      resetConfirmCancel: 'Cancel',
    },
    voice: {
      readAloud: 'Read Aloud',
      stopReading: 'Stop Reading',
      unsupportedBrowser:
        'Voice reading is not supported on this browser. Please read the written guide below.',
      noLugandaVoice:
        'Your phone or browser does not currently have a Luganda voice installed. The written Luganda text remains fully available below.',
    },
  },
  lu: {
    appName: 'SafeClick UG',
    tagline: 'Weerinde Ku Mutimbagano.',
    lugandaTagline: 'Stay Safe Online.',
    nav: {
      home: 'Awaka',
      learn: 'Yiga',
      check: 'Kebera',
      help: 'Obuyambi',
      profile: 'Ebikukwatako',
      passwords: 'Password',
      quiz: 'Ebibuuzo',
      tips: 'Amagezi',
      assistant: 'Omuyambi wa AI',
      workspace: 'Workspace',
    },
    assistant: {
      title: 'Omuyambi wa AI ow’Obukuumi',
      subtitle:
        'Buuza ekibuuzo kyonna ku Mobile Money, obubaka obwekengerwa, passwords, oba okuzzaawo akawunti mu Luganda oba Olungereza.', // [REVIEW]
      privacyNote:
        'Towandiika PIN yo eya Mobile Money, PIN ya bbanka, OTP, oba password yo entuufu mu mboozi yonna.', // [REVIEW]
      placeholder: 'Buuza ekibuuzo ky’obukuumi oba teeka wano obubaka obwekengerwa...',
      send: 'Buuza Omuyambi',
      sending: 'Alondoola...',
      clearChat: 'Tandika Emboozi Empya',
      promptsHeading: 'Ebibuuzo Ebyangu',
      samplePrompts: [
        'Omuntu yankubidde ng’agamba yansindikidde Mobile Money mu nsobi. Nkole ki?',
        'Nteekako ntya Two-Step Verification ku WhatsApp?',
        'Bubonero ki obulaga nti link y’omulimu oba sikaala ya bulimba?',
        'Facebook yange etwaliddwa. Nsooke kukola ki?',
      ],
      welcomeMessage:
        'Kulikayo! Nze Omuyambi wa AI owa SafeClick UG. Mbuuza ekintu kyonna ku kukuuma Mobile Money, WhatsApp, Facebook, links, oba passwords.', // [REVIEW]
      errorFallback: 'Tekisobose kufuna kuddamu kati. Kebera yintanenti yo oddemu ogezeeko.',
    },
    workspace: {
      title: 'Google Workspace Safety Hub',
      subtitle:
        'Yunga akawunti yo eya Google n’olukusa okukebera obubaka mu Gmail, okutereka alipoota mu Google Sheets, okutegeka emisomo ku Google Calendar, n’okuggulawo Google Meet.', // [REVIEW]
      signInTitle: 'Yunga Akawunti Yo eya Google',
      signInDesc:
        'Yingira ne Google okukozesa Gmail, Google Sheets, Google Calendar, ne Google Meet butereevu mu SafeClick UG.', // [REVIEW]
      signOut: 'Fuluma',
      reconnectPrompt: 'Olukusa lwa Workspace lwetaaga okuddamu okuyingira okusobola okukozesa Google APIs.', // [REVIEW]
      reconnectBtn: 'Ddamu Oyunge Google Workspace',
      tabs: {
        gmail: 'Gmail',
        sheets: 'Sheets',
        calendar: 'Calendar',
        meet: 'Meet',
      },
      gmail: {
        heading: 'Okukebera Gmail n’Okulabula',
        loadInbox: 'Ddamu Laba Inbox',
        scanBtn: 'Kebera ne SafeClick',
        askAiBtn: 'Buuza AI ku Email Eno',
        composeHeading: 'Weereza Email y’Okulabula',
        toLabel: 'Email y’Omuweerezeddwa',
        subjectLabel: 'Omutwe',
        bodyLabel: 'Obubaka',
        sendBtn: 'Kebera Era Oweereze Email',
        confirmTitle: 'Kakasa Okuweereza Email',
        confirmDesc: 'Kakasa nti oyagala okuweereza email eno okuva ku akawunti yo eya Gmail:', // [REVIEW]
        sentSuccess: 'Email eweerezeddwa bulungi okuyita mu Gmail.',
        emptyInbox: 'Tewali bubaka buleeteddwa. Nyiga Ddamu Laba Inbox okulaba emails empya.', // [REVIEW]
      },
      sheets: {
        heading: 'Ekitabo kya Google Sheets eky’Obukuumi',
        loadSheets: 'Laga Spreadsheets Zange',
        createSheet: 'Kola Sheet ya SafeClick Empya',
        createConfirmTitle: 'Okola Google Sheet Empya?',
        createConfirmDesc: 'Kino kijja kukola spreadsheet empya eyitibwa "SafeClick UG Safety Log" mu Google Drive yo.', // [REVIEW]
        selectSheet: 'Londa spreadsheet',
        selectTab: 'Olupapula (Tab)',
        previewHeading: 'Ennyiriri za Spreadsheet',
        appendHeading: 'Teeka Obubaka mu Sheet',
        categoryLabel: 'Ekika',
        riskLabel: 'Embeera / Obulabe',
        notesLabel: 'Okunnyonnyola',
        appendBtn: 'Kebera Era Oteeke mu Sheet',
        appendConfirmTitle: 'Kakasa Okwongera mu Google Sheets',
        appendConfirmDesc: 'Kakasa nti oyagala okwongera omusittale guno mu Google Sheet gy’olonze:', // [REVIEW]
        appendSuccess: 'Omusittale gwongeddwa mu Google Sheet bulungi.',
      },
      calendar: {
        heading: 'Emisomo gy’Obukuumi ku Google Calendar',
        loadEvents: 'Ddamu Laba Enteekateeka',
        createHeading: 'Tegeka Omusomo oba Ekijjukizo ky’Obukuumi',
        titleLabel: 'Omutwe gw’Enteekateeka',
        dateLabel: 'Olunaku',
        timeLabel: 'Essaawa',
        descLabel: 'Okunnyonnyola',
        addMeetLabel: 'Kola ne link ya Google Meet ku nteekateeka eno',
        createBtn: 'Kebera Era Otegeke',
        createConfirmTitle: 'Kakasa Enteekateeka ku Calendar',
        createConfirmDesc: 'Kakasa okuteeka enteekateeka eno ku Google Calendar yo:', // [REVIEW]
        deleteConfirmTitle: 'Osangule Enteekateeka ku Calendar?',
        deleteConfirmDesc: 'Okakasa nti oyagala okuggyawo enteekateeka eno ku Google Calendar yo?',
        deleteBtn: 'Sangula',
        createdSuccess: 'Enteekateeka eteereddwa ku Calendar.',
        deletedSuccess: 'Enteekateeka eggyiddwa ku Calendar.',
      },
      meet: {
        heading: 'Ekisenge kya Google Meet eky’Obukuumi',
        desc: 'Tandikawo ekisenge kya Google Meet amangu okusomesa abantu, amasomero, oba okuyamba famire.', // [REVIEW]
        createBtn: 'Kola Ekisenge kya Google Meet',
        createConfirmTitle: 'Okola Ekisenge kya Google Meet?',
        createConfirmDesc: 'Kino kijja kukola ekisenge kya Google Meet ekipya ku akawunti yo eya Google.', // [REVIEW]
        joinBtn: 'Yinga mu Google Meet',
        copyLink: 'Koppa Link ya Meet',
        copied: 'Link ya Meet ekoppeddwa!',
        recentMeetings: 'Enkiiko Ezaaterekeddwa',
      },
      confirmAction: 'Kakasa',
      cancelAction: 'Sazaamu',
    },
    status: {
      online: 'Ku mutimbagano',
      offline: 'Tewali mutimbagano',
      offlineBanner:
        'Toli ku mutimbagano kati. Emisomo, ebibuuzo n’ebikozesebwa bikyakola bulungi ku ssimu yo.', // [REVIEW]
      installApp: 'Teeka ku Ssimu',
      installed: 'Eri ku ssimu',
      iosInstall: 'Teeka ku iPhone',
      iosGuideTitle: 'Teeka SafeClick UG ku Ssimu Yo',
      iosGuideStep1: '1. Nyiga akabonero ka Share wansi ku Safari.',
      iosGuideStep2: '2. Seka wansi onyige "Add to Home Screen".',
      close: 'Ggalawo',
      updateAvailable: 'Enkyusa empya eya SafeClick UG etuuse.', // [REVIEW]
      updateNow: 'Zzaako Empya',
    },
    home: {
      firstTimeTitle: 'Omulundi gwo ogusooka ku SafeClick UG?',
      firstTimeBody:
        'Tandika n’Essomo 1 ku bukuumi bwa Mobile Money, oba kebera obubaka bwonna obukwekengera mu Kukebera Obubaka. Byonna bikola ne bwe waba tewali yintanenti.', // [REVIEW]
      dismissWelcome: 'Ntegedde',
      heroHeading: 'Weerinde Ku Mutimbagano.',
      heroSubheading: 'Stay Safe Online.',
      heroSupport:
        'Yiga engeri y’okukuumamu ssente zo, essimu yo, akawunti zo ne bwiino bwo.',
      cardLearnTitle: 'Yiga',
      cardLearnSub: 'Learn',
      cardLearnDesc: 'Yiga engeri y’okwerinda ku mutimbagano mu bisomo ebyangu.',
      cardCheckTitle: 'Kebera Obubaka',
      cardCheckSub: 'Check a Message',
      cardCheckDesc: 'Kebera obubaka bwa SMS, links, n’ebisuubizo ebyekengerwa.',
      cardHelpTitle: 'Funa Obuyambi',
      cardHelpSub: 'Get Help',
      cardHelpDesc: 'Yiga ky’olina okukola singa ekizibu kigwawo.',
      quickToolsTitle: 'Ebikozesebwa mu Bukuumi',
      toolPasswordTitle: 'Okukebera Amaanyi ga Password',
      toolPasswordDesc: 'Kebera oba password yo nyangu okuteebereza ku ssimu yo yokka.', // [REVIEW]
      toolQuizTitle: 'Ebibuuzo n’Okugezesebwa',
      toolQuizDesc: 'Gezesa obukugu bwo mu kulaba abafere ofune n’obubonero.', // [REVIEW]
      toolTipsTitle: 'Amagezi g’Ekitundu',
      toolTipsDesc: 'Sigala ng’oli mwegendereza — gabana amagezi gano ku WhatsApp.',
      dailyTipLabel: 'Ekikwatirizo kya Leero',
      progressHeading: 'Entambula yo mu Kuyiga',
      lessonsCompletedLabel: 'Emisomo egimazeemu',
      badgesEarnedLabel: 'Obubonero obufuniddwa',
      pointsLabel: 'Obubonero bw’obukuumi',
      continueLearning: 'Ggulawo Essomero ly’Obukuumi',
    },
    academy: {
      title: 'Essomero ly’Obukuumi ku Mutimbagano',
      subtitle: 'Emisomo mukaaga egy’obulamu bwa bulijjo mu Uganda.', // [REVIEW]
      completedTag: 'Gumazeemu',
      notStartedTag: 'Essomo',
      readLesson: 'Ggulawo Essomo',
      backToModules: 'Emisomo Gyonna 6',
      storyHeading: 'Olugero lw’Obulamu obwa Bulijjo',
      whatHappenedHeading: 'Kiki ekyabaddewo?',
      warningSignsHeading: 'Obubonero Obulabula',
      whatToDoHeading: 'Omuntu ono alina kukola ki?',
      practicalTipHeading: 'Amagezi g’Okwerinda',
      quizHeading: 'Okukebera Okwangu',
      quizInstruction: 'Ddamu ebibuuzo bino okukebera ky’otegedde.',
      correctFeedback: 'Kituufu!',
      tryAgainFeedback: 'Si kituufu. Soma okunnyonnyola wansi oddeemu.', // [REVIEW]
      markComplete: 'Teekawo nti Omaze Essomo',
      lessonCompletedBtn: 'Essomo Lino Liwedde',
      nextModule: 'Essomo Eddako',
      allDoneBanner:
        'Omaze emisomo gyonna 6! Kola ebibuuzo ebisembayo oba laba satifikeeti yo mu Ebikukwatako.',
    },
    scamChecker: {
      title: 'Okukebera Obubaka (Scam Checker)',
      subtitle:
        'Teeka wano obubaka bwa SMS, WhatsApp, link, oba ekirabo ky’owulira nga tekiteredde okukebera obubonero obulabula.', // [REVIEW]
      privacyPromise:
        'Bwiino bwo bwa kyama: Obubaka bukebererwa ku ssimu yo yokka. Tewali bubaka buweerezebwa oba okuterekebwa.',
      disclaimerTitle: 'Kikozesebwa kya Kuyigiramu',
      disclaimerBody:
        'Ekikozesebwa kino kikulaga obubonero obulabula okukuyamba okuyiga. Okukebera ebigambo tekukakasa nti obubaka butuufu oba bulimba. Kebera n’ofunira ddala obukakafu mu makubo amatongole.', // [REVIEW]
      inputLabel: 'Obubaka, link, oba ekirabo ky’oyagala okukebera',
      placeholder:
        'Ekyokulabirako: Tukuyozaayoza! Owangudde UGX 2,000,000. Weereza UGX 10,000 oba PIN yo...',
      checkButton: 'Kebera Obubaka',
      clearButton: 'Sangula',
      samplesHeading: 'Gezesa ku Bubaka bw’Ekyokulabirako',
      resultHighTitle: 'OBULABE BUNENE',
      resultHighDesc:
        'Obubaka buno bulimu obubonero bw’obulimba obw’amaanyi. Tonyiga link era toweereza ssente nga tonnakakasa.',
      resultMediumTitle: 'BYEKENGEDDE',
      resultMediumDesc:
        'Obubaka buno bwetaaga okukeberebwa okusingawo. Wegendereze nga tonnaba kukola kintu kyonna.',
      resultLowTitle: 'TEWALI BUBONERO BULABIKA',
      resultLowDesc:
        'Tewali bubonero bwa bulimba bulabiddwa. Naye kino tekitegeeza nti obubaka butuufu.',
      signsFoundHeading: 'Obubonero obulabiddwa',
      noSignsNote:
        'Ne bwe wataba bigambo birabula, abafere basobola okukozesa obubaka obukkakkamu oba amannya g’omanyi. Tokola muntu yenna PIN yo oba OTP.', // [REVIEW]
      nextStepsHeading: 'Ky’olina okukola ekiddako',
      neverShareReminder:
        'SafeClick UG tejja kukusaba PIN yo eya Mobile Money, PIN ya bbanka, OTP, oba password.',
      emptyError: 'Sooka oteekemu obubaka oba link nga tonnanyiga kukebera.',
    },
    passwordTester: {
      title: 'Okukebera Amaanyi ga Password',
      subtitle:
        'Kebera oba password gy’oyagala okukozesa ku email, Facebook, oba bbanka ya maanyi.',
      privacyBox:
        'Ebyama byo bikuume: Password yo teterekebwa, tewandiikibwa, era teweerezebwa walala wonna. Esangulwa ng’ovudde ku lupapula luno.',
      inputLabel: 'Wandiika password gy’oyagala okugezesa',
      placeholder: 'Gezesa ebigambo 3 nga: Mango!Kampala2026',
      show: 'Laga',
      hide: 'Kweka',
      clear: 'Sangula',
      strengthLabel: 'Amaanyi ga Password',
      weak: 'Nnafu',
      fair: 'Ya wakati',
      strong: 'Ya maanyi',
      very_strong: 'Ya maanyi nnyo',
      checklistHeading: 'Bye tukebedde',
      checkMinLength: 'Ennyukuta ezitakka wansi wa 8',
      checkLongPassphrase: 'Ennyukuta 12 oba okusingawo (kirungi nnyo)',
      checkUpper: 'Erimu ennyukuta ennene (A–Z)',
      checkLower: 'Erimu ennyukuta entono (a–z)',
      checkNumber: 'Erimu ennamba (0–9)',
      checkSymbol: 'Erimu obubonero (! @ # $)',
      checkNoCommon: 'Teriimu bigambo ebyangu okuteebereza (123456, password, uganda)',
      checkNoRepeat: 'Teriimu nnyukuta eziddiringana (aaa, 111)',
      improveHeading: 'Engeri y’okugigumya',
      passphraseTipTitle: 'Amagezi: Kozesa Ebigambo Ebiwanvu',
      passphraseTipBody:
        'Mu kifo ky’ekigambo ekimpi oba omwaka gwe wazaalibwamu, gatta ebigambo 3 oba 4 by’ojjukira (nga: Matooke-River-74!) era kozesa password ya njawulo ku buli akawunti nkulu.', // [REVIEW]
    },
    emergency: {
      title: 'Obuyambi obw’Amangu',
      subtitle:
        'Kakkana. Londa ekikutuuseeko wansi ofune eby’okukola ebigoberera emitendera.',
      backToList: 'Embeera z’Obuyambi Zonna',
      stepsHeading: 'Eby’okukola Omuddiringano',
      doNotHeading: 'Kikulu: Ky’otolina kukola',
      officialHeading: 'Obubaka bw’Obukakafu Obutongole',
      officialDisclaimer:
        'SafeClick UG teraga nnamba za masimu ezitannakakasibwa. Bulijjo kuba ennamba entongole eya kampuni y’essimu yo, bbanka yo, oba genda ku poliisi ekuli okumpi.', // [REVIEW]
      evidenceTip:
        'Tereka ebifaananyi by’oku ssimu (screenshots), ennamba y’omukubi, n’obubaka bwonna nga tonnasangula kintu kyonna.',
    },
    quiz: {
      title: 'Ebibuuzo n’Okugezesebwa',
      subtitle:
        'Gezesa obukugu bwo ku by’obulamu bwa Uganda ofune n’obubonero.',
      questionOf: 'Ekibuuzo',
      of: 'ku',
      scoreLabel: 'Obubonero',
      nextQuestion: 'Ekibuuzo Ekiddako',
      finishQuiz: 'Laba Ebivuddemu',
      restartQuiz: 'Gezesa Nate',
      passedTitle: 'Webale Nnyo! Oyiseemu',
      needsPracticeTitle: 'Sigala ng’Ogezesa — Ojja Kukiyiga',
      passedBody:
        'Ofunye 70% oba okusingawo! Mala emisomo gyonna 6 mu Yiga ofune satifikeeti yo eya Digital Safety Champion.',
      needsPracticeBody:
        'Ddayo mu bisomo by’Essomero ly’Obukuumi oddemu ogezesebwe otuuke ku 70% oba okusingawo.',
      types: {
        multiple_choice: 'Londa Ekituufu',
        true_false: 'Kituufu oba Si kituufu',
        scenario: 'Embeera y’Obulamu',
        warning_sign: 'Zuula Akabonero Akalabula',
      },
    },
    tips: {
      title: 'Sigala ng’oli mwegendereza',
      subtitle: 'Stay Alert',
      intro:
        'Amagezi amangu ag’okukuuma buli lunaku g’osobola okugabana ne famire oba mikwano gyo ku WhatsApp.',
      featuredLabel: 'Ekikwatirizo kya Leero',
      nextTip: 'Amagezi Amalala',
      shareWhatsApp: 'Gabana ku WhatsApp',
      copyTip: 'Koppa Amagezi',
      copied: 'Kikoppeddwa!',
    },
    profile: {
      title: 'Ebikukwatako ne Satifikeeti',
      subtitle: 'Entambula yo eterekebwa ku ssimu yo yokka. Tewali kwewandiisa kwetaagisa.',
      displayNameLabel: 'Erinnya lyo ly’oyagala lirabike ku satifikeeti',
      displayNamePlaceholder: 'Wandiika erinnya lyo (nga Sarah Namukasa)',
      saveName: 'Tereka Erinnya',
      savedNotice: 'Erinnya literekeddwa!',
      languageLabel: 'Olulimi lw’Apu',
      statsLessons: 'Emisomo Egimaliddwa',
      statsQuizBest: 'Obubonero Obusinga',
      statsPoints: 'Obubonero Bwonna',
      statsBadges: 'Obubonero Obufuniddwa',
      badgesHeading: 'Obubonero Obufuniddwa n’Obulindiridde',
      earnedTag: 'Bufuniddwa',
      lockedTag: 'Bukyali Buggale',
      certificateHeading: 'Satifikeeti ya Champion wa Digital Safety',
      certificateLocked:
        'Mala emisomo gyonna 6 era ofune 70% mu Bibuuza okuggulawo satifikeeti yo ey’okuwandiika oba okukuba.',
      certificateProgressLessons: 'Emisomo egimaliddwa',
      certificateProgressQuiz: 'Obubonero mu bibuuzo',
      certificateDisclaimer:
        'Okutegeeza okw’Ebyenjigiriza: Satifikeeti eno ekakasa nti omaze emisomo gya SafeClick UG egy’okuyiga. Kino kya kwekenneenya mu by’enjigiriza, si satifikeeti ya gavumenti etongole.', // [REVIEW]
      downloadCertificate: 'Wanula Satifikeeti (PNG)',
      printCertificate: 'Kuba Satifikeeti ku Lupapula',
      privacyHeading: 'Obubaka ku Bw’ekyama n’Okutereka Bwiino',
      privacyBody:
        'SafeClick UG ekola nga teri ku mutimbagano era ekuuma ebyama byo. Tetukusaba nnamba ya ssimu, email, ndagamuntu, oba PIN. Erinnya lyo n’entambula yo biterekebwa ku ssimu yo yokka. Obubaka bw’okebera ne password tebiterekebwa.',
      resetHeading: 'Zzaako Entambula Empya',
      resetButton: 'Sangula Entambula Yonna',
      resetConfirmTitle: 'Oyagala okusangula entambula yo yonna?',
      resetConfirmBody:
        'Kino kijja kusangula emisomo gyo, obubonero, n’ebifaananyi bya satifikeeti ku ssimu eno.',
      resetConfirmYes: 'Yee, Sangula Byonna',
      resetConfirmCancel: 'Sazaamu',
    },
    voice: {
      readAloud: 'Somesa mu Ddoboozi',
      stopReading: 'Lekera Awo',
      unsupportedBrowser:
        'Eddoboozi erisoma terikola ku browser eno. Soma ebiwandiiko wansi.',
      noLugandaVoice:
        'Essimu oba browser yo kati terina eddoboozi lya Luganda eriteekeddwako. Ebiwandiiko bya Luganda bisigala wansi obisome.', // [REVIEW]
    },
  },
} as const;

export function getDictionary(lang: Language) {
  return translations[lang];
}
