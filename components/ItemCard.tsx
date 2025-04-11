import { BadgeCheck, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

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
    <Link href={""}>
      <Card className="rounded-xl transition-all duration-300 hover:shadow-md gap-0 py-0 overflow-hidden text-gray-500 h-full flex-grow justify-between">
        <div className="relative aspect-square overflow-hidden h-[150px] px-0">
          <Image
            src={thumbnail || "/product-placeholder.png"}
            alt={`${name}`}
            fill
            className="object-contain"
          />
        </div>

        <CardContent className="px-4 my-4 flex flex-col grow">
          <CardTitle className="font-medium leading-5 line-clamp-2 text-gray-800 mb-1 sm:mb-2 text-sm grow">
            {name}
          </CardTitle>

          <div className="text-xs sm:text-sm font-normal space-y-2 sm:space-y-1">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <span className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => {
                  if (index + 1 <= Math.ceil(reviews.rating)) {
                    return (
                      <Star
                        key={index}
                        size={14}
                        className={"fill-yellow-400 text-yellow-400"}
                      />
                    );
                  } else {
                    return (
                      <Star
                        key={index}
                        size={14}
                        className={"text-yellow-400"}
                      />
                    );
                  }
                })}
              </span>
              <span className="text-sm">({reviews.count})</span>
            </div>

            <div className="flex flex-row sm:flex-col gap-2 sm:gap-1">
              <div className="flex items-center">
                <MapPin size={12} className=" mr-1 h-4 w-4" />
                <span>{location}</span>
              </div>

              <span className="inline sm:hidden text-xs text-gray-300">•</span>

              <div className="owner-info flex flex-row items-center gap-1">
                <Avatar className="h-4 w-4">
                  <AvatarImage
                    src={owner.avatarImg}
                    alt={"Avatar"}
                    className="rounded-full"
                  />
                  <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="truncate text-ellipsis">{owner.name}</span>
                <span>
                  {owner.verified && (
                    <BadgeCheck size={14} className="inline-block" />
                  )}
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="h-14 p-4 bg-gray-50">
          <span className="text-lg font-bold text-blue-600">
            RM {rentalRate.min}-{rentalRate.max}
          </span>
          <span className="text-sm ml-1">/ day</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ItemCard;
