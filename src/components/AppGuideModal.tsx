import React, { useState, useEffect } from 'react';
import { ActiveScreen } from '../types';
import { playSound } from '../utils/storage';

interface GuideStep {
  id: string;
  targetScreen: ActiveScreen;
  badge: string;
  title: string;
  summary: string;
  highlights: { icon: string; title: string; desc: string }[];
  tip?: string;
}

const GUIDE_STEPS: GuideStep[] = [
  {
    id: 'dashboard-overview',
    targetScreen: 'dashboard',
    badge: 'Console Overview',
    title: 'Diagnostic Dashboard & Console Meters',
    summary: 'The dashboard gives you high-altitude diagnostic metrics and system status computed from local browser storage with zero latency.',
    highlights: [
      {
        icon: 'database',
        title: 'Total Question Bank',
        desc: '120 validated MCQs stored in memory across 12 curricular assignments.'
      },
      {
        icon: 'speed',
        title: 'Tactile Accuracy Dial',
        desc: 'Animated gauge donut tracking your global correctness percentage in real time.'
      },
      {
        icon: 'swap_horiz',
        title: 'Diagnostic Switcher',
        desc: 'Use "Simulate Empty Bank" to test offline loading and JSON restore features, or "Reset Cache" to restore baseline data.'
      }
    ],
    tip: 'Everything runs 100% locally in your browser with zero backend latency.'
  },
  {
    id: 'dashboard-drills',
    targetScreen: 'dashboard',
    badge: 'Exam Launchers',
    title: 'Quick Practice & 12 Curricular Weekly Drills',
    summary: 'Start practicing instantly using either balanced random sampling or focused module drills.',
    highlights: [
      {
        icon: 'play_arrow',
        title: '3D Tactile Push Button',
        desc: 'Launches the 20-question Network Readiness Test with uniform sampling across all 12 weeks.'
      },
      {
        icon: 'library_books',
        title: 'All 120 Questions & Assignments',
        desc: 'Take the comprehensive 120-question simulation or filter by assignment mode.'
      },
      {
        icon: 'calendar_view_week',
        title: '12 Curricular Module Cards',
        desc: 'Individual cards for Week 01 through Week 12. Each card tracks your highest recorded score.'
      }
    ],
    tip: 'Click any week card\'s "Start" button to practice that specific module.'
  },
  {
    id: 'setup-config',
    targetScreen: 'practice-setup',
    badge: 'Orchestrator',
    title: 'Practice Setup & Custom Exam Builder',
    summary: 'Tailor your examination parameters with granular timer, module selection, and instant feedback rules.',
    highlights: [
      {
        icon: 'tune',
        title: 'Custom Question Matrix',
        desc: 'Choose any question count (5 to 120) and pick any combination of curricular weeks.'
      },
      {
        icon: 'timer',
        title: 'Timed vs Casual Modes',
        desc: 'Configure duration with the interactive slider or disable timing for untimed study sessions.'
      },
      {
        icon: 'bolt',
        title: 'Instant RFC Feedback Mode',
        desc: 'Enable to view explanations immediately after clicking an option, or keep it off for exam mode.'
      }
    ],
    tip: 'Instant Feedback is ideal for learning new modules; exam mode tests true recall.'
  },
  {
    id: 'quiz-engine',
    targetScreen: 'active-quiz',
    badge: 'Exam Engine',
    title: 'Active Quiz Engine & Keyboard Shortcuts',
    summary: 'A focused, distraction-free test interface designed for high-speed practice with tactile feedback.',
    highlights: [
      {
        icon: 'keyboard',
        title: 'Hardware Keyboard Shortcuts',
        desc: 'Press keys 1–4 to select options, Enter to proceed/submit, Space for next, and F to flag.'
      },
      {
        icon: 'grid_view',
        title: 'Question Palette Navigator',
        desc: 'Open the palette matrix at any point to view answered, flagged, and unanswered questions.'
      },
      {
        icon: 'bookmark',
        title: 'Question Flagging',
        desc: 'Bookmark uncertain questions to revisit them easily before final submission.'
      }
    ],
    tip: 'You can pause and resume the timer at any time during active testing.'
  },
  {
    id: 'results-analytics',
    targetScreen: 'results',
    badge: 'Diagnostic Report',
    title: 'Diagnostic Evaluation & Module Analytics',
    summary: 'Comprehensive performance breakdown generated immediately upon exam submission.',
    highlights: [
      {
        icon: 'donut_large',
        title: 'Score Gauge & Tier Badge',
        desc: 'Visual score donut with classification: High Distinction, Proficient, or Revision Advised.'
      },
      {
        icon: 'bar_chart',
        title: 'Curriculum Topic Breakdown',
        desc: 'Visual accuracy bars showing your strength and weakness across each tested week.'
      },
      {
        icon: 'restart_alt',
        title: 'Retake Missed Only',
        desc: 'One-click launch to immediately re-test the specific questions you answered incorrectly.'
      }
    ],
    tip: 'Click "In-Depth Question Review" to inspect full step-by-step RFC rationales.'
  },
  {
    id: 'review-analysis',
    targetScreen: 'review',
    badge: 'Protocol Review',
    title: 'RFC Protocol Review & In-Place Practice',
    summary: 'Study completed sessions with official RFC citations, distractor explanations, and in-place retesting.',
    highlights: [
      {
        icon: 'filter_alt',
        title: 'Smart Diagnostic Filters',
        desc: 'Isolate Incorrect, Correct, or Flagged questions, or use the search bar for RFC numbers.'
      },
      {
        icon: 'menu_book',
        title: 'Step-by-Step RFC Logic',
        desc: 'Clear explanations detailing why the correct answer is true under protocol specifications.'
      },
      {
        icon: 'touch_app',
        title: 'Interactive In-Place Retesting',
        desc: 'Click choices directly inside any question card to re-attempt it with immediate audio chime feedback.'
      }
    ],
    tip: 'You can use the Session Switcher to review any past attempt stored in history.'
  },
  {
    id: 'settings-bank',
    targetScreen: 'settings',
    badge: 'System Control',
    title: 'Settings, 120-Question Explorer & JSON Backup',
    summary: 'Inspect all 120 curriculum questions, export/import JSON bundles, and toggle audio accessibility.',
    highlights: [
      {
        icon: 'manage_search',
        title: 'Question Bank Explorer',
        desc: 'Filter and inspect all 120 questions with answer choices and RFC rationale.'
      },
      {
        icon: 'download',
        title: 'JSON Export & Import',
        desc: 'Download a clean backup of all 120 questions or import custom curriculum datasets.'
      },
      {
        icon: 'volume_up',
        title: 'Acoustic Feedback Toggle',
        desc: 'Turn on/off tactile Web Audio clicks, option chimes, and completion fanfares.'
      }
    ],
    tip: 'Click "Restore Default 120 Questions" anytime to reload the verified NPTEL curriculum.'
  }
];

