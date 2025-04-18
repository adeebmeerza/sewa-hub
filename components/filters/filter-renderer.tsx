import { FilterType, FilterValue } from "@/app/types/filters";
import React from "react";
import MultiSelectFilter from "./multi-select-filter";
import SingleSelectFilter from "./single-select-filter";
import RangeSliderFilter from "./range-slider-filter";
import StarRatingFilter from "./star-rating-filter";
import DistanceFilter from "./distance-filter";
import { useSearchContext } from "@/app/contexts/search-context";

type Props = {
  filterKey: string;
  filterSchema: FilterType;
  selected: FilterValue[];
};

const FilterRenderer = ({ filterKey, filterSchema, selected = [] }: Props) => {
  const { setFilter, removeFilter, triggerSearch } = useSearchContext();

  const handleFilterChange = (
    filterKey: string,
    value: FilterValue,
    checked: boolean,
    filterType: FilterType["type"]
  ) => {
    switch (filterType) {
      case "singleSelect":
      case "distance":
        // Single select behavior - only one value can be selected
        setFilter(filterKey, value, filterType);
        triggerSearch();
        break;

      case "rangeSlider":
        // Range slider values are handled separately
        // This case is handled in the range slider component
        break;

      case "multiSelect":
      case "starRating":
      default:
        // Multi-select behavior - multiple values can be selected
        if (checked) {
          setFilter(filterKey, value);
        } else {
          removeFilter(filterKey, value);
        }
        triggerSearch();
        break;
    }
  };

  switch (filterSchema.type) {
    case "multiSelect":
      return (
        <MultiSelectFilter
          filterKey={filterKey}
          filter={filterSchema}
          selected={selected as string[]}
          onChange={(value, checked) =>
            handleFilterChange(filterKey, value, checked, "multiSelect")
          }
        />
      );

    case "singleSelect":
      return (
        <SingleSelectFilter
          filterKey={filterKey}
          filter={filterSchema}
          selected={selected?.[0]?.toString() as string}
          onChange={(value, checked) =>
            handleFilterChange(filterKey, value, checked, "singleSelect")
          }
        />
      );

    case "rangeSlider":
      return <RangeSliderFilter filterKey={filterKey} filter={filterSchema} />;

    case "starRating":
      return (
        <StarRatingFilter
          filterKey={filterKey}
          filter={filterSchema}
          selected={selected as string[]}
          onChange={(value, checked) =>
            handleFilterChange(filterKey, value, checked, "starRating")
          }
        />
      );

    case "distance":
      return (
        <DistanceFilter
          filterKey={filterKey}
          filter={filterSchema}
          selected={selected?.[0] as string}
          onChange={(value, checked) =>
            handleFilterChange(filterKey, value, checked, "distance")
          }
        />
      );

    default:
      return null;
  }
};

export default FilterRenderer;
