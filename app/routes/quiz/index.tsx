import type { Route } from "./+types/index";
import QuestionPage from "~/components/projectcard";
import type { Question } from "~/types";



export async function loader({request}:Route.LoaderArgs):
Promise<{quizzes: Question}>
{
  const res = await fetch("http://localhost:8001/quizzes");
  if (!res.ok) {
    throw new Error("Failed to fetch quizzes");
  }
  const data = await res.json();
  return { quizzes:data };
}

const ProjectPage = ({loaderData}: Route.ComponentProps) => {

const {quizzes} = loaderData as {quizzes: Question}
console.log(quizzes)
    return ( <div>

    </div> );
}
 
export default ProjectPage;
