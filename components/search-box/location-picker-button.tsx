import React from "react";
import CustomButton from "../CustomButton";
import { MapPin } from "lucide-react";
import { useSearchController } from "./search-controller";

const LocationPickerButton = ({ address }: { address: string }) => {
  const { showLocationPicker } = useSearchController();

  return (
    <CustomButton
      variant="ghost"
      size="sm"
      onClick={(e) => {
        e.preventDefault();
        showLocationPicker();
      }}
      className="flex-grow text-secondary text-sm sm:text-base font-medium gap-1 justify-start"
    >
      <span className="inline-flex sm:hidden gap-1 items-center">
        <MapPin />
        Near
      </span>
      <span className="truncate text-ellipsis search-input">{address}</span>
    </CustomButton>
  );
};

export default LocationPickerButton;
