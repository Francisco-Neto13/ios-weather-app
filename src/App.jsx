import { useCallback, useEffect, useMemo, useState } from "react";
import AppLayout from "./components/Background/AppLayout";
import House from "./components/House/House";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import TabBar from "./components/Navigation/TabBar";
import Modal from "./components/Modal/Modal";
import SearchAdd from "./components/SearchAdd/SearchAdd";
import StatusBar from "./components/StatusBar/StatusBar";
import { fetchReverseGeocoding } from "./services/openWeather";
import { buildCurrentSnapshot, formatLocationFullName } from "./lib/weatherMappers";
import { getCurrentDevicePosition } from "./lib/deviceLocation";
import { getLocationKey } from "./lib/locationStore";
import { useLocationPersistence } from "./hooks/useLocationPersistence";
import { useLocationSearch } from "./hooks/useLocationSearch";
import { useWeatherData } from "./hooks/useWeatherData";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function App() {
  const [sheetProgress, setSheetProgress] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const {
    selectedLocation,
    savedLocations,
    locationCache,
    setLocationCache,
    selectLocation,
    clearSavedLocations,
  } = useLocationPersistence();
  const { current, status, uiSnapshots } = useWeatherData(selectedLocation);
  const currentSnapshot = uiSnapshots.current;
  const {
    searchQuery,
    searchStatus,
    searchResultCards,
    handleSearchQueryChange,
    clearVisibleSearchList,
    resetSearch,
  } = useLocationSearch({
    locationCache,
    setLocationCache,
    onClearSavedLocations: clearSavedLocations,
  });

  useEffect(() => {
    if (status !== "success" || !current) return;

    const snapshot = buildCurrentSnapshot({ current, location: selectedLocation });
    const key = getLocationKey(selectedLocation);
    setLocationCache((prev) => ({ ...prev, [key]: snapshot }));
  }, [current, selectedLocation, setLocationCache, status]);

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

  const handleSelectLocation = useCallback(
    (location) => {
      selectLocation(location);
      setSearchOpen(false);
      resetSearch();
    },
    [resetSearch, selectLocation]
  );

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
        return handleSelectLocation(location);
      }

      handleSelectLocation(location);
    } catch {
      return;
    }
  }, [handleSelectLocation]);

  const selectedKey = getLocationKey(selectedLocation);
  const savedLocationCards = useMemo(
    () =>
      savedLocations.map((location) => {
        const isActive = getLocationKey(location) === selectedKey;
        const snapshot = isActive ? currentSnapshot : locationCache[getLocationKey(location)];
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
      }),
    [currentSnapshot, locationCache, savedLocations, selectedKey]
  );

  return (
    <AppLayout>
      <StatusBar time={uiSnapshots.statusTime} />
      <House />
      <WeatherInfo sheetProgress={sheetProgress} {...currentSnapshot} />
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
          onClearVisibleList={clearVisibleSearchList}
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
