"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FiltersObject, FilterValue } from "@/app/types/filters";
import FilterRenderer from "../filters/filter-renderer";
import { useInitializeFilters } from "@/app/hooks/use-filter-initialization";
import { useSearchContext } from "@/app/contexts/search-context";

type Props = {
  searchFilterSchema: FiltersObject;
  // onFilterChange: (selectedFilter: Record<string, FiltersObject>, sortBy: string)
};

const DynamicFilters = ({ searchFilterSchema }: Props) => {
  useInitializeFilters(searchFilterSchema);

  const { filters: selectedFilter } = useSearchContext();

  return (
    <div className="grid gap-4">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={Object.keys(searchFilterSchema)}
      >
        {Object.entries(searchFilterSchema).map(([filterKey, filter]) => (
          <AccordionItem key={filterKey} value={filterKey}>
            <AccordionTrigger className="text-sm font-medium capitalize">
              {filterKey.replace(/([A-Z])/g, " $1")}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-1 pt-1">
                {
                  <FilterRenderer
                    key={filterKey}
                    filterKey={filterKey}
                    filterSchema={filter}
                    selected={selectedFilter[filterKey]}
                  />
                }
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default DynamicFilters;

function onFilterChange(filters: Record<string, FilterValue[]>, sort: string) {
  throw new Error("Function not implemented.");
}
