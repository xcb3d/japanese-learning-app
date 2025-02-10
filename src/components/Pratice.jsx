'use client'

import { useState, useEffect } from 'react';
import { words } from '../data/words';

export default function Practice() {
  const [currentWord, setCurrentWord] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
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
    setShowAnswer(false);
    setStreak((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentWord(getRandomWord());
    setShowAnswer(false);
    setStreak(0);
  };

  if (!currentWord) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-sm text-gray-500 mb-8">
          Current Streak: {streak}
        </div>
        
        <div className="text-6xl font-bold mb-8 text-indigo-900">
          {currentWord.japanese}
        </div>

        {showAnswer ? (
          <>
            <div className="text-2xl text-gray-700 mb-8">
              {currentWord.romaji}
            </div>
            <button
              onClick={handleNextWord}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
            >
              Next Word
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowAnswer(true)}
            className="bg-indigo-100 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-200"
          >
            Show Answer
          </button>
        )}

        <button
          onClick={handleReset}
          className="mt-4 text-gray-500 hover:text-gray-700 block mx-auto"
        >
          Reset Streak
        </button>
      </div>
    </div>
  );
}
