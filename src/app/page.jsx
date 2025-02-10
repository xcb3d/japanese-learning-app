"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import WordList from "@/components/WordList";
import Practice from "@/components/Pratice";
import Test from "@/components/Test";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            {["Word List", "Practice", "Test"].map((tab) => (
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
              <WordList />
            </Tab.Panel>
            <Tab.Panel>
              <Practice />
            </Tab.Panel>
            <Tab.Panel>
              <Test  />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
