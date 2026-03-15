import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchCurrentWeather, fetchGeocoding } from "../services/openWeather";
import { buildCurrentSnapshot, formatLocationFullName } from "../lib/weatherMappers";
import { getLocationKey } from "../lib/locationStore";

export const useLocationSearch = ({
  locationCache,
  setLocationCache,
  onClearSavedLocations,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState("idle");
  const searchRequestRef = useRef(0);
  const searchPreviewRequestRef = useRef(0);

  useEffect(() => {
    if (!searchResults.length) return;

    const pendingLocations = searchResults.filter(
      (location) => !locationCache[getLocationKey(location)]
    );

    if (!pendingLocations.length) return;

    const requestId = searchPreviewRequestRef.current + 1;
    searchPreviewRequestRef.current = requestId;
    let isActive = true;

    const loadPreviews = async () => {
      const previewEntries = await Promise.allSettled(
        pendingLocations.map(async (location) => {
          const currentWeather = await fetchCurrentWeather({
            lat: location.lat,
            lon: location.lon,
            units: "metric",
            lang: "en",
          });

          return [
            getLocationKey(location),
            buildCurrentSnapshot({ current: currentWeather, location }),
          ];
        })
      );

      if (!isActive || searchPreviewRequestRef.current !== requestId) return;

      const nextEntries = previewEntries.reduce((acc, result) => {
        if (result.status !== "fulfilled") return acc;
        const [key, snapshot] = result.value;
        acc[key] = snapshot;
        return acc;
      }, {});

      if (!Object.keys(nextEntries).length) return;

      setLocationCache((prev) => ({ ...prev, ...nextEntries }));
    };

    loadPreviews();

    return () => {
      isActive = false;
    };
  }, [locationCache, searchResults, setLocationCache]);

  const resetSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchStatus("idle");
  }, []);

  const handleSearchQueryChange = useCallback(async (nextQuery) => {
    const trimmed = nextQuery.trim();
    setSearchQuery(nextQuery);

    if (!trimmed) {
      setSearchResults([]);
      setSearchStatus("idle");
      return;
    }

    const requestId = searchRequestRef.current + 1;
    searchRequestRef.current = requestId;
    setSearchStatus("loading");

    try {
      const results = await fetchGeocoding({ query: trimmed, limit: 6 });
      if (searchRequestRef.current !== requestId) return;

      setSearchResults(
        results.map((item) => ({
          name: item.name,
          state: item.state,
          country: item.country,
          lat: item.lat,
          lon: item.lon,
        }))
      );
      setSearchStatus("success");
    } catch {
      if (searchRequestRef.current !== requestId) return;
      setSearchResults([]);
      setSearchStatus("error");
    }
  }, []);

  const clearVisibleSearchList = useCallback(() => {
    if (searchQuery.trim()) {
      resetSearch();
      return;
    }

    onClearSavedLocations?.();
  }, [onClearSavedLocations, resetSearch, searchQuery]);

  const searchResultCards = useMemo(
    () =>
      searchResults.map((location) => {
        const snapshot = locationCache[getLocationKey(location)];
        const displayTemperature = snapshot?.temperature ?? "--";
        const displayCondition = snapshot?.condition ?? "Loading...";
        const displayHigh = snapshot?.high ?? "--";
        const displayLow = snapshot?.low ?? "--";

        return {
          key: getLocationKey(location),
          city: formatLocationFullName(location),
          temperature: displayTemperature,
          condition: displayCondition,
          highLow: `H:${displayHigh}  L:${displayLow}`,
          icon: snapshot?.icon ?? null,
          location,
        };
      }),
    [locationCache, searchResults]
  );

  return {
    searchQuery,
    searchStatus,
    searchResultCards,
    handleSearchQueryChange,
    clearVisibleSearchList,
    resetSearch,
  };
};
