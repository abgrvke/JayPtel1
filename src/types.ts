export interface UserProfile {
  id: string;
  label: string; // e.g. "User 1"
  name: string;  // e.g. "Abhijeet Ganguly"
  roleTitle?: string;
  avatarUrl?: string;
  createdAt: number;
}

export interface Question {
  id: string;
  week: number;
  weekTitle: string;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0, 1, 2, or 3
  explanation: string;
  distractorExplanations?: [string, string, string, string];
  rfcRef?: string;
  diagram?: string;
  difficulty: 'Standard' | 'Advanced' | 'Rigorous';
}

export interface CurricularWeek {
  week: number;
  weekCode: string;
  title: string;
  description: string;
  questionCount: number;
  bestScore?: number; // e.g. 90
  topics: string[];
}

export interface PracticeSession {
  id: string;
  userId: string;
  userName: string;
  userLabel?: string;
  timestamp: number;
  formattedDate: string;
  mode: string;
  modeTitle: string;
  subTitle: string;
  weekNumber?: number;
  questionIds: string[];
  userAnswers: Record<string, number>; // questionId -> selectedIndex
  flaggedIds: string[];
  totalQuestions: number;
  score: number;
  accuracy: number;
  durationSeconds: number;
  completed: boolean;
}

export interface AppSettings {
  timedMode: boolean;
  minutesPerQuestion: number;
  instantFeedback: boolean;
  soundEffects: boolean;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
}

export type ActiveScreen = 'dashboard' | 'practice-setup' | 'active-quiz' | 'results' | 'review' | 'settings';
