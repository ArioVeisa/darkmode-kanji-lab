
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { KanjiItem } from '@/data/kanjiData';
import { useKanji } from '@/context/KanjiContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface KanjiCardProps {
  kanji: KanjiItem;
}

const KanjiCard: React.FC<KanjiCardProps> = ({ kanji }) => {
  const { submitAnswer, mode, currentIndex, totalKanji } = useKanji();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const isMobile = useIsMobile();
  
  // Reset state when kanji changes
  useEffect(() => {
    setSelectedOption(null);
    setShowAnswer(false);
  }, [kanji]);
  
  const handleOptionClick = (option: string) => {
    if (selectedOption || showAnswer) return; // Prevent multiple selections
    
    setSelectedOption(option);
    submitAnswer(option);
    
    if (mode === 'test') {
      // In test mode, we show the correct answer after selection
      setShowAnswer(true);
    }
  };
  
  const handleDontKnow = () => {
    if (selectedOption || showAnswer) return;
    submitAnswer(null);
    
    if (mode === 'test') {
      setShowAnswer(true);
    }
  };
  
  // Determine if an option is correct, incorrect, or unselected
  const getOptionClass = (option: string) => {
    if (!showAnswer && option !== selectedOption) return '';
    if (option === kanji.meaning) return 'correct';
    if (option === selectedOption && option !== kanji.meaning) return 'incorrect';
    return '';
  };
  
  return (
    <div className="flex flex-col items-center w-full mx-auto animate-scale-in px-2 sm:px-4">
      <div className="w-full mb-3 sm:mb-6 flex justify-between items-center">
        <div className="text-muted-foreground text-base sm:text-lg">
          <span className="text-lg sm:text-xl">{kanji.kanji}</span>
        </div>
        
        <div className="text-center">
          <h2 className="text-sm sm:text-lg font-light tracking-wide">
            Do you remember this kanji?
          </h2>
        </div>
        
        <div className="progress-indicator text-xs sm:text-sm">
          {currentIndex + 1} / {totalKanji}
        </div>
      </div>
      
      <div className="kanji-card w-full aspect-square sm:aspect-auto sm:h-64 md:h-80 flex items-center justify-center mb-4 sm:mb-8 rounded-lg">
        <div className="kanji-display animate-float">
          {kanji.kanji}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full mb-3 sm:mb-6">
        {kanji.options.map((option, index) => (
          <button
            key={index}
            className={`option-button text-sm sm:text-base ${getOptionClass(option)}`}
            onClick={() => handleOptionClick(option)}
            disabled={!!selectedOption || showAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      
      <button 
        className="do-not-know w-full text-xs sm:text-sm text-muted-foreground font-medium py-3 sm:py-4"
        onClick={handleDontKnow}
        disabled={!!selectedOption || showAnswer}
      >
        DO NOT KNOW
      </button>
      
      {mode === 'test' && showAnswer && (
        <div className="mt-3 sm:mt-4 w-full">
          <Button 
            className="w-full py-4 sm:py-6"
            size={isMobile ? "default" : "lg"}
            onClick={() => useKanji().nextKanji()}
          >
            Next Kanji
          </Button>
        </div>
      )}
    </div>
  );
};

export default KanjiCard;
