import { getWeatherArt } from "../weatherArtMap";
import {
  formatPercent,
  formatTemperature,
  formatTime,
  formatWeekday,
  getLocalDateKey,
  isValidNumber,
} from "./formatters";

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
    const popMax = items.reduce(
      (max, item) => (isValidNumber(item.pop) ? Math.max(max, item.pop) : max),
      0
    );

    return {
      hour: formatWeekday(items[0]?.dt, timezoneOffset),
      icon: getWeatherArt({ id: weather.id, icon: weather.icon, size: "small" }),
      degree: formatTemperature(Number.isFinite(maxTemp) ? maxTemp : preferred?.main?.temp),
      precipitation: formatPercent(popMax),
      isActive: index === 0,
    };
  });
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
