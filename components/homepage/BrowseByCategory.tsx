"use client";

import { Card, CardTitle } from "../ui/card";
import Link from "next/link";
import RENTAL_CATEGORIES from "@/constants/rentalCategories";
import CustomCarousel from "../ui/reusable/custom-carousel";
import CustomButton from "../ui/reusable/custom-button";

const CategoryCard = ({
  slug,
  icon,
  name,
  shortName,
}: {
  slug: string;
  icon: string;
  name: string;
  shortName?: string;
}) => {
  return (
    <Link href={`/products/${slug}`}>
      <Card
        className="flex flex-col items-center justify-center h-32 my-2 sm:my-4 rounded-none
       gap-0"
      >
        <div className="text-center text-4xl sm:text-3xl mb-2">{icon}</div>
        <CardTitle className="text-center text-[0.76rem] lg:text-sm leading-4 lg:leading-5 px-2 md:px-3 font-normal">
          <span className="sm:hidden">{shortName}</span>
          <span className="hidden sm:block">{name}</span>
        </CardTitle>
      </Card>
    </Link>
  );
};

const BrowseByCategory = () => {
  const categories = RENTAL_CATEGORIES;

  return (
    <section id="browse-by-categories" className="wrapper">
      <div className="flex justify-between items-end">
        <h2>Browse by category</h2>
        <CustomButton
          variant="link"
          className="py-0 px-2 h-auto leading-[28px]"
        >
          View all &gt;
        </CustomButton>
      </div>

      <CustomCarousel
        items={Array.from({ length: Math.ceil(categories.length / 2) })}
        renderItem={(_, i) =>
          categories
            .slice(i * 2, i * 2 + 2)
            .map((category, index) => (
              <CategoryCard
                key={index}
                slug={category.slug}
                icon={category.icon}
                name={category.name}
                shortName={category.shortName}
              />
            ))
        }
        itemClassName="basis-1/3 pl-4 sm:basis-1/5"
        carouselOpts={{ slidesToScroll: 2 }}
      />
    </section>
  );
};

export default BrowseByCategory;
