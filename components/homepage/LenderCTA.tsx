import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const LenderCTA = () => {
  return (
    <section className="lenderCta bg-primary text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center">
      <div className="sm:pr-4 md:pr-18">
        <h2>
          Earn Money from <span className="sm:block">Your Unused Items</span>
        </h2>
        <div className="my-2">
          <p className="mb-2">Turn your extra items into passive income.</p>
          <Button variant="secondary" size="lg" className="mt-4">
            List Your Item <ArrowRight />
          </Button>
        </div>
      </div>
      <div className="side w-[220px] sm:w-[230px] md:w-[250px] -my-10 mx-auto sm:mr-0" />
    </section>
  );
};

export default LenderCTA;
