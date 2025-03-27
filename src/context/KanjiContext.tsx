
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { KanjiItem, createPracticeSet } from '../data/kanjiData';
import { useToast } from "@/hooks/use-toast";

interface AnswerRecord {
  kanjiId: number;
  kanji: string;
  userAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpent: number; // in seconds
}

interface KanjiContextType {
  currentKanji: KanjiItem | null;
  currentIndex: number;
  totalKanji: number;
  answers: AnswerRecord[];
  mode: 'practice' | 'test';
  practiceSet: KanjiItem[];
  isSessionComplete: boolean;
  stats: {
    correct: number;
    incorrect: number;
    skipped: number;
    totalTime: number; // in seconds
  };
  
  // Actions
  startPracticeSession: (count: number) => void;
  startTestSession: (count: number) => void;
  submitAnswer: (answer: string | null) => void;
  nextKanji: () => void;
  resetSession: () => void;
}

const KanjiContext = createContext<KanjiContextType | undefined>(undefined);

export function KanjiProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [practiceSet, setPracticeSet] = useState<KanjiItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [mode, setMode] = useState<'practice' | 'test'>('practice');
  const [startTime, setStartTime] = useState<number>(0);
  const [kanjiStartTime, setKanjiStartTime] = useState<number>(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  
  // Calculate stats
  const stats = {
    correct: answers.filter(a => a.isCorrect).length,
    incorrect: answers.filter(a => a.isCorrect === false).length,
    skipped: answers.filter(a => a.userAnswer === null).length,
    totalTime: answers.reduce((acc, curr) => acc + curr.timeSpent, 0)
  };
  
  // Get current kanji
  const currentKanji = practiceSet.length > 0 && currentIndex < practiceSet.length 
    ? practiceSet[currentIndex] 
    : null;
  
  // Start a new practice session
  const startPracticeSession = (count: number) => {
    const newSet = createPracticeSet(count);
    setPracticeSet(newSet);
    setCurrentIndex(0);
    setAnswers([]);
    setMode('practice');
    setIsSessionComplete(false);
    setStartTime(Date.now());
    setKanjiStartTime(Date.now());
    
    toast({
      title: "Practice Session Started",
      description: `${count} kanji cards loaded. Good luck!`,
      duration: 3000,
    });
  };
  
  // Start a new test session
  const startTestSession = (count: number) => {
    const newSet = createPracticeSet(count);
    setPracticeSet(newSet);
    setCurrentIndex(0);
    setAnswers([]);
    setMode('test');
    setIsSessionComplete(false);
    setStartTime(Date.now());
    setKanjiStartTime(Date.now());
    
    toast({
      title: "Test Session Started",
      description: `${count} kanji cards loaded. Good luck!`,
      duration: 3000,
    });
  };
  
  // Submit an answer for the current kanji
  const submitAnswer = (answer: string | null) => {
    if (!currentKanji) return;
    
    const timeSpent = Math.floor((Date.now() - kanjiStartTime) / 1000);
    const isCorrect = answer === currentKanji.meaning;
    
    const newAnswer: AnswerRecord = {
      kanjiId: currentKanji.id,
      kanji: currentKanji.kanji,
      userAnswer: answer,
      correctAnswer: currentKanji.meaning,
      isCorrect: isCorrect,
      timeSpent
    };
    
    setAnswers([...answers, newAnswer]);
    
    // Show feedback toast
    if (answer !== null) {
      if (isCorrect) {
        toast({
          title: "Correct!",
          description: `${currentKanji.kanji} means ${currentKanji.meaning}`,
          duration: 1500,
        });
      } else {
        toast({
          title: "Incorrect",
          description: `${currentKanji.kanji} means ${currentKanji.meaning}, not ${answer}`,
          variant: "destructive",
          duration: 2000,
        });
      }
    } else {
      toast({
        title: "Skipped",
        description: `${currentKanji.kanji} means ${currentKanji.meaning}`,
        duration: 1500,
      });
    }
    
    // Move to next kanji if in practice mode
    if (mode === 'practice') {
      setTimeout(() => nextKanji(), 1000);
    } else {
      setKanjiStartTime(Date.now()); // Reset timer for next kanji
    }
  };
  
  // Move to the next kanji
  const nextKanji = () => {
    if (currentIndex < practiceSet.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setKanjiStartTime(Date.now());
    } else {
      // End of session
      setIsSessionComplete(true);
      const totalTime = Math.floor((Date.now() - startTime) / 1000);
      toast({
        title: "Session Complete!",
        description: `You answered ${stats.correct} correctly out of ${practiceSet.length}`,
        duration: 5000,
      });
    }
  };
  
  // Reset the current session
  const resetSession = () => {
    setPracticeSet([]);
    setCurrentIndex(0);
    setAnswers([]);
    setIsSessionComplete(false);
  };
  
  const value = {
    currentKanji,
    currentIndex,
    totalKanji: practiceSet.length,
    answers,
    mode,
    practiceSet,
    isSessionComplete,
    stats,
    startPracticeSession,
    startTestSession,
    submitAnswer,
    nextKanji,
    resetSession
  };
  
  return (
    <KanjiContext.Provider value={value}>
      {children}
    </KanjiContext.Provider>
  );
}

// Hook to use the kanji context
export function useKanji() {
  const context = useContext(KanjiContext);
  if (context === undefined) {
    throw new Error('useKanji must be used within a KanjiProvider');
  }
  return context;
}
