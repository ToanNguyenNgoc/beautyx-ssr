import { AUTH_HEADER } from "api/authHeader"

export const DOMAIN = `https://beautyx.vn`
export const echoConfig = {
  broadcaster: 'pusher',
  key: process.env.MIX_PUSHER_APP_KEY,
  cluster: process.env.MIX_PUSHER_APP_CLUSTER,
  disableStats: true,
  forceTLS: false,
  wsHost: window.location.hostname,
  wsPort: 6001,
  wssPort: 6001,
  encrypted: false,
  enabledTransports: ['ws', 'wss'],
  // authEndpoint: '/ws/auth',
  auth: AUTH_HEADER()
}