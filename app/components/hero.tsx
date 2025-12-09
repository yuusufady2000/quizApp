import { Link } from "react-router";
import { IoBook } from "react-icons/io5";
import { FaGraduationCap, FaLightbulb,FaSearch } from "react-icons/fa";

const HeroPage = () => {
    return ( <div>
        <div className="flex gap-2 justify-center mt-[4rem]">
                   <p className="text-3xl text-black font-bold">Start</p>
        <span className="text-3xl font-bold text-yellow-400">Quizzes,</span> 
        <span className="text-3xl font-bold">Learn,Practice and Have Fun</span>
       
        </div>
        <div className="flex flex-col ml-[47rem] mt-[2rem] justify-center">
          <p className="text-[22px] mb-2">A place where knowledge are tested.</p> 
    <div className="relative w-100">
  <input
    type="search"
    className="border border-gray-800 bg-gray-200 w-full p-2 pr-10 rounded-lg"
    placeholder="What do you wish to learn today?"
  />
  <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
</div>

        </div>
        <div className="flex gap-7 space-x-4 mr-[48rem] text-gray-400 mt-10 justify-center">
            <Link to='' className="flex border-b-2 border-red-600 gap-2 ">
             <IoBook
             className="mt-1 text-green-600 text-[1.4rem] "
             /> Quiz</Link>
            <Link to='' className="flex border-b-2 border-red-600 gap-2">
            <FaGraduationCap className="text-purple-700 text-[1.4rem]"/>
            Lesson</Link>
            <Link to='' className="flex border-b-2 border-red-600 gap-2">
            <FaLightbulb className="text-yellow-400 text-[1.4rem]"/>
            Trivia</Link>
        </div>
        
    </div> );
}
 
export default HeroPage;