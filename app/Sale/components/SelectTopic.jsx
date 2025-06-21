import React from "react";

export default function SelectTopic({ predefinedTopics, onSelectTopic, selectedTopic, setSelectedTopic }) {
  return (
    <div className="text-center max-w-lg w-full">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-gray-100">Choose a Topic</h2>

      <div className="flex justify-center gap-6 mb-8 flex-wrap">
        {predefinedTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => onSelectTopic(topic)}
            className="px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition text-lg dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
          >
            {topic}
          </button>
        ))}
      </div>

      <div>
        <p className="mb-4 font-semibold text-gray-900 dark:text-gray-200">Or enter a custom topic:</p>
        <input
          type="text"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          placeholder="e.g. Customer Service"
          className="border border-gray-400 p-3 rounded-md w-full text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
        <button
          onClick={() => onSelectTopic()}
          className="mt-6 px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition text-lg w-full dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
        >
          Generate Quiz
        </button>
      </div>
    </div>
  );
}
