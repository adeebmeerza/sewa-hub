"use client";

import { useState } from "react";
import { Locate } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useSearch } from "@/app/contexts/search-context";

const FindMe = () => {
  const {
    search: { location },
    setSearch,
  } = useSearch();

  const [loading, setLoading] = useState<boolean>(false);

  function fetchUserLocation() {
    if (!navigator.geolocation) {
      toast("Geolocation is not supported by this browser.");
    } else {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  function success(position: GeolocationPosition) {
    const coord = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    setSearch({
      location: { ...location, center: coord },
    });
    setLoading(false);
  }

  function error(error: GeolocationPositionError) {
    setLoading(false);

    let errorMessage =
      "Error getting your location. Please enter your address.";
    if (error.code === 1)
      errorMessage = "Permission denied. Please allow location access.";
    else if (error.code === 2)
      errorMessage = "Location unavailable. Please enter your address.";
    else if (error.code === 3)
      errorMessage = "Location request timed out. Please enter your address.";

    console.error("Error on Geolocationing", error);
    toast(errorMessage);
  }

  const buttonClassName =
    "absolute right-2 top-1/2 -translate-y-1/2 text-blue-700 font-[400] h-6 hover:bg-transparent hover:text-blue-700 cursor-pointer";

  return (
    <Button
      size="default"
      variant="ghost"
      disabled={loading}
      className={buttonClassName}
      onClick={fetchUserLocation}
    >
      <Locate className="h-4 w-4" />
      Use my location
    </Button>
  );
};

export default FindMe;
