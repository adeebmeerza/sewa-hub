import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";
import { RENTAL_CATEGORIES } from "@/lib/rentalCategories";

interface Category {
  img: string;
  name: string;
}

const BrowseByCategory = () => {
  const categories = RENTAL_CATEGORIES;

  const decker = [];
  for (let i = 0; i < categories.length; i += 2) {
    decker.push(categories.slice(i, i + 1));
  }

  return (
    <section id="browse-by-categories">
      <div>
        <h2>Browse by category</h2>
      </div>

      {/* Category Carousel */}
      <Carousel orientation="horizontal" opts={{ align: "start" }}>
        <CarouselPrevious />
        <CarouselNext />

        <CarouselContent>
          {Array.from({ length: Math.ceil(categories.length / 2) }, (_, i) => (
            <CarouselItem key={i} className="basis-1/6">
              {categories.slice(i * 2, i * 2 + 2).map((category, index) => (
                <Link key={index} href={`/products/${category.slug}`}>
                  <Card className="rounded-none py-0 gap-2 my-4 h-[110px] place-content-center">
                    <div className="text-center text-3xl">{category.icon}</div>
                    <CardHeader className="px-2">
                      <CardTitle className="font-normal text-center text-[0.85rem] leading-4 font-montserrat">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default BrowseByCategory;
