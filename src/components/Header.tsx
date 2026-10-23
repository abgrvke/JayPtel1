import React, { useState, useEffect } from 'react';
import { ActiveScreen, UserProfile } from '../types';

interface HeaderProps {
  activeScreen: ActiveScreen;
  activeUser: UserProfile;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenGuide: () => void;
  onOpenUserModal: () => void;
  onOpenNewUserModal?: () => void;
  totalQuestions: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  activeUser,
  onNavigate,
  onOpenGuide,
  onOpenUserModal,
  onOpenNewUserModal,
  totalQuestions,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems: { id: ActiveScreen; label: string; icon: string; desc: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', desc: 'Overview, modules & scoreboard' },
    { id: 'practice-setup', label: 'Setup', icon: 'tune', desc: 'Custom quiz configurations' },
    { id: 'active-quiz', label: 'Active Quiz', icon: 'timer', desc: 'Live timed MCQ session' },
    { id: 'results', label: 'Results', icon: 'assessment', desc: 'Exam score breakdown' },
    { id: 'review', label: 'Review', icon: 'rate_review', desc: 'Detailed RFC rationales' },
    { id: 'settings', label: 'Settings', icon: 'settings', desc: 'App options & question bank' },
  ];

  const handleNav = (screen: ActiveScreen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-surface/95 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_4px_20px_-2px_rgba(79,55,138,0.06),0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="h-16 sm:h-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Brand / Logo (Left) - Compact on Mobile */}
        <div 
          className="flex items-center gap-2.5 sm:gap-4 shrink-0 cursor-pointer select-none"
          onClick={() => handleNav('dashboard')}
        >
          <div className="p-1 sm:p-1.5 rounded-xl bg-surface-container-lowest shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_6px_rgba(79,55,138,0.12)] flex items-center justify-center shrink-0">
            <img 
              alt="NetPrep Emblem" 
              className="h-7 sm:h-8 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYfgVPp_9HbzjuUOq1bMev4W59UHOW0d38aucBi03GHH8sohGs6WScymUSFB2klxM8xD2XmYqF25vwty_yvlJ8PGsu1RdETd6-G8yYDxk2eknOjqLK2_7x70j4hmO4OQaEBeAsTzxoUnlOZW3b_2uCxd6iui-fLctRleIv792OioDpz5vK_eZ_US26mLvTXSFN8LYw_rBE5qMVEuTK56PF07F_xrOZwWbjIbgtcNT0u6bnIS-v1r4gDg"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg font-headline font-black tracking-tight text-on-surface">NetPrep</span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-label font-bold uppercase tracking-wider rounded-full bg-secondary-container text-on-secondary-container shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                CN-Spec v2.4
              </span>
            </div>
            <span className="hidden md:block text-[11px] font-medium tracking-tight text-on-surface-variant">
              Computer Networking Practice
            </span>
          </div>
        </div>

        {/* Desktop System Telemetry Pills (XL screens only) */}
        <div className="hidden xl:flex items-center gap-3 px-3 py-1.5 rounded-full bg-surface-container-low shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <span className="w-2 h-2 rounded-full bg-tertiary-container shadow-[0_0_6px_rgba(201,167,77,0.8)]"></span>
            <span className="text-xs font-semibold text-on-surface">{totalQuestions} Questions</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_rgba(79,55,138,0.8)]"></span>
            <span className="text-xs font-semibold text-on-surface">Engine Active</span>
          </div>
        </div>

        {/* Desktop Navigation pill capsule (md+ only) */}
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

