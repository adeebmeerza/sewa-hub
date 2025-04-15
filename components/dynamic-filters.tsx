"use client";

import { Check, ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Slider } from "./ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

type FilterValue = string | number | boolean;

interface BaseFilter {
  type: string;
}

interface MultiSelectFilter extends BaseFilter {
  type: "multiSelect";
  options: Array<string | { value: string; label: string }>;
}

interface SingleSelectFilter extends BaseFilter {
  type: "singleSelect";
  options: Array<string | { value: string; label: string }>;
}

interface RangeSliderFilter extends BaseFilter {
  type: "rangeSlider";
  min: number;
  max: number;
  step: number;
  defaultMin?: number;
  defaultMax?: number;
}

interface StarRatingFilter extends BaseFilter {
  type: "starRating";
  options: number[];
}

interface DistanceFilter extends BaseFilter {
  type: "distance";
  options: Array<{ radius: string; label: string }>;
}

type FilterType =
  | MultiSelectFilter
  | SingleSelectFilter
  | RangeSliderFilter
  | StarRatingFilter
  | DistanceFilter;

type FiltersObject = {
  [key: string]: FilterType;
};

export interface SearchFiltersType {
  filters: FiltersObject;
  sortBy: string[];
}

interface DynamicFiltersProps {
  searchFilters: SearchFiltersType;
  onFilterChange?: (
    filters: Record<string, FilterValue[]>,
    sortBy: string
  ) => void;
}

