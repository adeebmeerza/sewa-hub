import Hero from "@/components/homepage/Hero";
import BrowseByCategory from "@/components/homepage/BrowseByCategory";
import HowItWorks from "@/components/homepage/HowItWorks";
import ItemsShowcase from "@/components/homepage/ItemsShowcase";
import LenderCTA from "@/components/homepage/LenderCTA";
// import CustomerAssurance from "@/components/homepage/CustomerAssurance";

export default function Home() {
  return (
    <div className="relative">
      {/* Blue background div that extends to half of the search box */}
      {/* <div
        className="absolute top-0 left-0 w-full bg-primary"
        style={{
          height: "400px",
          zIndex: -1,
        }}
      /> */}

      <main className="outline-0">
        <div className="bg-primary">
          <Hero />
        </div>

        <HowItWorks />

        <BrowseByCategory />

        <ItemsShowcase />

        {/* <div>Popular Rentals</div> */}

        {/* <CustomerAssurance /> */}

        <LenderCTA />
      </main>
    </div>
  );
}
