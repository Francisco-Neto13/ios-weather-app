import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { proxyOpenWeatherRequest } from './server/openWeatherProxy.js'

const openWeatherDevProxy = () => ({
  name: 'openweather-dev-proxy',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const requestUrl = req.originalUrl ?? req.url

      if (!requestUrl?.startsWith('/api/openweather')) {
        next()
        return
      }

      try {
        const response = await proxyOpenWeatherRequest({
          requestUrl,
          method: req.method,
        })

        res.statusCode = response.status
        Object.entries(response.headers).forEach(([header, value]) => {
          res.setHeader(header, value)
        })
        res.end(response.body)
      } catch (error) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(
          JSON.stringify({
            message: error?.message ?? 'Unexpected proxy error.',
          }),
        )
      }
    })
  },
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  process.env.OPENWEATHER_API_KEY ??= env.OPENWEATHER_API_KEY

  return {
    plugins: [
      react(),
      tailwindcss(),
      openWeatherDevProxy(),
    ],
  }
})
