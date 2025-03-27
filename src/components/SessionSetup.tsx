
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useKanji } from '@/context/KanjiContext';
import { Slider } from '@/components/ui/slider';

const SessionSetup: React.FC = () => {
  const { startPracticeSession, startTestSession } = useKanji();
  const [kanjiCount, setKanjiCount] = useState(10);
  
  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 animate-fade-in">
      <Card className="bg-card/70 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl font-light tracking-wide text-center">Kanji Study</CardTitle>
          <CardDescription className="text-center">
            Choose your study mode and number of kanji cards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="kanjiCount" className="text-sm font-medium">
              Number of kanji: <span className="font-bold">{kanjiCount}</span>
            </label>
            <Slider
              id="kanjiCount"
              min={5}
              max={20}
              step={1}
              value={[kanjiCount]}
              onValueChange={(value) => setKanjiCount(value[0])}
              className="py-4"
            />
          </div>
          
          <div className="flex flex-col space-y-3 pt-4">
            <h3 className="text-sm font-medium mb-2">Select Study Mode</h3>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full py-6 bg-secondary/50 hover:bg-secondary border border-white/10 hover:border-white/20"
              onClick={() => startPracticeSession(kanjiCount)}
            >
              Practice Mode
              <span className="text-xs block font-normal text-muted-foreground mt-1">
                Get immediate feedback after each answer
              </span>
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="w-full py-6 bg-secondary/50 hover:bg-secondary border border-white/10 hover:border-white/20"
              onClick={() => startTestSession(kanjiCount)}
            >
              Test Mode
              <span className="text-xs block font-normal text-muted-foreground mt-1">
                Complete all questions before seeing results
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionSetup;
