
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useKanji } from '@/context/KanjiContext';

const Index = () => {
  const { startPracticeSession } = useKanji();

  const handleStartQuickSession = () => {
    startPracticeSession(10);
    window.location.href = '/practice';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl mx-auto animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4">
              Kanji Lab
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
              Learn Japanese kanji through elegant, focused practice sessions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <div className="kanji-card p-8 rounded-lg flex flex-col items-center justify-center text-center">
              <h2 className="text-lg font-medium mb-2">Practice Mode</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Get immediate feedback after each answer to help you learn
              </p>
              <span className="kanji-display text-7xl mb-6">練</span>
              <Button 
                className="w-full" 
                size="lg"
                asChild
              >
                <Link to="/practice">Start Practice</Link>
              </Button>
            </div>
            
            <div className="kanji-card p-8 rounded-lg flex flex-col items-center justify-center text-center">
              <h2 className="text-lg font-medium mb-2">Quick Start</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Begin immediately with a 10-kanji practice session
              </p>
              <span className="kanji-display text-7xl mb-6">始</span>
              <Button 
                variant="secondary"
                className="w-full" 
                size="lg"
                onClick={handleStartQuickSession}
              >
                Quick Session
              </Button>
            </div>
          </div>
          
          <div className="bg-card/70 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center">
            <h2 className="text-xl font-medium mb-3">About Kanji Lab</h2>
            <p className="text-muted-foreground mb-4">
              A minimalist, distraction-free environment for studying Japanese kanji.
              Focus on what matters - learning characters through elegant, focused practice.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-light">20</span>
                <span className="text-xs text-muted-foreground">Kanji Available</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-light">2</span>
                <span className="text-xs text-muted-foreground">Study Modes</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-light">∞</span>
                <span className="text-xs text-muted-foreground">Practice Sessions</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Designed with minimalism and focus in mind</p>
      </footer>
    </div>
  );
};

export default Index;
