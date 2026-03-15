const smallIcons = {
  moonCloudRain: "/widgets/small/moon-cloud-rain.png",
  moonCloudWind: "/widgets/small/moon-cloud-wind.png",
  sunCloudAngledRain: "/widgets/small/sun-cloud-angled-rain.png",
  sunCloudRain: "/widgets/small/sun-cloud-rain.png",
  tornado: "/widgets/small/tornado.png",
};

const bigIcons = {
  moonCloudFastWind: "/widgets/big/moon-cloud-fast-wind.png",
  moonCloudMidRain: "/widgets/big/moon-cloud-mid-rain.png",
  sunCloudAngledRain: "/widgets/big/sun-cloud-angled-rain.png",
  sunCloudMidRain: "/widgets/big/sun-cloud-mid-rain.png",
  tornado: "/widgets/big/tornado.png",
};

const isNight = (icon) => icon?.includes("n");

const pickIconKey = ({ id, icon, size }) => {
  const night = isNight(icon);
  const big = size === "big";

  if (!Number.isFinite(id)) {
    return night ? (big ? "moonCloudFastWind" : "moonCloudWind") : (big ? "sunCloudAngledRain" : "sunCloudRain");
  }

  if (id === 800) {
    return night ? (big ? "moonCloudFastWind" : "moonCloudWind") : (big ? "sunCloudAngledRain" : "sunCloudRain");
  }

  if (id >= 200 && id < 300) {
    return "tornado";
  }

  if (id >= 600 && id < 700) {
    return night ? (big ? "moonCloudMidRain" : "moonCloudRain") : (big ? "sunCloudMidRain" : "sunCloudRain");
  }

  if (id >= 700 && id < 800) {
    return night ? (big ? "moonCloudFastWind" : "moonCloudWind") : (big ? "sunCloudAngledRain" : "sunCloudAngledRain");
  }

  if (id >= 300 && id < 600) {
    return night ? (big ? "moonCloudMidRain" : "moonCloudRain") : (big ? "sunCloudMidRain" : "sunCloudAngledRain");
  }

  if (id > 800 && id < 900) {
    return night ? (big ? "moonCloudFastWind" : "moonCloudWind") : (big ? "sunCloudAngledRain" : "sunCloudRain");
  }

  return night ? (big ? "moonCloudFastWind" : "moonCloudWind") : (big ? "sunCloudAngledRain" : "sunCloudRain");
};

const openWeatherIconUrl = (icon) => {
  if (!icon) return null;
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export const getWeatherArt = ({ id, icon, size = "small" } = {}) => {
  if (!icon && !Number.isFinite(id)) return null;
  const iconKey = pickIconKey({ id, icon, size });
  const iconMap = size === "big" ? bigIcons : smallIcons;
  return iconMap[iconKey] || openWeatherIconUrl(icon);
};

export const weatherArt = {
  small: smallIcons,
  big: bigIcons,
};
