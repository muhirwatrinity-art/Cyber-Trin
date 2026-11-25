import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Check,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  LogOut,
  Mail,
  Plus,
  RefreshCw,
  SearchCheck,
  Send,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  Video,
} from 'lucide-react';
import { GoogleSignInButton } from '../components/shared/GoogleSignInButton';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import type { PageId, ScamAnalysisResult } from '../types';
import { analyzeMessageLocally } from '../utils/scamAnalysis';

type WorkspaceTab = 'gmail' | 'sheets' | 'calendar' | 'meet';

interface GmailSummary {
  id: string;
  subject: string;
  from: string;
  snippet: string;
}

interface SpreadsheetFile {
  id: string;
  name: string;
}

interface CalendarEventItem {
  id: string;
  summary: string;
  start: string;
  hangoutLink?: string;
}

interface SavedMeetRecord {
  id: number;
  title: string;
  eventDate: string;
  meetLink: string | null;
}

interface PendingConfirm {
  title: string;
  description: string;
  details: string[];
  onConfirm: () => Promise<void>;
}

interface WorkspaceHubPageProps {
  onAskAssistant: (prompt: string) => void;
  onNavigate: (page: PageId) => void;
}

export const WorkspaceHubPage: React.FC<WorkspaceHubPageProps> = ({
  onAskAssistant,
}) => {
  const { dict, pick } = useLanguage();
  const {
    user,
    accessToken,
    needsAuth,
    isSigningIn,
    authError,
    signIn,
    signOut,
    getIdToken,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<WorkspaceTab>('gmail');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm | null>(null);
  const [isWorking, setIsWorking] = useState(false);

  // Gmail state
  const [emails, setEmails] = useState<GmailSummary[]>([]);
  const [scannedEmail, setScannedEmail] = useState<{
    email: GmailSummary;
    result: ScamAnalysisResult;
  } | null>(null);
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('SafeClick UG Security Alert');
  const [emailBody, setEmailBody] = useState('');

  // Sheets state
  const [spreadsheets, setSpreadsheets] = useState<SpreadsheetFile[]>([]);
  const [selectedSheetId, setSelectedSheetId] = useState('');
  const [sheetTabs, setSheetTabs] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState('');
  const [sheetRows, setSheetRows] = useState<string[][]>([]);
  const [logCategory, setLogCategory] = useState('Mobile Money Check');
  const [logRisk, setLogRisk] = useState('Reviewed');
  const [logNotes, setLogNotes] = useState('');

  // Calendar state
  const [calendarEvents, setCalendarEvents] = useState<CalendarEventItem[]>([]);
  const [eventTitle, setEventTitle] = useState('Community Digital Safety Clinic');
  const [eventDate, setEventDate] = useState(() =>
    new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  );
  const [eventTime, setEventTime] = useState('10:00');
  const [eventDesc, setEventDesc] = useState(
    'Practical SafeClick UG digital safety session.'
  );
  const [includeMeetInEvent, setIncludeMeetInEvent] = useState(true);

  // Meet state
  const [createdMeetUri, setCreatedMeetUri] = useState<string | null>(null);
  const [createdMeetCode, setCreatedMeetCode] = useState<string | null>(null);
  const [copiedMeet, setCopiedMeet] = useState(false);
  const [savedMeetings, setSavedMeetings] = useState<SavedMeetRecord[]>([]);

  const loadSavedMeetings = async () => {
    try {
      const idToken = await getIdToken();
      if (!idToken) return;
      const res = await fetch('/api/events', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.events)) {
        setSavedMeetings(data.events);
      }
    } catch {
      // Non-blocking
    }
  };

  useEffect(() => {
    if (user) {
      void loadSavedMeetings();
    }
  }, [user]);

  const clearFeedback = () => {
    setErrorMessage(null);
    setStatusMessage(null);
  };

  const executeConfirmed = async () => {
    if (!pendingConfirm) return;
    setIsWorking(true);
    clearFeedback();
    try {
      await pendingConfirm.onConfirm();
      setPendingConfirm(null);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Workspace operation failed.'
      );
      setPendingConfirm(null);
    } finally {
      setIsWorking(false);
    }
  };

  // --- GMAIL HANDLERS ---
  const handleLoadInbox = async () => {
    if (!accessToken) return;
    clearFeedback();
    setIsWorking(true);
    try {
      const listRes = await fetch(
        'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=6',
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const listData = await listRes.json();
      if (!listRes.ok) {
        throw new Error(listData.error?.message || 'Unable to load Gmail inbox.');
      }

      const items: { id: string }[] = Array.isArray(listData.messages)
        ? listData.messages
        : [];
      const details = await Promise.all(
        items.map(async (item) => {
          const msgRes = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${item.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          const msgData = await msgRes.json();
          const headers: { name: string; value: string }[] =
            msgData.payload?.headers || [];
          const subject =
            headers.find((h) => h.name === 'Subject')?.value || '(No Subject)';
          const from = headers.find((h) => h.name === 'From')?.value || 'Unknown';
          return {
            id: item.id,
            subject,
            from,
            snippet: msgData.snippet || '',
          };
        })
      );
      setEmails(details);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to fetch Gmail messages.'
      );
    } finally {
      setIsWorking(false);
    }
  };

  const handleScanEmail = async (email: GmailSummary) => {
    const combined = `${email.subject}\n${email.from}\n${email.snippet}`;
    const result = analyzeMessageLocally(combined);
    setScannedEmail({ email, result });

    try {
      const idToken = await getIdToken();
      if (idToken) {
        await fetch('/api/reports', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            category: 'Gmail Screening',
            riskLevel: result.riskLevel,
            summary: `Subject: ${email.subject}`.slice(0, 200),
          }),
        });
      }
    } catch {
      // Optional log
    }
  };

  const handleConfirmSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailTo.trim() || !emailBody.trim()) return;
    setPendingConfirm({
      title: dict.workspace.gmail.confirmTitle,
      description: dict.workspace.gmail.confirmDesc,
      details: [
        `To: ${emailTo.trim()}`,
        `Subject: ${emailSubject.trim()}`,
        `Message: ${emailBody.trim().slice(0, 120)}${
          emailBody.trim().length > 120 ? '...' : ''
        }`,
      ],
      onConfirm: async () => {
        if (!accessToken) throw new Error('Please sign in again.');
        const rawEmail = [
          `To: ${emailTo.trim()}`,
          `Subject: ${emailSubject.trim()}`,
          'Content-Type: text/plain; charset=utf-8',
          '',
          emailBody.trim(),
        ].join('\r\n');
        const encoded = btoa(unescape(encodeURIComponent(rawEmail)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');

        const res = await fetch(
          'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ raw: encoded }),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error?.message || 'Unable to send email.');
        }
        setEmailBody('');
        setStatusMessage(dict.workspace.gmail.sentSuccess);
      },
    });
  };

  // --- GOOGLE SHEETS HANDLERS ---
  const handleLoadSpreadsheets = async () => {
    if (!accessToken) return;
    clearFeedback();
    setIsWorking(true);
    try {
      const q = encodeURIComponent(
        "mimeType='application/vnd.google-apps.spreadsheet' and trashed=false"
      );
      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=${q}&pageSize=12&fields=files(id,name)`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || 'Unable to load spreadsheets.');
      }
      const files: SpreadsheetFile[] = Array.isArray(data.files) ? data.files : [];
      setSpreadsheets(files);
      if (files.length > 0 && !selectedSheetId) {
        await loadSpreadsheetMetadata(files[0].id);
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to list Google Sheets.'
      );
    } finally {
      setIsWorking(false);
    }
  };

  const loadSpreadsheetMetadata = async (sheetId: string) => {
    if (!accessToken || !sheetId) return;
    setSelectedSheetId(sheetId);
    const metaRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties.title`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const metaData = await metaRes.json();
    if (!metaRes.ok) {
      throw new Error(metaData.error?.message || 'Unable to read spreadsheet tabs.');
    }
    const tabs: string[] = (metaData.sheets || [])
      .map((s: { properties?: { title?: string } }) => s.properties?.title)
      .filter((t: unknown): t is string => typeof t === 'string');
    setSheetTabs(tabs);
    const firstTab = tabs[0] || '';
    setSelectedTab(firstTab);
    if (firstTab) {
      await loadSheetValues(sheetId, firstTab);
    }
  };

  const loadSheetValues = async (sheetId: string, tabName: string) => {
    if (!accessToken || !sheetId || !tabName) return;
    const range = encodeURIComponent(`${tabName}!A1:E15`);
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const data = await res.json();
    if (res.ok) {
      setSheetRows(Array.isArray(data.values) ? data.values : []);
    }
  };

  const handleConfirmCreateSheet = () => {
    setPendingConfirm({
      title: dict.workspace.sheets.createConfirmTitle,
      description: dict.workspace.sheets.createConfirmDesc,
      details: [
        'Title: SafeClick UG Safety Log',
        'Columns: Date | Category | Risk / Status | Notes',
      ],
      onConfirm: async () => {
        if (!accessToken) throw new Error('Please sign in again.');
        const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            properties: { title: 'SafeClick UG Safety Log' },
            sheets: [{ properties: { title: 'SafetyLog' } }],
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error?.message || 'Unable to create Google Sheet.');
        }
        const newId = data.spreadsheetId as string;
        await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${newId}/values/${encodeURIComponent(
            'SafetyLog!A1:D1'
          )}?valueInputOption=USER_ENTERED`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              values: [['Date', 'Category', 'Status', 'Notes']],
            }),
          }
        );
        setSpreadsheets((prev) => [
          { id: newId, name: 'SafeClick UG Safety Log' },
          ...prev,
        ]);
        await loadSpreadsheetMetadata(newId);
        setStatusMessage('Created "SafeClick UG Safety Log" in Google Sheets.');
      },
    });
  };

  const handleConfirmAppendRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSheetId || !selectedTab || !logNotes.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    setPendingConfirm({
      title: dict.workspace.sheets.appendConfirmTitle,
      description: dict.workspace.sheets.appendConfirmDesc,
      details: [
        `Sheet Tab: ${selectedTab}`,
        `Row: ${today} | ${logCategory} | ${logRisk} | ${logNotes.trim()}`,
      ],
      onConfirm: async () => {
        if (!accessToken) throw new Error('Please sign in again.');
        const range = encodeURIComponent(`${selectedTab}!A:D`);
        const res = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${selectedSheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              values: [[today, logCategory, logRisk, logNotes.trim()]],
            }),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error?.message || 'Unable to append row.');
        }
        const idToken = await getIdToken();
        if (idToken) {
          await fetch('/api/reports', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
              category: logCategory,
              riskLevel: logRisk,
              summary: logNotes.trim(),
              sheetSpreadsheetId: selectedSheetId,
            }),
          });
        }
        setLogNotes('');
        await loadSheetValues(selectedSheetId, selectedTab);
        setStatusMessage(dict.workspace.sheets.appendSuccess);
      },
    });
  };

  // --- GOOGLE CALENDAR HANDLERS ---
  const handleLoadEvents = async () => {
    if (!accessToken) return;
    clearFeedback();
    setIsWorking(true);
    try {
      const timeMin = encodeURIComponent(new Date().toISOString());
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&maxResults=8&singleEvents=true&orderBy=startTime`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || 'Unable to load Calendar events.');
      }
      const mapped: CalendarEventItem[] = (data.items || []).map(
        (ev: {
          id: string;
          summary?: string;
          start?: { dateTime?: string; date?: string };
          hangoutLink?: string;
        }) => ({
          id: ev.id,
          summary: ev.summary || '(Untitled Event)',
          start: ev.start?.dateTime || ev.start?.date || '',
          hangoutLink: ev.hangoutLink,
        })
      );
      setCalendarEvents(mapped);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to fetch Google Calendar.'
      );
    } finally {
      setIsWorking(false);
    }
  };

  const handleConfirmCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventDate) return;
    setPendingConfirm({
      title: dict.workspace.calendar.createConfirmTitle,
      description: dict.workspace.calendar.createConfirmDesc,
      details: [
        `Title: ${eventTitle.trim()}`,
        `When: ${eventDate} at ${eventTime} (Africa/Kampala)`,
        includeMeetInEvent ? 'Includes Google Meet video link' : 'In-person / No Meet link',
      ],
      onConfirm: async () => {
        if (!accessToken) throw new Error('Please sign in again.');
        const startIso = `${eventDate}T${eventTime}:00+03:00`;
        const endDateObj = new Date(startIso);
        endDateObj.setHours(endDateObj.getHours() + 1);

        const body: Record<string, unknown> = {
          summary: eventTitle.trim(),
          description: eventDesc.trim(),
          start: { dateTime: startIso, timeZone: 'Africa/Kampala' },
          end: { dateTime: endDateObj.toISOString(), timeZone: 'Africa/Kampala' },
        };

        if (includeMeetInEvent) {
          body.conferenceData = {
            createRequest: {
              requestId: `safeclick-${Date.now()}`,
              conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
          };
        }

        const res = await fetch(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error?.message || 'Unable to create Calendar event.');
        }

        const idToken = await getIdToken();
        if (idToken) {
          await fetch('/api/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
              title: eventTitle.trim(),
              eventType: 'workshop',
              eventDate: `${eventDate} ${eventTime}`,
              googleCalendarEventId: data.id,
              meetLink: data.hangoutLink || null,
            }),
          });
          await loadSavedMeetings();
        }

        await handleLoadEvents();
        setStatusMessage(dict.workspace.calendar.createdSuccess);
      },
    });
  };

  const handleConfirmDeleteEvent = (ev: CalendarEventItem) => {
    setPendingConfirm({
      title: dict.workspace.calendar.deleteConfirmTitle,
      description: dict.workspace.calendar.deleteConfirmDesc,
      details: [`Event: ${ev.summary}`, `Start: ${ev.start}`],
      onConfirm: async () => {
        if (!accessToken) throw new Error('Please sign in again.');
        const res = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events/${ev.id}`,
          {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (!res.ok && res.status !== 204) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error?.message || 'Unable to delete event.');
        }
        setCalendarEvents((prev) => prev.filter((item) => item.id !== ev.id));
        setStatusMessage(dict.workspace.calendar.deletedSuccess);
      },
    });
  };

  // --- GOOGLE MEET HANDLER ---
  const handleConfirmCreateMeet = () => {
    setPendingConfirm({
      title: dict.workspace.meet.createConfirmTitle,
      description: dict.workspace.meet.createConfirmDesc,
      details: ['Creates a live Google Meet space for a SafeClick UG safety clinic'],
      onConfirm: async () => {
        if (!accessToken) throw new Error('Please sign in again.');
        const res = await fetch('https://meet.googleapis.com/v2/spaces', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error?.message || 'Unable to create Google Meet space.');
        }

        setCreatedMeetUri(data.meetingUri || null);
        setCreatedMeetCode(data.meetingCode || null);

        const idToken = await getIdToken();
        if (idToken && data.meetingUri) {
          await fetch('/api/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
              title: 'Instant Google Meet Safety Clinic',
              eventType: 'meet_clinic',
              eventDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
              meetLink: data.meetingUri,
            }),
          });
          await loadSavedMeetings();
        }
      },
    });
  };

  const handleCopyMeetLink = async () => {
    if (!createdMeetUri) return;
    try {
      await navigator.clipboard.writeText(createdMeetUri);
      setCopiedMeet(true);
      setTimeout(() => setCopiedMeet(false), 2500);
    } catch {
      // Ignore clipboard failures
    }
  };

  if (needsAuth || !user) {
    return (
      <div className="max-w-2xl mx-auto">
        <section className="rounded-3xl bg-white border border-slate-200 p-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-[#0B3B8C] text-white mx-auto flex items-center justify-center">
            <ShieldCheck className="w-8 h-8" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A]">
              {dict.workspace.signInTitle}
            </h1>
            <p className="text-base text-slate-700 max-w-lg mx-auto leading-relaxed">
              {dict.workspace.signInDesc}
            </p>
          </div>
          {authError && (
            <p className="text-sm font-semibold text-[#EA580C]" role="alert">
              {authError}
            </p>
          )}
          <div className="pt-2">
            <GoogleSignInButton
              onClick={() => void signIn()}
              disabled={isSigningIn}
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Account Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold text-[#0A0A0A]">
            {dict.workspace.title}
          </h1>
          <p className="text-base text-slate-700 max-w-3xl">
            {dict.workspace.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <span className="text-sm font-semibold text-slate-700">
            {user.email}
          </span>
          <button
            type="button"
            onClick={() => void signOut()}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 bg-white text-[#0A0A0A] text-sm font-semibold hover:bg-slate-50 cursor-pointer"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            <span>{dict.workspace.signOut}</span>
          </button>
        </div>
      </div>

      {/* Reconnect prompt if page reloaded and in-memory OAuth token is cleared */}
      {!accessToken && (
        <div className="rounded-2xl bg-[#FFF7ED] border border-[#EA580C]/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base font-medium text-[#0A0A0A]">
            {dict.workspace.reconnectPrompt}
          </p>
          <GoogleSignInButton
            onClick={() => void signIn()}
            disabled={isSigningIn}
            label={dict.workspace.reconnectBtn}
          />
        </div>
      )}

      {/* Workspace Tabs */}
      <div
        className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 w-fit"
        role="tablist"
        aria-label="Google Workspace Tools"
      >
        {(
          [
            { id: 'gmail', label: dict.workspace.tabs.gmail, Icon: Mail },
            { id: 'sheets', label: dict.workspace.tabs.sheets, Icon: FileSpreadsheet },
            { id: 'calendar', label: dict.workspace.tabs.calendar, Icon: Calendar },
            { id: 'meet', label: dict.workspace.tabs.meet, Icon: Video },
          ] as const
        ).map(({ id, label, Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                clearFeedback();
                setActiveTab(id);
              }}
              className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                active
                  ? 'bg-[#0B3B8C] text-white shadow-2xs'
                  : 'text-slate-700 hover:text-[#0A0A0A]'
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Status & Error Banners */}
      {statusMessage && (
        <div
          className="rounded-xl bg-blue-50 border border-[#0B3B8C]/30 p-4 text-sm font-semibold text-[#0B3B8C]"
          role="status"
        >
          {statusMessage}
        </div>
      )}
      {errorMessage && (
        <div
          className="rounded-xl bg-orange-50 border border-[#EA580C] p-4 text-sm font-semibold text-[#0A0A0A]"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {/* TAB 1: GMAIL */}
      {activeTab === 'gmail' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-[#0A0A0A]">
                  {dict.workspace.gmail.heading}
                </h2>
                <button
                  type="button"
                  disabled={!accessToken || isWorking}
                  onClick={() => void handleLoadInbox()}
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#0B3B8C] text-white text-sm font-bold hover:bg-[#1D4ED8] disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" aria-hidden="true" />
                  <span>{dict.workspace.gmail.loadInbox}</span>
                </button>
              </div>

              {emails.length === 0 ? (
                <p className="text-base text-slate-600">
                  {dict.workspace.gmail.emptyInbox}
                </p>
              ) : (
                <div className="space-y-3">
                  {emails.map((email) => (
                    <div
                      key={email.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2"
                    >
                      <div className="font-bold text-[#0A0A0A]">{email.subject}</div>
                      <div className="text-xs text-slate-500">{email.from}</div>
                      <p className="text-sm text-slate-700">{email.snippet}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => void handleScanEmail(email)}
                          className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 rounded-lg bg-[#0B3B8C] text-white text-xs font-bold hover:bg-[#1D4ED8] cursor-pointer"
                        >
                          <SearchCheck className="w-4 h-4" aria-hidden="true" />
                          <span>{dict.workspace.gmail.scanBtn}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onAskAssistant(
                              `Please check if this email looks like a scam and explain why:\nSubject: ${email.subject}\nFrom: ${email.from}\nContent: ${email.snippet}`
                            )
                          }
                          className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 rounded-lg bg-white border border-slate-300 text-[#0A0A0A] text-xs font-bold hover:bg-slate-100 cursor-pointer"
                        >
                          <span>{dict.workspace.gmail.askAiBtn}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {scannedEmail && (
                <div className="rounded-xl border border-[#EA580C]/50 bg-[#FFF7ED] p-4 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#0A0A0A]">
                    <ShieldAlert className="w-5 h-5 text-[#EA580C]" aria-hidden="true" />
                    <span>
                      {scannedEmail.email.subject} ·{' '}
                      {scannedEmail.result.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  {scannedEmail.result.indicators.length > 0 ? (
                    <ul className="list-disc pl-5 text-sm text-slate-800 space-y-1">
                      {scannedEmail.result.indicators.map((ind) => (
                        <li key={ind.id}>{pick(ind.label)}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-800">
                      {dict.scamChecker.noSignsNote}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <form
            onSubmit={handleConfirmSendEmail}
            className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 space-y-4"
          >
            <h3 className="text-lg font-bold text-[#0A0A0A]">
              {dict.workspace.gmail.composeHeading}
            </h3>
            <div className="space-y-1">
              <label htmlFor="gmail-to" className="text-sm font-bold text-[#0A0A0A]">
                {dict.workspace.gmail.toLabel}
              </label>
              <input
                id="gmail-to"
                type="email"
                required
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                placeholder="name@example.com"
                className="w-full min-h-[44px] rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-base"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="gmail-sub" className="text-sm font-bold text-[#0A0A0A]">
                {dict.workspace.gmail.subjectLabel}
              </label>
              <input
                id="gmail-sub"
                type="text"
                required
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-base"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="gmail-body" className="text-sm font-bold text-[#0A0A0A]">
                {dict.workspace.gmail.bodyLabel}
              </label>
              <textarea
                id="gmail-body"
                rows={4}
                required
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Share a SafeClick UG safety reminder..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-base"
              />
            </div>
            <button
              type="submit"
              disabled={!accessToken || isWorking}
              className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl bg-[#EA580C] text-white font-bold text-base hover:bg-[#C2410C] disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>{dict.workspace.gmail.sendBtn}</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: GOOGLE SHEETS */}
      {activeTab === 'sheets' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#0A0A0A]">
                {dict.workspace.sheets.heading}
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={!accessToken || isWorking}
                  onClick={() => void handleLoadSpreadsheets()}
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#0B3B8C] text-white text-sm font-bold hover:bg-[#1D4ED8] disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" aria-hidden="true" />
                  <span>{dict.workspace.sheets.loadSheets}</span>
                </button>
                <button
                  type="button"
                  disabled={!accessToken || isWorking}
                  onClick={handleConfirmCreateSheet}
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#EA580C] text-white text-sm font-bold hover:bg-[#C2410C] disabled:opacity-50 cursor-pointer"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span>{dict.workspace.sheets.createSheet}</span>
                </button>
              </div>
            </div>

            {spreadsheets.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="sheet-select"
                    className="block text-sm font-bold text-[#0A0A0A] mb-1"
                  >
                    {dict.workspace.sheets.selectSheet}
                  </label>
                  <select
                    id="sheet-select"
                    value={selectedSheetId}
                    onChange={(e) => void loadSpreadsheetMetadata(e.target.value)}
                    className="w-full min-h-[44px] rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm"
                  >
                    {spreadsheets.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {sheetTabs.length > 0 && (
                  <div>
                    <label
                      htmlFor="tab-select"
                      className="block text-sm font-bold text-[#0A0A0A] mb-1"
                    >
                      {dict.workspace.sheets.selectTab}
                    </label>
                    <select
                      id="tab-select"
                      value={selectedTab}
                      onChange={(e) => {
                        setSelectedTab(e.target.value);
                        void loadSheetValues(selectedSheetId, e.target.value);
                      }}
                      className="w-full min-h-[44px] rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm"
                    >
                      {sheetTabs.map((tab) => (
                        <option key={tab} value={tab}>
                          {tab}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {sheetRows.length > 0 && (
              <div className="space-y-2 overflow-x-auto">
                <h3 className="text-sm font-bold text-slate-600">
                  {dict.workspace.sheets.previewHeading}
                </h3>
                <table className="w-full text-left border-collapse text-sm">
                  <tbody>
                    {sheetRows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={
                          rIdx === 0
                            ? 'bg-[#0B3B8C] text-white font-bold'
                            : 'border-b border-slate-200'
                        }
                      >
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-3 py-2">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <form
            onSubmit={handleConfirmAppendRow}
            className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 space-y-4"
          >
            <h3 className="text-lg font-bold text-[#0A0A0A]">
              {dict.workspace.sheets.appendHeading}
            </h3>
            <div className="space-y-1">
              <label htmlFor="log-cat" className="text-sm font-bold text-[#0A0A0A]">
                {dict.workspace.sheets.categoryLabel}
              </label>
              <input
                id="log-cat"
                type="text"
                required
                value={logCategory}
                onChange={(e) => setLogCategory(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-base"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="log-risk" className="text-sm font-bold text-[#0A0A0A]">
                {dict.workspace.sheets.riskLabel}
              </label>
              <input
                id="log-risk"
                type="text"
                required
                value={logRisk}
                onChange={(e) => setLogRisk(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-base"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="log-notes" className="text-sm font-bold text-[#0A0A0A]">
                {dict.workspace.sheets.notesLabel}
              </label>
              <textarea
                id="log-notes"
                rows={3}
                required
                value={logNotes}
                onChange={(e) => setLogNotes(e.target.value)}
                placeholder="e.g., Warned market group about fake Mobile Money reversal SMS"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-base"
              />
            </div>
            <button
              type="submit"
              disabled={!accessToken || !selectedSheetId || isWorking}
              className="w-full min-h-[48px] rounded-xl bg-[#0B3B8C] text-white font-bold text-base hover:bg-[#1D4ED8] disabled:opacity-50 cursor-pointer"
            >
              {dict.workspace.sheets.appendBtn}
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: GOOGLE CALENDAR */}
      {activeTab === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#0A0A0A]">
                {dict.workspace.calendar.heading}
              </h2>
              <button
                type="button"
                disabled={!accessToken || isWorking}
                onClick={() => void handleLoadEvents()}
                className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#0B3B8C] text-white text-sm font-bold hover:bg-[#1D4ED8] disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                <span>{dict.workspace.calendar.loadEvents}</span>
              </button>
            </div>

            {calendarEvents.length > 0 && (
              <div className="space-y-3">
                {calendarEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-[#0A0A0A]">{ev.summary}</div>
                      <div className="text-xs text-slate-600 tabular-nums">
                        {ev.start}
                      </div>
                      {ev.hangoutLink && (
                        <a
                          href={ev.hangoutLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#0B3B8C] hover:underline"
                        >
                          <Video className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Join Meet</span>
                        </a>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleConfirmDeleteEvent(ev)}
                      className="inline-flex items-center gap-1.5 min-h-[40px] px-3 rounded-lg border border-orange-300 bg-white text-[#EA580C] text-xs font-bold hover:bg-orange-50 cursor-pointer self-start sm:self-center"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                      <span>{dict.workspace.calendar.deleteBtn}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={handleConfirmCreateEvent}
            className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 space-y-4"
          >
            <h3 className="text-lg font-bold text-[#0A0A0A]">
              {dict.workspace.calendar.createHeading}
            </h3>
            <div className="space-y-1">
              <label htmlFor="cal-title" className="text-sm font-bold text-[#0A0A0A]">
                {dict.workspace.calendar.titleLabel}
              </label>
              <input
                id="cal-title"
                type="text"
                required
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-base"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="cal-date" className="text-sm font-bold text-[#0A0A0A]">
                  {dict.workspace.calendar.dateLabel}
                </label>
                <input
                  id="cal-date"
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full min-h-[44px] rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="cal-time" className="text-sm font-bold text-[#0A0A0A]">
                  {dict.workspace.calendar.timeLabel}
                </label>
                <input
                  id="cal-time"
                  type="time"
                  required
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full min-h-[44px] rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="cal-desc" className="text-sm font-bold text-[#0A0A0A]">
                {dict.workspace.calendar.descLabel}
              </label>
              <textarea
                id="cal-desc"
                rows={2}
                value={eventDesc}
                onChange={(e) => setEventDesc(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm"
              />
            </div>
            <label className="flex items-center gap-2.5 text-sm font-medium text-[#0A0A0A] cursor-pointer">
              <input
                type="checkbox"
                checked={includeMeetInEvent}
                onChange={(e) => setIncludeMeetInEvent(e.target.checked)}
                className="w-4 h-4 accent-[#0B3B8C]"
              />
              <span>{dict.workspace.calendar.addMeetLabel}</span>
            </label>
            <button
              type="submit"
              disabled={!accessToken || isWorking}
              className="w-full min-h-[48px] rounded-xl bg-[#EA580C] text-white font-bold text-base hover:bg-[#C2410C] disabled:opacity-50 cursor-pointer"
            >
              {dict.workspace.calendar.createBtn}
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: GOOGLE MEET */}
      {activeTab === 'meet' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <section className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 space-y-5">
            <h2 className="text-xl font-bold text-[#0A0A0A]">
              {dict.workspace.meet.heading}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              {dict.workspace.meet.desc}
            </p>
            <button
              type="button"
              disabled={!accessToken || isWorking}
              onClick={handleConfirmCreateMeet}
              className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-[#0B3B8C] text-white font-bold text-base hover:bg-[#1D4ED8] disabled:opacity-50 cursor-pointer"
            >
              <Video className="w-5 h-5" aria-hidden="true" />
              <span>{dict.workspace.meet.createBtn}</span>
            </button>

            {createdMeetUri && (
              <div className="rounded-2xl bg-blue-50 border border-[#0B3B8C]/30 p-5 space-y-3">
                <div className="text-sm font-mono font-bold text-[#0B3B8C]">
                  {createdMeetCode || createdMeetUri}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={createdMeetUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#EA580C] text-white text-sm font-bold hover:bg-[#C2410C]"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span>{dict.workspace.meet.joinBtn}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => void handleCopyMeetLink()}
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-white border border-slate-300 text-[#0A0A0A] text-sm font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    {copiedMeet ? (
                      <>
                        <Check className="w-4 h-4 text-[#0B3B8C]" aria-hidden="true" />
                        <span>{dict.workspace.meet.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>{dict.workspace.meet.copyLink}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#0A0A0A]">
              {dict.workspace.meet.recentMeetings}
            </h3>
            {savedMeetings.length === 0 ? (
              <p className="text-sm text-slate-600">
                Created clinic rooms and scheduled workshops appear here.
              </p>
            ) : (
              <div className="space-y-3">
                {savedMeetings.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-sm text-[#0A0A0A]">{m.title}</div>
                      <div className="text-xs text-slate-500 tabular-nums">
                        {m.eventDate}
                      </div>
                    </div>
                    {m.meetLink && (
                      <a
                        href={m.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 min-h-[40px] px-3 rounded-lg bg-[#0B3B8C] text-white text-xs font-bold hover:bg-[#1D4ED8]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Join</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* Mandatory Explicit User Confirmation Modal for Workspace Mutations */}
      {pendingConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="workspace-confirm-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200 space-y-4">
            <h3
              id="workspace-confirm-title"
              className="text-xl font-bold text-[#0A0A0A]"
            >
              {pendingConfirm.title}
            </h3>
            <p className="text-base text-slate-700">{pendingConfirm.description}</p>
            <ul className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-1.5 text-sm text-[#0A0A0A]">
              {pendingConfirm.details.map((line, i) => (
                <li key={i} className="break-words">
                  {line}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                disabled={isWorking}
                onClick={() => void executeConfirmed()}
                className="flex-1 min-h-[48px] rounded-xl bg-[#0B3B8C] text-white font-bold text-base hover:bg-[#1D4ED8] disabled:opacity-50 cursor-pointer"
              >
                {dict.workspace.confirmAction}
              </button>
              <button
                type="button"
                disabled={isWorking}
                onClick={() => setPendingConfirm(null)}
                className="flex-1 min-h-[48px] rounded-xl bg-slate-100 text-[#0A0A0A] font-semibold text-base hover:bg-slate-200 cursor-pointer"
              >
                {dict.workspace.cancelAction}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
