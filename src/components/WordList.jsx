"use client";

import { useState, useEffect } from "react";
import { words } from "../data/words";

export default function WordList({ fontClass }) {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(null); // Theo dõi từ nào đang được đọc
  const [list, setList] = useState([]);
  const [filterList, setFilterList] = useState([]);

  // Lấy danh sách giọng đọc khi component mount
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      const japaneseVoices = availableVoices.filter((voice) =>
        voice.lang.includes("ja")
      );
      setVoices(japaneseVoices);
      setSelectedVoice(japaneseVoices[0]); // Chọn giọng đầu tiên làm mặc định
    };

    // Đăng ký sự kiện voiceschanged
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    // Cleanup
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (text, wordId) => {
    // Dừng audio đang phát nếu có
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = speed;
    utterance.lang = "ja-JP";

    // Cập nhật trạng thái đang phát
    setIsPlaying(wordId);

    // Xử lý sự kiện kết thúc
    utterance.onend = () => {
      setIsPlaying(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const filteredWords = words.filter((word) => {
    const matchesFilter = filter === "all" || word.type === filter;
    const matchesSearch =
      word.japanese.includes(searchTerm) ||
      word.romaji.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    setList(filteredWords.sort(() => Math.random() - 0.5));
  }, []);

  // useEffect(() => {
  //   setFilterList(() => {
  //     const countMap = {}; // Đối tượng để đếm số lần xuất hiện

  //     words.forEach((w) => {
  //       countMap[w.romaji] = (countMap[w.romaji] || 0) + 1;
  //     });

  //     return countMap; // Lưu trữ dưới dạng object {romaji: count}
  //   });
  // }, [words]); // Lắng nghe sự thay đổi của words

  // useEffect(() => {
  //   setFilterList((prev) => {
  //     const newFilters = new Set(prev);
  //     words.forEach((w) => newFilters.add(w.romaji));
  //     return Array.from(newFilters);
  //   });
  // }, []);

  // const filteredData = Object.fromEntries(
  //   Object.entries(filterList).filter(([key, value]) => value === 2)
  // );

  // console.log(filteredData)

  // console.log(filterList)
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 ${fontClass}`}>
      {/* Controls Panel */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search words..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">{/* Filter buttons giữ nguyên */}</div>
        </div>

        {/* Voice Controls */}
        <div className="flex flex-col sm:flex-row gap-6 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm">
          {/* Voice Selection */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn giọng đọc
            </label>
            <div className="relative">
              <select
                className="w-full h-10 pl-3 pr-10 text-base border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-500"
                value={selectedVoice?.name || ""}
                onChange={(e) => {
                  const voice = voices.find((v) => v.name === e.target.value);
                  setSelectedVoice(voice);
                }}
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.gender || "Unknown"})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Speed Control */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tốc độ đọc
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
        accent-indigo-500 
        hover:accent-indigo-600
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              />
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">0.5x</span>
                <span
                  className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 transition-colors
        text-white font-medium rounded-full text-center min-w-[64px] shadow-sm"
                >
                  {speed.toFixed(1)}x
                </span>
                <span className="text-gray-500">2.0x</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Word Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((word) => {
          const isCurrentlyPlaying = isPlaying === word.id;

          return (
            <div
              key={word.id}
              className={`bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300 group relative cursor-pointer ${
                isCurrentlyPlaying ? "ring-2 ring-indigo-500" : ""
              }`}
              onClick={() => speak(word.japanese, word.id)}
            >
              <div className="text-2xl font-bold mb-2 text-indigo-900">
                {word.japanese}
              </div>
              <div className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {word.romaji}
              </div>
              <div className="text-sm text-gray-400 mt-1 capitalize">
                {word.type}
              </div>

              {/* Speaker Button with Animation */}
              <button
                className={`absolute top-2 right-2 p-2 rounded-full 
                    ${
                      isCurrentlyPlaying
                        ? "bg-indigo-500 text-white animate-pulse"
                        : "bg-indigo-100 hover:bg-indigo-200"
                    }`}
                onClick={(e) => {
                  e.stopPropagation();
                  speak(word.japanese, word.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-black ${
                    isCurrentlyPlaying ? "animate-wave" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
