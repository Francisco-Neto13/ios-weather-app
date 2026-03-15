export const DEFAULT_LOCATION = {
  name: "Montreal",
  state: "QC",
  country: "CA",
  lat: 45.5017,
  lon: -73.5673,
};

export const STORAGE_KEYS = {
  locations: "weather.savedLocations.v1",
  cache: "weather.locationCache.v1",
};

export const getLocationKey = (location) =>
  `${Number(location?.lat).toFixed(4)}:${Number(location?.lon).toFixed(4)}`;

export const readStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

export const writeStorage = (key, value) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
};