        {/* Desktop Right Actions: Guide Button & User Layer Capsule */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          
          {/* Guide Button on Top Navigation Bar */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-primary bg-primary-fixed hover:bg-primary hover:text-on-primary shadow-[0_2px_8px_rgba(79,55,138,0.15),inset_0_1px_1px_rgba(255,255,255,0.8)] active:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
            title="Interactive App Walkthrough & Guide"
          >
            <span className="material-symbols-outlined text-base">explore</span>
            <span>Guide</span>
          </button>

          {/* Active User Layer Capsule */}
          <button
            onClick={onOpenUserModal}
            className="flex items-center gap-2 p-1 pl-3 rounded-full bg-surface-container-high hover:bg-surface-container-highest shadow-[0_1px_3px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.8)] active:translate-y-0.5 transition-all cursor-pointer"
            title={`Active User: ${activeUser.name} (Click to switch candidate)`}
          >
            <div className="flex flex-col text-left leading-none">
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
        </div>

        {/* Mobile-Only Header Controls (User Avatar Badge + Hamburger Toggle) */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          {/* Quick Active User Pill on Mobile */}
          <button
            onClick={onOpenUserModal}
            className="flex items-center gap-1.5 p-1 pl-2 rounded-full bg-surface-container-high text-xs font-bold text-on-surface cursor-pointer"
            title="Manage Active Candidate"
          >
            <span className="text-[11px] font-mono text-primary font-black">{activeUser.label}</span>
            <div className="relative">
              <img 
                alt={activeUser.name} 
                className="w-6 h-6 rounded-full object-cover" 
                src={activeUser.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuActluAf71OpO07pmCtN-csrAAjfASFz2_wpDm7rXJ-E9zu8rD3j-ZpmQTScIaJrFB_VWCZ7KzSkfpkWgDSygadTu424TsPP5SpCpRD1ujKX4Jf-SU9X-3HZIzeX4iMXIrHA3frdRPpV1eHa-NlmOhyVTwcVQdYj16c35KbttD4IkiVchIt5FLW0uzGiY20GJdg2fEjDw_DJsVxYmJvbPPtT7BnWUga-bcsRL7M1jvL1p00t4mm5JzY7g"}
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-1 ring-surface"></span>
            </div>
          </button>

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-2xl transition-transform duration-200">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Overlay & Full Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-black/40 backdrop-blur-xs z-50 animate-in fade-in duration-150">
          <div className="w-full bg-surface-container-lowest border-b border-surface-container-high shadow-2xl max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto px-4 py-5 space-y-4">
            
            {/* 1. Candidate / User Layer Card in Burger Menu */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/20 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                  Active Candidate Profile
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Online
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img
                    src={activeUser.avatarUrl}
                    alt={activeUser.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/40"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-surface"></span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-bold text-on-surface truncate">{activeUser.name}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-primary text-on-primary">
                      {activeUser.label}
                    </span>
                  </div>
                  <span className="text-xs text-on-surface-variant font-medium block truncate">
                    {activeUser.roleTitle || 'Candidate'}
                  </span>
                </div>
              </div>

              {/* Candidate Quick Switch & Add Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-surface-container-high/60">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenUserModal();
                  }}
                  className="py-2 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">manage_accounts</span>
                  <span>Switch User</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenNewUserModal) {
                      onOpenNewUserModal();
                    } else {
                      onOpenUserModal();
                    }
                  }}
                  className="py-2 px-3 rounded-xl bg-primary text-on-primary text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-base">person_add</span>
                  <span>+ New User</span>
                </button>
              </div>
            </div>

            {/* 2. Primary Navigation Links with Icons */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-variant px-1">
                Navigation Screens
              </span>
              <div className="grid grid-cols-1 gap-1.5 pt-1">
                {navItems.map((item) => {
                  const isActive = activeScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-primary text-on-primary shadow-md'
                          : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-xl ${isActive ? 'text-on-primary' : 'text-primary'}`}>
                          {item.icon}
                        </span>
                        <div>
                          <span className="text-xs font-bold block">{item.label}</span>
                          <span className={`text-[10px] ${isActive ? 'text-primary-fixed' : 'text-on-surface-variant'}`}>
                            {item.desc}
                          </span>
                        </div>
                      </div>
                      <span className={`material-symbols-outlined text-base ${isActive ? 'text-on-primary' : 'text-outline'}`}>
                        chevron_right
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Interactive App Guide Action Button */}
            <div className="pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGuide();
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-primary-fixed to-secondary-container hover:from-primary hover:to-primary text-on-primary-fixed hover:text-on-primary font-headline font-bold text-xs flex items-center justify-between transition-all cursor-pointer shadow-xs active:translate-y-0.5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-xl bg-surface-container-lowest/40 material-symbols-outlined text-lg">
                    explore
                  </span>
                  <div className="text-left">
                    <span className="block font-bold">Interactive App Guide</span>
                    <span className="block text-[10px] opacity-80">7-step interactive tour & walkthrough</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>

            {/* 4. Telemetry Status Badges */}
            <div className="p-3 rounded-2xl bg-surface-container text-center space-y-1.5">
              <div className="flex items-center justify-center gap-3 text-[11px] font-semibold text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  {totalQuestions} MCQs
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Offline Ready
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Client Storage
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
