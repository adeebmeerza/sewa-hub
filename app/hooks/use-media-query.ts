"use client";

import React, { useEffect } from "react";

const UseMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    setMatches(media.matches);

    // Define a callback function to handle changes
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add the callback as a listener for changes to the media query
    media.addEventListener("change", listener);

    // Clean up
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
};

export default UseMediaQuery;
