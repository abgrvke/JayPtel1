import React, { useState } from 'react';
import { CurricularWeek, AppSettings } from '../types';
import { playSound } from '../utils/storage';

interface PracticeSetupViewProps {
  weeks: CurricularWeek[];
  totalQuestionsCount: number;
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  onLaunchCustomSession: (config: {
    title: string;
    subTitle: string;
    questionCount: number;
    selectedWeeks: number[];
    timed: boolean;
    durationMinutes: number;
    instantFeedback: boolean;
  }) => void;
}

export const PracticeSetupView: React.FC<PracticeSetupViewProps> = ({
  weeks,
  totalQuestionsCount,
  settings,
  onLaunchCustomSession,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<'quick_20' | 'by_week' | 'full_120' | 'custom'>('quick_20');
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [selectedWeeksMulti, setSelectedWeeksMulti] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const [customCount, setCustomCount] = useState<number>(20);
  const [isTimed, setIsTimed] = useState<boolean>(settings.timedMode);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(30);
  const [instantFeedback, setInstantFeedback] = useState<boolean>(settings.instantFeedback);

  const toggleWeekSelection = (weekNum: number) => {
    playSound('click');
    if (selectedWeeksMulti.includes(weekNum)) {
      if (selectedWeeksMulti.length > 1) {
        setSelectedWeeksMulti(selectedWeeksMulti.filter(w => w !== weekNum));
      }
    } else {
      setSelectedWeeksMulti([...selectedWeeksMulti, weekNum].sort((a, b) => a - b));
    }
  };

  const handleLaunch = () => {
    playSound('click');
    let title = 'Custom Practice Drill';
    let subTitle = 'Configured Session';
    let qCount = 20;
    let weeksToUse = selectedWeeksMulti;

    if (selectedPreset === 'quick_20') {
      title = 'Network Exam Readiness Test';
      subTitle = '20 Randomized Balanced MCQs';
      qCount = 20;
      weeksToUse = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    } else if (selectedPreset === 'by_week') {
      const foundWeek = weeks.find(w => w.week === selectedWeek);
      title = `${foundWeek?.weekCode}: ${foundWeek?.title}`;
      subTitle = 'Curricular Module Drill (10 MCQs)';
      qCount = 10;
      weeksToUse = [selectedWeek];
    } else if (selectedPreset === 'full_120') {
      title = 'Full Comprehensive Curricular Bank';
      subTitle = 'All 120 MCQs Across W01–W12';
      qCount = totalQuestionsCount;
      weeksToUse = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    } else {
      title = `Custom Drill (${customCount} MCQs)`;
      subTitle = `${weeksToUse.length} Selected Modules`;
      qCount = Math.min(customCount, weeksToUse.length * 10);
    }

    onLaunchCustomSession({
      title,
      subTitle,
      questionCount: qCount,
      selectedWeeks: weeksToUse,
      timed: isTimed,
      durationMinutes: isTimed ? timeLimitMinutes : 0,
      instantFeedback
    });
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-8">
      {/* Title & Description */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded bg-primary"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Exam Orchestrator</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-headline font-black tracking-tight text-on-surface">
          Practice & Simulation Setup
        </h1>
        <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed">
          Configure diagnostic simulations, targeted weekly curriculum drills, or comprehensive NPTEL syllabus evaluations with granular timing and feedback controls.
        </p>
      </div>

      {/* Main Grid: Modes & Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Preset Mode Selector */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(79,55,138,0.06),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] space-y-4">
            <h2 className="text-base font-headline font-bold text-on-surface">
              1. Select Simulation Format
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Option A: Quick 20 */}
              <div
                onClick={() => {
                  playSound('select');
                  setSelectedPreset('quick_20');
                  setTimeLimitMinutes(20);
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPreset === 'quick_20'
                    ? 'border-primary bg-primary-fixed/20 shadow-[0_4px_16px_rgba(79,55,138,0.12)]'
                    : 'border-transparent bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="p-2 rounded-xl bg-surface-container-lowest text-primary shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    <span className="material-symbols-outlined text-lg">bolt</span>
                  </span>
                  <span className="text-[11px] font-mono font-bold text-primary">20 MCQs</span>
                </div>
                <div>
                  <h3 className="text-sm font-headline font-black text-on-surface">Quick Readiness Test</h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Balanced cross-week sampling covering all 12 networking topics.
                  </p>
                </div>
              </div>

              {/* Option B: By Week */}
              <div
                onClick={() => {
                  playSound('select');
                  setSelectedPreset('by_week');
                  setTimeLimitMinutes(15);
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPreset === 'by_week'
                    ? 'border-primary bg-primary-fixed/20 shadow-[0_4px_16px_rgba(79,55,138,0.12)]'
                    : 'border-transparent bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="p-2 rounded-xl bg-surface-container-lowest text-secondary shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    <span className="material-symbols-outlined text-lg">assignment</span>
                  </span>
                  <span className="text-[11px] font-mono font-bold text-secondary">10 MCQs</span>
                </div>
                <div>
                  <h3 className="text-sm font-headline font-black text-on-surface">Single Module Drill</h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Deep dive into one specific curricular week from W01 to W12.
                  </p>
                </div>
              </div>

              {/* Option C: Full 120 */}
              <div
                onClick={() => {
                  playSound('select');
                  setSelectedPreset('full_120');
                  setTimeLimitMinutes(120);
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPreset === 'full_120'
                    ? 'border-primary bg-primary-fixed/20 shadow-[0_4px_16px_rgba(79,55,138,0.12)]'
                    : 'border-transparent bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="p-2 rounded-xl bg-surface-container-lowest text-tertiary shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    <span className="material-symbols-outlined text-lg">school</span>
                  </span>
                  <span className="text-[11px] font-mono font-bold text-tertiary">120 MCQs</span>
                </div>
                <div>
                  <h3 className="text-sm font-headline font-black text-on-surface">Comprehensive Exam</h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Complete evaluation simulating full end-of-semester certification.
                  </p>
                </div>
              </div>

              {/* Option D: Custom */}
              <div
                onClick={() => {
                  playSound('select');
                  setSelectedPreset('custom');
                  setTimeLimitMinutes(30);
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPreset === 'custom'
                    ? 'border-primary bg-primary-fixed/20 shadow-[0_4px_16px_rgba(79,55,138,0.12)]'
                    : 'border-transparent bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="p-2 rounded-xl bg-surface-container-lowest text-on-surface-variant shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    <span className="material-symbols-outlined text-lg">tune</span>
                  </span>
                  <span className="text-[11px] font-mono font-bold text-on-surface-variant">Custom</span>
                </div>
                <div>
                  <h3 className="text-sm font-headline font-black text-on-surface">Custom Matrix</h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Select specific modules, question counts, and custom rules.
                  </p>
                </div>
              </div>

            </div>

            {/* Contextual Selector when 'by_week' is active */}
            {selectedPreset === 'by_week' && (
              <div className="pt-3 border-t border-surface-container-high space-y-2">
                <label className="text-xs font-bold text-on-surface">Choose Target Curricular Week:</label>
                <select
                  value={selectedWeek}
                  onChange={(e) => {
                    playSound('click');
                    setSelectedWeek(parseInt(e.target.value));
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container text-on-surface text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] cursor-pointer"
                >
                  {weeks.map((w) => (
                    <option key={w.week} value={w.week}>
                      {w.weekCode}: {w.title} (10 Questions)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Contextual Selector when 'custom' is active */}
            {selectedPreset === 'custom' && (
              <div className="pt-3 border-t border-surface-container-high space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-on-surface">Select Number of Questions:</label>
                    <span className="font-mono text-xs font-bold text-primary">{customCount} Questions</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="120"
                    step="5"
                    value={customCount}
                    onChange={(e) => setCustomCount(parseInt(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-on-surface-variant font-mono">
                    <span>5</span>
                    <span>30</span>
                    <span>60</span>
                    <span>90</span>
                    <span>120</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-on-surface">Select Included Modules:</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedWeeksMulti([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])}
                        className="text-[10px] text-primary font-bold hover:underline cursor-pointer"
                      >
                        All
                      </button>
                      <button
                        onClick={() => setSelectedWeeksMulti([selectedWeek])}
                        className="text-[10px] text-outline font-bold hover:underline cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {weeks.map((w) => {
                      const isSelected = selectedWeeksMulti.includes(w.week);
                      return (
                        <button
                          key={w.week}
                          onClick={() => toggleWeekSelection(w.week)}
                          className={`px-3 py-2 rounded-xl text-left text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? 'bg-primary text-on-primary font-bold shadow-sm'
                              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {isSelected ? 'check_box' : 'check_box_outline_blank'}
                          </span>
                          <span className="truncate">{w.weekCode}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Execution Rules & Launch Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(79,55,138,0.06),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] space-y-6">
            <h2 className="text-base font-headline font-bold text-on-surface">
              2. Simulation Rules
            </h2>

            {/* Timed Mode Toggle */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-on-surface block">Timer Tracking</span>
                  <span className="text-[11px] text-on-surface-variant">Enforce realistic exam time limits</span>
                </div>
                <button
                  onClick={() => {
                    playSound('click');
                    setIsTimed(!isTimed);
                  }}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    isTimed ? 'bg-primary' : 'bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      isTimed ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {isTimed && (
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono mb-1.5">
                    <span>Duration:</span>
                    <span className="font-bold text-primary">{timeLimitMinutes} Minutes</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="180"
                    step="5"
                    value={timeLimitMinutes}
                    onChange={(e) => setTimeLimitMinutes(parseInt(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Instant Feedback Toggle */}
            <div className="pt-4 border-t border-surface-container-high flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-on-surface block">Instant RFC Feedback</span>
                <span className="text-[11px] text-on-surface-variant">
                  Show correct answers & RFC rationale immediately on choice
                </span>
              </div>
              <button
                onClick={() => {
                  playSound('click');
                  setInstantFeedback(!instantFeedback);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  instantFeedback ? 'bg-secondary' : 'bg-surface-container-high'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    instantFeedback ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Launch Push Button */}
            <div className="pt-4">
              <button
                onClick={handleLaunch}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-b from-[#5c42a2] to-[#402a73] hover:from-[#654ba9] hover:to-[#452d7e] active:translate-y-1 shadow-[0_6px_0_0_#2b1a54,0_12px_20px_rgba(43,26,84,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] active:shadow-[0_2px_0_0_#2b1a54,0_4px_8px_rgba(43,26,84,0.3)] transition-all cursor-pointer flex items-center justify-center gap-3 text-on-primary font-headline font-black text-base"
              >
                <span className="material-symbols-outlined text-2xl">play_circle</span>
                <span>Launch Simulation</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
