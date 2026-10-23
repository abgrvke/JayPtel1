import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low shadow-[0_-2px_12px_rgba(79,55,138,0.04)] py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-on-surface-variant">
          <span className="font-bold uppercase tracking-wider text-on-surface">Shortcuts:</span>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <kbd className="font-mono font-bold text-primary">1-4</kbd>
            <span>Options</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <kbd className="font-mono font-bold text-primary">Enter</kbd>
            <span>Submit</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <kbd className="font-mono font-bold text-primary">Space</kbd>
            <span>Proceed</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
            <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_4px_rgba(118,91,0,0.5)]"></span>
            <span className="text-xs font-semibold tracking-tight text-on-surface-variant">Zero-backend static site</span>
          </div>
          <span className="text-xs text-on-surface-variant font-medium">© 2025 NetPrep Engine</span>
        </div>
      </div>
    </footer>
  );
};
