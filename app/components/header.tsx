import { useState } from "react";
import { Link } from "react-router";

const HeaderPage = () => {
  const [openMenu, setMenuOpen] = useState(false);

  return (
    <div className="flex bg-green-700 p-4 justify-between">
      <Link to='./' className="text-3xl text-gray-700 cursor-pointer font-bold">BrainMaster</Link>

      <nav>
        <div className="flex items-center gap-3 mr-[20rem] mt-2 text-white ">
          <Link to="/">Home</Link>
          <Link to="/quizzes">Quizzes</Link>
<Link to='./quizHistory'>Quiz Records</Link>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!openMenu)}
              className="flex items-center gap-1"
            >
              Categories
              <span
                className={`transition-transform ${
                  openMenu ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>

            {openMenu && (
              <div className="absolute mt-2 border rounded shadow-md w-40 cursor-pointer bg-gray-700">
                <Link
                  to="/category/tech"
                  className="block px-4 py-2 hover:bg-blue-300"
                >
                  Tech
                </Link>
                <Link
                  to="/category/science"
                  className="block px-4 py-2 hover:bg-blue-300"
                >
                  Science
                </Link>
                <Link
                  to="/category/history"
                  className="block px-4 py-2 hover:bg-blue-300"
                >
                  History
                </Link>
              </div>
            )}
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderPage;
