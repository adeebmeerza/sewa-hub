"use client";

import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// Peninsular Malaysia
export const INITIAL_CENTER = {
  lat: 3.152815,
  lng: 101.703651,
};

interface GoogleMapProps {
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
}

const GoogleMap: React.FC<GoogleMapProps> = ({ location, setLocation }) => {
  const map = useMap();
  const [zoom, setZoom] = useState<number | null>(14);

  // Geocoding service to locate based on coordinate
  const geocoderLibrary = useMapsLibrary("geocoding");
  const [geocoderService, setGeocoderService] =
    useState<google.maps.Geocoder | null>(null);

  useEffect(() => {
    if (!geocoderLibrary) return;
    setGeocoderService(new geocoderLibrary.Geocoder());
  }, [geocoderLibrary]);

  const reverseGeocode = useCallback(() => {
    if (!geocoderService) {
      console.error("Error on Geocoder service: Service is not available.");
      return;
    }

    if (!location.center) return;

    console.log("geocoding location:", location);

    geocoderService.geocode(
      {
        location: location.center,
      },
      (result: google.maps.GeocoderResult[] | null, status) => {
        if (status === "OK" && result?.[0]) {
          setLocation({ ...location, address: result[0].formatted_address });
        } else {
          console.error("Error during geocoding: Failed ", status);
        }
      }
    );
  }, [geocoderService, location, setLocation]);

  useEffect(() => {
    if (geocoderService && location.center) {
      reverseGeocode();
    }
  }, [geocoderService, location.center]);

  return (
    <div className="relative w-full h-full shadow">
      <Map
        defaultCenter={INITIAL_CENTER}
        center={location.center}
        zoom={zoom}
        onDragstart={() => {
          setLocation({ ...location, center: null });
          setZoom(null);
        }}
        onDragend={() => {
          if (!map) return;

          const newCenter = map.getCenter();

          if (!newCenter) return;
          const lat = newCenter.lat();
          const lng = newCenter.lng();

          setLocation({ ...location, center: { lat, lng } });

          const newZoom = map.getZoom();
          if (newZoom) {
            setZoom(newZoom);
          }

          reverseGeocode();
        }}
        reuseMaps
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
      />

      <div className="bg-accent/20 absolute top-1/2 left-1/2 -translate-1/2 w-14 h-14 outline-1 outline-accent rounded-full flex items-center justify-center">
        <MapPin size={"lg"} className="stroke-accent w-7 h-7" />
      </div>
    </div>
  );
};
export default GoogleMap;
