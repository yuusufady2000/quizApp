export type Project = {
    id:string;
    title:string;
    description:string;
    image:string;
};

export type Question = {
  id: string; 
  question: string; 
  options: string[];
  answer: string;
  explanation: string;
}

export type QuizCategory = {
  id?: string;
  category: string;
  questions: Question[]; 
}