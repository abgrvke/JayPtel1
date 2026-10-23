import React, { useState } from 'react';
import { CurricularWeek, PracticeSession, Question, UserProfile } from '../types';
import { playSound } from '../utils/storage';

interface DashboardViewProps {
  weeks: CurricularWeek[];
  questions: Question[];
  sessions: PracticeSession[];
  users: UserProfile[];
  activeUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
  onOpenUserModal: () => void;
  onOpenNewUserModal?: () => void;
  onStartSession: (mode: string, weekNum?: number) => void;
  onReviewSession: (sessionId: string) => void;
  onRestoreQuestions: () => void;
  onResetCache: () => void;
  onImportQuestions: (file: File) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  weeks,
  questions,
  sessions,
  users,
  activeUser,
  onSelectUser,
  onOpenUserModal,
  onOpenNewUserModal,
  onStartSession,
  onReviewSession,
  onRestoreQuestions,
  onResetCache,
  onImportQuestions,
}) => {
  const [simulatedEmpty, setSimulatedEmpty] = useState(false);
  const [selectedUserFilter, setSelectedUserFilter] = useState<string>(activeUser.id);

  // Compute live metrics for total system
  const totalQuestionsCount = simulatedEmpty ? 0 : questions.length;
  const completedSessions = simulatedEmpty ? [] : sessions.filter(s => s.completed);

  // Active candidate's isolated metrics (0 for new user)
  const activeUserCompleted = simulatedEmpty 
    ? [] 
    : completedSessions.filter(s => s.userId === activeUser.id);

  let activeAttempted = 0;
  let activeCorrect = 0;
  activeUserCompleted.forEach(s => {
    activeAttempted += s.totalQuestions;
    activeCorrect += s.score;
  });

  const activeAccuracyPercent = activeAttempted > 0 
    ? ((activeCorrect / activeAttempted) * 100).toFixed(1)
    : '0.0';

  const activeAccuracyNum = parseFloat(activeAccuracyPercent);
  const activeRoundedAccuracy = Math.round(activeAccuracyNum);

  // Compute per-user stats for "Who Did What and By How Much"
  const userStats = users.map(u => {
    const uSessions = completedSessions.filter(s => s.userId === u.id);
    let uAttempted = 0;
    let uCorrect = 0;
    uSessions.forEach(s => {
      uAttempted += s.totalQuestions;
      uCorrect += s.score;
    });
    const acc = uAttempted > 0 ? (uCorrect / uAttempted) * 100 : 0;
    return {
      user: u,
      sessionsCount: uSessions.length,
      attempted: uAttempted,
      correct: uCorrect,
      accuracy: acc.toFixed(1),
      accuracyNum: acc
    };
  });

  const filteredSessions = selectedUserFilter === 'all'
    ? sessions
    : sessions.filter(s => s.userId === selectedUserFilter);

  const handleToggleEmptyState = () => {
    playSound('click');
    setSimulatedEmpty(prev => !prev);
  };

  const handleStart = (mode: string, weekNum?: number) => {
    playSound('click');
    onStartSession(mode, weekNum);
  };

  const handleReview = (id: string) => {
    playSound('click');
    onReviewSession(id);
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-10">
      {/* Ambient background glow accents */}
      <div className="relative w-full">
        <div className="absolute -top-12 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-48 right-10 w-80 h-80 bg-tertiary-container/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Dashboard Top Bar: System Status & Diagnostic Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(79,55,138,0.6)]"></div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-on-surface-variant">
              Console :: Local Engine Ready (12/12 Packages Loaded)
            </span>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleToggleEmptyState}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-secondary bg-surface-container-high hover:bg-surface-container-highest shadow-[0_1px_3px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)] active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
              id="toggle-empty-state"
            >
              <span className="material-symbols-outlined text-sm">swap_horiz</span>
              <span id="toggle-state-text">
                {simulatedEmpty ? 'Restore Populated State' : 'Simulate Empty Bank'}
              </span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Reset local cache and reload sample data?')) {
                  onResetCache();
                }
              }}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-outline hover:text-error bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
              title="Purge local storage state"
            >
              Reset Cache
            </button>
          </div>
        </div>

        {/* Console Meters (Skeuomorphic Porcelain Inset Wells) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="metrics-panel">
          {/* Metric 1: Total Questions */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-[0_4px_16px_rgba(79,55,138,0.06),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Total Question Bank</span>
              <span className="p-1.5 rounded-xl bg-surface-container-high text-primary shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
                <span className="material-symbols-outlined text-lg">database</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-headline font-black tracking-tight text-on-surface" id="metric-total-questions">
                {totalQuestionsCount}
              </span>
              <span className="text-xs font-semibold text-tertiary">MCQs</span>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between text-xs text-on-surface-variant bg-surface-container-low px-3 py-2 rounded-xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
              <span className="font-medium">12 Assignments</span>
              <span className="font-mono font-bold text-primary">100% In-Memory</span>
            </div>
          </div>

          {/* Metric 2: Available Modules */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-[0_4px_16px_rgba(79,55,138,0.06),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Course Coverage</span>
              <span className="p-1.5 rounded-xl bg-surface-container-high text-secondary shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
                <span className="material-symbols-outlined text-lg">calendar_view_week</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-headline font-black tracking-tight text-on-surface">
                {simulatedEmpty ? '0' : '12'}
              </span>
              <span className="text-xs font-semibold text-on-surface-variant">Curricular Weeks</span>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between text-xs text-on-surface-variant bg-surface-container-low px-3 py-2 rounded-xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
              <span className="font-medium">NPTEL Syllabus</span>
              <span className="font-mono font-bold text-secondary">W01 – W12</span>
            </div>
          </div>

          {/* Metric 3: Completed Sessions */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-[0_4px_16px_rgba(79,55,138,0.06),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Completed Drills</span>
              <span className="p-1.5 rounded-xl bg-surface-container-high text-primary shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-headline font-black tracking-tight text-on-surface" id="metric-completed-sessions">
                {activeUserCompleted.length}
              </span>
              <span className="text-xs font-semibold text-on-surface-variant">Sessions</span>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between text-xs text-on-surface-variant bg-surface-container-low px-3 py-2 rounded-xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
              <span className="font-medium">Questions Attempted</span>
              <span className="font-mono font-bold text-on-surface">
                {activeAttempted} MCQs
              </span>
            </div>
          </div>

          {/* Metric 4: Average Accuracy with Dial */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-[0_4px_16px_rgba(79,55,138,0.06),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Global Accuracy</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-black ${
                activeAccuracyNum >= 85 ? 'bg-tertiary-container/30 text-on-tertiary-container' : 'bg-secondary-container text-on-secondary-container'
              }`}>
                {activeAccuracyNum >= 85 ? 'HIGH' : activeAccuracyNum >= 70 ? 'NOMINAL' : activeAttempted > 0 ? 'WARMUP' : 'INITIAL'}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div>
                <div className="text-3xl lg:text-4xl font-headline font-black tracking-tight text-primary">
                  {simulatedEmpty ? '0.0%' : `${activeAccuracyPercent}%`}
                </div>
                <div className="text-[11px] text-on-surface-variant mt-0.5">
                  {simulatedEmpty ? '0 Correct / 0 Solved' : `${activeCorrect} Correct / ${activeAttempted} Solved`}
                </div>
              </div>
              {/* Tactile Gauge Donut (Inline SVG) */}
              <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-highest"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  ></path>
                  <path
                    className="text-primary transition-all duration-1000 ease-out"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={simulatedEmpty ? "0, 100" : `${activeAccuracyPercent}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  ></path>
                </svg>
                <span className="absolute text-[11px] font-bold text-on-surface font-mono">
                  {simulatedEmpty ? '0' : activeRoundedAccuracy}
                </span>
              </div>
            </div>
            <div className="w-full bg-surface-container rounded-full h-1.5 mt-3 overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
              <div
                className="bg-primary h-full rounded-full transition-all duration-700"
                style={{ width: simulatedEmpty ? '0%' : `${activeAccuracyPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Populated vs Empty State Containers */}
      {!simulatedEmpty ? (
        <div className="space-y-10" id="populated-state-container">
          
          {/* USER LAYER STRIP: Candidate Attribution & Scoreboard */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(79,55,138,0.06),0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-primary"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Candidate Tracking Layer</span>
                </div>
                <h2 className="text-lg font-headline font-black text-on-surface mt-0.5">
                  Who Did What & By How Much
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {onOpenNewUserModal && (
                  <button
                    onClick={onOpenNewUserModal}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold text-on-primary bg-primary hover:bg-[#402a73] shadow-[0_2px_6px_rgba(79,55,138,0.25)] active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5"
                    title="Sign in another candidate on this device (no password required)"
                  >
                    <span className="material-symbols-outlined text-sm">person_add</span>
                    <span>+ Sign In as New User</span>
                  </button>
                )}
                <button
                  onClick={onOpenUserModal}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold text-primary bg-primary-fixed hover:bg-primary hover:text-on-primary transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">manage_accounts</span>
                  <span>Manage / Switch Users</span>
                </button>
              </div>
            </div>

            {/* Candidate Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {userStats.map(stat => {
                const isSelectedActive = stat.user.id === activeUser.id;
                return (
                  <div
                    key={stat.user.id}
                    onClick={() => {
                      if (!isSelectedActive) {
                        playSound('click');
                        onSelectUser(stat.user);
                      }
                    }}
                    className={`p-4 rounded-2xl transition-all cursor-pointer flex items-center justify-between border-2 ${
                      isSelectedActive
                        ? 'border-primary bg-primary-fixed/20 shadow-sm'
                        : 'border-transparent bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={stat.user.avatarUrl}
                          alt={stat.user.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/40"
                          referrerPolicy="no-referrer"
                        />
                        {isSelectedActive && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-surface"></span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-on-surface">{stat.user.name}</span>
                          <span className="text-[10px] font-mono font-bold text-primary">{stat.user.label}</span>
                        </div>
                        <span className="text-[11px] text-on-surface-variant font-medium block">
                          {stat.sessionsCount} sessions completed
                        </span>
                      </div>
                    </div>

                    <div className="text-right pl-2">
                      <div className="text-base font-headline font-black text-primary font-mono">{stat.accuracy}%</div>
                      <div className="text-[10px] text-on-surface-variant font-medium">{stat.correct} / {stat.attempted}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Start Card with 3D Tactile Cobalt Pressable Button */}
          <div className="p-8 lg:p-10 rounded-3xl bg-surface-container-lowest shadow-[0_12px_36px_rgba(79,55,138,0.08),0_2px_6px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.9)] relative overflow-hidden">
            {/* Metallic Accent Corner Graphic */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-primary-fixed to-secondary-container rounded-full opacity-40 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/60 text-on-secondary-container text-xs font-semibold shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span>Recommended Simulation • Candidate: {activeUser.name}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-headline font-black tracking-tight text-on-surface">
                  Network Exam Readiness Test
                </h1>
                <p className="text-sm sm:text-base text-on-surface-variant max-w-xl leading-relaxed">
                  20 randomized questions sampled uniformly across all 12 modules. Instant feedback, timer tracking, and complete step-by-step RFC explanations.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-sm text-tertiary">timer</span>
                    <span>Timed or Casual</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-sm text-primary">shuffle</span>
                    <span>Full Seed Randomizer</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-sm text-secondary">memory</span>
                    <span>Zero Latency Local Storage</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                {/* 3D Tactile Cobalt Push Button */}
                <button
                  onClick={() => handleStart('quick_20')}
                  className="group relative w-full px-8 py-5 rounded-2xl bg-gradient-to-b from-[#5c42a2] to-[#402a73] hover:from-[#654ba9] hover:to-[#452d7e] active:translate-y-1 shadow-[0_8px_0_0_#2b1a54,0_16px_24px_rgba(43,26,84,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] active:shadow-[0_2px_0_0_#2b1a54,0_6px_10px_rgba(43,26,84,0.3)] transition-all cursor-pointer flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-lowest/15 flex items-center justify-center text-on-primary shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]">
                      <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">play_arrow</span>
                    </div>
                    <div>
                      <span className="block text-base lg:text-lg font-headline font-black text-on-primary tracking-tight">Launch Quick Practice</span>
                      <span className="block text-xs text-primary-fixed font-medium">20 Randomized MCQs • Balanced</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-primary group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>

                {/* Master Action Secondary Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleStart('entire_bank')}
                    className="px-4 py-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold tracking-tight shadow-[0_3px_0_0_rgba(122,117,130,0.3),0_6px_12px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.8)] active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(122,117,130,0.3)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm text-primary">library_books</span>
                    <span>All 120 Questions</span>
                  </button>
                  <button
                    onClick={() => handleStart('practice-setup')}
                    className="px-4 py-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold tracking-tight shadow-[0_3px_0_0_rgba(122,117,130,0.3),0_6px_12px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.8)] active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(122,117,130,0.3)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm text-secondary">assignment</span>
                    <span>By Assignment</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Practice by Curricular Week (12 tactile module cards) */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-primary"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Curriculum Modules</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-headline font-black text-on-surface tracking-tight mt-1">Practice by Week</h2>
              </div>
              <div className="text-xs text-on-surface-variant font-medium bg-surface-container-low px-3 py-1.5 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                12 Modules • 10 Validated MCQs Each
              </div>
            </div>

            {/* 12-Card Tactile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {weeks.map((w) => {
                const userWeekSessions = completedSessions.filter(
                  s => s.userId === activeUser.id && s.weekNumber === w.week
                );
                const bestAccuracy = userWeekSessions.length > 0
                  ? Math.max(...userWeekSessions.map(s => s.accuracy))
                  : null;

                return (
                  <div
                    key={w.week}
                    className="p-5 rounded-2xl bg-surface-container-lowest shadow-[0_4px_16px_rgba(79,55,138,0.04),0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_8px_24px_rgba(79,55,138,0.09)] transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-surface-container-high text-on-surface-variant shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                          {w.weekCode}
                        </span>
                        <span className="text-[11px] font-bold text-secondary flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 10 MCQs
                        </span>
                      </div>
                      <h3 className="text-sm font-headline font-black text-on-surface leading-snug group-hover:text-primary transition-colors">
                        {w.title}
                      </h3>
                      <p className="text-xs text-on-surface-variant mt-1.5 line-clamp-2">
                        {w.description}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 flex items-center justify-between">
                      <span className={`text-[11px] font-semibold ${bestAccuracy !== null ? 'text-tertiary font-bold' : 'text-on-surface-variant'}`}>
                        {bestAccuracy !== null ? `${bestAccuracy.toFixed(0)}% Best` : 'Untested'}
                      </span>
                      <button
                        onClick={() => handleStart(`week_${w.week}`, w.week)}
                        className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary text-xs font-bold tracking-tight shadow-[0_2px_0_0_rgba(79,55,138,0.2),0_2px_4px_rgba(0,0,0,0.04)] active:translate-y-0.5 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>Start</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Recent Practice History (Tactile Porcelain Table) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-tertiary"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-tertiary">Local Records</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-headline font-black text-on-surface tracking-tight mt-1">Recent Practice History</h2>
              </div>
              
              {/* User filter pills */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant font-mono">Filter by Candidate:</span>
                <select
                  value={selectedUserFilter}
                  onChange={(e) => setSelectedUserFilter(e.target.value)}
                  className="px-3 py-1 rounded-xl bg-surface-container text-xs font-bold text-on-surface cursor-pointer"
                >
                  <option value="all">All Candidates ({sessions.length})</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.label}: {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl shadow-[0_6px_24px_rgba(79,55,138,0.05),0_1px_3px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container-high text-on-surface-variant font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-6">Candidate</th>
                      <th className="py-3.5 px-6">Timestamp</th>
                      <th className="py-3.5 px-6">Mode / Module</th>
                      <th className="py-3.5 px-6">Score</th>
                      <th className="py-3.5 px-6">Accuracy</th>
                      <th className="py-3.5 px-6">Duration</th>
                      <th className="py-3.5 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-on-surface font-medium divide-y divide-surface-container-low" id="history-tbody">
                    {filteredSessions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 px-6 text-center text-on-surface-variant">
                          <div className="flex flex-col items-center justify-center space-y-2.5">
                            <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
                              <span className="material-symbols-outlined text-2xl">history_edu</span>
                            </div>
                            <p className="font-bold text-sm text-on-surface">No Practice Drills Logged Yet</p>
                            <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed">
                              Initial history for this candidate is 0. Launch the 20-MCQ Exam Readiness Test or select any curriculum module to record your first score.
                            </p>
                            <button
                              onClick={() => handleStart('quick_20')}
                              className="mt-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-[0_2px_6px_rgba(79,55,138,0.3)] hover:bg-[#402a73] transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <span className="material-symbols-outlined text-sm">play_arrow</span>
                              <span>Take Quick Exam Readiness Test (20 MCQs)</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredSessions.map((sess) => {
                        const mins = Math.floor(sess.durationSeconds / 60);
                        const secs = sess.durationSeconds % 60;
                        const durationStr = `${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
                        const sessUser = users.find(u => u.id === sess.userId);

                        return (
                          <tr key={sess.id} className="hover:bg-surface-container-low transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary-fixed text-primary">
                                  {sess.userLabel || sessUser?.label || 'User 1'}
                                </span>
                                <span className="font-bold text-on-surface truncate max-w-[140px]">
                                  {sess.userName || sessUser?.name || 'User 1'}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-6 font-mono text-on-surface-variant">{sess.formattedDate}</td>
                            <td className="py-4 px-6">
                              <div className="font-bold text-on-surface">{sess.modeTitle}</div>
                              <div className="text-[10px] text-on-surface-variant">{sess.subTitle}</div>
                            </td>
                            <td className="py-4 px-6 font-mono font-bold text-on-surface">
                              {sess.score} / {sess.totalQuestions}
                            </td>
                            <td className="py-4 px-6">
                              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] ${
                                sess.accuracy >= 90
                                  ? 'bg-secondary-container text-on-secondary-container'
                                  : sess.accuracy === 100
                                  ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                                  : 'bg-surface-container-highest text-on-surface-variant'
                              }`}>
                                {sess.accuracy.toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-4 px-6 font-mono text-on-surface-variant">{durationStr}</td>
                            <td className="py-4 px-6 text-right">
                              <button
                                onClick={() => handleReview(sess.id)}
                                className="px-3 py-1.5 rounded-lg bg-surface-container text-primary hover:bg-primary hover:text-on-primary font-bold shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all cursor-pointer"
                              >
                                Review
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State Display (Toggled for Demonstration) */
        <div className="p-12 lg:p-16 rounded-3xl bg-surface-container-lowest shadow-[0_8px_32px_rgba(79,55,138,0.06),0_1px_3px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] text-center max-w-2xl mx-auto space-y-6" id="empty-state-card">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-surface-container-high text-primary flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_4px_12px_rgba(79,55,138,0.1)]">
            <span className="material-symbols-outlined text-4xl">inventory_2</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-headline font-black text-on-surface tracking-tight">Question Bank Unloaded</h3>
            <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
              No local question datasets are currently cached. Import your 12-assignment bundle or restore default curriculum to begin practice.
            </p>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setSimulatedEmpty(false);
                onRestoreQuestions();
              }}
              className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs tracking-wide shadow-[0_4px_0_0_#2b1a54,0_8px_16px_rgba(79,55,138,0.3)] active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Restore 120-Question Curricular Bank</span>
            </button>
            <label className="px-5 py-3 rounded-xl bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-highest transition-colors cursor-pointer flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">upload_file</span>
              <span>Import JSON / Spec</span>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSimulatedEmpty(false);
                    onImportQuestions(file);
                  }
                }}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
