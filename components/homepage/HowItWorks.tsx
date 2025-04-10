import Image from "next/image";

const HowItWorks = () => {
  return (
    <section className="wrapper">
      <h2>Simple & Secure Rentals</h2>
      <div>
        <ol className="renting-steps my-4">
          <li>
            <Image
              src={"/search.svg"}
              alt={"Search"}
              width={80}
              height={120}
              className="object-contain"
            />
            <div>
              <h3>1. Browse Items</h3>
              <p>Search for what you need</p>
            </div>
          </li>
          <li>
            <Image
              src={"/booking.svg"}
              alt={"Booking item"}
              width={100}
              height={50}
              className="object-contain"
            />
            <div>
              <h3>2. Book & Pay</h3>
              <p>Secure checkout</p>
            </div>
          </li>
          <li>
            <Image
              src={"/deliveries.svg"}
              alt={"Pickup item"}
              width={100}
              height={50}
              className="object-contain"
            />
            <div>
              <h3>3. Pickup or Delivery</h3>
              <p>Choose your option</p>
            </div>
          </li>
          <li>
            <Image
              src={"/high-five.svg"}
              alt={"Return item"}
              width={100}
              height={50}
              className="object-contain"
            />
            <div>
              <h3>4. Return It</h3>
              <p>Easy returns, no hassle</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
