import { Link } from "react-router";
import { useEffect, useState } from "react";
import type { Project, Question } from "~/types";

const FeatureTopics = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [question, setQuestion] = useState<Question[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
  };

  const fetchData = async () => {
    const res = await fetch("http://localhost:8000/projectss");
    if (!res.ok) throw new Error("Failed to fetch projects");
    const data: Project[] = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((item) => (
            <Link
              to={`/quiz/${item.title}`}
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 md:hover:scale-105"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 sm:h-44 md:h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-lg font-semibold text-blue-600 mb-1 truncate">
                  {item.title}
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureTopics;
