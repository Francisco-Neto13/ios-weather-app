import { proxyOpenWeatherRequest } from "../server/openWeatherProxy.js";

export async function GET(request) {
  try {
    const response = await proxyOpenWeatherRequest({
      requestUrl: request.url,
      method: request.method,
    });

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error?.message ?? "Unexpected proxy error.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
  }
}
