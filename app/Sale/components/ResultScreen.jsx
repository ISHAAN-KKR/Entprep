export default function ResultScreen({ score, total, onRestart }) {
  return (
    <div className="text-center max-w-md mx-auto">
      <h2 className="text-4xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Your Score: {score} / {total}
      </h2>
      <p className="mb-8 text-xl text-gray-700 dark:text-gray-300">
        {score === total ? "🎉 Excellent!" : "👍 Good effort!"}
      </p>
      <div className="flex justify-center gap-6">
        <button
          onClick={onRestart}
          className="px-8 py-3 border border-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-100 text-lg transition"
        >
          Try Another Topic
        </button>
      </div>
    </div>
  );
}
