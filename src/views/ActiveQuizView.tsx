import React, { useState, useEffect, useCallback } from 'react';
import { Question, PracticeSession } from '../types';
import { playSound, formatDuration } from '../utils/storage';

interface ActiveQuizViewProps {
  session: PracticeSession | null;
  questions: Question[];
  onAnswerQuestion: (questionId: string, answerIndex: number) => void;
  onToggleFlag: (questionId: string) => void;
  onFinishSession: () => void;
  onQuitSession: () => void;
  onNavigateToSetup: () => void;
}

export const ActiveQuizView: React.FC<ActiveQuizViewProps> = ({
  session,
  questions,
  onAnswerQuestion,
  onToggleFlag,
  onFinishSession,
  onQuitSession,
  onNavigateToSetup,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Filter current questions in session order
  const sessionQuestions = session 
    ? session.questionIds.map(id => questions.find(q => q.id === id)).filter((q): q is Question => Boolean(q))
    : [];

  const currentQ = sessionQuestions[currentIndex];

  // Timer effect
  useEffect(() => {
    if (!session || session.completed || isPaused) return;

    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [session, isPaused]);

  // Handle Option Selection
  const handleSelectOption = useCallback((optionIdx: number) => {
    if (!currentQ || isPaused) return;
    playSound('select');
    onAnswerQuestion(currentQ.id, optionIdx);
  }, [currentQ, isPaused, onAnswerQuestion]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === '1') {
        handleSelectOption(0);
      } else if (e.key === '2') {
        handleSelectOption(1);
      } else if (e.key === '3') {
        handleSelectOption(2);
      } else if (e.key === '4') {
        handleSelectOption(3);
      } else if (e.key.toLowerCase() === 'f' && currentQ) {
        playSound('click');
        onToggleFlag(currentQ.id);
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentIndex < sessionQuestions.length - 1) {
          playSound('click');
          setCurrentIndex(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
          playSound('click');
          setCurrentIndex(prev => prev - 1);
        }
      } else if (e.key === 'Enter') {
        if (currentIndex === sessionQuestions.length - 1) {
          setShowSubmitConfirm(true);
        } else {
          setCurrentIndex(prev => prev + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, sessionQuestions.length, currentQ, handleSelectOption, onToggleFlag]);

  if (!session || sessionQuestions.length === 0) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-high text-primary mx-auto flex items-center justify-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
          <span className="material-symbols-outlined text-3xl">play_disabled</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-headline font-black text-on-surface">No Active Quiz Session</h2>
          <p className="text-sm text-on-surface-variant">
            Start a 20-question readiness simulation or pick an individual curriculum week to begin testing.
          </p>
        </div>
        <button
          onClick={onNavigateToSetup}
          className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs tracking-wider uppercase shadow-[0_4px_0_0_#2b1a54,0_8px_16px_rgba(79,55,138,0.3)] active:translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">tune</span>
          <span>Open Exam Setup</span>
        </button>
      </div>
    );
  }

  const selectedAnswer = currentQ ? session.userAnswers[currentQ.id] : undefined;
  const isFlagged = currentQ ? session.flaggedIds.includes(currentQ.id) : false;
  const answeredCount = Object.keys(session.userAnswers).length;
  const progressPercent = Math.round(((currentIndex + 1) / sessionQuestions.length) * 100);

  return (
    <div className="flex flex-col w-full pb-16 space-y-6">
      
      {/* Quiz Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest shadow-[0_4px_16px_rgba(79,55,138,0.04),inset_0_1px_1px_rgba(255,255,255,1)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-primary"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {session.modeTitle}
            </span>
          </div>
          <div className="text-xs text-on-surface-variant mt-0.5 font-medium">
            Question {currentIndex + 1} of {sessionQuestions.length} • {answeredCount} Answered
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer Display */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] font-mono text-xs font-bold">
            <span className="material-symbols-outlined text-sm text-tertiary">timer</span>
            <span>{formatDuration(elapsedSeconds)}</span>
          </div>

          {/* Pause / Resume */}
          <button
            onClick={() => {
              playSound('click');
              setIsPaused(!isPaused);
            }}
            className="p-2 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer"
            title={isPaused ? "Resume Quiz" : "Pause Quiz"}
          >
            <span className="material-symbols-outlined text-base">
              {isPaused ? 'play_arrow' : 'pause'}
            </span>
          </button>

          {/* Question Grid / Palette Toggle */}
          <button
            onClick={() => {
              playSound('click');
              setShowMatrix(!showMatrix);
            }}
            className="px-3 py-1.5 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-highest transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">grid_view</span>
            <span className="hidden sm:inline">Palette</span>
          </button>

          {/* Quit button */}
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to exit? Your progress in this session will be discarded.')) {
                onQuitSession();
              }
            }}
            className="px-3 py-1.5 rounded-xl text-error text-xs font-bold hover:bg-error-container/30 transition-colors cursor-pointer"
          >
            Quit
          </button>
        </div>
      </div>

      {/* Question Matrix Drawer / Dropdown */}
      {showMatrix && (
        <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(79,55,138,0.08),inset_0_1px_1px_rgba(255,255,255,1)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Question Navigator ({answeredCount}/{sessionQuestions.length} answered)
            </span>
            <div className="flex items-center gap-3 text-[11px] text-on-surface-variant font-medium">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Current</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span> Answered</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span> Flagged</span>
            </div>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-20 gap-2 pt-2">
            {sessionQuestions.map((q, idx) => {
              const isAnswered = session.userAnswers[q.id] !== undefined;
              const isQFlagged = session.flaggedIds.includes(q.id);
              const isCurrent = idx === currentIndex;

              let btnClass = 'bg-surface-container text-on-surface hover:bg-surface-container-highest';
              if (isCurrent) {
                btnClass = 'bg-primary text-on-primary ring-2 ring-primary-fixed shadow-sm';
              } else if (isQFlagged) {
                btnClass = 'bg-tertiary-container text-on-tertiary-container font-black';
              } else if (isAnswered) {
                btnClass = 'bg-secondary-container text-on-secondary-container font-bold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    playSound('click');
                    setCurrentIndex(idx);
                    setShowMatrix(false);
                  }}
                  className={`h-9 rounded-xl font-mono text-xs transition-all cursor-pointer flex items-center justify-center relative ${btnClass}`}
                >
                  <span>{idx + 1}</span>
                  {isQFlagged && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Question Card with Inset Porcelain Look */}
      {currentQ && (
        <div className="p-8 lg:p-10 rounded-3xl bg-surface-container-lowest shadow-[0_12px_36px_rgba(79,55,138,0.06),0_2px_4px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,1)] relative space-y-6">
          
          {/* Progress bar line */}
          <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Question Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-surface-container-high text-on-surface-variant">
                Week {currentQ.week.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold text-secondary">
                {currentQ.topic}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {currentQ.rfcRef && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-surface-container text-tertiary shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                  {currentQ.rfcRef}
                </span>
              )}
              <button
                onClick={() => {
                  playSound('click');
                  onToggleFlag(currentQ.id);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  isFlagged
                    ? 'bg-tertiary-container text-on-tertiary-container shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
                title="Flag question for review (Key: F)"
              >
                <span className="material-symbols-outlined text-sm">
                  {isFlagged ? 'bookmark' : 'bookmark_border'}
                </span>
                <span>{isFlagged ? 'Flagged' : 'Flag'}</span>
              </button>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-headline font-bold text-on-surface leading-relaxed">
              {currentQ.question}
            </h2>

            {/* Optional ASCII Diagram or code */}
            {currentQ.diagram && (
              <pre className="p-4 rounded-xl bg-surface-container-high font-mono text-xs text-on-surface overflow-x-auto shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]">
                {currentQ.diagram}
              </pre>
            )}
          </div>

          {/* Options Grid (4 Tactile Inset Wells) */}
          <div className="grid grid-cols-1 gap-3.5 pt-2">
            {currentQ.options.map((optText, optIdx) => {
              const isSelected = selectedAnswer === optIdx;
              const optionLetters = ['A', 'B', 'C', 'D'];

              let containerStyles = 'bg-surface-container-low hover:bg-surface-container border-2 border-transparent text-on-surface';
              if (isSelected) {
                containerStyles = 'bg-primary-fixed/30 border-primary text-on-surface shadow-[0_2px_8px_rgba(79,55,138,0.15)]';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 sm:p-5 rounded-2xl text-left transition-all cursor-pointer flex items-start gap-4 ${containerStyles}`}
                >
                  {/* Option letter / key pill */}
                  <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-mono font-bold text-xs transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] ${
                    isSelected
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface-variant'
                  }`}>
                    {optionLetters[optIdx]}
                  </div>

                  {/* Option text */}
                  <div className="flex-1 pt-1 text-sm font-medium leading-relaxed">
                    {optText}
                  </div>

                  {/* Shortcut badge */}
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-surface-container-lowest text-[10px] font-mono text-outline shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                    {optIdx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-surface-container-high flex items-center justify-between">
            <button
              onClick={() => {
                if (currentIndex > 0) {
                  playSound('click');
                  setCurrentIndex(prev => prev - 1);
                }
              }}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-outline'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-highest shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-3">
              {currentIndex < sessionQuestions.length - 1 ? (
                <button
                  onClick={() => {
                    playSound('click');
                    setCurrentIndex(prev => prev + 1);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-[0_3px_0_0_#2b1a54,0_6px_12px_rgba(79,55,138,0.25)] active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Next Question</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    playSound('complete');
                    setShowSubmitConfirm(true);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-[#402a73] text-on-primary font-bold text-xs shadow-[0_4px_0_0_#2b1a54,0_8px_16px_rgba(79,55,138,0.3)] active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">task_alt</span>
                  <span>Finish & Submit Exam</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] space-y-5 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-headline font-black text-on-surface">Submit Examination?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                You have answered {answeredCount} out of {sessionQuestions.length} questions.
                {answeredCount < sessionQuestions.length && (
                  <span className="text-error font-bold block mt-1">
                    Warning: {sessionQuestions.length - answeredCount} questions remain unanswered!
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-highest cursor-pointer"
              >
                Return to Quiz
              </button>
              <button
                onClick={() => {
                  setShowSubmitConfirm(false);
                  onFinishSession();
                }}
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-[0_3px_0_0_#2b1a54,0_6px_12px_rgba(79,55,138,0.3)] cursor-pointer"
              >
                Confirm & View Results
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
