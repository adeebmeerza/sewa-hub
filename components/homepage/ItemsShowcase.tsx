"use client";

import ItemCard from "../ItemCard";
import CustomCarousel from "../ui/reusable/custom-carousel";
import CustomButton from "../CustomButton";

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
      name: "Syafiq Syahmi",
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
      name: "Amirul",
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
      name: "Irfan",
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
      name: "Syafiq Syahmi",
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
      name: "Syafiq Syahmi",
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
      name: "Syafiq Syahmi",
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
        itemClassName="basis-1/1 sm:basis-1/3 lg:basis-1/4 grow-1"
      />
    </section>
  );
};

export default ItemsShowcase;
