import React, { useState } from 'react';
import { UserProfile, PracticeSession } from '../types';
import { playSound } from '../utils/storage';

interface UserLayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: UserProfile[];
  activeUser: UserProfile;
  sessions: PracticeSession[];
  onSelectUser: (user: UserProfile) => void;
  onUpdateUser: (user: UserProfile) => void;
  onCreateUser: (name: string, roleTitle: string) => void;
  onReviewSession: (sessionId: string) => void;
}

export const UserLayerModal: React.FC<UserLayerModalProps> = ({
  isOpen,
  onClose,
  users,
  activeUser,
  sessions,
  onSelectUser,
  onUpdateUser,
  onCreateUser,
  onReviewSession,
}) => {
  const [editingName, setEditingName] = useState(activeUser.name);
  const [editingRole, setEditingRole] = useState(activeUser.roleTitle || 'Candidate');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('Network Engineer');
  const [activeTab, setActiveTab] = useState<'users' | 'activity'>('users');

  if (!isOpen) return null;

  // Calculate statistics per user
  const getUserStats = (userId: string) => {
    const userSessions = sessions.filter(s => s.userId === userId && s.completed);
    const sessionCount = userSessions.length;
    let totalQuestions = 0;
    let totalCorrect = 0;

    userSessions.forEach(s => {
      totalQuestions += s.totalQuestions;
      totalCorrect += s.score;
    });

    const accuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

    return {
      sessionCount,
      totalQuestions,
      totalCorrect,
      accuracy: accuracy.toFixed(1),
      accuracyNum: accuracy
    };
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingName.trim()) return;
    playSound('click');
    onUpdateUser({
      ...activeUser,
      name: editingName.trim(),
      roleTitle: editingRole.trim()
    });
    setIsEditing(false);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;
    playSound('complete');
    onCreateUser(newUserName.trim(), newUserRole.trim());
    setNewUserName('');
    setIsCreating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-[0_20px_60px_rgba(43,26,84,0.35),0_1px_2px_rgba(255,255,255,0.8),inset_0_1px_1px_rgba(255,255,255,1)] p-6 sm:p-8 space-y-6 relative border border-surface-container-high"
        role="dialog"
        aria-modal="true"
        aria-label="User Layer Profile Manager"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-primary-fixed text-primary">
              <span className="material-symbols-outlined text-lg">badge</span>
            </span>
            <div>
              <h2 className="text-lg font-headline font-black text-on-surface">Candidate & User Layer</h2>
              <span className="text-xs text-on-surface-variant font-medium">
                Tracks who took which tests, individual accuracy & session history
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Navigation Tabs (Users vs Activity Log) */}
        <div className="flex items-center gap-2 border-b border-surface-container-high pb-2">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Candidate Profiles ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'activity'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Who Did What ({sessions.length} Records)
          </button>
        </div>

        {activeTab === 'users' ? (
          <div className="space-y-6">
            
            {/* Active User Card with in-place editor */}
            <div className="p-5 rounded-2xl bg-surface-container-low border border-primary/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                  Currently Active Profile
                </span>
                {!isEditing && (
                  <button
                    onClick={() => {
                      setEditingName(activeUser.name);
                      setEditingRole(activeUser.roleTitle || 'Candidate');
                      setIsEditing(true);
                    }}
                    className="text-xs font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-xs">edit</span>
                    <span>Edit Name</span>
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveEdit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-on-surface block mb-1">Candidate Name:</label>
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest text-xs text-on-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g. User 1 (Abhijeet G.)"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-on-surface block mb-1">Role / Designation:</label>
                      <input
                        type="text"
                        value={editingRole}
                        onChange={(e) => setEditingRole(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest text-xs text-on-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g. Lead Network Engineer"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 rounded-xl bg-surface-container text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold cursor-pointer shadow-xs"
                    >
                      Save Profile
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={activeUser.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuActluAf71OpO07pmCtN-csrAAjfASFz2_wpDm7rXJ-E9zu8rD3j-ZpmQTScIaJrFB_VWCZ7KzSkfpkWgDSygadTu424TsPP5SpCpRD1ujKX4Jf-SU9X-3HZIzeX4iMXIrHA3frdRPpV1eHa-NlmOhyVTwcVQdYj16c35KbttD4IkiVchIt5FLW0uzGiY20GJdg2fEjDw_DJsVxYmJvbPPtT7BnWUga-bcsRL7M1jvL1p00t4mm5JzY7g'}
                        alt={activeUser.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-surface"></span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-headline font-black text-on-surface">{activeUser.name}</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary text-on-primary">
                          {activeUser.label}
                        </span>
                      </div>
                      <span className="text-xs text-on-surface-variant font-medium">
                        {activeUser.roleTitle || 'Candidate'}
                      </span>
                    </div>
                  </div>

                  {/* Quick stats for active user */}
                  {(() => {
                    const st = getUserStats(activeUser.id);
                    return (
                      <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2.5 rounded-xl shadow-xs">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-on-surface-variant block">Accuracy</span>
                          <span className="text-sm font-headline font-black text-primary">{st.accuracy}%</span>
                        </div>
                        <div className="w-px h-6 bg-surface-container-high"></div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-on-surface-variant block">Solved</span>
                          <span className="text-sm font-headline font-black text-on-surface">{st.totalCorrect} MCQs</span>
                        </div>
                        <div className="w-px h-6 bg-surface-container-high"></div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-on-surface-variant block">Tests</span>
                          <span className="text-sm font-headline font-black text-on-surface">{st.sessionCount}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Profile Switcher List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Switch Active Candidate
                </span>
                {!isCreating && (
                  <button
                    onClick={() => setIsCreating(true)}
                    className="text-xs font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">person_add</span>
                    <span>Add New User</span>
                  </button>
                )}
              </div>

              {isCreating && (
                <form onSubmit={handleCreateNew} className="p-4 rounded-2xl bg-surface-container space-y-3">
                  <h4 className="text-xs font-bold text-on-surface">Create New Candidate Profile</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="e.g. User 3 (Alex Morgan)"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-surface-container-lowest text-xs text-on-surface border border-outline-variant focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g. Associate Architect)"
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-surface-container-lowest text-xs text-on-surface border border-outline-variant focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="px-3 py-1.5 rounded-xl bg-surface-container-high text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold cursor-pointer"
                    >
                      Create & Switch
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                {users.map(u => {
                  const isActive = u.id === activeUser.id;
                  const st = getUserStats(u.id);

                  return (
                    <div
                      key={u.id}
                      onClick={() => {
                        if (!isActive) {
                          playSound('click');
                          onSelectUser(u);
                        }
                      }}
                      className={`p-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between border-2 ${
                        isActive
                          ? 'border-primary bg-primary-fixed/20 shadow-xs'
                          : 'border-transparent bg-surface-container hover:bg-surface-container-high'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuActluAf71OpO07pmCtN-csrAAjfASFz2_wpDm7rXJ-E9zu8rD3j-ZpmQTScIaJrFB_VWCZ7KzSkfpkWgDSygadTu424TsPP5SpCpRD1ujKX4Jf-SU9X-3HZIzeX4iMXIrHA3frdRPpV1eHa-NlmOhyVTwcVQdYj16c35KbttD4IkiVchIt5FLW0uzGiY20GJdg2fEjDw_DJsVxYmJvbPPtT7BnWUga-bcsRL7M1jvL1p00t4mm5JzY7g'}
                          alt={u.name}
                          className="w-9 h-9 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-on-surface truncate max-w-[130px]">{u.name}</span>
                            <span className="text-[10px] font-mono font-bold text-secondary">{u.label}</span>
                          </div>
                          <span className="text-[11px] text-on-surface-variant font-medium">
                            {st.sessionCount} tests • {st.accuracy}%
                          </span>
                        </div>
                      </div>

                      {isActive ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-on-primary">
                          Active
                        </span>
                      ) : (
                        <button className="text-xs font-bold text-primary hover:underline">
                          Switch
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          /* Who Did What Activity Log */
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block">
              Historical Attribution: Who Did What & Score Comparison
            </span>

            <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
              {sessions.map(s => {
                const userObj = users.find(u => u.id === s.userId) || { name: s.userName || 'User 1', label: s.userLabel || 'User 1' };
                return (
                  <div
                    key={s.id}
                    className="p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 rounded-lg bg-surface-container-highest font-mono font-bold text-primary text-[10px]">
                        {s.userLabel || userObj.label}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-on-surface">{userObj.name}</span>
                          <span className="text-[10px] text-on-surface-variant">· {s.formattedDate}</span>
                        </div>
                        <div className="text-[11px] text-on-surface-variant">{s.modeTitle}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="font-mono font-bold text-on-surface">{s.score} / {s.totalQuestions}</div>
                        <div className={`text-[10px] font-bold ${s.accuracy >= 90 ? 'text-primary' : 'text-on-surface-variant'}`}>
                          {s.accuracy.toFixed(1)}%
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onReviewSession(s.id);
                          onClose();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary font-bold transition-all text-xs cursor-pointer"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
