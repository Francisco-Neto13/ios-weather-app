import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_LOCATION,
  STORAGE_KEYS,
  getLocationKey,
  readStorage,
  writeStorage,
} from "../lib/locationStore";

export const useLocationPersistence = () => {
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [savedLocations, setSavedLocations] = useState([DEFAULT_LOCATION]);
  const [locationCache, setLocationCache] = useState({});
  const [hasHydratedStorage, setHasHydratedStorage] = useState(false);

  useEffect(() => {
    const storedLocations = readStorage(STORAGE_KEYS.locations, null);
    if (Array.isArray(storedLocations) && storedLocations.length) {
      setSavedLocations(storedLocations);
      setSelectedLocation(storedLocations[0]);
    }

    const storedCache = readStorage(STORAGE_KEYS.cache, {});
    if (storedCache && typeof storedCache === "object") {
      setLocationCache(storedCache);
    }

    setHasHydratedStorage(true);
  }, []);

  useEffect(() => {
    if (!hasHydratedStorage) return;
    writeStorage(STORAGE_KEYS.locations, savedLocations);
  }, [hasHydratedStorage, savedLocations]);

  useEffect(() => {
    if (!hasHydratedStorage) return;
    writeStorage(STORAGE_KEYS.cache, locationCache);
  }, [hasHydratedStorage, locationCache]);

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
