export interface Scene {
  id: string;
  category: 'social' | 'travel';
  title: string;
  coverImage: string;
  description: string;
  coreSentence: string;
  dialogue: Dialogue;
  sentences: Sentence[];
}

export interface Dialogue {
  id: string;
  context: string;
  speakers: Speaker[];
  lines: Line[];
}

export interface Speaker {
  id: string;
  name: string;
  avatar: string;
}

export interface Line {
  speakerId: string;
  text: string;
  audioUrl?: string;
}

export interface Sentence {
  id: string;
  text: string;
  audioUrl: string;
  context: string;
  phrases: Phrase[];
}

export interface Phrase {
  id: string;
  text: string;
  meaning: string;
  usage: string;
  example: string;
  words: Word[];
}

export interface Word {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  image: string;
  audioUrl: string;
}

export interface SentenceProgress {
  recorded: boolean;
  attempts: number;
  lastStudied: string;
}

export interface StudyStats {
  totalStudyTime: number;
  streakDays: number;
  lastStudyDate: string;
}

export interface ProgressStore {
  completedScenes: string[];
  sentenceProgress: Record<string, SentenceProgress>;
  stats: StudyStats;
}

export type StudyStep = 'dialogue' | 'sentences' | 'phrases' | 'vocabulary' | 'complete';

export interface StudyState {
  currentSceneId: string | null;
  currentStep: StudyStep;
  currentSentenceIndex: number;
  currentPhraseIndex: number;
  currentWordIndex: number;
}
