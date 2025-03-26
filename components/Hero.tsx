import React from "react";
import SearchBox from "./SearchBox";

const Hero = () => {
  return (
    <section id="hero">
      <div id="heading" className="mb-8 text-left text-white">
        <h1 className="text-5xl font-montserrat leading-16 font-extrabold">
          Find item to rent
        </h1>
        <p className="text-2xl">Search what you need, when you need</p>
      </div>

      <SearchBox />
    </section>
  );
};

export default Hero;
