/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveScreen, PracticeSession, Question, AppSettings, UserProfile } from './types';
import { CURRICULAR_WEEKS } from './data/curriculumData';
import {
  getStoredQuestions,
  saveQuestions,
  resetQuestionsToDefault,
  getStoredSessions,
  saveSessions,
  saveNewSession,
  getStoredSettings,
  saveSettings,
  getActiveSession,
  setActiveSession,
  getReviewSessionId,
  setReviewSessionId,
  getStoredUsers,
  saveUsers,
  getActiveUserId,
  setActiveUserId,
  upsertUser,
  playSound
} from './utils/storage';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DashboardView } from './views/DashboardView';
import { PracticeSetupView } from './views/PracticeSetupView';
import { ActiveQuizView } from './views/ActiveQuizView';
import { ResultsView } from './views/ResultsView';
import { ReviewView } from './views/ReviewView';
import { SettingsView } from './views/SettingsView';
import { AppGuideModal } from './components/AppGuideModal';
import { UserLayerModal } from './components/UserLayerModal';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('dashboard');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [settings, setSettings] = useState<AppSettings>(getStoredSettings);
  const [users, setUsers] = useState<UserProfile[]>(getStoredUsers);
  const [activeUserIdState, setActiveUserIdState] = useState<string>(getActiveUserId);
  const [currentActiveSession, setCurrentActiveSession] = useState<PracticeSession | null>(null);
  const [activeReviewSessionId, setActiveReviewSessionIdState] = useState<string | null>(null);
  const [lastFinishedSession, setLastFinishedSession] = useState<PracticeSession | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Active user profile
  const activeUser = users.find(u => u.id === activeUserIdState) || users[0] || {
    id: 'user-1',
    label: 'User 1',
    name: 'User 1',
    createdAt: Date.now()
  };

  // Initialize data on mount
  useEffect(() => {
    const loadedQuestions = getStoredQuestions();
    const loadedSessions = getStoredSessions();
    const loadedUsers = getStoredUsers();
    const activeUid = getActiveUserId();
    const loadedActive = getActiveSession();
    const savedReviewId = getReviewSessionId();

    setQuestions(loadedQuestions);
    setSessions(loadedSessions);
    setUsers(loadedUsers);
    setActiveUserIdState(activeUid);
    setCurrentActiveSession(loadedActive);
    setActiveReviewSessionIdState(savedReviewId || (loadedSessions[0]?.id ?? null));
  }, []);

  // Sync active screen with URL hash or state
  const handleNavigate = (screen: ActiveScreen) => {
    playSound('click');
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // User layer operations
  const handleSelectUser = (user: UserProfile) => {
    setActiveUserIdState(user.id);
    setActiveUserId(user.id);
    playSound('select');
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    const updatedList = upsertUser(updatedUser);
    setUsers(updatedList);
    // Also update any sessions that this user completed
    const updatedSessions = sessions.map(s => {
      if (s.userId === updatedUser.id) {
        return {
          ...s,
          userName: updatedUser.name,
          userLabel: updatedUser.label
        };
      }
      return s;
    });
    setSessions(updatedSessions);
    saveSessions(updatedSessions);
  };

  const handleCreateUser = (name: string, roleTitle: string) => {
    const newCount = users.length + 1;
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      label: `User ${newCount}`,
      name: name.startsWith('User') ? name : `User ${newCount} (${name})`,
      roleTitle: roleTitle || 'Candidate',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuActluAf71OpO07pmCtN-csrAAjfASFz2_wpDm7rXJ-E9zu8rD3j-ZpmQTScIaJrFB_VWCZ7KzSkfpkWgDSygadTu424TsPP5SpCpRD1ujKX4Jf-SU9X-3HZIzeX4iMXIrHA3frdRPpV1eHa-NlmOhyVTwcVQdYj16c35KbttD4IkiVchIt5FLW0uzGiY20GJdg2fEjDw_DJsVxYmJvbPPtT7BnWUga-bcsRL7M1jvL1p00t4mm5JzY7g',
      createdAt: Date.now()
    };
    const updated = [...users, newUser];
    setUsers(updated);
    saveUsers(updated);
    setActiveUserIdState(newUser.id);
    setActiveUserId(newUser.id);
  };

  // Launch a session from Dashboard or presets
  const handleStartSession = (mode: string, weekNum?: number) => {
    let selectedQs: Question[] = [];
    let title = 'Practice Session';
    let sub = 'Networking Drill';

    if (mode === 'quick_20') {
      title = 'Network Exam Readiness Test';
      sub = '20 Randomized Balanced MCQs';
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      selectedQs = shuffled.slice(0, 20);
    } else if (mode.startsWith('week_') && weekNum) {
      const wk = CURRICULAR_WEEKS.find(w => w.week === weekNum);
      title = `${wk?.weekCode}: ${wk?.title}`;
      sub = 'Curricular Drill (10 MCQs)';
      selectedQs = questions.filter(q => q.week === weekNum);
    } else if (mode === 'entire_bank') {
      title = 'Full Comprehensive Curricular Bank';
      sub = 'All 120 Questions';
      selectedQs = [...questions];
    } else {
      handleNavigate('practice-setup');
      return;
    }

    if (selectedQs.length === 0) {
      selectedQs = questions.slice(0, 20);
    }

    const newSession: PracticeSession = {
      id: Date.now().toString(),
      userId: activeUser.id,
      userName: activeUser.name,
      userLabel: activeUser.label,
      timestamp: Date.now(),
      formattedDate: 'Just now',
      mode,
      modeTitle: title,
      subTitle: sub,
      weekNumber: weekNum,
      questionIds: selectedQs.map(q => q.id),
      userAnswers: {},
      flaggedIds: [],
      totalQuestions: selectedQs.length,
      score: 0,
      accuracy: 0,
      durationSeconds: 0,
      completed: false,
    };

    setCurrentActiveSession(newSession);
    setActiveSession(newSession);
    setActiveScreen('active-quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch custom configured session from PracticeSetupView
  const handleLaunchCustomSession = (config: {
    title: string;
    subTitle: string;
    questionCount: number;
    selectedWeeks: number[];
    timed: boolean;
    durationMinutes: number;
    instantFeedback: boolean;
  }) => {
    let pool = questions.filter(q => config.selectedWeeks.includes(q.week));
    if (pool.length === 0) pool = questions;

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selectedQs = shuffled.slice(0, config.questionCount);

    const newSession: PracticeSession = {
      id: Date.now().toString(),
      userId: activeUser.id,
      userName: activeUser.name,
      userLabel: activeUser.label,
      timestamp: Date.now(),
      formattedDate: 'Just now',
      mode: 'custom',
      modeTitle: config.title,
      subTitle: config.subTitle,
      questionIds: selectedQs.map(q => q.id),
      userAnswers: {},
      flaggedIds: [],
      totalQuestions: selectedQs.length,
      score: 0,
      accuracy: 0,
      durationSeconds: 0,
      completed: false,
    };

    setCurrentActiveSession(newSession);
    setActiveSession(newSession);
    setActiveScreen('active-quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Answer a question during active quiz
  const handleAnswerQuestion = (questionId: string, answerIndex: number) => {
    if (!currentActiveSession) return;
    const updatedAnswers = {
      ...currentActiveSession.userAnswers,
      [questionId]: answerIndex
    };
    const updatedSession = {
      ...currentActiveSession,
      userAnswers: updatedAnswers
    };
    setCurrentActiveSession(updatedSession);
    setActiveSession(updatedSession);
  };

  // Toggle flag on a question
  const handleToggleFlag = (questionId: string) => {
    if (!currentActiveSession) return;
    const isFlagged = currentActiveSession.flaggedIds.includes(questionId);
    const updatedFlags = isFlagged
      ? currentActiveSession.flaggedIds.filter(id => id !== questionId)
      : [...currentActiveSession.flaggedIds, questionId];

    const updatedSession = {
      ...currentActiveSession,
      flaggedIds: updatedFlags
    };
    setCurrentActiveSession(updatedSession);
    setActiveSession(updatedSession);
  };

  // Finish exam and compute score
  const handleFinishSession = () => {
    if (!currentActiveSession) return;

    let score = 0;
    currentActiveSession.questionIds.forEach(qId => {
      const q = questions.find(item => item.id === qId);
      if (q && currentActiveSession.userAnswers[qId] === q.correctAnswer) {
        score += 1;
      }
    });

    const total = currentActiveSession.totalQuestions || currentActiveSession.questionIds.length;
    const accuracy = total > 0 ? (score / total) * 100 : 0;

    const completedSession: PracticeSession = {
      ...currentActiveSession,
      userId: currentActiveSession.userId || activeUser.id,
      userName: currentActiveSession.userName || activeUser.name,
      userLabel: currentActiveSession.userLabel || activeUser.label,
      score,
      accuracy,
      completed: true
    };

    const updatedSessions = saveNewSession(completedSession);
    setSessions(updatedSessions);
    setCurrentActiveSession(null);
    setActiveSession(null);
    setLastFinishedSession(completedSession);
    setActiveReviewSessionIdState(completedSession.id);
    setReviewSessionId(completedSession.id);

    playSound('complete');
    setActiveScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quit active quiz
  const handleQuitSession = () => {
    setCurrentActiveSession(null);
    setActiveSession(null);
    setActiveScreen('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Review a specific session
  const handleReviewSession = (sessionId: string) => {
    setActiveReviewSessionIdState(sessionId);
    setReviewSessionId(sessionId);
    setActiveScreen('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Retake an exam or retake missed questions
  const handleRetakeSession = (sessionToRetake: PracticeSession, missedOnly: boolean) => {
    let questionIds = sessionToRetake.questionIds;

    if (missedOnly) {
      questionIds = sessionToRetake.questionIds.filter(qId => {
        const q = questions.find(item => item.id === qId);
        return q && sessionToRetake.userAnswers[qId] !== q.correctAnswer;
      });
    }

    if (questionIds.length === 0) {
      questionIds = sessionToRetake.questionIds;
    }

    const retakeSession: PracticeSession = {
      id: Date.now().toString(),
      userId: activeUser.id,
      userName: activeUser.name,
      userLabel: activeUser.label,
      timestamp: Date.now(),
      formattedDate: 'Just now',
      mode: sessionToRetake.mode,
      modeTitle: missedOnly ? `Retake Missed (${questionIds.length} MCQs)` : `Retake: ${sessionToRetake.modeTitle}`,
      subTitle: sessionToRetake.subTitle,
      questionIds,
      userAnswers: {},
      flaggedIds: [],
      totalQuestions: questionIds.length,
      score: 0,
      accuracy: 0,
      durationSeconds: 0,
      completed: false
    };

    setCurrentActiveSession(retakeSession);
    setActiveSession(retakeSession);
    setActiveScreen('active-quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Restore 120-question bank
  const handleRestoreQuestions = () => {
    const def = resetQuestionsToDefault();
    setQuestions(def);
  };

  // Reset local cache completely
  const handleResetCache = () => {
    localStorage.clear();
    const defQs = resetQuestionsToDefault();
    setQuestions(defQs);
    const defSessions = getStoredSessions();
    setSessions(defSessions);
    const defUsers = getStoredUsers();
    setUsers(defUsers);
    setActiveUserIdState('user-1');
    setCurrentActiveSession(null);
    setActiveReviewSessionIdState(defSessions[0]?.id || null);
    setSettings(getStoredSettings());
    setActiveScreen('dashboard');
  };

  // Import questions JSON
  const handleImportQuestions = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].question && parsed[0].options) {
          saveQuestions(parsed);
          setQuestions(parsed);
          alert(`Successfully imported ${parsed.length} questions into question bank!`);
        } else {
          alert('Invalid JSON format. Please provide an array of Question objects with question, options, and correctAnswer.');
        }
      } catch {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Update Settings
  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Top Navigation Header with Active User Badge & Guide Button */}
      <Header
        activeScreen={activeScreen}
        activeUser={activeUser}
        onNavigate={handleNavigate}
        onOpenGuide={() => {
          playSound('click');
          setIsGuideOpen(true);
        }}
        onOpenUserModal={() => {
          playSound('click');
          setIsUserModalOpen(true);
        }}
        totalQuestions={questions.length}
      />

      {/* Main Content Viewport */}
      <main className="w-full pt-28 bg-surface flex-1 max-w-7xl mx-auto px-6 lg:px-12">
        {activeScreen === 'dashboard' && (
          <DashboardView
            weeks={CURRICULAR_WEEKS}
            questions={questions}
            sessions={sessions}
            users={users}
            activeUser={activeUser}
            onSelectUser={handleSelectUser}
            onOpenUserModal={() => setIsUserModalOpen(true)}
            onStartSession={handleStartSession}
            onReviewSession={handleReviewSession}
            onRestoreQuestions={handleRestoreQuestions}
            onResetCache={handleResetCache}
            onImportQuestions={handleImportQuestions}
          />
        )}

        {activeScreen === 'practice-setup' && (
          <PracticeSetupView
            weeks={CURRICULAR_WEEKS}
            totalQuestionsCount={questions.length}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onLaunchCustomSession={handleLaunchCustomSession}
          />
        )}

        {activeScreen === 'active-quiz' && (
          <ActiveQuizView
            session={currentActiveSession}
            questions={questions}
            onAnswerQuestion={handleAnswerQuestion}
            onToggleFlag={handleToggleFlag}
            onFinishSession={handleFinishSession}
            onQuitSession={handleQuitSession}
            onNavigateToSetup={() => handleNavigate('practice-setup')}
          />
        )}

        {activeScreen === 'results' && (
          <ResultsView
            session={lastFinishedSession || sessions[0] || null}
            questions={questions}
            weeks={CURRICULAR_WEEKS}
            onReviewSession={handleReviewSession}
            onRetakeSession={handleRetakeSession}
            onNavigateToDashboard={() => handleNavigate('dashboard')}
          />
        )}

        {activeScreen === 'review' && (
          <ReviewView
            sessions={sessions}
            activeReviewSessionId={activeReviewSessionId}
            onSelectSession={(id) => {
              setActiveReviewSessionIdState(id);
              setReviewSessionId(id);
            }}
            questions={questions}
            onNavigateToSetup={() => handleNavigate('practice-setup')}
          />
        )}

        {activeScreen === 'settings' && (
          <SettingsView
            questions={questions}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onRestoreQuestions={handleRestoreQuestions}
            onResetCache={handleResetCache}
            onImportQuestions={handleImportQuestions}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer />

      {/* Interactive App Guide Walkthrough Modal */}
      <AppGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onNavigateScreen={(screen) => setActiveScreen(screen)}
      />

      {/* Candidate / User Layer Modal */}
      <UserLayerModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        users={users}
        activeUser={activeUser}
        sessions={sessions}
        onSelectUser={handleSelectUser}
        onUpdateUser={handleUpdateUser}
        onCreateUser={handleCreateUser}
        onReviewSession={handleReviewSession}
      />
    </div>
  );
}
