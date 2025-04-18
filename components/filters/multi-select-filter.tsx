import { IMultiSelectFilter } from "@/app/types/filters";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface MultiSelectFilterProps {
  filterKey: string;
  filter: IMultiSelectFilter;
  selected: string[];
  onChange: (value: string, checked: boolean) => void;
}

const MultiSelectFilter = ({
  filterKey,
  filter,
  selected,
  onChange,
}: MultiSelectFilterProps) => {
  return filter.options.map((option) => {
    const value = typeof option === "string" ? option : option.value;
    const label = typeof option === "string" ? option : option.label;

    return (
      <div key={value} className="flex items-center space-x-2">
        <Checkbox
          id={`${filterKey}-${value}`}
          checked={selected.includes(value)}
          onCheckedChange={(checked) => onChange(value, checked === true)}
        />
        <Label
          htmlFor={`${filterKey}-${value}`}
          className="text-sm font-normal cursor-pointer"
        >
          {label}
        </Label>
      </div>
    );
  });
};

export default MultiSelectFilter;
