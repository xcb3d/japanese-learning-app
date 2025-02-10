"use client";
import { useState, useEffect } from "react";
import { words } from "../data/words";

export default function Test() {
  const [testWords, setTestWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRomaji, setShowRomaji] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [testStarted, setTestStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Lấy ngẫu nhiên 10 từ
  const getRandomWords = () => {
    // Tách thành 2 mảng riêng
    const hiraganaWords = words.filter((word) => word.type === "hiragana");
    const katakanaWords = words.filter((word) => word.type === "katakana");

    // Random 8 từ hiragana
    const shuffledHiragana = [...hiraganaWords].sort(() => 0.5 - Math.random());
    const selectedHiragana = shuffledHiragana.slice(0, 8);

    // Random 2 từ katakana
    const shuffledKatakana = [...katakanaWords].sort(() => 0.5 - Math.random());
    const selectedKatakana = shuffledKatakana.slice(0, 2);

    // Kết hợp và xáo trộn lại
    const combinedWords = [...selectedHiragana, ...selectedKatakana];
    return combinedWords.sort(() => 0.5 - Math.random());
  };

  // Bắt đầu bài test mới
  const startNewTest = () => {
    setTestWords(getRandomWords());
    setCurrentIndex(0);
    setTimeLeft(60);
    setTestStarted(true);
    setShowResults(false);
    setShowRomaji(false);
  };

  // Timer
  useEffect(() => {
    if (testStarted && !showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setShowResults(true);
    }
  }, [testStarted, timeLeft, showResults]);

  // Xử lý khi người dùng click vào từ
  const handleWordClick = () => {
    if (!testWords[currentIndex].isAnswered) {
      setShowRomaji(true);
      const updatedWords = [...testWords];
      updatedWords[currentIndex] = {
        ...updatedWords[currentIndex],
        isAnswered: true,
      };
      setTestWords(updatedWords);
    }
  };

  // Xử lý khi người dùng chọn đáp án
  const handleAnswer = (answer) => {
    const updatedWords = [...testWords];
    updatedWords[currentIndex] = {
      ...updatedWords[currentIndex],
      userAnswer: answer,
    };
    setTestWords(updatedWords);
    setShowRomaji(false);

    if (currentIndex < 9) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  // Format thời gian
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {!testStarted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">
              Japanese Vocabulary Test
            </h2>
            <p className="text-gray-600 mb-6">
              Click vào từ để xem romaji, sau đó chọn Đúng/Sai
            </p>
            <button
              onClick={startNewTest}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
            >
              Bắt đầu
            </button>
          </div>
        ) : showResults ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Kết quả</h2>
            <div className="space-y-4 mb-8">
              {testWords.map((word, index) => (
                <div
                  key={word.id}
                  className="bg-white shadow-md rounded-xl p-6 mb-4 transform transition-all duration-300 hover:scale-105 border-l-4 border-r-4 hover:shadow-xl"
                  style={{
                    borderLeftColor:
                      word.userAnswer === "correct" ? "#10B981" : "#EF4444",
                    borderRightColor:
                      word.userAnswer === "correct" ? "#10B981" : "#EF4444",
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="text-3xl font-bold mb-2 text-gray-800">
                        {word.japanese}
                      </div>
                      <div className="text-lg text-gray-600 font-medium">
                        {word.romaji}
                      </div>
                      <div className="mt-2 text-sm font-medium text-gray-600">
                        Loại từ:{" "}
                        <span className="text-blue-600">{word.type}</span>
                      </div>
                    </div>

                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full ${
                        word.userAnswer === "correct"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {word.userAnswer === "correct" ? (
                        <span className="text-2xl">✓</span>
                      ) : (
                        <span className="text-2xl">×</span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`mt-3 text-sm font-medium ${
                      word.userAnswer === "correct"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {word.userAnswer === "correct"
                      ? "🎯 Trả lời chính xác"
                      : "💡 Cần cải thiện"}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={startNewTest}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
            >
              Làm lại
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div className="text-gray-600">Câu {currentIndex + 1}/10</div>
              <div className="text-indigo-600 font-bold text-xl">
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="text-center mb-8">
              <div
                onClick={handleWordClick}
                className="text-6xl font-bold text-indigo-900 mb-4 cursor-pointer hover:text-indigo-700"
              >
                {testWords[currentIndex]?.japanese}
              </div>

              {showRomaji && (
                <div className="text-2xl text-gray-600 mb-8 animate-fade-in">
                  {testWords[currentIndex]?.romaji}
                </div>
              )}

              {showRomaji && (
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleAnswer("correct")}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600"
                  >
                    Đúng
                  </button>
                  <button
                    onClick={() => handleAnswer("incorrect")}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600"
                  >
                    Sai
                  </button>
                </div>
              )}

              {!showRomaji && !testWords[currentIndex]?.isAnswered && (
                <p className="text-gray-500">Click vào từ để xem romaji</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
