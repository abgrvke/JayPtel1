import React, { useState } from 'react';
import { playSound } from '../utils/storage';

interface OnboardingModalProps {
  isOpen: boolean;
  isFirstUserOnDevice: boolean;
  nextUserNumber: number;
  onComplete: (name: string, roleTitle?: string) => void;
  onClose?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  isFirstUserOnDevice,
  nextUserNumber,
  onComplete,
  onClose,
}) => {
  const defaultLabel = `User ${nextUserNumber}`;
  const [userName, setUserName] = useState('');
  const [roleTitle, setRoleTitle] = useState('Network Candidate');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = userName.trim() || defaultLabel;
    playSound('complete');
    onComplete(finalName, roleTitle);
  };

  const handleQuickName = (choice: string) => {
    playSound('select');
    setUserName(choice);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-[0_24px_70px_rgba(43,26,84,0.4),0_2px_4px_rgba(255,255,255,0.9),inset_0_1px_1px_rgba(255,255,255,1)] p-6 sm:p-8 space-y-6 relative border border-primary/20">
        
        {/* Top Close Button (only if not first user on fresh device) */}
        {!isFirstUserOnDevice && onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        )}

        {/* Emblem & Welcome Header */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-low shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_4px_12px_rgba(79,55,138,0.18)] flex items-center justify-center p-2.5">
              <img 
                alt="NetPrep Emblem" 
                className="h-10 w-auto object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYfgVPp_9HbzjuUOq1bMev4W59UHOW0d38aucBi03GHH8sohGs6WScymUSFB2klxM8xD2XmYqF25vwty_yvlJ8PGsu1RdETd6-G8yYDxk2eknOjqLK2_7x70j4hmO4OQaEBeAsTzxoUnlOZW3b_2uCxd6iui-fLctRleIv792OioDpz5vK_eZ_US26mLvTXSFN8LYw_rBE5qMVEuTK56PF07F_xrOZwWbjIbgtcNT0u6bnIS-v1r4gDg"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-primary text-on-primary shadow-xs">
              {defaultLabel}
            </span>
          </div>

          <div>
            <h1 id="onboarding-title" className="text-2xl sm:text-3xl font-headline font-black tracking-tight text-on-surface">
              {isFirstUserOnDevice ? 'Welcome to NetPrep' : `Sign In as ${defaultLabel}`}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm mt-1 leading-relaxed">
              Computer Networking Exam Readiness & Curricular Practice (120 Questions)
            </p>
          </div>
        </div>

        {/* Device Privacy & Zero History Guarantee Pill */}
        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-primary/10 flex items-start gap-3">
          <span className="p-1 rounded-lg bg-primary-fixed text-primary shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-base">lock_open</span>
          </span>
          <div className="text-xs text-on-surface-variant leading-relaxed">
            <span className="font-bold text-on-surface block">No Password Required • Device-Isolated</span>
            <span>
              {isFirstUserOnDevice 
                ? 'Your practice sessions, accuracy metrics, and review flags will start strictly at 0 and track on this device.'
                : `A fresh profile for ${defaultLabel} will start with 0 test history, keeping candidate scores completely separate.`}
            </span>
          </div>
        </div>

        {/* Form: Just User Name */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="user-name-input" className="block text-xs font-bold uppercase tracking-wider text-on-surface">
              Candidate Name or ID
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant material-symbols-outlined text-lg">
                person
              </span>
              <input
                id="user-name-input"
                type="text"
                autoFocus
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  setError('');
                }}
                placeholder={`e.g., Alex Chen or ${defaultLabel}`}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-high border border-outline-variant focus:border-primary focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 text-sm font-semibold text-on-surface outline-hidden transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
              />
            </div>
            {error && <p className="text-xs text-error font-medium">{error}</p>}
          </div>

          {/* Quick Choice Suggestions */}
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-on-surface-variant">Quick suggestions:</span>
            <div className="flex flex-wrap gap-2">
              {[defaultLabel, 'Network Student', 'Exam Candidate', 'Systems Admin'].map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => handleQuickName(suggestion)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Role / Focus (Optional) */}
          <div className="space-y-1.5 pt-1">
            <label htmlFor="role-select" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Study Track (Optional)
            </label>
            <select
              id="role-select"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant text-xs font-semibold text-on-surface outline-hidden focus:border-primary"
            >
              <option value="Network Candidate">Network Candidate (General Prep)</option>
              <option value="NPTEL Student">NPTEL Course Student</option>
              <option value="GATE Aspirant">GATE Computer Science Aspirant</option>
              <option value="Network Engineer">Network Systems Engineer</option>
            </select>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-b from-[#5c42a2] to-[#402a73] hover:from-[#654ba9] hover:to-[#452d7e] active:translate-y-0.5 text-on-primary font-headline font-bold text-sm tracking-wide shadow-[0_4px_0_0_#2b1a54,0_8px_16px_rgba(79,55,138,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">login</span>
              <span>
                {userName.trim() 
                  ? `Sign In as ${defaultLabel} (${userName.trim()})`
                  : `Start Practice as ${defaultLabel}`}
              </span>
            </button>
          </div>
        </form>

        <div className="text-center pt-1 border-t border-surface-container-high">
          <p className="text-[11px] font-mono text-on-surface-variant">
            Initial stats: 0 Drills • 0 Solved • 0.0% Accuracy • 120 Questions Ready
          </p>
        </div>
      </div>
    </div>
  );
};
