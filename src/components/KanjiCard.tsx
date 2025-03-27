
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { KanjiItem } from '@/data/kanjiData';
import { useKanji } from '@/context/KanjiContext';

interface KanjiCardProps {
  kanji: KanjiItem;
}

const KanjiCard: React.FC<KanjiCardProps> = ({ kanji }) => {
  const { submitAnswer, mode, currentIndex, totalKanji } = useKanji();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  
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
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto animate-scale-in">
      <div className="w-full mb-6 px-4 flex justify-between items-center">
        <div className="text-muted-foreground text-lg">
          {/* Small kanji on the left corner like in the reference image */}
          <span className="text-xl">{kanji.kanji}</span>
        </div>
        
        <div className="text-center">
          <h2 className="text-lg font-light tracking-wide">
            Do you remember this kanji?
          </h2>
        </div>
        
        <div className="progress-indicator">
          {currentIndex + 1} / {totalKanji}
        </div>
      </div>
      
      <div className="kanji-card w-full aspect-square flex items-center justify-center mb-8 rounded-lg">
        <div className="kanji-display animate-float">
          {kanji.kanji}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 w-full mb-6">
        {kanji.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${getOptionClass(option)}`}
            onClick={() => handleOptionClick(option)}
            disabled={!!selectedOption || showAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      
      <button 
        className="do-not-know w-full text-muted-foreground font-medium"
        onClick={handleDontKnow}
        disabled={!!selectedOption || showAnswer}
      >
        DO NOT KNOW
      </button>
      
      {mode === 'test' && showAnswer && (
        <div className="mt-4 w-full">
          <Button 
            className="w-full py-6"
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
