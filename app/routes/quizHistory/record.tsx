import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router"; 

interface QuizRecord {
  id: string;
  category: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
  timeTaken: string;
}

const QuizRecords = () => {

  const [allRecords, setAllRecords] = useState<QuizRecord[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const navigate = useNavigate();


  useEffect(() => {
    const existingRecords = localStorage.getItem("quizRecords");
    if (existingRecords) {
      try {
        const parsedRecords: QuizRecord[] = JSON.parse(existingRecords);
       
        setAllRecords(parsedRecords);
      } catch (e) {
        console.error("Error parsing quiz records from localStorage:", e);
        setAllRecords([]);
      }
    }
  }, []);

  
  const filteredRecords = useMemo(() => {
    let result = allRecords;

   
    if (filterCategory !== "all") {
      result = result.filter(
        (record) => record.category === filterCategory
      );
    }

    
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter((record) =>
        record.category.toLowerCase().includes(lowerCaseSearch)
      );
    }

    return result;
  }, [allRecords, searchTerm, filterCategory]);

 
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getScoreColor = (percentage: number) => {
    if (percentage === 100) return "bg-green-600";
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  
  const uniqueCategories = useMemo(() => {
    const categories = allRecords.map((record) => record.category);
    return ["all", ...new Set(categories)];
  }, [allRecords]);


  
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <button
        onClick={() => navigate("/")}
        className="text-blue-600 hover:text-blue-700 mb-6 flex items-center gap-1 font-medium"
      >
        <span>←</span> Back to Topics
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-3">
        📚 Quiz History & Records
      </h1>

      {allRecords.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-xl">
          <p className="text-lg text-gray-600">
            You haven't completed any quizzes yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Start a Quiz
          </button>
        </div>
      ) : (
        <>
          
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            
            <input
              type="search"
              placeholder="Search quiz category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm"
            />
            
          
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full sm:w-auto p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            >
              <option value="all">Filter by Category</option>
              {uniqueCategories
                .filter(cat => cat !== "all")
                .map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace(/-/g, " ")}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-6 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-gray-700">No records found matching your criteria.</p>
              </div>
            ) : (
              filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 sm:mb-0">
                    <h2 className="text-xl font-semibold text-blue-700 capitalize">
                      {record.category.replace(/-/g, " ")}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Completed on: {formatDate(record.date)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Time Taken : {record.timeTaken}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className={`px-4 py-2 rounded-full font-bold text-white shadow-md ${getScoreColor(
                        record.percentage
                      )}`}
                    >
                      {record.percentage}%
                    </div>
                    <div className="text-lg font-medium text-gray-700">
                      {record.score} / {record.total}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizRecords;