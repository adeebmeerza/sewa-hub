"use client";

import { useState } from "react";
import PlaceSearchBox from "./PlaceSearchBox";
import GoogleMap from "./GoogleMap";

export interface PlaceSelect {
  address: string;
  lat: number;
  lng: number;
}

const MapContainer = ({
  location,
  setLocation,
}: {
  location: {
    address: string;
    center: {
      lat: number;
      lng: number;
    } | null;
  };
  setLocation: (location: {
    address: string;
    center: {
      lat: number;
      lng: number;
    } | null;
  }) => void;
}) => {
  const [input, setInput] = useState<string>("");

  return (
    <div className="flex flex-col h-[450px] max-h-full">
      <PlaceSearchBox
        input={input}
        setInput={setInput}
        location={location}
        setLocation={setLocation}
      />
      <GoogleMap location={location} setLocation={setLocation} />
    </div>
  );
};

export default MapContainer;
