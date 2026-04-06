import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProgressStore, SentenceProgress, StudyStats } from '../types';

interface ProgressState extends ProgressStore {
  completeScene: (sceneId: string) => void;
  recordSentenceAttempt: (sentenceId: string) => void;
  updateStudyTime: (minutes: number) => void;
  checkAndUpdateStreak: () => void;
  isSceneCompleted: (sceneId: string) => boolean;
  getSentenceProgress: (sentenceId: string) => SentenceProgress | undefined;
}

const initialState: ProgressStore = {
  completedScenes: [],
  sentenceProgress: {},
  stats: { totalStudyTime: 0, streakDays: 0, lastStudyDate: '' }
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialState,
      completeScene: (sceneId: string) => {
        set((state) => ({ completedScenes: [...new Set([...state.completedScenes, sceneId])] }));
      },
      recordSentenceAttempt: (sentenceId: string) => {
        set((state) => ({
          sentenceProgress: {
            ...state.sentenceProgress,
            [sentenceId]: {
              recorded: true,
              attempts: (state.sentenceProgress[sentenceId]?.attempts || 0) + 1,
              lastStudied: new Date().toISOString()
            }
          }
        }));
      },
      updateStudyTime: (minutes: number) => {
        set((state) => ({ stats: { ...state.stats, totalStudyTime: state.stats.totalStudyTime + minutes } }));
      },
      checkAndUpdateStreak: () => {
        const today = new Date().toDateString();
        const lastDate = get().stats.lastStudyDate;
        if (lastDate === today) return;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isConsecutive = lastDate === yesterday.toDateString();
        set((state) => ({
          stats: {
            ...state.stats,
            streakDays: isConsecutive ? state.stats.streakDays + 1 : 1,
            lastStudyDate: today
          }
        }));
      },
      isSceneCompleted: (sceneId: string) => get().completedScenes.includes(sceneId),
      getSentenceProgress: (sentenceId: string) => get().sentenceProgress[sentenceId]
    }),
    { name: 'scenespeak-progress' }
  )
);
