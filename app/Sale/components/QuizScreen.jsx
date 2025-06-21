export default function QuizScreen({
  questionData,
  questionIndex,
  totalQuestions,
  showFeedback,
  feedbackText,
  onAnswer,
  onNext,
}) {
  return (
    <div className="w-full max-w-3xl">
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Question {questionIndex + 1} of {totalQuestions}
      </h3>
      <p className="mb-8 text-lg text-gray-900 dark:text-gray-200">{questionData.question}</p>

      {!showFeedback ? (
        <div className="space-y-4">
          {questionData.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(idx)}
              className="w-full text-left px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium text-gray-900 dark:text-gray-100 text-lg dark:border-gray-600"
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div
          className={`p-5 rounded-md mt-6 ${
            feedbackText.startsWith("Correct")
              ? "bg-green-50 text-green-800 border border-green-200 dark:bg-green-900 dark:text-green-400 dark:border-green-700"
              : "bg-yellow-50 text-yellow-800 border border-yellow-200 dark:bg-yellow-900 dark:text-yellow-400 dark:border-yellow-700"
          }`}
        >
          <p className="text-lg font-medium">
            <strong>Feedback:</strong> {feedbackText}
          </p>
          <button
            onClick={onNext}
            className="mt-6 px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 transition text-lg"
          >
            {questionIndex + 1 === totalQuestions ? "See Results" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}
