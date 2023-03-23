import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from "firebase/analytics"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

const firebaseConfig = {

    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SEND_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
};
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app);
const authentication = getAuth(app)
// firebase.setAnalyticsCollectionEnabled


// const KEY = `${process.env.REACT_APP_NOTI_KEY}`

// const messaging = getMessaging()

// export const requestForToken = () => {
//     return getToken(messaging, { vapidKey: KEY })
//         .then((currentToken) => {
//             if (currentToken) {
//                 console.log('current token for client: ', currentToken);
//             } else {
//                 console.log('No registration token available. Request permission to generate one.');
//             }
//         })
//         .catch((err) => {
//             console.log('An error occurred while retrieving token. ', err);
//         });
// };
// export const onMessageListener = () => {
//     return new Promise((resolve) => {
//         onMessage(messaging, (payload) => {
//             resolve(payload);
//         });
//     });
// }


export { analytics, authentication, logEvent, RecaptchaVerifier, signInWithPhoneNumber }