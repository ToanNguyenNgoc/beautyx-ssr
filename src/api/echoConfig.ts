import Echo from "laravel-echo";
import { AUTH_HEADER_WS } from "./authHeader";

const echoConfig = () => {
  const config = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_ECHO_KEY,
    cluster: process.env.REACT_APP_ECHO_CLUSTER,
    disableStats: true,
    forceTLS: false,
    wsHost: process.env.REACT_APP_ECHO_WSHOST,
    wsPort: process.env.REACT_APP_ECHO_WSPORT,
    wssPort: process.env.REACT_APP_ECHO_WSSPORT,
    encrypted: true,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: process.env.REACT_APP_ECHO_AUTH_ENDPOINT,
    auth: {
      headers: {
        "Authorization": `Bearer 6440a9cbd4a759d4bd0d90e2|gOvxABcmUh25LvZs3x7t`,
        "Content-Type": ''
      },
    }
  })
  return config
}
export default echoConfig