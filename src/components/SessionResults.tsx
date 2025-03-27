
import React from 'react';
import { Button } from '@/components/ui/button';
import { useKanji } from '@/context/KanjiContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useIsMobile } from '@/hooks/use-mobile';

const SessionResults: React.FC = () => {
  const { answers, stats, totalKanji, resetSession, mode } = useKanji();
  const isMobile = useIsMobile();
  
  const accuracy = totalKanji > 0 
    ? Math.round((stats.correct / totalKanji) * 100) 
    : 0;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  
  const averageTime = answers.length > 0 
    ? Math.round(stats.totalTime / answers.length) 
    : 0;
  
  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-8 animate-fade-in space-y-4 sm:space-y-8">
      <Card className="bg-card/70 backdrop-blur-sm border border-white/10">
        <CardHeader className="text-center px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-xl sm:text-2xl font-light tracking-wide">
            Session Results
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {mode === 'practice' ? 'Practice' : 'Test'} session completed
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="grid grid-cols-2 gap-2 sm:gap-6 mb-4 sm:mb-8">
            <div className="flex flex-col items-center justify-center p-2 sm:p-4 bg-muted/30 rounded-lg">
              <span className="text-xl sm:text-3xl font-light text-primary">{stats.correct}</span>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1">Correct</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-2 sm:p-4 bg-muted/30 rounded-lg">
              <span className="text-xl sm:text-3xl font-light text-primary">{stats.incorrect}</span>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1">Incorrect</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-2 sm:p-4 bg-muted/30 rounded-lg">
              <span className="text-xl sm:text-3xl font-light text-primary">{accuracy}%</span>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1">Accuracy</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-2 sm:p-4 bg-muted/30 rounded-lg">
              <span className="text-xl sm:text-3xl font-light text-primary">{formatTime(averageTime)}</span>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1">Avg. Time</span>
            </div>
          </div>
          
          <div className="overflow-x-auto rounded-md border border-white/10 bg-accent/30">
            <Table>
              <TableCaption className="text-xs sm:text-sm">Your answers from this session</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Kanji</TableHead>
                  <TableHead className="text-xs sm:text-sm">Your Answer</TableHead>
                  <TableHead className="text-xs sm:text-sm">Correct Answer</TableHead>
                  <TableHead className="text-right text-xs sm:text-sm">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {answers.map((answer, idx) => (
                  <TableRow key={idx} className={answer.isCorrect ? "" : "bg-destructive/10"}>
                    <TableCell className="font-medium text-lg">{answer.kanji}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{answer.userAnswer || <span className="text-muted-foreground italic">Skipped</span>}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{answer.correctAnswer}</TableCell>
                    <TableCell className="text-right text-xs sm:text-sm">{answer.timeSpent}s</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center px-4 sm:px-6 py-4 sm:py-6">
          <Button 
            size={isMobile ? "default" : "lg"}
            onClick={resetSession}
            className="px-4 sm:px-8 py-2 sm:py-6"
          >
            Start New Session
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SessionResults;
