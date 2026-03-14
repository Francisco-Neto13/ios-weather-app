import { getWeatherArt } from "./weatherArtMap";

const DEFAULT_LOCALE = "en-US";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const isValidNumber = (value) => Number.isFinite(value);

const safeRound = (value, digits = 0) => {
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
  const parts = [location.name, location.state, location.country].filter(Boolean);
  return parts.join(", ");
};

export const formatCondition = (condition) => {
  if (!condition) return "--";
  return condition.charAt(0).toUpperCase() + condition.slice(1);
};

const formatTime = (timestamp, timezone, options) => {
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

const formatWeekday = (timestamp, timezone) =>
  formatTime(timestamp, timezone, { weekday: "short" });

const getLocalDateKey = (timestamp, timezoneOffset) => {
  if (!isValidNumber(timestamp)) return "--";
  const offset = isValidNumber(timezoneOffset) ? timezoneOffset : 0;
  const date = new Date((timestamp + offset) * 1000);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const buildHourlyForecast = (forecastList = [], timezoneOffset, current) => {
  if (!forecastList.length && !current) return [];

  const nowTs = isValidNumber(current?.dt) ? current.dt : Math.floor(Date.now() / 1000);
  const futureItems = forecastList.filter((item) => isValidNumber(item.dt) && item.dt >= nowTs);
  const slice = futureItems.slice(0, 7);

  const nowWeather = current?.weather?.[0] ?? futureItems[0]?.weather?.[0] ?? {};
  const nowTemp = current?.main?.temp ?? futureItems[0]?.main?.temp ?? null;
  const nowPop = futureItems[0]?.pop ?? null;

  const nowCard = {
    hour: "Now",
    icon: getWeatherArt({ id: nowWeather.id, icon: nowWeather.icon, size: "small" }),
    degree: formatTemperature(nowTemp),
    precipitation: formatPercent(nowPop),
    isActive: true,
  };

  const rest = slice.map((item) => {
    const weather = item.weather?.[0] ?? {};
    return {
      hour: formatTime(item.dt, timezoneOffset, { hour: "numeric", hour12: true }),
      icon: getWeatherArt({ id: weather.id, icon: weather.icon, size: "small" }),
      degree: formatTemperature(item.main?.temp ?? item.temp),
      precipitation: formatPercent(item.pop),
      isActive: false,
    };
  });

  return [nowCard, ...rest].slice(0, 8);
};

export const buildWeeklyForecast = (forecastList = [], timezoneOffset) => {
  const grouped = forecastList.reduce((acc, item) => {
    const key = getLocalDateKey(item.dt, timezoneOffset);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const days = Object.keys(grouped).sort().slice(0, 5);
  return days.map((dayKey, index) => {
    const items = grouped[dayKey];
    const preferred =
      items.find((item) => formatTime(item.dt, timezoneOffset, { hour: "numeric", hour12: true }) === "12 PM") ||
      items[Math.floor(items.length / 2)] ||
      items[0];
    const weather = preferred?.weather?.[0] ?? {};
    const maxTemp = items.reduce((max, item) => {
      const temp = item.main?.temp ?? item.temp;
      return isValidNumber(temp) ? Math.max(max, temp) : max;
    }, -Infinity);
    const popMax = items.reduce((max, item) => (isValidNumber(item.pop) ? Math.max(max, item.pop) : max), 0);

    return {
      hour: formatWeekday(items[0]?.dt, timezoneOffset),
      icon: getWeatherArt({ id: weather.id, icon: weather.icon, size: "small" }),
      degree: formatTemperature(Number.isFinite(maxTemp) ? maxTemp : preferred?.main?.temp),
      precipitation: formatPercent(popMax),
      isActive: index === 0,
    };
  });
};

export const buildCurrentSnapshot = ({ current, location }) => {
  const weather = current?.weather?.[0] ?? {};
  return {
    city: formatLocationName(location),
    temperature: formatTemperature(current?.main?.temp),
    condition: formatCondition(weather.description ?? weather.main),
    high: formatTemperature(current?.main?.temp_max),
    low: formatTemperature(current?.main?.temp_min),
    icon: getWeatherArt({ id: weather.id, icon: weather.icon, size: "big" }),
    weatherId: weather.id,
    iconCode: weather.icon,
  };
};

export const buildHeaderSnapshot = ({ current, location }) => {
  const weather = current?.weather?.[0] ?? {};
  return {
    city: formatLocationName(location),
    temperature: formatTemperature(current?.main?.temp),
    condition: formatCondition(weather.description ?? weather.main),
  };
};

export const deriveDayHighLow = ({ forecastList = [], timezoneOffset, baseTimestamp }) => {
  if (!forecastList.length) return { high: null, low: null };
  const baseTs = isValidNumber(baseTimestamp) ? baseTimestamp : Math.floor(Date.now() / 1000);
  const todayKey = getLocalDateKey(baseTs, timezoneOffset);
  const todayItems = forecastList.filter(
    (item) => getLocalDateKey(item.dt, timezoneOffset) === todayKey
  );
  const items = todayItems.length ? todayItems : forecastList.slice(0, 8);
  let max = -Infinity;
  let min = Infinity;
  items.forEach((item) => {
    const temp = item.main?.temp ?? item.temp;
    if (!isValidNumber(temp)) return;
    if (temp > max) max = temp;
    if (temp < min) min = temp;
  });
  return {
    high: Number.isFinite(max) ? max : null,
    low: Number.isFinite(min) ? min : null,
  };
};

const computeDewPoint = (tempC, humidity) => {
  if (!isValidNumber(tempC) || !isValidNumber(humidity)) return null;
  return tempC - (100 - humidity) / 5;
};

const sumNextHoursRain = (forecastList = [], hours = 24) => {
  const slice = forecastList.slice(0, Math.ceil(hours / 3));
  const total = slice.reduce((acc, item) => {
    const amount = item.rain?.["3h"] ?? item.rain?.["1h"];
    return acc + (isValidNumber(amount) ? amount : 0);
  }, 0);
  return safeRound(total, 1);
};

const formatAqi = (aqiValue) => {
  if (!isValidNumber(aqiValue)) {
    return { value: null, description: "Unavailable", progress: 0 };
  }
  const labels = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor",
  };
  return {
    value: aqiValue,
    description: labels[aqiValue] ?? "Unknown",
    progress: clamp((aqiValue - 1) / 4, 0, 1),
  };
};

const formatUv = (uvi) => {
  if (!isValidNumber(uvi)) {
    return { value: null, description: "Unavailable", progress: 0 };
  }
  let description = "Low";
  if (uvi >= 11) description = "Extreme";
  else if (uvi >= 8) description = "Very High";
  else if (uvi >= 6) description = "High";
  else if (uvi >= 3) description = "Moderate";
  return {
    value: Math.round(uvi),
    description,
    progress: clamp(uvi / 11, 0, 1),
  };
};

const estimateUvIndex = ({ current, sunProgress }) => {
  if (!isValidNumber(sunProgress) || sunProgress <= 0) return 0;
  const weatherId = current?.weather?.[0]?.id;
  const clouds = isValidNumber(current?.clouds?.all) ? current.clouds.all : 0;
  const visibilityKm = isValidNumber(current?.visibility) ? current.visibility / 1000 : null;

  const base = Math.sin(Math.PI * sunProgress) * 11;
  const cloudFactor = 1 - Math.min(clouds, 100) / 100 * 0.75;

  let conditionFactor = 1;
  if (Number.isFinite(weatherId)) {
    if (weatherId >= 200 && weatherId < 700) conditionFactor = 0.6;
    else if (weatherId >= 700 && weatherId < 800) conditionFactor = 0.8;
  }

  const visibilityFactor = isValidNumber(visibilityKm) && visibilityKm < 2 ? 0.7 : 1;
  const estimated = base * cloudFactor * conditionFactor * visibilityFactor;
  return clamp(estimated, 0, 11);
};

const formatVisibilityDescription = (km) => {
  if (!isValidNumber(km)) return "Unavailable";
  if (km >= 10) return "Excellent visibility.";
  if (km >= 5) return "Good visibility.";
  if (km >= 2) return "Moderate visibility.";
  return "Low visibility.";
};

export const buildWidgets = ({ current, forecast, airQuality }) => {
  const hourly = forecast?.list ?? [];
  const timezoneOffset = forecast?.city?.timezone ?? current?.timezone ?? 0;

  const aqiValue = airQuality?.list?.[0]?.main?.aqi ?? airQuality?.list?.[0]?.aqi;
  const aqi = formatAqi(aqiValue);

  const dewPoint = computeDewPoint(current?.main?.temp, current?.main?.humidity);
  const dewPointText = isValidNumber(dewPoint)
    ? `Dew point is ${formatTemperature(dewPoint)} right now.`
    : "Dew point data unavailable.";

  const sunrise = formatTime(current?.sys?.sunrise, timezoneOffset, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const sunset = formatTime(current?.sys?.sunset, timezoneOffset, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const sunProgress = (() => {
    if (!isValidNumber(current?.dt) || !isValidNumber(current?.sys?.sunrise) || !isValidNumber(current?.sys?.sunset)) {
      return 0;
    }
    return clamp((current.dt - current.sys.sunrise) / (current.sys.sunset - current.sys.sunrise), 0, 1);
  })();

  const visibilityKm = isValidNumber(current?.visibility) ? current.visibility / 1000 : null;

  const rainfallLastHour = safeRound(
    current?.rain?.["1h"] ?? (isValidNumber(current?.rain?.["3h"]) ? current.rain["3h"] / 3 : 0),
    1
  );
  const rainfallNextDay = sumNextHoursRain(hourly, 24);
  const rainfallForecastText = isValidNumber(rainfallNextDay)
    ? rainfallNextDay > 0
      ? `${rainfallNextDay} mm expected in next 24h.`
      : "No rain expected in next 24h."
    : "Rain forecast unavailable.";
  const rainfallPeriodText = rainfallLastHour > 0 ? "in last hour" : "No rain in last hour";
  const feelsLikeDiff = isValidNumber(current?.main?.feels_like) && isValidNumber(current?.main?.temp)
    ? current.main.feels_like - current.main.temp
    : 0;
  const feelsLikeDescription = Math.abs(feelsLikeDiff) < 1
    ? "Similar to the actual temperature."
    : feelsLikeDiff > 0
      ? "Feels warmer than the actual temperature."
      : "Feels cooler than the actual temperature.";

  const uvRaw = isValidNumber(current?.uvi)
    ? current.uvi
    : estimateUvIndex({ current, sunProgress });
  const uvIndex = formatUv(uvRaw);

  return {
    airQuality: {
      value: aqi.value,
      description: aqi.description,
      progress: aqi.progress,
    },
    uvIndex: uvIndex,
    sunrise: {
      sunrise,
      sunset,
      progress: sunProgress,
    },
    wind: {
      speed: formatSpeedKmh(current?.wind?.speed),
      unit: "km/h",
      direction: current?.wind?.deg ?? 0,
    },
    rainfall: {
      amount: rainfallLastHour ?? 0,
      unit: "mm",
      period: rainfallPeriodText,
      forecast: rainfallForecastText,
    },
    feelsLike: {
      value: formatTemperature(current?.main?.feels_like),
      description: feelsLikeDescription,
    },
    humidity: {
      value: isValidNumber(current?.main?.humidity) ? `${Math.round(current.main.humidity)}%` : "--",
      description: dewPointText,
    },
    visibility: {
      value: isValidNumber(visibilityKm) ? `${visibilityKm.toFixed(1)} km` : "--",
      description: formatVisibilityDescription(visibilityKm),
    },
    pressure: {
      value: isValidNumber(current?.main?.pressure) ? Math.round(current.main.pressure) : null,
      unit: "hPa",
    },
  };
};
