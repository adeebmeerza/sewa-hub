import { IStarRatingFilter } from "@/app/types/filters";
import React from "react";
import { Label } from "../ui/label";
import { Star } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

interface StarRatingFilterProps {
  filterKey: string;
  filter: IStarRatingFilter;
  selected: string[];
  onChange: (value: string, checked: boolean) => void;
}

const StarRatingFilter = ({
  filterKey,
  filter,
  selected,
  onChange,
}: StarRatingFilterProps) => {
  return filter.options.map((rating) => (
    <div key={rating} className="flex items-center space-x-2">
      <Checkbox
        id={`${filterKey}-${rating}`}
        checked={selected.includes(rating.toString())}
        onCheckedChange={(checked) =>
          onChange(rating.toString(), checked === true)
        }
      />
      <Label
        htmlFor={`${filterKey}-${rating}`}
        className="text-sm font-normal cursor-pointer"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>
            {i < rating ? (
              <Star size={15} className="fill-yellow-400 text-yellow-400" />
            ) : (
              <Star size={15} className="text-yellow-400" />
            )}
          </span>
        ))}
      </Label>
    </div>
  ));
};

export default StarRatingFilter;
