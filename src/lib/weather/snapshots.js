import { getWeatherArt } from "../weatherArtMap";
import {
  formatCondition,
  formatLocationName,
  formatTemperature,
} from "./formatters";

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
