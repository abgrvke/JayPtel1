import React, { useState } from 'react';
import { ActiveScreen, UserProfile } from '../types';

interface HeaderProps {
  activeScreen: ActiveScreen;
  activeUser: UserProfile;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenGuide: () => void;
  onOpenUserModal: () => void;
  totalQuestions: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  activeUser,
  onNavigate,
  onOpenGuide,
  onOpenUserModal,
  totalQuestions,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveScreen; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'practice-setup', label: 'Setup' },
    { id: 'active-quiz', label: 'Active Quiz' },
    { id: 'results', label: 'Results' },
    { id: 'review', label: 'Review' },
    { id: 'settings', label: 'Settings' },
  ];

  const handleNav = (screen: ActiveScreen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(79,55,138,0.06),0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        
        {/* Brand / Logo */}
        <div 
          className="flex items-center gap-4 shrink-0 cursor-pointer"
          onClick={() => handleNav('dashboard')}
        >
          <div className="p-1.5 rounded-xl bg-surface-container-lowest shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_6px_rgba(79,55,138,0.12)] flex items-center justify-center">
            <img 
              alt="NetPrep Emblem" 
              className="h-8 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYfgVPp_9HbzjuUOq1bMev4W59UHOW0d38aucBi03GHH8sohGs6WScymUSFB2klxM8xD2XmYqF25vwty_yvlJ8PGsu1RdETd6-G8yYDxk2eknOjqLK2_7x70j4hmO4OQaEBeAsTzxoUnlOZW3b_2uCxd6iui-fLctRleIv792OioDpz5vK_eZ_US26mLvTXSFN8LYw_rBE5qMVEuTK56PF07F_xrOZwWbjIbgtcNT0u6bnIS-v1r4gDg"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-headline font-black tracking-tight text-on-surface">NetPrep</span>
              <span className="px-2 py-0.5 text-[10px] font-label font-bold uppercase tracking-wider rounded-full bg-secondary-container text-on-secondary-container shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                CN-Spec v2.4
              </span>
            </div>
            <span className="text-[11px] font-medium tracking-tight text-on-surface-variant">Computer Networking Practice</span>
          </div>
        </div>

        {/* System telemetry pills */}
        <div className="hidden xl:flex items-center gap-3 px-3 py-1.5 rounded-full bg-surface-container-low shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <span className="w-2 h-2 rounded-full bg-tertiary-container shadow-[0_0_6px_rgba(201,167,77,0.8)]"></span>
            <span className="text-xs font-semibold text-on-surface">{totalQuestions} Questions Ready</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_rgba(79,55,138,0.8)]"></span>
            <span className="text-xs font-semibold text-on-surface">Engine Active</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_6px_rgba(99,89,124,0.6)]"></span>
            <span className="text-xs font-semibold text-on-surface-variant">Offline LocalStorage</span>
          </div>
        </div>

        {/* Desktop Navigation pill capsule */}
        <nav className="hidden md:flex items-center p-1.5 rounded-full bg-surface-container-high shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)]">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-xs tracking-wide px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-surface-container-lowest text-primary font-bold shadow-[0_2px_8px_rgba(79,55,138,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)]'
                    : 'font-semibold text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Guide Button & User Layer Capsule */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Guide Button on Top Navigation Bar */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-primary bg-primary-fixed hover:bg-primary hover:text-on-primary shadow-[0_2px_8px_rgba(79,55,138,0.15),inset_0_1px_1px_rgba(255,255,255,0.8)] active:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
            title="Interactive App Walkthrough & Guide"
          >
            <span className="material-symbols-outlined text-base">explore</span>
            <span className="hidden sm:inline">Guide</span>
          </button>

          {/* Active User Layer Capsule */}
          <button
            onClick={onOpenUserModal}
            className="flex items-center gap-2 p-1 sm:pl-3 rounded-full bg-surface-container-high hover:bg-surface-container-highest shadow-[0_1px_3px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.8)] active:translate-y-0.5 transition-all cursor-pointer"
            title={`Active User: ${activeUser.name} (Click to switch candidate)`}
          >
            <div className="flex-col text-left leading-none hidden sm:flex">
              <span className="text-[10px] font-mono font-bold text-primary">{activeUser.label}</span>
              <span className="text-xs font-bold text-on-surface truncate max-w-[100px]">
                {activeUser.name.replace(/\(.*?\)/, '').trim() || activeUser.label}
              </span>
            </div>
            <div className="relative p-0.5 rounded-full bg-surface-container-lowest shadow-xs">
              <img 
                alt={activeUser.name} 
                className="w-7 h-7 rounded-full object-cover" 
                src={activeUser.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuActluAf71OpO07pmCtN-csrAAjfASFz2_wpDm7rXJ-E9zu8rD3j-ZpmQTScIaJrFB_VWCZ7KzSkfpkWgDSygadTu424TsPP5SpCpRD1ujKX4Jf-SU9X-3HZIzeX4iMXIrHA3frdRPpV1eHa-NlmOhyVTwcVQdYj16c35KbttD4IkiVchIt5FLW0uzGiY20GJdg2fEjDw_DJsVxYmJvbPPtT7BnWUga-bcsRL7M1jvL1p00t4mm5JzY7g"}
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-surface shadow-[0_0_4px_rgba(16,185,129,0.8)]"></span>
            </div>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-surface-container-high text-on-surface-variant hover:text-on-surface cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 pt-2 bg-surface border-t border-outline-variant/30 shadow-lg space-y-2">
          {/* User badge on mobile */}
          <div 
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenUserModal();
            }}
            className="p-3 rounded-xl bg-surface-container-high flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <img
                src={activeUser.avatarUrl}
                alt={activeUser.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <span className="text-xs font-bold text-on-surface block">{activeUser.name}</span>
                <span className="text-[10px] text-primary font-mono font-bold">{activeUser.label} · Active</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-sm text-outline">swap_horiz</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-xs px-4 py-2.5 rounded-xl font-bold text-left transition-all cursor-pointer ${
                  activeScreen === item.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenGuide();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">explore</span>
            <span>Launch App Guide Tour</span>
          </button>
        </div>
      )}
    </header>
  );
};
