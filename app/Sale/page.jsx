"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import SelectTopic from "./components/SelectTopic";
import LoadingScreen from "./components/LoadingScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";

const predefinedTopics = [
  "Sales",
  "Marketing",
  "Customer Service",
  "Product Management",
  "Leadership",
  "Finance",
  "Technology",
  "Human Resources",
  "Project Management",
  "Communication",
];

export default function Page() {
  const { user } = useUser();
  const userId = user?.id || "guest";

  const [stage, setStage] = useState("start");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topicQuestions, setTopicQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [history, setHistory] = useState([]);

  // Load quiz history from localStorage on first render
  useEffect(() => {
    const storedHistory = localStorage.getItem(`quizHistory-${userId}`);
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, [userId]);

  // Save history to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem(`quizHistory-${userId}`, JSON.stringify(history));
  }, [history, userId]);

  const startQuiz = () => setStage("selectTopic");

  const restart = () => {
    setStage("start");
    setSelectedTopic("");
    setTopicQuestions([]);
    setCurrentQIndex(0);
    setScore(0);
    setShowFeedback(false);
  };

  const generateQuestions = async (topicParam) => {
    const topicToUse = topicParam || selectedTopic;
    if (!topicToUse.trim()) return alert("Select or enter a topic.");

    setSelectedTopic(topicToUse);
    setStage("loading");

    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topicToUse }),
      });
      const data = await res.json();
      if (!data.questions) throw new Error(data.error || "No questions returned");

      setTopicQuestions(data.questions);
      setCurrentQIndex(0);
      setScore(0);
      setShowFeedback(false);
      setStage("quiz");
    } catch (err) {
      console.error(err);
      alert("Could not generate quiz. Try again.");
      restart();
    }
  };

  const handleAnswer = (idx) => {
    const q = topicQuestions[currentQIndex];
    if (idx === q.answer) setScore((s) => s + 1);
    setFeedbackText(q.feedback[idx]);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    if (currentQIndex + 1 < topicQuestions.length) {
      setCurrentQIndex((i) => i + 1);
    } else {
      const entry = {
        topic: selectedTopic,
        score,
        total: topicQuestions.length,
        date: new Date(),
      };
      setHistory((h) => [entry, ...h]);
      setStage("result");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Header />

      <a href="/Path">
        <Button
          variant="outline"
          className="mt-3 ml-10 bg-black text-white dark:bg-white dark:text-black dark:border-gray-400"
        >
          &lt; Back
        </Button>
      </a>

      <main className="flex flex-col items-center justify-center p-4 w-full">
        {stage === "start" && (
          <StartScreen onStart={startQuiz} history={history} />
        )}
        {stage === "selectTopic" && (
          <SelectTopic
            predefinedTopics={predefinedTopics}
            onSelectTopic={generateQuestions}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />
        )}
        {stage === "loading" && <LoadingScreen />}
        {stage === "quiz" && (
          <QuizScreen
            questionData={topicQuestions[currentQIndex]}
            questionIndex={currentQIndex}
            totalQuestions={topicQuestions.length}
            showFeedback={showFeedback}
            feedbackText={feedbackText}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
          />
        )}
        {stage === "result" && (
          <ResultScreen
            score={score}
            total={topicQuestions.length}
            onRestart={restart}
          />
        )}
      </main>
    </div>
  );
}
