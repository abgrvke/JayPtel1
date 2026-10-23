import React from 'react';
import { PracticeSession, Question, CurricularWeek } from '../types';
import { formatDuration, playSound } from '../utils/storage';

interface ResultsViewProps {
  session: PracticeSession | null;
  questions: Question[];
  weeks: CurricularWeek[];
  onReviewSession: (sessionId: string) => void;
  onRetakeSession: (session: PracticeSession, missedOnly: boolean) => void;
  onNavigateToDashboard: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  session,
  questions,
  weeks,
  onReviewSession,
  onRetakeSession,
  onNavigateToDashboard,
}) => {
  if (!session) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto space-y-4">
        <span className="material-symbols-outlined text-4xl text-outline">analytics</span>
        <h2 className="text-xl font-headline font-bold text-on-surface">No Completed Exam Results</h2>
        <p className="text-xs text-on-surface-variant">
          Complete a quiz session to generate comprehensive performance diagnostics and module analytics.
        </p>
        <button
          onClick={onNavigateToDashboard}
          className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const sessionQuestions = session.questionIds
    .map(id => questions.find(q => q.id === id))
    .filter((q): q is Question => Boolean(q));

  const total = session.totalQuestions || sessionQuestions.length;
  const score = session.score;
  const accuracy = total > 0 ? (score / total) * 100 : 0;
  const missedCount = total - score;
  const avgSecondsPerQ = total > 0 ? Math.round(session.durationSeconds / total) : 0;

  // Compute breakdown per week module
  const weekBreakdown: Record<number, { correct: number; total: number; title: string }> = {};

  sessionQuestions.forEach(q => {
    if (!weekBreakdown[q.week]) {
      const wk = weeks.find(w => w.week === q.week);
      weekBreakdown[q.week] = {
        correct: 0,
        total: 0,
        title: wk ? wk.title : `Week ${q.week}`
      };
    }
    weekBreakdown[q.week].total += 1;
    if (session.userAnswers[q.id] === q.correctAnswer) {
      weekBreakdown[q.week].correct += 1;
    }
  });

  const getGradeTier = (acc: number) => {
    if (acc >= 90) return { label: 'High Distinction', color: 'text-tertiary', badge: 'EXAM READY' };
    if (acc >= 75) return { label: 'Proficient / Passing', color: 'text-primary', badge: 'COMPETENT' };
    return { label: 'Revision Advised', color: 'text-error', badge: 'NEEDS DRILL' };
  };

  const grade = getGradeTier(accuracy);

  return (
    <div className="flex flex-col w-full pb-16 space-y-10">
      
      {/* Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded bg-tertiary"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-tertiary">Performance Report</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-headline font-black tracking-tight text-on-surface">
          Diagnostic Evaluation
        </h1>
        <div className="flex flex-wrap items-center gap-2 pt-1 text-sm text-on-surface-variant">
          <span>Session completed on {session.formattedDate} · {session.modeTitle}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-fixed font-bold text-xs text-primary font-mono">
            <span className="material-symbols-outlined text-xs">person</span>
            <span>{session.userName || 'User 1'}</span>
          </span>
        </div>
      </div>

      {/* Hero Score Gauge Card */}
      <div className="p-8 lg:p-10 rounded-3xl bg-surface-container-lowest shadow-[0_12px_36px_rgba(79,55,138,0.06),0_2px_4px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,1)] relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Gauge Circle */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-high"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                ></path>
                <path
                  className="text-primary transition-all duration-1000 ease-out"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={`${accuracy.toFixed(1)}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.2"
                ></path>
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-headline font-black text-on-surface font-mono">
                  {accuracy.toFixed(0)}%
                </span>
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Accuracy
                </span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider bg-secondary-container text-on-secondary-container">
                {grade.badge}
              </span>
            </div>
          </div>

          {/* Right: Metrics & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-headline font-black text-on-surface">
                {score} of {total} Questions Correct
              </h2>
              <p className="text-sm text-on-surface-variant font-medium">
                Overall Assessment: <span className={`font-bold ${grade.color}`}>{grade.label}</span>
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-surface-container-low shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                <span className="text-[10px] font-bold uppercase text-on-surface-variant block">Duration</span>
                <span className="text-base font-mono font-bold text-on-surface">
                  {formatDuration(session.durationSeconds)}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-container-low shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                <span className="text-[10px] font-bold uppercase text-on-surface-variant block">Pace</span>
                <span className="text-base font-mono font-bold text-on-surface">
                  {avgSecondsPerQ}s / MCQ
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-container-low shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                <span className="text-[10px] font-bold uppercase text-on-surface-variant block">Flagged</span>
                <span className="text-base font-mono font-bold text-tertiary">
                  {session.flaggedIds.length} MCQs
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  playSound('click');
                  onReviewSession(session.id);
                }}
                className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs tracking-wide shadow-[0_4px_0_0_#2b1a54,0_8px_16px_rgba(79,55,138,0.3)] active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">visibility</span>
                <span>In-Depth Question Review</span>
              </button>

              {missedCount > 0 && (
                <button
                  onClick={() => {
                    playSound('click');
                    onRetakeSession(session, true);
                  }}
                  className="px-4 py-3 rounded-xl bg-surface-container text-on-surface font-bold text-xs hover:bg-surface-container-highest transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm text-error">restart_alt</span>
                  <span>Retake {missedCount} Missed</span>
                </button>
              )}

              <button
                onClick={onNavigateToDashboard}
                className="px-4 py-3 rounded-xl bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-highest transition-colors cursor-pointer"
              >
                Dashboard
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Module-by-Module Curriculum Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-headline font-black text-on-surface tracking-tight">
            Curriculum Topic Performance
          </h2>
          <span className="text-xs text-on-surface-variant font-mono">
            {Object.keys(weekBreakdown).length} Modules Tested
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(weekBreakdown).map(([weekNum, stat]) => {
            const modAccuracy = Math.round((stat.correct / stat.total) * 100);
            return (
              <div
                key={weekNum}
                className="p-5 rounded-2xl bg-surface-container-lowest shadow-[0_4px_16px_rgba(79,55,138,0.04),inset_0_1px_1px_rgba(255,255,255,1)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-on-surface-variant">
                      Week {weekNum.padStart(2, '0')}
                    </span>
                    <span className="text-xs font-mono font-bold text-on-surface">
                      {stat.correct} / {stat.total} ({modAccuracy}%)
                    </span>
                  </div>
                  <h3 className="text-sm font-headline font-bold text-on-surface leading-snug">
                    {stat.title}
                  </h3>
                </div>

                <div className="w-full bg-surface-container rounded-full h-2 mt-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      modAccuracy >= 80 ? 'bg-primary' : modAccuracy >= 50 ? 'bg-tertiary' : 'bg-error'
                    }`}
                    style={{ width: `${modAccuracy}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
