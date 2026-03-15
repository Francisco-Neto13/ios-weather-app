const DEFAULT_LOCALE = "en-US";

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
export const isValidNumber = (value) => Number.isFinite(value);

export const safeRound = (value, digits = 0) => {
  if (!isValidNumber(value)) return null;
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};

export const formatTemperature = (value) => {
  if (!isValidNumber(value)) return "--";
  return `${Math.round(value)}\u00B0`;
};

export const formatPercent = (value) => {
  if (!isValidNumber(value)) return null;
  return `${Math.round(value * 100)}%`;
};

export const formatSpeedKmh = (valueMs) => {
  if (!isValidNumber(valueMs)) return "--";
  return Math.round(valueMs * 3.6);
};

export const formatVisibilityKm = (valueMeters) => {
  if (!isValidNumber(valueMeters)) return "--";
  return (valueMeters / 1000).toFixed(1);
};

export const formatLocationName = (location) => {
  if (!location?.name) return "--";
  return location.name;
};

export const formatLocationFullName = (location) => {
  if (!location?.name) return "--";
  return [location.name, location.state, location.country].filter(Boolean).join(", ");
};

export const formatCondition = (condition) => {
  if (!condition) return "--";
  return condition.charAt(0).toUpperCase() + condition.slice(1);
};

export const formatTime = (timestamp, timezone, options) => {
  if (!isValidNumber(timestamp)) return "--";

  const isOffset = isValidNumber(timezone);
  const date = new Date((timestamp + (isOffset ? timezone : 0)) * 1000);

  try {
    const timeZone = isOffset ? "UTC" : timezone;
    return new Intl.DateTimeFormat(DEFAULT_LOCALE, { timeZone, ...options }).format(date);
  } catch {
    return date.toLocaleTimeString(DEFAULT_LOCALE, options);
  }
};

export const formatWeekday = (timestamp, timezone) =>
  formatTime(timestamp, timezone, { weekday: "short" });

export const getLocalDateKey = (timestamp, timezoneOffset) => {
  if (!isValidNumber(timestamp)) return "--";

  const offset = isValidNumber(timezoneOffset) ? timezoneOffset : 0;
  const date = new Date((timestamp + offset) * 1000);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};
