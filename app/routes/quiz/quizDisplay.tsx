import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";



interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface QuizCategory {
  category: string;
  questions: Question[];
}

const QuizDisplays = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    setError(null);

    fetch("http://localhost:8001/quizzes")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch quizzes");
        return res.json();
      })
      .then((data: QuizCategory[]) => {
        const normalizeString = (str: string) =>
          str.toLowerCase().replace(/[^a-z0-9]/g, "");

        const filtered = data.find(
          (item) =>
            normalizeString(item.category) === normalizeString(category)
        );

        if (!filtered) {
          setError(`No quiz found for: ${category}`);
          setQuizData([]);
        } else {
          setQuizData(filtered.questions || []);
        }
      })
      .catch((err) => {
        setError(err.message);
        setQuizData([]);
      })
      .finally(() => setLoading(false));
  }, [category]);

  const handleSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
  const unanswered = quizData.filter((q) => !answers[q.id]);

  if (unanswered.length > 0) {
    alert(`Please answer all questions. ${unanswered.length} remaining.`);
    return;
  }

  // Calculate score
  let correctCount = 0;
  quizData.forEach((q) => {
    if (answers[q.id] === q.answer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / quizData.length) * 100);

  // Save to localStorage
  const newRecord = {
    id: Date.now().toString(),
    category: category || "Unknown",
    score: correctCount,
    total: quizData.length,
    percentage,
    date: new Date().toISOString(),
    timeTaken: "5m 30s" // You can add actual timer if needed
  };

  // Get existing records
  const existingRecords = localStorage.getItem("quizRecords");
  const records = existingRecords ? JSON.parse(existingRecords) : [];
  
  // Add new record at the beginning
  records.unshift(newRecord);
  
  // Save back to localStorage
  localStorage.setItem("quizRecords", JSON.stringify(records));

  setScore({ correct: correctCount, total: quizData.length });
  setShowModal(true);
};
  const handleRetake = () => {
    setAnswers({});
    setShowModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/");
  };

  const getScorePercentage = () => {
    return Math.round((score.correct / score.total) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Not Bad! 💪";
    return "Keep Practicing! 📚";
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center mt-10">
      
          <p className="text-gray-600">Loading quiz...</p>
       
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4 mt-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Quiz Not Found
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ← Back to Topics
          </button>
        </div>
      </div>
    );
  }

  if (quizData.length === 0) {
    return (
      <div className="max-w-3xl  mx-auto p-4 mt-10 text-center">
        <p className="text-gray-600">No questions available for this quiz.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Back to Topics
        </button>
      </div>
    );
  }

  const progress = (Object.keys(answers).length / quizData.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <>
      <div className="max-w-3xl mx-auto p-4 space-y-6 mb-10">
        {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-0 z-50">
  <button
    onClick={() => navigate("/")}
    className="text-blue-600 hover:text-blue-700 mb-3 flex items-center gap-1"
  >
    <span>←</span> Back to Topics
  </button>

  <div className="flex items-center justify-between">
    <h1 className="text-2xl font-bold text-blue-700 capitalize">
      {category?.replace(/-/g, " ")} Quiz
    </h1>
    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
      {answeredCount} / {quizData.length}
    </span>
  </div>

  {/* Progress Bar */}
  <div className="mt-4">
    <div className="flex justify-between text-sm text-gray-600 mb-2">
      <span>Progress</span>
      <span>{Math.round(progress)}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
</div>


        {/* Questions */}
        {quizData.map((q, idx) => (
          <div
            key={q.id}
            className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
                {idx + 1}
              </span>
              <div className="flex-1">
                <h2 className="font-semibold text-lg text-gray-800 mb-4">
                  {q.question}
                </h2>

                <div className="space-y-3">
                  {q.options.map((opt: string, index: number) => (
                    <label
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        answers[q.id] === opt
                          ? "bg-blue-50 border-2 border-blue-400 shadow-sm"
                          : "bg-gray-50 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === opt}
                        onChange={() => handleSelect(q.id, opt)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <div className="sticky bottom-4 bg-white rounded-lg shadow-lg p-4">
          <button
            onClick={handleSubmit}
            disabled={answeredCount === 0}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              answeredCount === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : answeredCount === quizData.length
                ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            }`}
          >
            {answeredCount === 0
              ? "Answer questions to submit"
              : answeredCount === quizData.length
              ? "Submit Quiz ✓"
              : `Submit (${answeredCount}/${quizData.length} answered)`}
          </button>
        </div>
      </div>

      {/* Results Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform animate-slideUp">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Score Circle */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-32 h-32 mb-4">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke={getScorePercentage() >= 60 ? "#10b981" : getScorePercentage() >= 40 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(getScorePercentage() / 100) * 351.86} 351.86`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800">
                    {getScorePercentage()}%
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {getScoreMessage()}
              </h2>
              <p className="text-gray-600 text-center">
                You scored <span className="font-semibold text-blue-600">{score.correct}</span> out of{" "}
                <span className="font-semibold text-blue-600">{score.total}</span> questions correctly
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleRetake}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md"
              >
                Retake Quiz
              </button>
              <button
                onClick={handleClose}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
              >
                Back to Topics
              </button>
            </div>

            {/* Share Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center mb-3">Share your results</p>
              <div className="flex justify-center gap-3">
                <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default QuizDisplays;