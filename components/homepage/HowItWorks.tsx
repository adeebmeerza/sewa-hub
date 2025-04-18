"use client";

import Image from "next/image";
import CustomCarousel from "../ui/reusable/custom-carousel";
import { Card, CardContent } from "../ui/card";
import Autoplay from "embla-carousel-autoplay";

const items = [
  {
    image: {
      url: "/search.svg",
      alt: "Search",
    },
    title: "1. Browse Items",
    description: "Search for what you need",
  },
  {
    image: {
      url: "/booking.svg",
      alt: "Booking item",
    },
    title: "2. Book & Pay",
    description: "Secure checkout",
  },
  {
    image: {
      url: "/deliveries.svg",
      alt: "Pickup item",
    },
    title: "3. Pickup or Delivery",
    description: "Choose your option",
  },
  {
    image: {
      url: "/high-five.svg",
      alt: "Return item",
    },
    title: "4. Return It",
    description: "Easy returns, no hassle",
  },
];

type StepProp = {
  image: {
    url: string;
    alt: string;
  };
  title: string;
  description: string;
};

const StepCard = ({ image, title, description }: StepProp) => {
  return (
    <div className="h-full pt-2">
      <Card className="h-full flex flex-col pt-1 pb-3 sm:py-4 sm:border-none sm:shadow-none">
        <CardContent className="flex flex-col items-center flex-grow px-1 md:px-6">
          <div className="h-[90px] w-[90px] sm:h-[110px] sm:w-[110px] lg:w-[120px] lg:h-[120px] relative">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-contain"
            />
          </div>
          <div className="text-center mt-0 sm:mt-6 flex-grow flex flex-col">
            <h3 className="text-base font-medium font-inter">{title}</h3>
            <p className="mt-0 text-sm text-gray-600">{description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="wrapper">
      <h2>Start Renting Easily</h2>

      <CustomCarousel
        items={items}
        renderItem={(item) => <StepCard {...item} />}
        carouselOpts={{
          align: "start",
          slidesToScroll: 1,
          loop: true,
        }}
        itemClassName="basis-full sm:basis-1/3 lg:basis-1/4"
        carouselPlugins={[
          Autoplay({
            delay: 3000,
            stopOnMouseEnter: true,
          }),
        ]}
        showControl={false}
      />
    </section>
  );
};

export default HowItWorks;
