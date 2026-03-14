import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AppLayout from "./components/Background/AppLayout";
import House from "./components/House/House";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import TabBar from "./components/Navigation/TabBar";
import Modal from "./components/Modal/Modal";
import SearchAdd from "./components/SearchAdd/SearchAdd";
import StatusBar from "./components/StatusBar/StatusBar";
import {
  fetchAirQuality,
  fetchCurrentWeather,
  fetchForecast5Day,
  fetchGeocoding,
  fetchReverseGeocoding,
} from "./services/openWeather";
import {
  buildCurrentSnapshot,
  deriveDayHighLow,
  buildHeaderSnapshot,
  buildHourlyForecast,
  buildWeeklyForecast,
  buildWidgets,
  formatLocationFullName,
} from "./lib/weatherMappers";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const DEFAULT_LOCATION = {
  name: "Montreal",
  state: "QC",
  country: "CA",
  lat: 45.5017,
  lon: -73.5673,
};
const STORAGE_KEYS = {
  locations: "weather.savedLocations.v1",
  cache: "weather.locationCache.v1",
};
const getLocationKey = (location) =>
  `${Number(location?.lat).toFixed(4)}:${Number(location?.lon).toFixed(4)}`;
const readStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};
const writeStorage = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
};
const formatCityTime = (timestamp, timezoneOffset) => {
  if (!Number.isFinite(timestamp)) return null;
  const offset = Number.isFinite(timezoneOffset) ? timezoneOffset : 0;
  const date = new Date((timestamp + offset) * 1000);
  const rawHours = date.getUTCHours();
  let hours = rawHours % 12;
  if (hours === 0) hours = 12;
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const period = rawHours >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${period}`;
};

const getCurrentDevicePosition = () =>
  new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation is not supported in this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5 * 60 * 1000,
    });
  });

function App() {
  const [sheetProgress, setSheetProgress] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [savedLocations, setSavedLocations] = useState([DEFAULT_LOCATION]);
  const [locationCache, setLocationCache] = useState({});
  const [hasHydratedStorage, setHasHydratedStorage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState("idle");
  const [weatherState, setWeatherState] = useState({
    current: null,
    forecast: null,
    airQuality: null,
    status: "idle",
    error: null,
  });
  const { current, forecast, airQuality, status } = weatherState;
  const searchRequestRef = useRef(0);
  const searchPreviewRequestRef = useRef(0);

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

  const tabBarStyle = useMemo(() => {
    const hiddenProgress = clamp((sheetProgress - 0.12) / 0.52, 0, 1);
    return {
      opacity: 1 - hiddenProgress,
      transform: `translateY(${hiddenProgress * 120}px)`,
      pointerEvents: hiddenProgress > 0.01 ? "none" : "auto",
      transition:
        "opacity 0.22s ease, transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
    };
  }, [sheetProgress]);

  useEffect(() => {
    let isActive = true;
    const loadWeather = async () => {
      setWeatherState((prev) => ({ ...prev, status: "loading", error: null }));
      try {
        const [current, forecast, airQuality] = await Promise.all([
          fetchCurrentWeather({
            lat: selectedLocation.lat,
            lon: selectedLocation.lon,
            units: "metric",
            lang: "en",
          }),
          fetchForecast5Day({
            lat: selectedLocation.lat,
            lon: selectedLocation.lon,
            units: "metric",
            lang: "en",
          }),
          fetchAirQuality({ lat: selectedLocation.lat, lon: selectedLocation.lon }),
        ]);
        if (!isActive) return;
        setWeatherState({ current, forecast, airQuality, status: "success", error: null });
      } catch (error) {
        if (!isActive) return;
        setWeatherState((prev) => ({
          ...prev,
          status: "error",
          error: error?.message ?? "Failed to load weather data.",
        }));
      }
    };

    if (Number.isFinite(selectedLocation?.lat) && Number.isFinite(selectedLocation?.lon)) {
      loadWeather();
    }

    return () => {
      isActive = false;
    };
  }, [selectedLocation]);

  useEffect(() => {
    if (status !== "success" || !current) return;
    const snapshot = buildCurrentSnapshot({ current, location: selectedLocation });
    const key = getLocationKey(selectedLocation);
    setLocationCache((prev) => ({ ...prev, [key]: snapshot }));
  }, [status, current, selectedLocation]);

  useEffect(() => {
    if (!searchResults.length) return;

    const pendingLocations = searchResults.filter((location) => {
      const key = getLocationKey(location);
      return !locationCache[key];
    });

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
          return [getLocationKey(location), buildCurrentSnapshot({ current: currentWeather, location })];
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
  }, [searchResults, locationCache]);

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
      const mapped = results.map((item) => ({
        name: item.name,
        state: item.state,
        country: item.country,
        lat: item.lat,
        lon: item.lon,
      }));
      setSearchResults(mapped);
      setSearchStatus("success");
    } catch {
      if (searchRequestRef.current !== requestId) return;
      setSearchResults([]);
      setSearchStatus("error");
    }
  }, []);

  const handleSelectLocation = useCallback((location) => {
    setSelectedLocation(location);
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setSavedLocations((prev) => {
      const key = getLocationKey(location);
      const without = prev.filter((item) => getLocationKey(item) !== key);
      return [location, ...without].slice(0, 5);
    });
  }, []);

  const handleUseCurrentLocation = useCallback(async () => {
    try {
      const position = await getCurrentDevicePosition();
      const location = {
        name: "Current Location",
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };

      try {
        const reverseResults = await fetchReverseGeocoding({
          lat: location.lat,
          lon: location.lon,
          limit: 1,
        });
        const reverseLocation = reverseResults?.[0];
        if (reverseLocation?.name) {
          location.name = reverseLocation.name;
          location.state = reverseLocation.state;
          location.country = reverseLocation.country;
        }
      } catch {
        // Keep a generic label if reverse geocoding is unavailable.
      }

      handleSelectLocation(location);
    } catch {
      // Ignore permission denials or unavailable geolocation for now.
    }
  }, [handleSelectLocation]);

  const uiSnapshots = useMemo(() => {
    const currentSnapshot = buildCurrentSnapshot({ current, location: selectedLocation });
    const timezoneOffset = forecast?.city?.timezone ?? current?.timezone ?? 0;
    const statusTime = formatCityTime(current?.dt, timezoneOffset);
    const dayRange = deriveDayHighLow({
      forecastList: forecast?.list ?? [],
      timezoneOffset,
      baseTimestamp: current?.dt,
    });
    const high = dayRange.high ?? current?.main?.temp ?? null;
    const low = dayRange.low ?? current?.main?.temp ?? null;
    return {
      current: {
        ...currentSnapshot,
        high: Number.isFinite(high) ? `${Math.round(high)}\u00B0` : currentSnapshot.high,
        low: Number.isFinite(low) ? `${Math.round(low)}\u00B0` : currentSnapshot.low,
      },
      header: buildHeaderSnapshot({ current, location: selectedLocation }),
      statusTime,
      forecast: {
        hourly: buildHourlyForecast(forecast?.list ?? [], timezoneOffset, current),
        weekly: buildWeeklyForecast(forecast?.list ?? [], timezoneOffset),
      },
      widgets: buildWidgets({
        current,
        forecast,
        airQuality,
      }),
    };
  }, [selectedLocation, current, forecast, airQuality]);

  const selectedKey = getLocationKey(selectedLocation);
  const savedLocationCards = savedLocations.map((location) => {
    const isActive = getLocationKey(location) === selectedKey;
    const cachedSnapshot = locationCache[getLocationKey(location)];
    const snapshot = isActive ? uiSnapshots.current : cachedSnapshot;
    const displayTemperature = snapshot?.temperature ?? "--";
    const displayCondition = snapshot?.condition ?? "Tap to load";
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
  });

  const searchResultCards = searchResults.map((location) => {
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
  });

  return (
    <AppLayout>
      <StatusBar time={uiSnapshots.statusTime} />
      <House />
      <WeatherInfo sheetProgress={sheetProgress} {...uiSnapshots.current} />
      <Modal
        onSheetProgress={setSheetProgress}
        header={uiSnapshots.header}
        forecast={uiSnapshots.forecast}
        widgets={uiSnapshots.widgets}
      />

      <div
        style={{
          position: "absolute",
          inset: "0px",
          transform: searchOpen ? "translateX(0px)" : "translateX(390px)",
          transition: "transform 0.42s cubic-bezier(0.32, 0.72, 0, 1)",
          zIndex: 30,
          borderRadius: "55px",
          overflow: "hidden",
          clipPath: "inset(0 round 55px)",
        }}
      >
        <SearchAdd
          onClose={() => setSearchOpen(false)}
          query={searchQuery}
          onQueryChange={handleSearchQueryChange}
          searchResults={searchResultCards}
          savedLocations={savedLocationCards}
          onSelectLocation={handleSelectLocation}
          isSearching={searchStatus === "loading"}
          statusTime={uiSnapshots.statusTime}
        />
      </div>

      <div
        className="absolute bottom-0 left-0 z-20 overflow-visible"
        style={tabBarStyle}
      >
        <TabBar
          onOpenSearch={() => setSearchOpen(true)}
          onUseCurrentLocation={handleUseCurrentLocation}
        />
      </div>
    </AppLayout>
  );
}

export default App;
