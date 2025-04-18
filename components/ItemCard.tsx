import { BadgeCheck, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export interface ItemProps {
  id: string;
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
  condition: string;
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
  condition,
  location,
  rentalRate,
}: ItemProps) => {
  return (
    <Link href={""}>
      <Card className="rounded-md sm:rounded-xl transition-all duration-300 hover:shadow-md gap-0 py-0 overflow-hidden text-gray-500 h-full flex-grow justify-between">
        <div className="relative aspect-square overflow-hidden h-[180px] sm:h-[150px] px-0">
          <Image
            src={thumbnail || "/product-placeholder.png"}
            alt={`${name}`}
            fill
            className="object-contain"
            priority={true}
          />
        </div>

        <CardContent className="px-2 sm:px-4 my-2 flex flex-col grow">
          <CardTitle className="text-[0.82rem] leading-4 font-normal sm:text-sm sm:font-medium sm:leading-5 line-clamp-2 text-gray-800 mb-1 sm:mb-2 ">
            {name}
          </CardTitle>

          <div className="text-xs sm:text-sm font-normal space-y-1">
            <div className="flex items-center gap-2">
              {/* Star Rating */}
              <div className="flex sm:hidden items-center">
                <Star size={12} className={"fill-yellow-400 text-yellow-400"} />
                <span className="text-xs ml-0.5">{reviews.rating}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
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
                <span className="text-sm ml-0.5">({reviews.count})</span>
              </div>

              <div className="text-[0.6rem] sm:hidden">•</div>

              <div className="sm:hidden">{condition}</div>
            </div>

            {/* Item attributes */}
            <div className="flex flex-col gap-1 sm:gap-1">
              <div className="flex-col sm:flex-row flex gap-1 md:gap-2">
                <div className="hidden md:block">{condition}</div>

                <div className="hidden md:block text-[0.6rem]">•</div>

                <div className="flex items-center">
                  <MapPin
                    size={12}
                    className="hidden sm:block mr-0.5 h-4 w-4"
                  />
                  <MapPin size={11} className="sm:hidden mr-0.5 h-3 w-3" />

                  <span>{location}</span>
                </div>
              </div>

              <div className="hidden sm:flex flex-row items-center gap-2 sm:my-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={owner.avatarImg}
                    alt={"Avatar"}
                    className="rounded-full"
                  />
                  <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="truncate text-ellipsis">
                  {owner.name}
                  <span className="ml-1">
                    {owner.verified && (
                      <BadgeCheck size={14} className="inline-block" />
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="h-10 sm:h-14 flex items-center px-2 sm:px-4 bg-gray-50">
          <div className="text-xs sm:text-sm align-baseline">
            RM
            <span className="text-base font-medium sm:text-lg sm:font-bold text-blue-600 mx-0.5">
              {rentalRate.min}-{rentalRate.max}
            </span>
            / day
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ItemCard;
