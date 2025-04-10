"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import MapContainer from "../google-maps/MapContainer";
import { MapPin, Search } from "lucide-react";
import CustomButton from "../CustomButton";
import { useSearch } from "@/app/contexts/search-context";
import { useState } from "react";
import { useUI } from "@/app/contexts/ui-context";

type Pin = {
  address: string;
  center: { lat: number; lng: number } | null;
};

export interface IPin {
  pin: Pin;
  setPin: (pin: Pin) => void;
}

const LocationPicker = () => {
  const {
    search: { location },
    setSearch,
  } = useSearch();
  const [pin, setPin] = useState<Pin>(location);

  const { closeDialog, isDesktop } = useUI();

  const handleLocationConfirm = () => {
    setSearch({
      location: pin,
    });
    closeDialog();
  };

  if (isDesktop) {
    return (
      <div className="flex flex-col gap-2">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <MapContainer pin={pin} setPin={setPin} />
        </APIProvider>

        <div className="rounded text-center p-2 w-full">
          <p className=" flex items-center align-baseline">
            <MapPin className="text-blue-400 shrink-0 mr-2" size="16" />
            <span className="text-sm text-left line-clamp-1 text-gray-700">
              {pin.address}
            </span>
          </p>
        </div>

        <CustomButton
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={handleLocationConfirm}
        >
          Use this location
        </CustomButton>
      </div>
    );
  }

  return (
    <div className="space-y-2 py-4">
      <CustomButton variant="default" size="xl" className="w-full">
        <Search />
        Search a place
      </CustomButton>
      <CustomButton variant="outline" size="lg" className="w-full">
        Use my location
      </CustomButton>
    </div>
  );
};

export default LocationPicker;
