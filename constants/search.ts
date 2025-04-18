import { ItemProps } from "@/components/ItemCard";

const pickUpDistance = [
  { radius: "2", label: "Walking distance" },
  { radius: "5", label: "Local area" },
  { radius: "10", label: "Short drive" },
  { radius: "20", label: "Nearby town" },
  { radius: "50", label: "Nearby district" },
  { radius: "75", label: "Nearby region" },
  { radius: "200", label: "National coverage" },
];

const itemsData: ItemProps[] = [
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
    condition: "Like New",
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
    condition: "Like New",
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
    condition: "Like New",
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
    condition: "Like New",
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
    condition: "Like New",
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
    condition: "Like New",
    location: "Cyberjaya",
    rentalRate: {
      min: 20,
      max: 30,
    },
  },
  {
    id: "Item7",
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
    condition: "Like New",
    location: "Cyberjaya",
    rentalRate: {
      min: 20,
      max: 30,
    },
  },
];

export { pickUpDistance, itemsData };
