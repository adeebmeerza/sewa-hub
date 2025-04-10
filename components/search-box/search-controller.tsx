"use client";

import { useUI } from "@/app/contexts/ui-context";
import LocationPicker from "./location-picker";
import { SearchProvider } from "@/app/contexts/search-context";
import DateRangePicker from "./DateRangePicker";

export function useSearchController() {
  const { openDialog } = useUI();

  const showLocationPicker = () => {
    openDialog({
      title: "Locate nearby",
      description: "Where do you want to locate the item?",
      content: (
        <SearchProvider>
          <LocationPicker />
        </SearchProvider>
      ),
    });
  };

  const showRentalDateRangePicker = () => {
    openDialog({
      title: "Select rental period",
      description: "When do you want to start renting?",
      content: (
        <SearchProvider>
          <DateRangePicker />
        </SearchProvider>
      ),
    });
  };

  return { showLocationPicker, showRentalDateRangePicker };
}
