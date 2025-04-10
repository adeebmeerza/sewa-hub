import React from "react";
import SearchBox from "../SearchBox";
import { SearchProvider } from "@/app/contexts/search-context";

const Hero = () => {
  return (
    <section id="hero">
      <div id="heading" className="mb-4 md:mb-6 text-left text-white">
        {/* <h1 className="text-5xl font-montserrat leading-16 font-extrabold"> */}
        <h1>Find item to rent</h1>
        <p>Rent what you need, when you need</p>
      </div>

      <SearchProvider>
        <SearchBox />
      </SearchProvider>
    </section>
  );
};

export default Hero;
