import React, { useState } from 'react';
import { Question, AppSettings } from '../types';
import { playSound } from '../utils/storage';

interface SettingsViewProps {
  questions: Question[];
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  onRestoreQuestions: () => void;
  onResetCache: () => void;
  onImportQuestions: (file: File) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  questions,
  settings,
  onUpdateSettings,
  onRestoreQuestions,
  onResetCache,
  onImportQuestions,
}) => {
  const [selectedWeekFilter, setSelectedWeekFilter] = useState<number>(0);
  const [questionSearch, setQuestionSearch] = useState('');
  const [previewQuestion, setPreviewQuestion] = useState<Question | null>(null);

  const filteredQuestions = questions.filter(q => {
    if (selectedWeekFilter > 0 && q.week !== selectedWeekFilter) return false;
    if (questionSearch.trim()) {
      const text = `${q.question} ${q.topic} ${q.rfcRef || ''}`.toLowerCase();
      return text.includes(questionSearch.toLowerCase());
    }
    return true;
  });

  const handleExportJSON = () => {
    playSound('click');
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `netprep_question_bank_120.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleToggleSound = () => {
    const updated = !settings.soundEffects;
    if (updated) playSound('click');
    onUpdateSettings({ ...settings, soundEffects: updated });
  };

  const handleToggleInstant = () => {
    playSound('click');
    onUpdateSettings({ ...settings, instantFeedback: !settings.instantFeedback });
  };

  const handleToggleTimed = () => {
    playSound('click');
    onUpdateSettings({ ...settings, timedMode: !settings.timedMode });
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-10">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded bg-primary"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Engine Configuration</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-headline font-black tracking-tight text-on-surface">
          Settings & Question Bank
        </h1>
        <p className="text-sm text-on-surface-variant max-w-xl">
          Manage local question dataset, export/import custom JSON specs, audio accessibility preferences, and storage cache.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Preferences & Bank Operations */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Preferences Card */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(79,55,138,0.05),0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] space-y-5">
            <h2 className="text-base font-headline font-bold text-on-surface">
              General Engine Preferences
            </h2>

            {/* Sound Effects */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-on-surface block">Acoustic Feedback</span>
                <span className="text-[11px] text-on-surface-variant">Tactile Web Audio clicks & chimes</span>
              </div>
              <button
                onClick={handleToggleSound}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.soundEffects ? 'bg-primary' : 'bg-surface-container-high'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.soundEffects ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Default Instant Feedback */}
            <div className="pt-3 border-t border-surface-container-high flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-on-surface block">Default Learn Mode</span>
                <span className="text-[11px] text-on-surface-variant">Display RFC rationales immediately</span>
              </div>
              <button
                onClick={handleToggleInstant}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.instantFeedback ? 'bg-secondary' : 'bg-surface-container-high'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.instantFeedback ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Timed Mode */}
            <div className="pt-3 border-t border-surface-container-high flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-on-surface block">Timed Exam Mode</span>
                <span className="text-[11px] text-on-surface-variant">Show elapsed timer by default</span>
              </div>
              <button
                onClick={handleToggleTimed}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.timedMode ? 'bg-primary' : 'bg-surface-container-high'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.timedMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Dataset Tools Card */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(79,55,138,0.05),0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] space-y-4">
            <h2 className="text-base font-headline font-bold text-on-surface">
              Dataset Management
            </h2>
            <p className="text-xs text-on-surface-variant">
              The question bank is maintained locally with zero backend dependencies. You can backup or load alternate JSON specs.
            </p>

            <div className="space-y-2.5 pt-1">
              <button
                onClick={handleExportJSON}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-highest text-on-surface text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm text-primary">download</span>
                <span>Export Bank as JSON ({questions.length} MCQs)</span>
              </button>

              <label className="w-full px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-highest text-on-surface text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm text-secondary">upload</span>
                <span>Import JSON Question Bundle</span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      playSound('click');
                      onImportQuestions(file);
                    }
                  }}
                />
              </label>

              <button
                onClick={() => {
                  if (window.confirm('Restore default 120-question NPTEL curriculum bank?')) {
                    playSound('click');
                    onRestoreQuestions();
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">settings_backup_restore</span>
                <span>Restore Default 120 Questions</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Purge all sessions and reset cache?')) {
                    onResetCache();
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl text-error text-xs font-semibold hover:bg-error-container/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">delete_sweep</span>
                <span>Purge Local Storage</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Question Bank Inspector */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(79,55,138,0.05),0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-headline font-bold text-on-surface">
                  Question Bank Explorer
                </h2>
                <span className="text-xs text-on-surface-variant font-mono">
                  Showing {filteredQuestions.length} of {questions.length} questions
                </span>
              </div>

              {/* Week filter */}
              <select
                value={selectedWeekFilter}
                onChange={(e) => {
                  playSound('click');
                  setSelectedWeekFilter(parseInt(e.target.value));
                }}
                className="px-3 py-1.5 rounded-xl bg-surface-container text-on-surface text-xs font-bold cursor-pointer"
              >
                <option value={0}>All 12 Modules</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => (
                  <option key={w} value={w}>
                    Week {w.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative">
              <span className="material-symbols-outlined text-sm text-outline absolute left-3 top-2.5">
                search
              </span>
              <input
                type="text"
                placeholder="Search question stems, topics, or RFCs..."
                value={questionSearch}
                onChange={(e) => setQuestionSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
              />
            </div>

            {/* List */}
            <div className="max-h-[500px] overflow-y-auto space-y-3 pr-1">
              {filteredQuestions.map((q) => (
                <div
                  key={q.id}
                  onClick={() => {
                    playSound('click');
                    setPreviewQuestion(previewQuestion?.id === q.id ? null : q);
                  }}
                  className="p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer space-y-2 border border-transparent hover:border-outline-variant/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-surface-container-lowest text-on-surface-variant shadow-xs">
                        W{q.week.toString().padStart(2, '0')}
                      </span>
                      <span className="text-xs font-bold text-on-surface">{q.topic}</span>
                    </div>
                    {q.rfcRef && (
                      <span className="text-[10px] font-mono font-semibold text-tertiary">
                        {q.rfcRef}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant line-clamp-2">
                    {q.question}
                  </p>

                  {/* Expanded Inspector */}
                  {previewQuestion?.id === q.id && (
                    <div className="pt-3 border-t border-outline-variant/30 space-y-3 mt-2 animate-in fade-in duration-150">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase text-on-surface-variant">Answer Choices:</span>
                        {q.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={`p-2 rounded-lg text-xs flex items-center justify-between ${
                              oIdx === q.correctAnswer
                                ? 'bg-emerald-100 text-emerald-950 font-bold'
                                : 'bg-surface-container-lowest text-on-surface-variant'
                            }`}
                          >
                            <span>{['A', 'B', 'C', 'D'][oIdx]}. {opt}</span>
                            {oIdx === q.correctAnswer && (
                              <span className="text-[10px] uppercase font-bold text-emerald-700">Correct Answer</span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl bg-surface-container-lowest text-xs text-on-surface">
                        <span className="font-bold text-primary block mb-1">RFC Explanation:</span>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
