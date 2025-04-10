"use client";

import { Card, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import RENTAL_CATEGORIES from "@/constants/rentalCategories";
import CustomCarousel from "../ui/reusable/custom-carousel";

const CategoryCard = ({
  slug,
  icon,
  name,
}: {
  slug: string;
  icon: string;
  name: string;
}) => {
  return (
    <Link href={`/products/${slug}`}>
      <Card className="rounded-none py-0 gap-0 my-2 sm:my-4 h-[90px] sm:h-[110px] place-content-center">
        <div>
          <div className="text-center text-2xl sm:text-3xl sm:mb-2">{icon}</div>
          <CardHeader className="px-2">
            <CardTitle className="font-normal text-center text-[0.76rem] leading-4 font-montserrat">
              {name}
            </CardTitle>
          </CardHeader>
        </div>
      </Card>
    </Link>
  );
};

const BrowseByCategory = () => {
  const categories = RENTAL_CATEGORIES;

  return (
    <section id="browse-by-categories">
      <div>
        <h2>Browse by category</h2>
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
              />
            ))
        }
        itemClassName="basis-1/2 pl-4 sm:basis-1/5"
        carouselOpts={{ slidesToScroll: 2 }}
      />
    </section>
  );
};

export default BrowseByCategory;
