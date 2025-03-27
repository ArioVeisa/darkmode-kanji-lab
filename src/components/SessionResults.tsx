
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

const SessionResults: React.FC = () => {
  const { answers, stats, totalKanji, resetSession, mode } = useKanji();
  
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
    <div className="w-full max-w-3xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      <Card className="bg-card/70 backdrop-blur-sm border border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-light tracking-wide">
            Session Results
          </CardTitle>
          <CardDescription>
            {mode === 'practice' ? 'Practice' : 'Test'} session completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 mb-8">
            <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
              <span className="text-3xl font-light text-primary">{stats.correct}</span>
              <span className="text-sm text-muted-foreground mt-1">Correct</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
              <span className="text-3xl font-light text-primary">{stats.incorrect}</span>
              <span className="text-sm text-muted-foreground mt-1">Incorrect</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
              <span className="text-3xl font-light text-primary">{accuracy}%</span>
              <span className="text-sm text-muted-foreground mt-1">Accuracy</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
              <span className="text-3xl font-light text-primary">{formatTime(averageTime)}</span>
              <span className="text-sm text-muted-foreground mt-1">Avg. Time</span>
            </div>
          </div>
          
          <div className="overflow-x-auto rounded-md border border-white/10 bg-accent/30">
            <Table>
              <TableCaption>Your answers from this session</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Kanji</TableHead>
                  <TableHead>Your Answer</TableHead>
                  <TableHead>Correct Answer</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {answers.map((answer, idx) => (
                  <TableRow key={idx} className={answer.isCorrect ? "" : "bg-destructive/10"}>
                    <TableCell className="font-medium text-xl">{answer.kanji}</TableCell>
                    <TableCell>{answer.userAnswer || <span className="text-muted-foreground italic">Skipped</span>}</TableCell>
                    <TableCell>{answer.correctAnswer}</TableCell>
                    <TableCell className="text-right">{answer.timeSpent}s</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            size="lg"
            onClick={resetSession}
            className="px-8 py-6"
          >
            Start New Session
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SessionResults;
