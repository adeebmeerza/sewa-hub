"use client";

import ItemCard, { ItemProps } from "../ItemCard";
import CustomCarousel from "../ui/reusable/custom-carousel";
import CustomButton from "../ui/reusable/custom-button";
import useMediaQuery from "@/app/hooks/use-media-query";
import { itemsData } from "@/constants/search";

const items: ItemProps[] = itemsData;

const ItemsShowcase = () => {
  const isMd = useMediaQuery("(min-width: 768px)");
  const isLg = useMediaQuery("(min-width: 1024px)");

  const discoveryItems = items.length % 2 === 0 ? items : items.slice(0, -1);

  return (
    <section id="items-showcase" className="wrapper relative">
      <div className="flex justify-between items-end">
        <h2>
          <span className="sm:hidden">Discover Nearby</span>
          <span className="hidden sm:inline">Discover Nearby Item</span>
        </h2>
        <CustomButton variant="link" className="py-0 h-auto leading-[28px]">
          View all &gt;
        </CustomButton>
      </div>

      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 my-2">
        {discoveryItems.map((di) => (
          <ItemCard key={di.id} {...di} />
        ))}
      </div> */}

      <CustomCarousel
        items={items}
        renderItem={(item) => <ItemCard {...item} />}
        itemClassName="basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 grow-1"
        carouselClassName="my-2"
        carouselOpts={{
          slidesToScroll: isLg ? 3 : isMd ? 2 : 1,
          align: "center",
        }}
      />
    </section>
  );
};

export default ItemsShowcase;
