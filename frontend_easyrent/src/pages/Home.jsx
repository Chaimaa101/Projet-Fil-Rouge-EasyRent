import { motion } from "framer-motion";

import HeroSection from "../components/homeComponents/HeroSection";
import Testimonials from "../components/homeComponents/Testimonials";
import Collaboration from "../components/homeComponents/Collaboration";
import Instagram from "../components/homeComponents/Instagram";
import Favorites from "../components/vehiculesListComponents/FavoritList";
import CarDetails from "../components/vehiculesListComponents/SingleVehicule";



export default function Home() {


  return (
    <div className="">
      <HeroSection/>
      <Testimonials />
      <Collaboration />
      <Instagram />
      
 </div>
  );
}