// Debounce utility function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const DynamicFilters = ({
  searchFilters,
  onFilterChange,
}: DynamicFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Initialize selected filters from URL params
  const initializeFilters = () => {
    const initialFilters: Record<string, FilterValue[]> = {};

    // Initialize each filter category with values from URL
    Object.keys(searchFilters.filters).forEach((filterKey) => {
      const filter = searchFilters.filters[filterKey];

      if (filter.type === "rangeSlider") {
        const minParam = searchParams.get(`${filterKey}Min`);
        const maxParam = searchParams.get(`${filterKey}Max`);

        initialFilters[`${filterKey}Min`] = minParam
          ? [minParam]
          : [filter.defaultMin?.toString() || filter.min.toString()];

        initialFilters[`${filterKey}Max`] = maxParam
          ? [maxParam]
          : [filter.defaultMax?.toString() || filter.max.toString()];
      } else {
        const paramValues = searchParams.getAll(filterKey);

        if (paramValues.length > 0) {
          initialFilters[filterKey] = paramValues;
        } else {
          initialFilters[filterKey] = [];
        }
      }
    });

    return initialFilters;
  };

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, FilterValue[]>
  >(initializeFilters());
  const [selectedSort, setSelectedSort] = useState<string>(
    searchParams.get("sort") || searchFilters.sortBy[0] || ""
  );

  // Calculate active filters count
  const calculateActiveFiltersCount = useCallback(
    (filters: Record<string, FilterValue[]>) => {
      return Object.entries(filters).reduce((count, [key, values]) => {
        // Skip range slider min/max entries in the count
        if (key.endsWith("Min") || key.endsWith("Max")) {
          const baseKey = key.replace(/Min$|Max$/, "");

          // Check if this baseKey exists in our filters
          if (
            searchFilters.filters[baseKey] &&
            searchFilters.filters[baseKey].type === "rangeSlider"
          ) {
            const rangeFilter = searchFilters.filters[
              baseKey
            ] as RangeSliderFilter;

            // Only count if this is the Max entry to avoid counting twice
            if (key.endsWith("Max")) {
              const minValue = Number(
                filters[`${baseKey}Min`]?.[0] || rangeFilter.min
              );
              const maxValue = Number(
                filters[`${baseKey}Max`]?.[0] || rangeFilter.max
              );

              // If min is not at min bound or max is not at max bound, count as 1 active filter
              if (minValue > rangeFilter.min || maxValue < rangeFilter.max) {
                return count + 1;
              }
            }

            // Skip counting this entry
            return count;
          }
        }

        // For regular filters, count the number of selected values
        return count + values.length;
      }, 0);
    },
    [searchFilters.filters]
  );

  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(
    calculateActiveFiltersCount(initializeFilters())
  );

  // Create a query string form the current filters and sort
  const createQueryString = useCallback(
    (filters: Record<string, FilterValue[]>, sort: string) => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, values]) => {
        values.forEach((value) => {
          params.append(key, String(value));
        });
      });

      if (sort) {
        params.set("sort", sort);
      }
      return params.toString();
    },
    []
  );

  // Apply filters function (used by multiple handlers)
  const applyFilters = useCallback(
    (filters: Record<string, FilterValue[]>, sort: string) => {
      const queryString = createQueryString(filters, sort);
      router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);

      // Calculate active filters count
      const count = calculateActiveFiltersCount(filters);
      setActiveFiltersCount(count);

      // Call the callback if provided
      if (onFilterChange) {
        onFilterChange(filters, sort);
      }
    },
    [
      createQueryString,
      router,
      pathname,
      onFilterChange,
      calculateActiveFiltersCount,
    ]
  );

  const applyFiltersRef = useRef(applyFilters);

  useEffect(() => {
    applyFiltersRef.current = applyFilters;
  }, [applyFilters]);

  const handleFilterChange = (
    filterKey: string,
    value: FilterValue,
    checked: boolean,
    filterType: string
  ) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };

      switch (filterType) {
        case "singleSelect":
        case "distance":
          // Single select behavior - only one value can be selected
          if (checked) {
            newFilters[filterKey] = [value];
          } else {
            newFilters[filterKey] = [];
          }
          break;

        case "rangeSlider":
          // Range slider values are handled separately
          // This case is handled in the range slider component
          break;

        case "multiSelect":
        case "colorSwatch":
        case "starRating":
        default:
          // Multi-select behavior - multiple values can be selected
          if (checked) {
            newFilters[filterKey] = [...(newFilters[filterKey] || []), value];
          } else {
            newFilters[filterKey] = (newFilters[filterKey] || []).filter(
              (v) => v !== value
            );
          }
          break;
      }

      setTimeout(() => {
        applyFilters(newFilters, selectedSort);
      }, 0);

      return newFilters;
    });
  };

  // Handle range slider changes
  const handleRangeChange = (
    filterKey: string,
    minValue: number,
    maxValue: number
  ) => {
    setSelectedFilters((prev) => {
      const newFilters = {
        ...prev,
        [`${filterKey}Min`]: [minValue.toString()],
        [`${filterKey}Max`]: [maxValue.toString()],
      };

      setTimeout(() => {
        applyFiltersRef.current(newFilters, selectedSort);
      }, 0);

      return newFilters;
    });
  };

  // Handle sort changes
  const handleSortChange = (value: string) => {
    setSelectedSort(value);

    setTimeout(() => {
      applyFiltersRef.current(selectedFilters, value);
    }, 0);
  };

  // Clear all filters
  // const clearAllFilters = () => {
  //   const emptyFilters: Record<string, FilterValue[]> = {};

  //   // Initialize each filter category with empty array or default values for range sliders
  //   Object.entries(searchFilters.filters).forEach(([filterKey, filter]) => {
  //     if (filter.type === "rangeSlider") {
  //       const rangeFilter = filter as RangeSliderFilter;
  //       emptyFilters[`${filterKey}Min`] = [rangeFilter.min.toString()];
  //       emptyFilters[`${filterKey}Max`] = [rangeFilter.max.toString()];
  //     } else {
  //       emptyFilters[filterKey] = [];
  //     }
  //   });

  //   setSelectedFilters(emptyFilters);

  //   // Apply filters immediately after clearing
  //   setTimeout(() => {
  //     applyFiltersRef.current(emptyFilters, selectedSort);
  //   }, 0);
  // };

  // Render filter options based on filter type
  const renderFilterOptions = (filterKey: string, filter: FilterType) => {
    switch (filter.type) {
      case "multiSelect":
        return renderMultiSelect(filterKey, filter.options);

      case "singleSelect":
        return renderSingleSelect(filterKey, filter.options);

      case "rangeSlider":
        return renderRangeSlider(filterKey, filter);

      case "starRating":
        return renderStarRating(filterKey, filter.options);

      case "distance":
        return renderDistance(filterKey, filter.options);

      default:
        return null;
    }
  };

  // Render multi-select filter (checkboxes)
  const renderMultiSelect = (
    filterKey: string,
    options: Array<string | { value: string; label: string }>
  ) => {
    return options.map((option) => {
      const value = typeof option === "string" ? option : option.value;
      const label = typeof option === "string" ? option : option.label;

      return (
        <div key={value} className="flex items-center space-x-2">
          <Checkbox
            id={`${filterKey}-${value}`}
            checked={selectedFilters[filterKey]?.includes(value)}
            onCheckedChange={(checked) =>
              handleFilterChange(
                filterKey,
                value,
                checked === true,
                "multiSelect"
              )
            }
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

  // Render single-select filter (radio buttons)
  const renderSingleSelect = (
    filterKey: string,
    options: Array<string | { value: string; label: string }>
  ) => {
    return (
      <RadioGroup
        value={selectedFilters[filterKey]?.[0]?.toString() || ""}
        onValueChange={(value) =>
          handleFilterChange(filterKey, value, true, "singleSelect")
        }
      >
        {options.map((option) => {
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

  // Render range slider filter with debounce
  const renderRangeSlider = (filterKey: string, filter: RangeSliderFilter) => {
    const minValue = Number(
      selectedFilters[`${filterKey}Min`]?.[0] || filter.min
    );
    const maxValue = Number(
      selectedFilters[`${filterKey}Max`]?.[0] || filter.max
    );

    // Create debounced handler for slider changes
    const handleSliderChange = debounce(([min, max]: number[]) => {
      handleRangeChange(filterKey, min, max);
    }, 300);

    return (
      <div className="space-y-1 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">${minValue}</span>
          <span className="text-sm font-medium">${maxValue}</span>
        </div>
        <Slider
          defaultValue={[minValue, maxValue]}
          min={filter.min}
          max={filter.max}
          step={filter.step}
          value={[minValue, maxValue]}
          onValueChange={handleSliderChange}
          className="pt-3"
        />
      </div>
    );
  };

  // Render color swatches filter
  // const renderColorSwatches = (
  //   filterKey: string,
  //   options: Array<{ value: string; label: string; hex: string }>
  // ) => {
  //   return (
  //     <div className="flex flex-wrap gap-2 pt-2">
  //       {options.map((option) => {
  //         const isSelected = selectedFilters[filterKey]?.includes(option.value);
  //         return (
  //           <button
  //             key={option.value}
  //             onClick={() =>
  //               handleFilterChange(
  //                 filterKey,
  //                 option.value,
  //                 !isSelected,
  //                 "colorSwatch"
  //               )
  //             }
  //             className={`w-8 h-8 rounded-full border-2 ${
  //               isSelected ? "border-primary" : "border-transparent"
  //             }`}
  //             style={{ backgroundColor: option.hex }}
  //             title={option.label}
  //           >
  //             <span className="sr-only">{option.label}</span>
  //             {isSelected && (
  //               <Check
  //                 className={`h-4 w-4 mx-auto ${
  //                   option.hex === "#FFFFFF" || option.hex === "#FFF"
  //                     ? "text-black"
  //                     : "text-white"
  //                 }`}
  //               />
  //             )}
  //           </button>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  // Render star rating filter
  const renderStarRating = (filterKey: string, options: number[]) => {
    return options.map((rating) => (
      <div key={rating} className="flex items-center space-x-2">
        <Checkbox
          id={`${filterKey}-${rating}`}
          checked={selectedFilters[filterKey]?.includes(rating.toString())}
          onCheckedChange={(checked) =>
            handleFilterChange(
              filterKey,
              rating.toString(),
              checked === true,
              "starRating"
            )
          }
        />
        <Label
          htmlFor={`${filterKey}-${rating}`}
          className="flex items-center text-sm font-normal cursor-pointer"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-base">
              {i < rating ? "★" : "☆"}
            </span>
          ))}
          <span className="ml-1">& Above</span>
        </Label>
      </div>
    ));
  };

  // Render distance filter
  const renderDistance = (
    filterKey: string,
    options: Array<{ radius: string; label: string }>
  ) => {
    return options.map((option) => (
      <div key={option.radius} className="flex items-center space-x-2">
        <Checkbox
          id={`${filterKey}-${option.radius}`}
          checked={selectedFilters[filterKey]?.includes(option.radius)}
          onCheckedChange={(checked) =>
            handleFilterChange(
              filterKey,
              option.radius,
              checked === true,
              "distance"
            )
          }
        />
        <Label
          htmlFor={`${filterKey}-${option.radius}`}
          className="text-sm font-normal cursor-pointer"
        >
          {option.label}
        </Label>
      </div>
    ));
  };

  return (
    <div className={"grid gap-2"}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="rounded-sm px-1 font-normal">
              {activeFiltersCount}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={clearAllFilters}
            >
              Clear all
              <X className="ml-1 h-4 w-4" />
            </Button>
          )} */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                Sort by
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuRadioGroup
                value={selectedSort}
                onValueChange={handleSortChange}
              >
                {searchFilters.sortBy.map((option) => (
                  <DropdownMenuRadioItem key={option} value={option}>
                    {option}
                    {selectedSort === option && (
                      <Check className="ml-auto h-4 w-4" />
                    )}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4">
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={Object.keys(searchFilters.filters)}
        >
          {Object.entries(searchFilters.filters).map(([filterKey, filter]) => (
            <AccordionItem key={filterKey} value={filterKey}>
              <AccordionTrigger className="text-sm font-medium capitalize">
                {filterKey}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-1 pt-1">
                  {renderFilterOptions(filterKey, filter)}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* No Apply button needed - filters apply automatically */}
    </div>
  );
};

export default DynamicFilters;
