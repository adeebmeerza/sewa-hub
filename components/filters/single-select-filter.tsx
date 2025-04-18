import { ISingleSelectFilter } from "@/app/types/filters";
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "@radix-ui/react-label";

interface SingleSelectFilterProps {
  filterKey: string;
  filter: ISingleSelectFilter;
  selected: string;
  onChange: (value: string, checked: boolean) => void;
}

const SingleSelectFilter = ({
  filterKey,
  filter,
  selected,
  onChange,
}: SingleSelectFilterProps) => {
  return (
    <RadioGroup
      value={selected || ""}
      onValueChange={(value) => onChange(value, true)}
    >
      {filter.options.map((option) => {
        const value = typeof option === "string" ? option : option.value;
        const label = typeof option === "string" ? option : option.label;

        return (
          <div key={value} className="flex items-center space-x-2">
            <RadioGroupItem id={`${filterKey}-${value}`} value={value} />
            <Label
              htmlFor={`${filterKey}-${value}`}
              className="text-sm font-normal cursor-pointer"
            >
              {label}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default SingleSelectFilter;
