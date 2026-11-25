import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  createSafetyEventRecord,
  createScamReportLog,
  getOrCreateUser,
  getUserProgressByUid,
  listUserSafetyEvents,
  listUserScamReports,
  resetUserProgressInDb,
  upsertLearningProgress,
} from './src/db/users.ts';
import { requireAuth, type AuthRequest } from './src/middleware/auth.ts';
import { askSafetyAssistant } from './src/server/gemini.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT || 3000);

  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  // Server-side Gemini AI Safety Assistant
  app.post('/api/ai/assistant', async (req, res) => {
    try {
      const { message, lang, history } = req.body ?? {};
      if (typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Please provide a question or message.' });
      }
      if (message.length > 2000) {
        return res.status(400).json({ error: 'Message is too long (maximum 2000 characters).' });
      }

      const safeLang = lang === 'lu' ? 'lu' : 'en';
      const safeHistory = Array.isArray(history)
        ? history
            .filter(
              (item): item is { role: 'user' | 'model'; text: string } =>
                Boolean(item) &&
                (item.role === 'user' || item.role === 'model') &&
                typeof item.text === 'string'
            )
            .slice(-6)
        : [];

      const reply = await askSafetyAssistant({
        message: message.trim(),
        lang: safeLang,
        history: safeHistory,
      });

      res.json({ reply });
    } catch (error: unknown) {
      const err = error as { status?: number; message?: string };
      console.error('AI assistant error:', error);
      const status = typeof err.status === 'number' ? err.status : 500;
      res.status(status).json({
        error: err.message || 'Unable to reach AI Safety Assistant right now.',
      });
    }
  });

  // Cloud SQL Learning Progress routes (Firebase Auth protected)
  app.get('/api/progress', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || `${uid}@users.safeclick.local`;
      const name = typeof req.user!.name === 'string' ? req.user!.name : null;

      await getOrCreateUser(uid, email, name);
      const row = await getUserProgressByUid(uid);
      res.json({
        user: row?.user || null,
        progress: row?.progress || null,
      });
    } catch (error: unknown) {
      const err = error as { message?: string };
      res.status(500).json({ error: err.message || 'Failed to load progress.' });
    }
  });

  app.put('/api/progress', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || `${uid}@users.safeclick.local`;
      const name = typeof req.user!.name === 'string' ? req.user!.name : null;
      const user = await getOrCreateUser(uid, email, name);

      const body = req.body ?? {};
      const completedLessons = Array.isArray(body.completedLessons)
        ? body.completedLessons.filter((v: unknown): v is string => typeof v === 'string')
        : [];
      const earnedBadges = Array.isArray(body.earnedBadges)
        ? body.earnedBadges.filter((v: unknown): v is string => typeof v === 'string')
        : [];
      const lessonQuizScores =
        body.lessonQuizScores && typeof body.lessonQuizScores === 'object'
          ? (body.lessonQuizScores as Record<string, number>)
          : {};

      const saved = await upsertLearningProgress(user.id, {
        displayName:
          typeof body.displayName === 'string' ? body.displayName.slice(0, 60) : undefined,
        preferredLang: body.preferredLang === 'lu' ? 'lu' : 'en',
        completedLessons,
        lessonQuizScores,
        challengeHighScore: Number(body.challengeHighScore) || 0,
        challengeTotalQuestions: Number(body.challengeTotalQuestions) || 0,
        scamChecksCompleted: Number(body.scamChecksCompleted) || 0,
        passwordChecksCompleted: Number(body.passwordChecksCompleted) || 0,
        points: Number(body.points) || 0,
        earnedBadges,
        certificateId:
          typeof body.certificateId === 'string' ? body.certificateId : null,
        certificateIssuedDate:
          typeof body.certificateIssuedDate === 'string'
            ? body.certificateIssuedDate
            : null,
      });

      res.json({ progress: saved });
    } catch (error: unknown) {
      const err = error as { message?: string };
      res.status(500).json({ error: err.message || 'Failed to save progress.' });
    }
  });

  app.delete('/api/progress', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || `${uid}@users.safeclick.local`;
      const user = await getOrCreateUser(uid, email);
      await resetUserProgressInDb(user.id);
      res.json({ ok: true });
    } catch (error: unknown) {
      const err = error as { message?: string };
      res.status(500).json({ error: err.message || 'Failed to reset progress.' });
    }
  });

  // Cloud SQL Safety Events (Calendar + Meet archive)
  app.get('/api/events', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || `${uid}@users.safeclick.local`;
      const user = await getOrCreateUser(uid, email);
      const events = await listUserSafetyEvents(user.id);
      res.json({ events });
    } catch (error: unknown) {
      const err = error as { message?: string };
      res.status(500).json({ error: err.message || 'Failed to load events.' });
    }
  });

  app.post('/api/events', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || `${uid}@users.safeclick.local`;
      const user = await getOrCreateUser(uid, email);

      const { title, eventType, eventDate, googleCalendarEventId, meetLink } =
        req.body ?? {};
      if (typeof title !== 'string' || !title.trim() || typeof eventDate !== 'string') {
        return res.status(400).json({ error: 'Title and eventDate are required.' });
      }

      const event = await createSafetyEventRecord(user.id, {
        title: title.trim().slice(0, 160),
        eventType: typeof eventType === 'string' ? eventType.slice(0, 40) : 'workshop',
        eventDate: eventDate.slice(0, 80),
        googleCalendarEventId:
          typeof googleCalendarEventId === 'string' ? googleCalendarEventId : null,
        meetLink: typeof meetLink === 'string' ? meetLink : null,
      });

      res.status(201).json({ event });
    } catch (error: unknown) {
      const err = error as { message?: string };
      res.status(500).json({ error: err.message || 'Failed to create event.' });
    }
  });

  // Cloud SQL Scam Report Logs (Gmail/Sheets screening log)
  app.get('/api/reports', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || `${uid}@users.safeclick.local`;
      const user = await getOrCreateUser(uid, email);
      const reports = await listUserScamReports(user.id);
      res.json({ reports });
    } catch (error: unknown) {
      const err = error as { message?: string };
      res.status(500).json({ error: err.message || 'Failed to load reports.' });
    }
  });

  app.post('/api/reports', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || `${uid}@users.safeclick.local`;
      const user = await getOrCreateUser(uid, email);

      const { category, riskLevel, summary, sheetSpreadsheetId } = req.body ?? {};
      if (
        typeof category !== 'string' ||
        typeof riskLevel !== 'string' ||
        typeof summary !== 'string' ||
        !summary.trim()
      ) {
        return res
          .status(400)
          .json({ error: 'category, riskLevel, and summary are required.' });
      }

      const report = await createScamReportLog(user.id, {
        category: category.slice(0, 60),
        riskLevel: riskLevel.slice(0, 20),
        summary: summary.trim().slice(0, 400),
        sheetSpreadsheetId:
          typeof sheetSpreadsheetId === 'string' ? sheetSpreadsheetId : null,
      });

      res.status(201).json({ report });
    } catch (error: unknown) {
      const err = error as { message?: string };
      res.status(500).json({ error: err.message || 'Failed to save report.' });
    }
  });

  // Vite dev middleware vs static production dist
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req, res) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`SafeClick UG server listening on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
