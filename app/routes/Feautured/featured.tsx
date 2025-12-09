
import { Link, } from "react-router";
import type { Route } from "./+types/featured";
import { useEffect, useState } from "react";
import type { Project, Question } from "~/types";




const FeatureTopics = () => {
const [projects, setProjects] = useState<Project[]>([]);
const [question, setQuestion] = useState<Question[]>([]);
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);



const handleSelect = (category: string) => {
  setSelectedCategory(category);
};


const fetchQuestion = async () => {
  const res = await fetch('http://localhost:8001/quizzes');
 if (!res.ok) throw new Error("Failed to fetch projects");
 const datas: Question[] = await res.json();
 setQuestion(datas);
 console.log(datas)
}
 useEffect(() => {
    fetchQuestion();
  }, []);


const fetchData = async () => {
    const res = await fetch('http://localhost:8000/projectss');
      if (!res.ok) throw new Error("Failed to fetch projects");
    const data: Project[] = await res.json();
    setProjects(data);
    console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

    return ( 

    <div>
 <div className="max-w-5xl mx-auto p-4">
  <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
    {projects.map((item) => (
      <Link
       to={`/quiz/${item.title}`}
        key={item.id}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105 duration-300"
      >
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-44 object-cover"
          />
        )}

        <div className="p-4">
          <h2 className="text-md font-semibold text-blue-600 mb-1 truncate">
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
}
 
export default FeatureTopics;