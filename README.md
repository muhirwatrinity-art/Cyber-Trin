# SafeClick UG — Stay Safe Online | Weerinde Ku Mutimbagano

SafeClick UG is an offline-first Progressive Web App (PWA) and full-stack digital safety education platform built to help everyday people in Uganda—market vendors, boda boda riders, students, parents, teachers, elderly users, and first-time smartphone owners—learn how to protect their Mobile Money, phones, social media accounts, and personal information in simple **English (EN)** and conversational **Luganda (LU)**.

## Key Features

- **Bilingual Experience (English & Luganda)**: Instant switching across navigation, lessons, quizzes, message checker results, emergency guides, AI Safety Assistant, Workspace Hub, and certificates.
- **Digital Safety Academy (6 Modules)**: Story-driven Ugandan scenarios featuring Nambi, Musa, Kato, Amina, Sarah, and Okello covering Mobile Money Security, Password & Account Security, Phishing & Fake Links, Social Media Safety, Online Shopping, and What To Do When Hacked.
- **AI Safety Assistant**: Server-side Gemini assistant (`/api/ai/assistant`) answering Ugandan digital safety questions in English or Luganda with strict reminders never to enter Mobile Money PINs, bank PINs, OTPs, or real passwords.
- **Google Workspace Safety Hub**: Connect a Google account via Firebase OAuth to:
  - **Gmail**: Load recent messages, run local SafeClick screening, send emails to the AI Safety Assistant for analysis, or compose safety alerts (with explicit confirmation before sending).
  - **Google Sheets**: List spreadsheets, create a `"SafeClick UG Safety Log"` sheet, inspect tabs dynamically, and append safety entries (with confirmation).
  - **Google Calendar**: View upcoming safety events, schedule digital safety workshops with optional Google Meet video links, and remove events (with confirmation).
  - **Google Meet**: Launch instant Google Meet clinic spaces and track saved sessions.
- **Cloud SQL (PostgreSQL) Persistence**: Stores user profiles, synced learning progress, scheduled workshop/Meet records, and screening logs via Drizzle ORM (`europe-west1`) authenticated with Firebase ID tokens, alongside offline `localStorage` fallback.
- **Smart Scam Checker & Password Strength Tester**: Local-only educational screening tools that run in the browser without storing sensitive passwords or messages.
- **Emergency Digital Help, Interactive Quiz, Badges & Certificate**: Clear step-by-step response plans for 8 common emergencies, 6 badges, and downloadable/printable **Digital Safety Champion** certificates.
- **Offline-First PWA & Voice Read-Aloud**: Installable on Android and iOS, with Web Speech API read-aloud.

## Privacy & Security by Design

- Gemini API calls execute strictly on the server (`/api/ai/assistant`) using `GEMINI_API_KEY`; no API key is ever exposed to the browser.
- Google Workspace OAuth access tokens remain in browser memory only and are never written to `localStorage` or `sessionStorage`.
- Mutating Google Workspace operations require explicit user confirmation before execution.
- All protected Cloud SQL endpoints verify Firebase ID tokens server-side and use Drizzle ORM parameterized queries.

## Luganda Localization Note

Translations marked with `needsNativeReview: true` in `src/data/` and `[REVIEW]` in `src/translations/dictionary.ts` are flagged for final review by a native Luganda speaker prior to institutional deployment.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm start
```
