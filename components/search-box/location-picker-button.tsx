import React from "react";
import CustomButton from "../ui/reusable/custom-button";
import { MapPin } from "lucide-react";
import { useSearchController } from "./search-controller";
import { cn } from "@/lib/utils";

const LocationPickerButton = ({
  address,
  forStackedLayout = false,
}: {
  address: string;
  forStackedLayout?: boolean;
}) => {
  const { showLocationPicker } = useSearchController();

  return (
    <CustomButton
      variant="ghost"
      size="sm"
      onClick={(e) => {
        e.preventDefault();
        showLocationPicker();
      }}
      className={cn(
        "text-sm gap-1 font-medium px-1 sm:px-3 bg-transparent hover:bg-secondary/30 hover:text-secondary",
        forStackedLayout
          ? "w-full sm:w-auto justify-center sm:justify-start"
          : "justify-center"
      )}
    >
      <span
        className={cn(
          "sm:hidden inline-flex gap-1 items-center",
          forStackedLayout ? "text-secondary" : "text-blue-300"
        )}
      >
        <MapPin />
        Near
      </span>
      <span
        className={cn(
          "truncate text-ellipsis font-semibold",
          forStackedLayout
            ? "text-blue-700/90 md:text-blue-200"
            : "text-blue-200"
        )}
      >
        {address}
      </span>
    </CustomButton>
  );
};

export default LocationPickerButton;
