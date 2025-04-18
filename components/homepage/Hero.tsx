import React from "react";
import SearchBox from "../SearchBox";
import SearchProvider from "../search-box/search-provider";

const Hero = () => {
  return (
    <section className="wrapper my-0 py-8 md:py-10 lg:py-8 xl:py-16">
      <div>
        <div
          id="heading"
          className="mb-6 md:mb-6 lg:mb-4 xl:mb-6 text-left text-white lg:text-center"
        >
          <h1>Find item to rent</h1>
          <p>Rent what you need, when you need</p>
        </div>

        <SearchProvider>
          <SearchBox isStackedLayout={true} className="lg:w-6/10" />
        </SearchProvider>
      </div>
    </section>
  );
};

export default Hero;
