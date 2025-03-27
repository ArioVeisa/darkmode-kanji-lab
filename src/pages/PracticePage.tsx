
import React from 'react';
import { useKanji } from '@/context/KanjiContext';
import KanjiCard from '@/components/KanjiCard';
import SessionSetup from '@/components/SessionSetup';
import SessionResults from '@/components/SessionResults';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const PracticePage = () => {
  const { currentKanji, practiceSet, isSessionComplete } = useKanji();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-white/10 py-2 sm:py-4">
        <div className="container px-4 sm:px-6 flex justify-between items-center">
          <Link to="/" className="text-lg sm:text-xl font-light hover:text-primary/80 transition-colors">
            Kanji Lab
          </Link>
          
          <nav>
            <Button variant="ghost" size={isMobile ? "sm" : "default"} asChild>
              <Link to="/">Home</Link>
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
          {practiceSet.length === 0 && (
            <SessionSetup />
          )}
          
          {currentKanji && !isSessionComplete && (
            <KanjiCard kanji={currentKanji} />
          )}
          
          {isSessionComplete && (
            <SessionResults />
          )}
        </div>
      </main>
      
      <footer className="py-2 sm:py-4 text-center text-xs sm:text-sm text-muted-foreground border-t border-white/10">
        <p>Distraction-free kanji learning</p>
      </footer>
    </div>
  );
};

export default PracticePage;
