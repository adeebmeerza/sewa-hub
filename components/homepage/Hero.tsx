import React from "react";
import SearchBox from "../SearchBox";
import { SearchProvider } from "@/app/contexts/search-context";

const Hero = () => {
  return (
    <section className="wrapper my-0 py-8">
      <div>
        <div id="heading" className="pb-4 pd:mb-6 text-left text-white">
          <h1>Find item to rent</h1>
          <p>Rent what you need, when you need</p>
        </div>

        <SearchProvider>
          <SearchBox />
        </SearchProvider>
      </div>
    </section>
  );
};

export default Hero;
