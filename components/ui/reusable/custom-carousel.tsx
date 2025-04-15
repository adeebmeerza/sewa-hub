"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";
import CustomButton from "./custom-button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";

type CustomCarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemClassName?: string;
  carouselOpts?: EmblaOptionsType;
  carouselPlugins?: EmblaPluginType[];
  showControl?: boolean;
};

function CustomCarousel<T>({
  items,
  itemClassName,
  renderItem,
  carouselOpts,
  carouselPlugins,
  showControl = true,
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
    <Carousel
      opts={{ align: "start", ...carouselOpts }}
      plugins={carouselPlugins}
      setApi={setApi}
    >
      <CarouselContent className="my-4">
        {items.map((item, index) => (
          <CarouselItem key={index} className={itemClassName}>
            {renderItem(item, index)}
          </CarouselItem>
        ))}
      </CarouselContent>
      {showControl && (
        <>
          <CarouselPrevious className="-left-4 z-2 hover:scale-150 shadow-md size-11 sm:size-8" />
          <CarouselNext className="-right-4 z-2 hover:scale-150 shadow-md size-11 sm:size-8" />
        </>
      )}

      {showControl && (
        <div className="flex sm:hidden flex-row items-center gap-6 justify-end flex-wrap w-full">
          <div className="space-x-2 shrink-0">
            <CustomButton
              size="icon"
              variant="outline"
              onClick={scrollPrev}
              className="-left-2 sm:-left-4 z-2 hover:scale-150 shadow-md size-11 sm:size-8 rounded-full"
              disabled={!canScrollPrev}
            >
              <ArrowLeft />
            </CustomButton>
            <CustomButton
              size="icon"
              variant="outline"
              onClick={scrollNext}
              className="-left-2 sm:-left-4 z-2 hover:scale-150 shadow-md size-11 sm:size-8 rounded-full"
              disabled={!canScrollNext}
            >
              <ArrowRight />
            </CustomButton>
          </div>
        </div>
      )}
    </Carousel>
  );
}

export default CustomCarousel;
