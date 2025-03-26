import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrowseByCategory from "@/components/homepage/BrowseByCategory";
import CustomerAssurance from "@/components/homepage/CustomerAssurance";
import HowItWorks from "@/components/homepage/HowItWorks";
import ItemsShowcase from "@/components/homepage/ItemsShowcase";
import LenderCTA from "@/components/homepage/LenderCTA";

export default function Home() {
  return (
    <div id="homepage" className="relative">
      {/* Blue background div that extends to half of the search box */}
      <div
        className="absolute top-0 left-0 w-full bg-secondary"
        style={{
          height: "308px",
          zIndex: -1,
        }}
      />

      <div id="container" className="container mx-auto px-52">
        <Header />

        <Hero />

        <ItemsShowcase />

        <HowItWorks />

        <BrowseByCategory />

        {/* <div>Popular Rentals</div> */}

        <CustomerAssurance />

        <LenderCTA />
      </div>
    </div>
  );
}
