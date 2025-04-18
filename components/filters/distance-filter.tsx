import { FilterValue, IDistanceFilter } from "@/app/types/filters";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface DistanceFilterProps {
  filterKey: string;
  filter: IDistanceFilter;
  selected: FilterValue;
  onChange: (value: string, checked: boolean) => void;
}

const DistanceFilter = ({
  filterKey,
  filter,
  selected,
  onChange,
}: DistanceFilterProps) => {
  return filter.options.map((option) => {
    const radius = option.radius;
    const label = option.label;

    return (
      <div key={radius} className="flex items-center space-x-2">
        <Checkbox
          id={`${filterKey}-${radius}`}
          checked={selected === radius}
          onCheckedChange={(checked) => onChange(radius, checked === true)}
        />
        <Label
          htmlFor={`${filterKey}-${radius}`}
          className="text-sm font-normal cursor-pointer"
        >
          {label}
        </Label>
      </div>
    );
  });
};

export default DistanceFilter;
