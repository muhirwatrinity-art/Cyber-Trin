import { relations } from 'drizzle-orm';
import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  displayName: text('display_name'),
  preferredLang: text('preferred_lang').notNull().default('en'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const learningProgress = pgTable('learning_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  completedLessons: jsonb('completed_lessons').$type<string[]>().notNull().default([]),
  lessonQuizScores: jsonb('lesson_quiz_scores')
    .$type<Record<string, number>>()
    .notNull()
    .default({}),
  challengeHighScore: integer('challenge_high_score').notNull().default(0),
  challengeTotalQuestions: integer('challenge_total_questions').notNull().default(0),
  scamChecksCompleted: integer('scam_checks_completed').notNull().default(0),
  passwordChecksCompleted: integer('password_checks_completed').notNull().default(0),
  points: integer('points').notNull().default(0),
  earnedBadges: jsonb('earned_badges').$type<string[]>().notNull().default([]),
  certificateId: text('certificate_id'),
  certificateIssuedDate: text('certificate_issued_date'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const safetyEvents = pgTable('safety_events', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  title: text('title').notNull(),
  eventType: text('event_type').notNull().default('workshop'),
  eventDate: text('event_date').notNull(),
  googleCalendarEventId: text('google_calendar_event_id'),
  meetLink: text('meet_link'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const scamReportLogs = pgTable('scam_report_logs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  category: text('category').notNull(),
  riskLevel: text('risk_level').notNull(),
  summary: text('summary').notNull(),
  sheetSpreadsheetId: text('sheet_spreadsheet_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  progress: one(learningProgress, {
    fields: [users.id],
    references: [learningProgress.userId],
  }),
  safetyEvents: many(safetyEvents),
  scamReportLogs: many(scamReportLogs),
}));

export const learningProgressRelations = relations(learningProgress, ({ one }) => ({
  user: one(users, {
    fields: [learningProgress.userId],
    references: [users.id],
  }),
}));

export const safetyEventsRelations = relations(safetyEvents, ({ one }) => ({
  user: one(users, {
    fields: [safetyEvents.userId],
    references: [users.id],
  }),
}));

export const scamReportLogsRelations = relations(scamReportLogs, ({ one }) => ({
  user: one(users, {
    fields: [scamReportLogs.userId],
    references: [users.id],
  }),
}));
