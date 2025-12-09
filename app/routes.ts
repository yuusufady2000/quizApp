import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('./routes/layouts/layout.tsx', [
    index("routes/home.tsx")
  ]),
  layout('./routes/layouts/main.tsx', [
    route('featured', './routes/Feautured/featured.tsx'), 
    route('quiz/:category', './routes/quiz/quizDisplay.tsx'),
    route('quizHistory', './routes/quizHistory/record.tsx') 
  ]),
] satisfies RouteConfig;