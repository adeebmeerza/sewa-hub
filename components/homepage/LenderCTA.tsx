import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const LenderCTA = () => {
  return (
    <section className="wrapper">
      <div className="lenderCta bg-primary text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-center md:gap-0 lg:gap-16">
        <div className="sm:pr-4 md:pr-12">
          <h2>
            Earn Money from <span className="block">Your Unused Items</span>
          </h2>
          <div className="my-2">
            <p className="mb-2">Turn your extra items into passive income.</p>
            <Button variant="secondary" size="lg" className="mt-4">
              List Your Item <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="lender-cta-side w-[200px] sm:w-[230px] md:w-[300px] -my-10 sm:-my-0 mx-auto lg:mx-0" />
      </div>
    </section>
  );
};

export default LenderCTA;
