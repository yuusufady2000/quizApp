import { useState } from "react";
import { Link } from "react-router";
import { HiMenu, HiX } from "react-icons/hi";

const HeaderPage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  return (
    <header className="bg-green-700 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          BrainMaster
        </Link>

        {/* --- Desktop Navigation ---- */}
        <nav className="hidden md:flex items-center gap-6 text-white font-medium">
          <Link to="/">Home</Link>
          <Link to="/quizzes">Quizzes</Link>
          <Link to="/quizHistory">Quiz Records</Link>

          <div className="relative">
            <button
              onClick={() => setOpenCategory(!openCategory)}
              className="flex items-center gap-1"
            >
              Categories
              <span
                className={`transition-transform ${
                  openCategory ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {openCategory && (
              <div className="absolute bg-white text-black mt-2 w-40 rounded shadow-md">
                <Link
                  to="/category/tech"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Tech
                </Link>
                <Link
                  to="/category/science"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Science
                </Link>
                <Link
                  to="/category/history"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  History
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* --- Mobile Menu Button ---- */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="text-white text-3xl md:hidden"
        >
          {openMenu ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* --- Mobile Dropdown Navigation ---- */}
      {openMenu && (
        <div className="md:hidden mt-4 bg-white text-black rounded-lg shadow-lg p-4 space-y-4">

          <Link
            to="/"
            className="block border-b pb-2"
            onClick={() => setOpenMenu(false)}
          >
            Home
          </Link>

          <Link
            to="/quizzes"
            className="block border-b pb-2"
            onClick={() => setOpenMenu(false)}
          >
            Quizzes
          </Link>

          <Link
            to="/quizHistory"
            className="block border-b pb-2"
            onClick={() => setOpenMenu(false)}
          >
            Quiz Records
          </Link>

          {/* Category mobile */}
          <div>
            <button
              onClick={() => setOpenCategory(!openCategory)}
              className="flex justify-between w-full"
            >
              Categories
              <span>{openCategory ? "▲" : "▼"}</span>
            </button>

            {openCategory && (
              <div className="mt-2 ml-3 space-y-2">
                <Link
                  to="/category/tech"
                  className="block"
                  onClick={() => setOpenMenu(false)}
                >
                  Tech
                </Link>
                <Link
                  to="/category/science"
                  className="block"
                  onClick={() => setOpenMenu(false)}
                >
                  Science
                </Link>
                <Link
                  to="/category/history"
                  className="block"
                  onClick={() => setOpenMenu(false)}
                >
                  History
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderPage;
