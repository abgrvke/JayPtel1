import { Question, PracticeSession, AppSettings, UserProfile } from '../types';
import { INITIAL_QUESTIONS, DEMO_SESSIONS } from '../data/curriculumData';

const QUESTIONS_KEY = 'netprep_questions_v2';
const SESSIONS_KEY = 'netprep_sessions_v2';
const SETTINGS_KEY = 'netprep_settings_v2';
const ACTIVE_SESSION_KEY = 'netprep_active_session_v2';
const REVIEW_ID_KEY = 'netprep_review_id_v2';
const USERS_KEY = 'netprep_users_v2';
const ACTIVE_USER_ID_KEY = 'netprep_active_user_id_v2';

export const DEFAULT_SETTINGS: AppSettings = {
  timedMode: true,
  minutesPerQuestion: 1.5,
  instantFeedback: false,
  soundEffects: true,
  shuffleQuestions: true,
  shuffleOptions: false
};

// --- User Layer Storage API ---

/**
 * Returns stored users on this device.
 * For a brand new device, returns an empty array [].
 */
export function getStoredUsers(): UserProfile[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveUsers(users: UserProfile[]): void {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users', e);
  }
}

export function getActiveUserId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_USER_ID_KEY);
  } catch {
    return null;
  }
}

export function setActiveUserId(id: string | null): void {
  try {
    if (id) {
      localStorage.setItem(ACTIVE_USER_ID_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_USER_ID_KEY);
    }
  } catch (e) {
    console.error('Failed to save active user id', e);
  }
}

export function createNewUser(rawName: string, roleTitle = 'Candidate'): UserProfile {
  const currentUsers = getStoredUsers();
  const nextNum = currentUsers.length + 1;
  const trimmed = rawName.trim();
  const label = `User ${nextNum}`;
  // If user entered e.g. "Abhijeet", label is "User 1" and name is "User 1 (Abhijeet)" or "Abhijeet"
  const formattedName = trimmed ? `${label} (${trimmed})` : label;

  const newUser: UserProfile = {
    id: `user-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    label,
    name: formattedName,
    roleTitle: roleTitle || 'Candidate',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuActluAf71OpO07pmCtN-csrAAjfASFz2_wpDm7rXJ-E9zu8rD3j-ZpmQTScIaJrFB_VWCZ7KzSkfpkWgDSygadTu424TsPP5SpCpRD1ujKX4Jf-SU9X-3HZIzeX4iMXIrHA3frdRPpV1eHa-NlmOhyVTwcVQdYj16c35KbttD4IkiVchIt5FLW0uzGiY20GJdg2fEjDw_DJsVxYmJvbPPtT7BnWUga-bcsRL7M1jvL1p00t4mm5JzY7g',
    createdAt: Date.now()
  };

  const updated = [...currentUsers, newUser];
  saveUsers(updated);
  setActiveUserId(newUser.id);
  return newUser;
}

export function upsertUser(user: UserProfile): UserProfile[] {
  const current = getStoredUsers();
  const existingIdx = current.findIndex(u => u.id === user.id);
  let updated: UserProfile[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = user;
  } else {
    updated = [...current, user];
  }
  saveUsers(updated);
  return updated;
}

// --- Questions Storage API ---

export function getStoredQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(QUESTIONS_KEY);
    if (!raw) {
      saveQuestions(INITIAL_QUESTIONS);
      return INITIAL_QUESTIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_QUESTIONS;
  } catch {
    return INITIAL_QUESTIONS;
  }
}

export function saveQuestions(questions: Question[]): void {
  try {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
  } catch (e) {
    console.error('Failed to save questions to localStorage', e);
  }
}

export function resetQuestionsToDefault(): Question[] {
  saveQuestions(INITIAL_QUESTIONS);
  return INITIAL_QUESTIONS;
}

// --- Practice Sessions Storage API ---

/**
 * Returns completed practice sessions.
 * For a brand new device, returns empty array [] with 0 history.
 */
export function getStoredSessions(): PracticeSession[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSessions(sessions: PracticeSession[]): void {
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error('Failed to save sessions to localStorage', e);
  }
}

export function saveNewSession(session: PracticeSession): PracticeSession[] {
  const current = getStoredSessions();
  const updated = [session, ...current];
  saveSessions(updated);
  return updated;
}

// Optional helper to load demo sessions if explicitly clicked
export function seedDemoHistoryForTesting(activeUser: UserProfile): PracticeSession[] {
  const seeded = DEMO_SESSIONS.map((s, idx) => ({
    ...s,
    id: `seed-${Date.now()}-${idx}`,
    userId: activeUser.id,
    userName: activeUser.name,
    userLabel: activeUser.label
  }));
  saveSessions(seeded);
  return seeded;
}

export function getStoredSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

export function getActiveSession(): PracticeSession | null {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setActiveSession(session: PracticeSession | null): void {
  try {
    if (session) {
      localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    }
  } catch (e) {
    console.error('Failed to update active session', e);
  }
}

export function getReviewSessionId(): string | null {
  return localStorage.getItem(REVIEW_ID_KEY);
}

export function setReviewSessionId(id: string | null): void {
  if (id) {
    localStorage.setItem(REVIEW_ID_KEY, id);
  } else {
    localStorage.removeItem(REVIEW_ID_KEY);
  }
}

export function clearAllStorageData(): void {
  localStorage.clear();
}

// --- Sound Synthesizer via Web Audio API ---
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSound(type: 'click' | 'select' | 'correct' | 'wrong' | 'complete'): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'select') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(146.83, now + 0.18);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'complete') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554.37, now + 0.1);
      osc.frequency.setValueAtTime(659.25, now + 0.2);
      osc.frequency.setValueAtTime(880, now + 0.3);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    }
  } catch {
    // Ignore audio failures if browser blocks autoplay
  }
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
}
