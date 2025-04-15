"use client";

import ItemCard from "../ItemCard";
import CustomCarousel from "../ui/reusable/custom-carousel";
import CustomButton from "../ui/reusable/custom-button";
import useMediaQuery from "@/app/hooks/use-media-query";

const items = [
  {
    id: "Item1",
    name: "Insta 360 for outdoor video recording",
    thumbnail: "/products/insta360.png",
    reviews: {
      rating: 4.8,
      count: 2,
    },
    owner: {
      avatarImg: "/avatar.jpg",
      name: "Arif",
      verified: true,
    },
    location: "Cyberjaya",
    rentalRate: {
      min: 20,
      max: 30,
    },
  },
  {
    id: "Item2",
    name: "Sheila Majid Vinyl Lagenda (Japan Recording)",
    thumbnail: "/products/insta360.png",
    reviews: {
      rating: 4.2,
      count: 7,
    },
    owner: {
      avatarImg: "/avatar.jpg",
      name: "Burhanuddin",
      verified: true,
    },
    location: "Cyberjaya",
    rentalRate: {
      min: 20,
      max: 30,
    },
  },
  {
    id: "Item3",
    name: "Sheila Majid Vinyl Lagenda (Japan Recording)",
    thumbnail: "/products/insta360.png",
    reviews: {
      rating: 2.1,
      count: 10,
    },
    owner: {
      avatarImg: "/avatar.jpg",
      name: "Muthu",
      verified: true,
    },
    location: "Cyberjaya",
    rentalRate: {
      min: 20,
      max: 30,
    },
  },
  {
    id: "Item4",
    name: "Sheila Majid Vinyl Lagenda (Japan Recording)",
    thumbnail: "/products/insta360.png",
    reviews: {
      rating: 3,
      count: 8,
    },
    owner: {
      avatarImg: "/avatar.jpg",
      name: "Saiful Bahri",
      verified: true,
    },
    location: "Cyberjaya",
    rentalRate: {
      min: 20,
      max: 30,
    },
  },
  {
    id: "Item5",
    name: "Sheila Majid Vinyl Lagenda (Japan Recording)",
    thumbnail: "/products/insta360.png",
    reviews: {
      rating: 3.9,
      count: 20,
    },
    owner: {
      avatarImg: "/avatar.jpg",
      name: "Cheng",
      verified: true,
    },
    location: "Cyberjaya",
    rentalRate: {
      min: 20,
      max: 30,
    },
  },
  {
    id: "Item6",
    name: "Sheila Majid Vinyl Lagenda (Japan Recording)",
    thumbnail: "/products/insta360.png",
    reviews: {
      rating: 4.0,
      count: 5,
    },
    owner: {
      avatarImg: "/avatar.jpg",
      name: "Jamal",
      verified: true,
    },
    location: "Cyberjaya",
    rentalRate: {
      min: 20,
      max: 30,
    },
  },
];

const ItemsShowcase = () => {
  const isMd = useMediaQuery("(min-width: 768px)");
  const isLg = useMediaQuery("(min-width: 1024px)");

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

      <CustomCarousel
        items={items}
        renderItem={(item) => <ItemCard {...item} />}
        itemClassName="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 grow-1"
        carouselClassName="my-2"
        carouselOpts={{ slidesToScroll: isLg ? 3 : isMd ? 2 : 1 }}
      />
    </section>
  );
};

export default ItemsShowcase;
