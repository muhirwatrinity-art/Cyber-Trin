import { desc, eq } from 'drizzle-orm';
import { db } from './index.ts';
import {
  learningProgress,
  safetyEvents,
  scamReportLogs,
  users,
} from './schema.ts';

export async function getOrCreateUser(
  uid: string,
  email: string,
  displayName?: string | null
) {
  try {
    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        displayName: displayName || null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          ...(displayName ? { displayName } : {}),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Failed to upsert user:', error);
    throw new Error('Unable to save user profile.', { cause: error });
  }
}

export async function getUserProgressByUid(uid: string) {
  try {
    const rows = await db
      .select({
        user: users,
        progress: learningProgress,
      })
      .from(users)
      .leftJoin(learningProgress, eq(learningProgress.userId, users.id))
      .where(eq(users.uid, uid))
      .limit(1);

    return rows[0] || null;
  } catch (error) {
    console.error('Failed to query user progress:', error);
    throw new Error('Unable to load learning progress.', { cause: error });
  }
}

export async function upsertLearningProgress(
  userId: number,
  payload: {
    displayName?: string;
    preferredLang?: string;
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
  }
) {
  try {
    if (typeof payload.displayName === 'string' || typeof payload.preferredLang === 'string') {
      await db
        .update(users)
        .set({
          ...(typeof payload.displayName === 'string'
            ? { displayName: payload.displayName }
            : {}),
          ...(typeof payload.preferredLang === 'string'
            ? { preferredLang: payload.preferredLang }
            : {}),
        })
        .where(eq(users.id, userId));
    }

    const result = await db
      .insert(learningProgress)
      .values({
        userId,
        completedLessons: payload.completedLessons,
        lessonQuizScores: payload.lessonQuizScores,
        challengeHighScore: payload.challengeHighScore,
        challengeTotalQuestions: payload.challengeTotalQuestions,
        scamChecksCompleted: payload.scamChecksCompleted,
        passwordChecksCompleted: payload.passwordChecksCompleted,
        points: payload.points,
        earnedBadges: payload.earnedBadges,
        certificateId: payload.certificateId,
        certificateIssuedDate: payload.certificateIssuedDate,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: learningProgress.userId,
        set: {
          completedLessons: payload.completedLessons,
          lessonQuizScores: payload.lessonQuizScores,
          challengeHighScore: payload.challengeHighScore,
          challengeTotalQuestions: payload.challengeTotalQuestions,
          scamChecksCompleted: payload.scamChecksCompleted,
          passwordChecksCompleted: payload.passwordChecksCompleted,
          points: payload.points,
          earnedBadges: payload.earnedBadges,
          certificateId: payload.certificateId,
          certificateIssuedDate: payload.certificateIssuedDate,
          updatedAt: new Date(),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Failed to save learning progress:', error);
    throw new Error('Unable to save learning progress.', { cause: error });
  }
}

export async function resetUserProgressInDb(userId: number) {
  try {
    await db
      .delete(learningProgress)
      .where(eq(learningProgress.userId, userId));
  } catch (error) {
    console.error('Failed to reset learning progress:', error);
    throw new Error('Unable to reset learning progress.', { cause: error });
  }
}

export async function listUserSafetyEvents(userId: number) {
  try {
    return await db
      .select()
      .from(safetyEvents)
      .where(eq(safetyEvents.userId, userId))
      .orderBy(desc(safetyEvents.createdAt))
      .limit(25);
  } catch (error) {
    console.error('Failed to load safety events:', error);
    throw new Error('Unable to load safety events.', { cause: error });
  }
}

export async function createSafetyEventRecord(
  userId: number,
  input: {
    title: string;
    eventType: string;
    eventDate: string;
    googleCalendarEventId?: string | null;
    meetLink?: string | null;
  }
) {
  try {
    const result = await db
      .insert(safetyEvents)
      .values({
        userId,
        title: input.title,
        eventType: input.eventType,
        eventDate: input.eventDate,
        googleCalendarEventId: input.googleCalendarEventId || null,
        meetLink: input.meetLink || null,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error('Failed to create safety event:', error);
    throw new Error('Unable to save safety event.', { cause: error });
  }
}

export async function listUserScamReports(userId: number) {
  try {
    return await db
      .select()
      .from(scamReportLogs)
      .where(eq(scamReportLogs.userId, userId))
      .orderBy(desc(scamReportLogs.createdAt))
      .limit(25);
  } catch (error) {
    console.error('Failed to load scam report logs:', error);
    throw new Error('Unable to load scam report logs.', { cause: error });
  }
}

export async function createScamReportLog(
  userId: number,
  input: {
    category: string;
    riskLevel: string;
    summary: string;
    sheetSpreadsheetId?: string | null;
  }
) {
  try {
    const result = await db
      .insert(scamReportLogs)
      .values({
        userId,
        category: input.category,
        riskLevel: input.riskLevel,
        summary: input.summary,
        sheetSpreadsheetId: input.sheetSpreadsheetId || null,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error('Failed to save scam report log:', error);
    throw new Error('Unable to save scam report log.', { cause: error });
  }
}
