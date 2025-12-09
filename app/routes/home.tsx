import HeaderPage from "~/components/header";
import type { Route } from "./+types/home";
import HeroPage from "~/components/hero";
import FeatureTopics from "./Feautured/featured";
import type { Project } from "~/types";



export function meta({}:Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}



const Homepage = () => {

  return (<div>
      <HeaderPage/>
      <HeroPage/>
      <FeatureTopics/>
  
    </div>  );
}
 
export default Homepage ;
 

