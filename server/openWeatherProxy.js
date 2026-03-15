const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org";
const OPEN_WEATHER_PROXY_PREFIX = "/api/openweather";
const ALLOWED_PATH_PREFIXES = ["/data/2.5/", "/geo/1.0/"];

const getApiKey = () => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENWEATHER_API_KEY environment variable.");
  }

  return apiKey;
};

const getProxyUrl = (requestUrl) => {
  const url = new URL(requestUrl, "http://localhost");
  const pathFromQuery = url.searchParams.get("path");
  const pathname = pathFromQuery
    ? pathFromQuery
    : url.pathname.startsWith(OPEN_WEATHER_PROXY_PREFIX)
      ? url.pathname.slice(OPEN_WEATHER_PROXY_PREFIX.length) || "/"
      : url.pathname;

  if (pathFromQuery) {
    url.searchParams.delete("path");
  }

  return { pathname, searchParams: url.searchParams };
};

const isAllowedPath = (pathname) =>
  ALLOWED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

export const proxyOpenWeatherRequest = async ({ requestUrl, method = "GET" }) => {
  if (method !== "GET") {
    return {
      status: 405,
      body: JSON.stringify({ message: "Method not allowed." }),
      headers: {
        "Allow": "GET",
        "Content-Type": "application/json; charset=utf-8",
      },
    };
  }

  const { pathname, searchParams } = getProxyUrl(requestUrl);

  if (!isAllowedPath(pathname)) {
    return {
      status: 404,
      body: JSON.stringify({ message: "OpenWeather endpoint not found." }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
  }

  const upstreamUrl = new URL(pathname, OPEN_WEATHER_BASE_URL);

  searchParams.forEach((value, key) => {
    if (!value) return;
    upstreamUrl.searchParams.set(key, value);
  });
  upstreamUrl.searchParams.set("appid", getApiKey());

  const response = await fetch(upstreamUrl);
  const body = await response.text();

  return {
    status: response.status,
    body,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": response.headers.get("content-type") ?? "application/json; charset=utf-8",
    },
  };
};
