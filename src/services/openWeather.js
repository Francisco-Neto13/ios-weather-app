const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org";

const getApiKey = () => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_OPENWEATHER_API_KEY environment variable.");
  }
  return apiKey;
};

const buildUrl = (path, params = {}) => {
  const url = new URL(path, OPEN_WEATHER_BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    url.searchParams.set(key, value);
  });
  url.searchParams.set("appid", getApiKey());
  return url.toString();
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
