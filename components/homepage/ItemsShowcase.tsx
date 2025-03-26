import ItemCard from "../ItemCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";

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
    id: "Item3",
    name: "Sheila Majid Vinyl Lagenda (Japan Recording)",
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
    id: "Item4",
    name: "Sheila Majid Vinyl Lagenda (Japan Recording)",
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
    id: "Item5",
    name: "Sheila Majid Vinyl Lagenda (Japan Recording)",
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
    id: "Item6",
    name: "Sheila Majid Vinyl Lagenda (Japan Recording)",
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
];

const ItemsShowcase = () => {
  return (
    <section id="items-showcase" className="relative">
      <div className="flex justify-between">
        <h2>Rent anytime, anywhere</h2>
        <Button variant="outline">View all</Button>
      </div>

      <Carousel opts={{ align: "start" }}>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselContent className="my-4">
          {items.map((item) => (
            <CarouselItem key={item.id} className="basis-1/4">
              {/* <Link href={""}> */}
              <ItemCard {...item} />
              {/* </Link> */}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default ItemsShowcase;
