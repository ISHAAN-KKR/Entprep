import React from "react";

export default function StartScreen({ onStart, history }) {
  return (
    <div className="w-full pt-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-lg mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Skills Assessment</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300 text-lg">
          Test Sales & Marketing—or any topic—with our AI quiz.
        </p>
        <button
          onClick={onStart}
          className="px-10 py-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition text-lg dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
        >
          Start Assessment
        </button>
      </div>

      <div className="px-14 mx-auto text-left">
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-600 pb-2">
          Recent Attempts
        </h2>
        {history.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 italic">No quiz attempts yet.</p>
        ) : (
          <ul className="space-y-4">
            {history.map((a, i) => (
              <li
                key={i}
                className="border border-gray-300 dark:border-gray-600 rounded-md p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-800"
              >
                <div>
                  <p className="font-semibold">{a.topic}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Score: {a.score} / {a.total}
                  </p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(a.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
