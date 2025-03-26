import { Button } from "../ui/button";

const LenderCTA = () => {
  return (
    <section className="lenderCta bg-primary text-white rounded-2xl p-8 text-center">
      <h2 className="text-2xl font-bold">Earn Money from Your Unused Items</h2>
      <div className="side" />
      <div>
        <p className="mb-2">Turn your extra items into passive income.</p>
        <Button variant="secondary" size="lg">
          List Your Item
        </Button>
      </div>
    </section>
  );
};

export default LenderCTA;
