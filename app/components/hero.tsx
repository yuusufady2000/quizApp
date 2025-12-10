import { Link } from "react-router";
import { IoBook } from "react-icons/io5";
import { FaGraduationCap, FaLightbulb, FaSearch } from "react-icons/fa";

const HeroPage = () => {
  return (
    <div className="px-4">

      {/* HERO TITLE */}
      <div className="flex flex-wrap gap-2 justify-center mt-16 text-center">
        <p className="text-2xl sm:text-3xl font-bold text-black">Start</p>
        <span className="text-2xl sm:text-3xl font-bold text-yellow-400">
          Quizzes,
        </span>
        <span className="text-2xl sm:text-3xl font-bold">
          Learn, Practice and Have Fun
        </span>
      </div>

      {/* SUBTEXT + SEARCH BAR */}
      <div className="flex flex-col items-center mt-6">
        <p className="text-lg sm:text-xl mb-3 text-center">
          A place where knowledge are tested.
        </p>

        <div className="relative w-full max-w-xl">
          <input
            type="search"
            className="border border-gray-800 bg-gray-200 w-full p-3 pr-10 rounded-lg"
            placeholder="What do you wish to learn today?"
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
        </div>
      </div>

      {/* NAV LINKS */}
      <div className="flex flex-wrap justify-center gap-6 mt-10 text-gray-600 text-sm sm:text-base">
        <Link
          to=""
          className="flex items-center gap-2 border-b-2 border-red-600 pb-1"
        >
          <IoBook className="text-green-600 text-xl" />
          Quiz
        </Link>

        <Link
          to=""
          className="flex items-center gap-2 border-b-2 border-red-600 pb-1"
        >
          <FaGraduationCap className="text-purple-700 text-xl" />
          Lesson
        </Link>

        <Link
          to=""
          className="flex items-center gap-2 border-b-2 border-red-600 pb-1"
        >
          <FaLightbulb className="text-yellow-400 text-xl" />
          Trivia
        </Link>
      </div>
    </div>
  );
};

export default HeroPage;
