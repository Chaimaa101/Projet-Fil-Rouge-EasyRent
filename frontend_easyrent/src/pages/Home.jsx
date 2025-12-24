import { motion } from "framer-motion";

import HeroSection from "../components/homeComponents/HeroSection";
import Testimonials from "../components/homeComponents/Testimonials";
import Collaboration from "../components/homeComponents/Collaboration";
import Instagram from "../components/homeComponents/Instagram";
import SearchBar from "../components/homeComponents/SearchBar";
import TopVehicules from "../components/homeComponents/TopVehicules";



export default function Home() {


  return (
    <div className="">
      <HeroSection/>
      <SearchBar />
      <TopVehicules />
      <Testimonials />
      <Collaboration />
      <Instagram />
      
 </div>
  );
}
