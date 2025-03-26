import { CircleCheck, MapPin, Star } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface Props {
  name: string;
  thumbnail: string;
  reviews: {
    rating: number;
    count: number;
  };
  owner: {
    avatarImg: string;
    name: string;
    verified: boolean;
  };
  location: string;
  rentalRate: {
    min: number;
    max: number;
  };
}

const ItemCard = ({
  name,
  thumbnail,
  reviews,
  owner,
  location,
  rentalRate,
}: Props) => {
  return (
    <Card className="rounded-xl transition-all duration-300 hover:shadow-md gap-3 py-0 group overflow-hidden">
      <div className="relative aspect-square overflow-hidden h-[150px] px-0">
        <Image
          src={thumbnail || "/product-placeholder.png"}
          alt={`${name}`}
          fill
          className="object-contain"
        />
      </div>

      <CardContent className="px-4 space-y-1">
        <CardTitle className="font-medium leading-5">{name}</CardTitle>

        <div>
          {/* Product name */}

          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="font-normal flex items-center gap-1 text-sm text-gray-600">
              {reviews.rating}
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
            </span>
            <span className="text-sm text-gray-600">({reviews.count})</span>
          </div>

          {/* Owner & Location */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {/* <Avatar className="h-6 w-6">
              <AvatarImage
                src={owner.avatarImg}
                alt={"Avatar"}
                className="rounded-full"
              />
              <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
            </Avatar> */}
              <span
                className={cn(
                  "flex items-center font-normal",
                  "text-sm text-gray-600"
                )}
              >
                {owner.name}
                {owner.verified && <CircleCheck size="14" className="ml-1" />}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={14} className="mr-1" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="h-14 px-4 bg-gray-50">
        <div className="w-full flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-blue-600">
              RM {rentalRate.min}-{rentalRate.max}
            </span>
            <span className="text-sm text-gray-500 ml-1">/ day</span>
          </div>

          <Button
            variant="default"
            size="sm"
            className="text-center items-center justify-center text-sm hidden group-hover:block"
          >
            Rent Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
