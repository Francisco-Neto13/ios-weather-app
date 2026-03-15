import {
  clamp,
  formatSpeedKmh,
  formatTemperature,
  formatTime,
  isValidNumber,
  safeRound,
} from "./formatters";

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
  const cloudFactor = 1 - (Math.min(clouds, 100) / 100) * 0.75;

  let conditionFactor = 1;
  if (Number.isFinite(weatherId)) {
    if (weatherId >= 200 && weatherId < 700) conditionFactor = 0.6;
    else if (weatherId >= 700 && weatherId < 800) conditionFactor = 0.8;
  }

  const visibilityFactor = isValidNumber(visibilityKm) && visibilityKm < 2 ? 0.7 : 1;
  return clamp(base * cloudFactor * conditionFactor * visibilityFactor, 0, 11);
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
  const sunProgress =
    isValidNumber(current?.dt) &&
    isValidNumber(current?.sys?.sunrise) &&
    isValidNumber(current?.sys?.sunset)
      ? clamp(
          (current.dt - current.sys.sunrise) / (current.sys.sunset - current.sys.sunrise),
          0,
          1
        )
      : 0;
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
  const feelsLikeDiff =
    isValidNumber(current?.main?.feels_like) && isValidNumber(current?.main?.temp)
      ? current.main.feels_like - current.main.temp
      : 0;
  const feelsLikeDescription =
    Math.abs(feelsLikeDiff) < 1
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
    uvIndex,
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
