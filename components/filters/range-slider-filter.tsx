import { IRangeSliderFilter } from "@/app/types/filters";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Slider } from "../ui/slider";
import { useSearchContext } from "@/app/contexts/search-context";

interface RangeSliderFilterProps {
  filterKey: string;
  filter: IRangeSliderFilter;
}

const RangeSliderFilter = ({ filterKey, filter }: RangeSliderFilterProps) => {
  const {
    filters: selectedFilter,
    setFilter,
    triggerSearch,
  } = useSearchContext();

  const defaultMin = filter.defaultMin;
  const defaultMax = filter.defaultMax;

  // Local state to track immediate slider movement
  const [localValue, setLocalValue] = useState<[number, number]>([
    Number(selectedFilter[`${filterKey}Min`] || defaultMin),
    Number(selectedFilter[`${filterKey}Max`] || defaultMax),
  ]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const selectedFilterRef = useRef(selectedFilter);

  useEffect(() => {
    selectedFilterRef.current = selectedFilter;
  }, [selectedFilter]);

  useEffect(() => {
    const currentTimeout = timeoutRef.current;
    return () => {
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
    };
  }, []);

  const handleSliderChange = (values: [number, number]) => {
    setLocalValue(values);
  };

  const debouncedSetRangeFilter = useCallback(
    (values: [number, number]) => {
      if (values[0] === defaultMin && values[1] === defaultMax) {
        // If values haven't changed, do nothing
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setFilter(`${filterKey}Min`, values[0].toString(), "rangeSlider");
        setFilter(`${filterKey}Max`, values[1].toString(), "rangeSlider");

        triggerSearch();
      }, 300);
    },
    [defaultMax, defaultMin, filterKey, setFilter, triggerSearch]
  );

  return (
    <div className="space-y-1 pt-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{localValue[0]}</span>
        <span className="text-sm font-medium">{localValue[1]}</span>
      </div>
      <Slider
        defaultValue={[defaultMin, defaultMax]}
        min={filter.min}
        max={filter.max}
        step={filter.step}
        value={localValue}
        onValueChange={handleSliderChange}
        onValueCommit={debouncedSetRangeFilter}
        className="pt-3"
      />
    </div>
  );
};

export default RangeSliderFilter;
