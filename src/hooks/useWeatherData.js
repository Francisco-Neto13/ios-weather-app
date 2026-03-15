import { useEffect, useMemo, useState } from "react";
import {
  fetchAirQuality,
  fetchCurrentWeather,
  fetchForecast5Day,
} from "../services/openWeather";
import {
  buildCurrentSnapshot,
  buildHeaderSnapshot,
  buildHourlyForecast,
  buildWeeklyForecast,
  buildWidgets,
  deriveDayHighLow,
} from "../lib/weatherMappers";
import { formatCityTime } from "../lib/timeUtils";

export const useWeatherData = (selectedLocation) => {
  const [weatherState, setWeatherState] = useState({
    current: null,
    forecast: null,
    airQuality: null,
    status: "idle",
    error: null,
  });

  const { current, forecast, airQuality, status } = weatherState;

  useEffect(() => {
    let isActive = true;

    const loadWeather = async () => {
      setWeatherState((prev) => ({ ...prev, status: "loading", error: null }));

      try {
        const [nextCurrent, nextForecast, nextAirQuality] = await Promise.all([
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
          fetchAirQuality({
            lat: selectedLocation.lat,
            lon: selectedLocation.lon,
          }),
        ]);

        if (!isActive) return;

        setWeatherState({
          current: nextCurrent,
          forecast: nextForecast,
          airQuality: nextAirQuality,
          status: "success",
          error: null,
        });
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

  const uiSnapshots = useMemo(() => {
    const currentSnapshot = buildCurrentSnapshot({
      current,
      location: selectedLocation,
    });
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
  }, [airQuality, current, forecast, selectedLocation]);

  return {
    weatherState,
    status,
    current,
    uiSnapshots,
  };
};
