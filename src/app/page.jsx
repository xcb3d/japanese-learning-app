"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import WordList from "@/components/WordList";
import Practice from "@/components/Pratice";
import Test from "@/components/Test";
import Flashcard from "@/components/Flashcard";

// Danh sách font đơn giản hơn
const FONT_OPTIONS = [
  { name: 'System Default', value: 'system' },
  { name: 'Noto Sans JP', value: 'noto-sans-jp' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFont, setSelectedFont] = useState('system');

  // Xác định font family dựa trên selection
  const getFontClass = () => {
    return selectedFont === 'system' 
      ? 'font-sans' // font mặc định của hệ thống
      : 'font-noto-sans-jp'; // Noto Sans JP
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-100 to-white ${getFontClass()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Font Selector */}
        <div className="flex justify-end mb-4">
          <div className="relative">
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="block appearance-none w-48 bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Japanese Learning App
          </h1>
          <p className="text-gray-600">
            Learn Hiragana and Katakana effectively
          </p>
        </div>

        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1 max-w-2xl mx-auto mb-8">
            {["Word List", "Practice","Flashcard", "Test"].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                    "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-white text-indigo-900 shadow"
                      : "text-indigo-700 hover:bg-white/[0.12] hover:text-indigo-900"
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <WordList fontClass={getFontClass()} />
            </Tab.Panel>
            <Tab.Panel>
              <Practice fontClass={getFontClass()} />
            </Tab.Panel>
            <Tab.Panel>
              <Flashcard fontClass={getFontClass()} />
            </Tab.Panel>
            <Tab.Panel>
              <Test fontClass={getFontClass()} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
