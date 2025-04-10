"use client";

import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { MapPin } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { IPin } from "../search-box/location-picker";

// Peninsular Malaysia
export const INITIAL_CENTER = {
  lat: 3.152815,
  lng: 101.703651,
};

const GoogleMap = ({ pin, setPin }: IPin) => {
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

    if (!pin.center) return;

    console.log("geocoding location:", pin.center);

    geocoderService.geocode(
      {
        location: pin.center,
      },
      (result: google.maps.GeocoderResult[] | null, status) => {
        if (status === "OK" && result?.[0]) {
          setPin({
            ...pin,
            address: result[0].formatted_address,
          });
        } else {
          console.error("Error during geocoding: Failed ", status);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geocoderService, pin]);

  useEffect(() => {
    if (geocoderService && pin.center) {
      reverseGeocode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geocoderService, pin.center]);

  return (
    <div className="relative w-full h-full drop-shadow-md">
      <Map
        defaultCenter={INITIAL_CENTER}
        center={pin.center}
        zoom={zoom}
        onDragstart={() => {
          setPin({
            ...pin,
            center: null,
          });
          setZoom(null);
        }}
        onDragend={() => {
          if (!map) return;

          const newCenter = map.getCenter();

          if (!newCenter) return;
          const lat = newCenter.lat();
          const lng = newCenter.lng();

          setPin({
            ...pin,
            center: { lat, lng },
          });

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

      <div className="bg-secondary/10 absolute top-1/2 left-1/2 -translate-1/2 w-14 h-14 outline-1 outline-secondary rounded-full flex items-center justify-center">
        <MapPin size={"lg"} className="stroke-secondary w-7 h-7" />
      </div>
    </div>
  );
};
export default GoogleMap;
