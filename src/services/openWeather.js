const OPEN_WEATHER_PROXY_BASE_URL = "/api/openweather";

const buildUrl = (path, params = {}) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(OPEN_WEATHER_PROXY_BASE_URL, window.location.origin);
  url.searchParams.set("path", normalizedPath);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    url.searchParams.set(key, value);
  });
  return `${url.pathname}${url.search}`;
};

const requestJson = async (path, params) => {
  const url = buildUrl(path, params);
  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenWeather request failed (${response.status}): ${text}`);
  }
  return response.json();
};

export const fetchCurrentWeather = ({ lat, lon, units = "metric", lang = "en" } = {}) => {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw new Error("Latitude and longitude are required for Current Weather.");
  }
  return requestJson("/data/2.5/weather", { lat, lon, units, lang });
};

export const fetchForecast5Day = ({ lat, lon, units = "metric", lang = "en" } = {}) => {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw new Error("Latitude and longitude are required for Forecast.");
  }
  return requestJson("/data/2.5/forecast", { lat, lon, units, lang });
};

export const fetchAirQuality = ({ lat, lon } = {}) => {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw new Error("Latitude and longitude are required for Air Pollution.");
  }
  return requestJson("/data/2.5/air_pollution", { lat, lon });
};

export const fetchGeocoding = ({ query, limit = 5 } = {}) => {
  if (!query) return Promise.resolve([]);
  return requestJson("/geo/1.0/direct", { q: query, limit });
};

export const fetchReverseGeocoding = ({ lat, lon, limit = 1 } = {}) => {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw new Error("Latitude and longitude are required for Reverse Geocoding.");
  }
  return requestJson("/geo/1.0/reverse", { lat, lon, limit });
};
