"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { Search, X } from "lucide-react";
import FindMe from "./FindMe";
import { Button } from "../ui/button";
import { CommandEmpty } from "cmdk";
import { cn } from "@/lib/utils";

const PlaceSearchBox = ({
  input,
  setInput,
  location,
  setLocation,
}: {
  input: string;
  setInput: (input: string) => void;
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
  const map = useMap();
  const placesLibrary = useMapsLibrary("places");

  const [isOpenCommandList, setIsOpenCommandList] = useState(false); // Track dropdown visiblity
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [predictions, setPredictions] = useState<
    {
      place_id: string;
      description: string;
    }[]
  >([]);

  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken | null>(null);

  // Initialize services
  useEffect(() => {
    if (!map || !placesLibrary) return;

    setAutocompleteService(new placesLibrary.AutocompleteService());
    setPlacesService(new placesLibrary.PlacesService(map));
    setSessionToken(new placesLibrary.AutocompleteSessionToken());
  }, [map, placesLibrary]);

  // Fetch predictions using Google Maps API
  // useCallback to prevent re-creation of this function when autocomplete service re-rendered
  const fetchPredictions = useCallback(
    (value: string) => {
      if (!value || !autocompleteService) return;

      // Ensure token is always valid before request
      if (!sessionToken) {
        const newToken = new google.maps.places.AutocompleteSessionToken();
        setSessionToken(newToken);
      }

      autocompleteService.getPlacePredictions(
        { input: value, sessionToken: sessionToken! },
        (results: google.maps.places.AutocompletePrediction[] | null) => {
          if (!results || results.length < 1) {
            setPredictions([]);
            setIsOpenCommandList(true);
            return;
          } else {
            setPredictions(
              results.map((r) => ({
                place_id: r.place_id,
                description: r.description,
              }))
            );
            setIsOpenCommandList(true);
          }
        }
      );
    },
    [autocompleteService, sessionToken]
  );

  // Handle input changes
  function handleValueChange(value: string) {
    setInput(value);

    if (!value.trim()) {
      // on empty entry
      setPredictions([]);
      setIsOpenCommandList(false);
      return;
    }

    if (!sessionToken && placesLibrary) {
      setSessionToken(new placesLibrary.AutocompleteSessionToken()); // Generate a new Google Map session token if not exist
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      fetchPredictions(value);
    }, 300); // Common debounce delay (0.3s)
  }

  // Functions on selecting a place from the prediction list
  // Fetch place details
  const fetchPlaceDetails = (placeId: string, placeDescription: string) => {
    if (!placesService) return;

    placesService.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place?.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        handlePlaceDetected(placeDescription, { lat, lng });
      } else {
        console.error("Error on fetching place details:", status);
      }
    });
  };

  // Handle selection of a place
  function handleSelect(placeId: string, placeDescription: string) {
    fetchPlaceDetails(placeId, placeDescription);

    // Reset session token for new searches
    if (placesLibrary) {
      setSessionToken(new placesLibrary.AutocompleteSessionToken());
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setInput("");
        setIsOpenCommandList(false);
        setPredictions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setInput]); // Safe to include, even it unnecessary

  // Functions for location detected
  function handlePlaceDetected(
    placeDescription: string,
    coord: { lat: number; lng: number }
  ) {
    setInput(placeDescription);
    setLocation({ ...location, center: coord });
    setIsOpenCommandList(false);
    setPredictions([]);
  }

  const commandListClassName =
    "absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 shadow-lg z-50";
  const commandItemClassName =
    "text-md font-light mb-1 data-[selected=true]:bg-blue-200 data-[selected=true]:text-primary rounded-none";

  return (
    <div className="relative w-full mb-4 border-red-500" ref={containerRef}>
      <Command className="w-full">
        <div className="relative">
          <CommandInput
            ref={inputRef}
            placeholder="Search for a place..."
            value={input}
            onValueChange={handleValueChange}
            className="pr-12"
          />
          {input ? (
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => {
                setInput("");
                setIsOpenCommandList(false);
                setPredictions([]);
                if (inputRef.current) inputRef.current.focus();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <FindMe location={location} setLocation={setLocation} />
          )}
        </div>

        {isOpenCommandList && predictions.length > 0 ? (
          <CommandList className={commandListClassName}>
            <CommandGroup heading="Did you mean:" className="px-0">
              {predictions.map((place) => (
                <CommandItem
                  key={place.place_id}
                  value={place.description}
                  onSelect={() =>
                    handleSelect(place.place_id, place.description)
                  }
                  className={commandItemClassName}
                >
                  <Search /> <span className="ml-2">{place.description}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        ) : isOpenCommandList && predictions.length < 1 ? (
          <CommandList className={commandListClassName}>
            <CommandEmpty
              className={cn(
                commandItemClassName,
                "py-1 px-2 text-sm text-gray-500"
              )}
            >
              No results found.
            </CommandEmpty>
          </CommandList>
        ) : (
          <CommandList></CommandList>
        )}
      </Command>
    </div>
  );
};

export default PlaceSearchBox;
