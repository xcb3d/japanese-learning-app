'use client'

import { useState, useEffect } from 'react';
import { words } from '../data/words';

export default function Flashcard() {
  const [currentWord, setCurrentWord] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [streak, setStreak] = useState(0);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  useEffect(() => {
    setCurrentWord(getRandomWord());
  }, []);

  const handleNextWord = () => {
    setCurrentWord(getRandomWord());
    setIsFlipped(false);
    setStreak((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentWord(getRandomWord());
    setIsFlipped(false);
    setStreak(0);
  };

  if (!currentWord) return null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="text-sm text-gray-500 mb-4 text-center">
        Current Streak: {streak}
      </div>

      <div className="w-full h-[400px] relative">
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className="cursor-pointer w-full h-full"
        >
          <div 
            className="w-full h-full transition-all duration-500 relative"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* Mặt trước */}
            <div 
              className="absolute w-full h-full bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center"
              style={{
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="text-6xl font-bold text-indigo-900">
                {currentWord.japanese}
              </div>
            </div>

            {/* Mặt sau */}
            <div 
              className="absolute w-full h-full bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="text-4xl text-gray-700">
                {currentWord.romaji}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          onClick={handleNextWord}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
        >
          Next Word
        </button>
        <button
          onClick={handleReset}
          className="text-gray-500 hover:text-gray-700"
        >
          Reset Streak
        </button>
      </div>
    </div>
  );
}
