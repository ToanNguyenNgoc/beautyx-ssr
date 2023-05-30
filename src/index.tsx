import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./assets/font/style.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { Provider } from "react-redux";
import store from "./redux/store";
// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";
import { SWRConfig } from "swr";
import axiosClient from "./api/axios";
import { PlashScreen } from "components/Layout";
import { AUTH_HEADER } from "api/authHeader";

// Sentry.init({
//     dsn: "https://38eb6d00469546558bd815998210f77f@o1108259.ingest.sentry.io/6554425",
//     integrations: [new BrowserTracing()],

//     // Set tracesSampleRate to 1.0 to capture 100%
//     // of transactions for performance monitoring.
//     // We recommend adjusting this value in production
//     tracesSampleRate: 1.0,
// });

ReactDOM.hydrate(<App />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
