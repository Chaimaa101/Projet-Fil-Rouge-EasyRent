import { motion } from "framer-motion";

import HeroSection from "../components/homeComponents/HeroSection";
import Testimonials from "../components/homeComponents/Testimonials";
import Collaboration from "../components/homeComponents/Collaboration";
import Instagram from "../components/homeComponents/Instagram";



export default function Home() {


  return (
    <div className="">
      <HeroSection/>
      <SearchBar />
      <Testimonials />
      <Collaboration />
      <Instagram />
      
 </div>
  );
}
