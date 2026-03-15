import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_LOCATION,
  STORAGE_KEYS,
  getLocationKey,
  readStorage,
  writeStorage,
} from "../lib/locationStore";

const readStoredLocations = () => {
  const storedLocations = readStorage(STORAGE_KEYS.locations, null);

  return Array.isArray(storedLocations) && storedLocations.length
    ? storedLocations
    : [DEFAULT_LOCATION];
};

const readStoredCache = () => {
  const storedCache = readStorage(STORAGE_KEYS.cache, {});

  return storedCache && typeof storedCache === "object" ? storedCache : {};
};

export const useLocationPersistence = () => {
  const [savedLocations, setSavedLocations] = useState(readStoredLocations);
  const [selectedLocation, setSelectedLocation] = useState(() => readStoredLocations()[0]);
  const [locationCache, setLocationCache] = useState(readStoredCache);
  const hasPersistedLocationsRef = useRef(false);
  const hasPersistedCacheRef = useRef(false);

  useEffect(() => {
    if (!hasPersistedLocationsRef.current) {
      hasPersistedLocationsRef.current = true;
      return;
    }
    writeStorage(STORAGE_KEYS.locations, savedLocations);
  }, [savedLocations]);

  useEffect(() => {
    if (!hasPersistedCacheRef.current) {
      hasPersistedCacheRef.current = true;
      return;
    }
    writeStorage(STORAGE_KEYS.cache, locationCache);
  }, [locationCache]);

  const selectLocation = useCallback((location) => {
    setSelectedLocation(location);
    setSavedLocations((prev) => {
      const key = getLocationKey(location);
      const next = prev.filter((item) => getLocationKey(item) !== key);
      return [location, ...next].slice(0, 5);
    });
  }, []);

  const clearSavedLocations = useCallback(() => {
    setSavedLocations([]);
  }, []);

  return {
    selectedLocation,
    savedLocations,
    locationCache,
    setLocationCache,
    selectLocation,
    clearSavedLocations,
  };
};