interface AppGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateScreen: (screen: ActiveScreen) => void;
}

export const AppGuideModal: React.FC<AppGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateScreen,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const step = GUIDE_STEPS[currentStepIndex];

  // Auto switch screen to match current guide step
  useEffect(() => {
    if (isOpen && step) {
      onNavigateScreen(step.targetScreen);
    }
  }, [isOpen, currentStepIndex, step, onNavigateScreen]);

  // Optional auto-play timer
  useEffect(() => {
    if (!isOpen || !autoPlay) return;

    const timer = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < GUIDE_STEPS.length - 1) {
          return prev + 1;
        } else {
          setAutoPlay(false);
          return prev;
        }
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [isOpen, autoPlay]);

  if (!isOpen) return null;

  const handleNext = () => {
    playSound('click');
    if (currentStepIndex < GUIDE_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    playSound('click');
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleSkipGuide = () => {
    playSound('click');
    setAutoPlay(false);
    onClose();
  };

  const handleJumpToStep = (idx: number) => {
    playSound('select');
    setCurrentStepIndex(idx);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div 
        className="w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-[0_20px_60px_rgba(43,26,84,0.35),0_1px_2px_rgba(255,255,255,0.8),inset_0_1px_1px_rgba(255,255,255,1)] p-6 sm:p-8 space-y-6 relative overflow-hidden border border-surface-container-high"
        role="dialog"
        aria-modal="true"
        aria-label="Application Interactive Guide"
      >
        {/* Subtle decorative accent glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-container/15 rounded-full blur-2xl pointer-events-none"></div>

        {/* Top Header: Badge, Step Counter & Skip All Button */}
        <div className="flex items-center justify-between gap-4 border-b border-surface-container-high pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-primary animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Interactive Guide • Step {currentStepIndex + 1} of {GUIDE_STEPS.length}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary-container text-on-secondary-container">
              {step.badge}
            </span>
          </div>

          {/* Prominent Skip Button */}
          <button
            onClick={handleSkipGuide}
            className="px-3 py-1 rounded-full text-xs font-bold text-outline hover:text-on-surface bg-surface-container hover:bg-surface-container-highest transition-colors cursor-pointer flex items-center gap-1"
            title="Exit guide at any time"
          >
            <span>Skip Guide</span>
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Stepper Dots / Section Skipper */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-medium">
            <span>Skip to any section:</span>
            <span>Viewing: <strong className="text-on-surface capitalize">{step.targetScreen}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {GUIDE_STEPS.map((s, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => handleJumpToStep(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer flex-1 min-w-[28px] ${
                    isCurrent
                      ? 'bg-primary ring-2 ring-primary-fixed shadow-xs'
                      : isPast
                      ? 'bg-primary/40 hover:bg-primary/60'
                      : 'bg-surface-container-high hover:bg-surface-container-highest'
                  }`}
                  title={`Jump to ${s.title}`}
                  aria-label={`Step ${idx + 1}: ${s.title}`}
                />
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-headline font-black tracking-tight text-on-surface">
              {step.title}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
              {step.summary}
            </p>
          </div>

          {/* 3 Key Feature Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {step.highlights.map((h, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-surface-container-low shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] space-y-1.5 border border-transparent hover:border-outline-variant/30 transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-base">{h.icon}</span>
                </div>
                <h3 className="text-xs font-headline font-bold text-on-surface leading-tight">
                  {h.title}
                </h3>
                <p className="text-[11px] text-on-surface-variant leading-snug">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Contextual Pro Tip */}
          {step.tip && (
            <div className="px-4 py-2.5 rounded-xl bg-secondary-container/40 text-on-secondary-container text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">tips_and_updates</span>
              <span className="font-medium">Tip: {step.tip}</span>
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-surface-container-high">
          
          {/* Auto-Play Toggle & Skip Section */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                autoPlay
                  ? 'bg-tertiary text-on-tertiary shadow-xs'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
              }`}
              title="Automatically advance through all sections"
            >
              <span className="material-symbols-outlined text-sm">
                {autoPlay ? 'pause' : 'auto_mode'}
              </span>
              <span>{autoPlay ? 'Auto-Playing' : 'Auto-Play'}</span>
            </button>

            {currentStepIndex < GUIDE_STEPS.length - 1 && (
              <button
                onClick={() => {
                  playSound('click');
                  handleJumpToStep(currentStepIndex + 1);
                }}
                className="text-xs text-on-surface-variant hover:text-primary font-medium cursor-pointer underline underline-offset-2"
              >
                Skip section
              </button>
            )}
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                currentStepIndex === 0
                  ? 'opacity-30 cursor-not-allowed text-outline'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs tracking-wide shadow-[0_3px_0_0_#2b1a54,0_6px_12px_rgba(79,55,138,0.3)] active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{currentStepIndex === GUIDE_STEPS.length - 1 ? 'Finish Guide' : 'Next Step'}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
