import React, { useState } from 'react';
import { PracticeSession, Question } from '../types';
import { playSound } from '../utils/storage';

interface ReviewViewProps {
  sessions: PracticeSession[];
  activeReviewSessionId: string | null;
  onSelectSession: (id: string) => void;
  questions: Question[];
  onNavigateToSetup: () => void;
}

export const ReviewView: React.FC<ReviewViewProps> = ({
  sessions,
  activeReviewSessionId,
  onSelectSession,
  questions,
  onNavigateToSetup,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'incorrect' | 'correct' | 'flagged'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [interactiveAnswers, setInteractiveAnswers] = useState<Record<string, number>>({});

  const currentSession = sessions.find(s => s.id === activeReviewSessionId) || sessions[0];

  if (!currentSession) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto space-y-4">
        <span className="material-symbols-outlined text-4xl text-outline">fact_check</span>
        <h2 className="text-xl font-headline font-bold text-on-surface">No Completed Sessions to Review</h2>
        <p className="text-xs text-on-surface-variant">
          Complete a practice drill or readiness test to unlock step-by-step RFC question analysis.
        </p>
        <button
          onClick={onNavigateToSetup}
          className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs cursor-pointer"
        >
          Start Practice
        </button>
      </div>
    );
  }

  // Load questions for the selected session
  const sessionQuestions = currentSession.questionIds
    .map(id => questions.find(q => q.id === id))
    .filter((q): q is Question => Boolean(q));

  // Filter based on selected filterType and search
  const filteredQuestions = sessionQuestions.filter(q => {
    const userAnswer = currentSession.userAnswers[q.id];
    const isCorrect = userAnswer === q.correctAnswer;
    const isFlagged = currentSession.flaggedIds.includes(q.id);

    if (filterType === 'incorrect' && isCorrect) return false;
    if (filterType === 'correct' && !isCorrect) return false;
    if (filterType === 'flagged' && !isFlagged) return false;

    if (searchQuery.trim()) {
      const qText = `${q.question} ${q.topic} ${q.rfcRef || ''} ${q.explanation}`.toLowerCase();
      return qText.includes(searchQuery.toLowerCase());
    }

    return true;
  });

  const handleInPlaceTry = (qId: string, optIdx: number, correctIdx: number) => {
    setInteractiveAnswers(prev => ({ ...prev, [qId]: optIdx }));
    if (optIdx === correctIdx) {
      playSound('correct');
    } else {
      playSound('wrong');
    }
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-8">
      
      {/* Top Header & Session Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-primary"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Post-Test Analysis</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <h1 className="text-2xl sm:text-3xl font-headline font-black tracking-tight text-on-surface">
              RFC Protocol Review
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-primary-fixed text-primary">
              {currentSession.userName || currentSession.userLabel || 'User 1'}
            </span>
          </div>
        </div>

        {/* Session Switcher Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-on-surface-variant font-medium">Session:</span>
          <select
            value={currentSession.id}
            onChange={(e) => {
              playSound('click');
              onSelectSession(e.target.value);
            }}
            className="px-3.5 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] cursor-pointer"
          >
            {sessions.map(s => (
              <option key={s.id} value={s.id}>
                [{s.userLabel || 'User 1'}] {s.formattedDate} - {s.modeTitle} ({s.score}/{s.totalQuestions})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-[0_4px_16px_rgba(79,55,138,0.04),inset_0_1px_1px_rgba(255,255,255,1)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => {
              playSound('click');
              setFilterType('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            All Questions ({sessionQuestions.length})
          </button>
          <button
            onClick={() => {
              playSound('click');
              setFilterType('incorrect');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === 'incorrect'
                ? 'bg-error text-on-error shadow-sm'
                : 'bg-surface-container text-error hover:bg-surface-container-high'
            }`}
          >
            Incorrect ({sessionQuestions.filter(q => currentSession.userAnswers[q.id] !== q.correctAnswer).length})
          </button>
          <button
            onClick={() => {
              playSound('click');
              setFilterType('correct');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === 'correct'
                ? 'bg-tertiary text-on-tertiary shadow-sm'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Correct ({sessionQuestions.filter(q => currentSession.userAnswers[q.id] === q.correctAnswer).length})
          </button>
          <button
            onClick={() => {
              playSound('click');
              setFilterType('flagged');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === 'flagged'
                ? 'bg-tertiary-container text-on-tertiary-container shadow-sm'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Flagged ({currentSession.flaggedIds.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined text-sm text-outline absolute left-3 top-2.5">
            search
          </span>
          <input
            type="text"
            placeholder="Search questions or RFCs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-60 pl-9 pr-3 py-1.5 rounded-xl bg-surface-container text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
          />
        </div>
      </div>

      {/* Questions Review List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="p-10 text-center bg-surface-container-lowest rounded-2xl">
            <span className="material-symbols-outlined text-3xl text-outline mb-2">filter_alt_off</span>
            <p className="text-sm text-on-surface-variant font-medium">No questions matched the selected criteria.</p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const userAnswer = currentSession.userAnswers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            const isFlagged = currentSession.flaggedIds.includes(q.id);
            const inPlaceChoice = interactiveAnswers[q.id];

            return (
              <div
                key={q.id}
                className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(79,55,138,0.05),0_1px_2px_rgba(0,0,0,0.02),inset_0_1px_2px_rgba(255,255,255,1)] space-y-5"
              >
                {/* Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center font-mono font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-surface-container text-on-surface-variant">
                      Week {q.week.toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs font-semibold text-secondary">
                      {q.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {q.rfcRef && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-surface-container text-tertiary">
                        {q.rfcRef}
                      </span>
                    )}
                    {isFlagged && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-tertiary-container text-on-tertiary-container flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">bookmark</span>
                        <span>Flagged</span>
                      </span>
                    )}
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-error-container text-on-error-container'
                    }`}>
                      {isCorrect ? 'CORRECT (+1)' : 'MISSED (0)'}
                    </span>
                  </div>
                </div>

                {/* Question Stem */}
                <h3 className="text-base sm:text-lg font-headline font-bold text-on-surface leading-snug">
                  {q.question}
                </h3>

                {/* Options Review List with In-Place Retesting */}
                <div className="grid grid-cols-1 gap-2.5 pt-1">
                  {q.options.map((optText, optIdx) => {
                    const isOptionCorrect = optIdx === q.correctAnswer;
                    const isUserChoice = userAnswer === optIdx;
                    const isRetried = inPlaceChoice === optIdx;

                    let rowStyle = 'bg-surface-container-low border border-transparent';
                    if (isOptionCorrect) {
                      rowStyle = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium';
                    } else if (isUserChoice && !isCorrect) {
                      rowStyle = 'bg-red-50 border-red-200 text-red-950';
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleInPlaceTry(q.id, optIdx, q.correctAnswer)}
                        className={`p-3.5 sm:p-4 rounded-xl flex items-start justify-between gap-3 transition-colors cursor-pointer ${rowStyle}`}
                        title="Click to practice in place"
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center font-mono font-bold text-xs ${
                            isOptionCorrect
                              ? 'bg-emerald-600 text-white'
                              : isUserChoice && !isCorrect
                              ? 'bg-red-600 text-white'
                              : 'bg-surface-container-highest text-on-surface-variant'
                          }`}>
                            {['A', 'B', 'C', 'D'][optIdx]}
                          </span>
                          <span className="text-xs sm:text-sm pt-0.5">{optText}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                          {isUserChoice && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-container-lowest text-on-surface-variant shadow-xs">
                              Your Choice
                            </span>
                          )}
                          {isOptionCorrect && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-600 text-white shadow-xs flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-xs">check</span>
                              <span>Correct</span>
                            </span>
                          )}
                          {inPlaceChoice !== undefined && isRetried && !isOptionCorrect && (
                            <span className="text-error text-xs font-bold">Try again</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Card Inset */}
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] space-y-2 border border-outline-variant/30">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                    <span className="material-symbols-outlined text-sm">lightbulb</span>
                    <span>RFC Protocol Rationale & Explanation</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
                    {q.explanation}
                  </p>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
