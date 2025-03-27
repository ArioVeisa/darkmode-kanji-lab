
import React, { useEffect } from 'react';
import { useKanji } from '@/context/KanjiContext';
import KanjiCard from '@/components/KanjiCard';
import SessionSetup from '@/components/SessionSetup';
import SessionResults from '@/components/SessionResults';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PracticePage = () => {
  const { currentKanji, practiceSet, isSessionComplete } = useKanji();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-white/10 py-4">
        <div className="container flex justify-between items-center">
          <Link to="/" className="text-xl font-light hover:text-primary/80 transition-colors">
            Kanji Lab
          </Link>
          
          <nav>
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {practiceSet.length === 0 && (
          <SessionSetup />
        )}
        
        {currentKanji && !isSessionComplete && (
          <KanjiCard kanji={currentKanji} />
        )}
        
        {isSessionComplete && (
          <SessionResults />
        )}
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-white/10">
        <p>Distraction-free kanji learning</p>
      </footer>
    </div>
  );
};

export default PracticePage;
