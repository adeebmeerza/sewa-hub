"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";
import { Button } from "../button";
import CustomButton from "../../CustomButton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReactNode, useCallback, useEffect, useState } from "react";

type CustomCarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemClassName?: string;
  carouselOpts?: { slidesToScroll?: number };
};

function CustomCarousel<T>({
  items,
  itemClassName,
  renderItem,
  carouselOpts,
}: CustomCarouselProps<T>) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on("select", handleSelect);
    handleSelect();

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const scrollPrev = useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  return (
    <Carousel opts={{ align: "start", ...carouselOpts }} setApi={setApi}>
      <CarouselContent className="my-4">
        {items.map((item, index) => (
          <CarouselItem key={index} className={itemClassName}>
            {renderItem(item, index)}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4 z-2 hover:scale-150 shadow-md size-11 sm:size-8" />
      <CarouselNext className="-right-4 z-2 hover:scale-150 shadow-md size-11 sm:size-8" />

      <div className="flex sm:hidden flex-row items-center gap-6 justify-end flex-wrap w-full">
        <CustomButton variant="outline" size="xl" className="flex-grow">
          View all
        </CustomButton>
        <div className="space-x-2 shrink-0">
          <Button
            size="icon"
            variant="outline"
            onClick={scrollPrev}
            className="-left-2 sm:-left-4 z-2 hover:scale-150 shadow-md size-11 sm:size-8"
            disabled={!canScrollPrev}
          >
            <ArrowLeft />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={scrollNext}
            className="-left-2 sm:-left-4 z-2 hover:scale-150 shadow-md size-11 sm:size-8"
            disabled={!canScrollNext}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </Carousel>
  );
}

export default CustomCarousel;
