import { AUTH_HEADER_WS } from "config/header.config";
import Echo from "laravel-echo";
import {baseURL} from "./axios-client.config"

export const echoConfig = () => {
  const authEndpoint = baseURL?.replace('v1/','broadcasting/auth')
  const wsHost = baseURL?.replace('https://','')?.replace('/v1/','')
  const config = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_ECHO_KEY,
    cluster: process.env.REACT_APP_ECHO_CLUSTER,
    disableStats: true,
    forceTLS: false,
    // wsHost: process.env.REACT_APP_ECHO_WSHOST,
    wsHost:wsHost,
    wsPort: process.env.REACT_APP_ECHO_WSPORT,
    wssPort: process.env.REACT_APP_ECHO_WSSPORT,
    encrypted: true,
    enabledTransports: ['ws', 'wss'],
    // authEndpoint: process.env.REACT_APP_ECHO_AUTH_ENDPOINT,
    authEndpoint:authEndpoint,
    auth: AUTH_HEADER_WS()
  })
  return config
}