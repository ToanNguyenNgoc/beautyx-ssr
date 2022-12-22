import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from "firebase/analytics"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {

    apiKey: "AIzaSyDpR6tnzXJaKhp_uHsHEpHVn9o9tMQeASU",
    authDomain: "myspa-api-2197e.firebaseapp.com",
    projectId: "myspa-api-2197e",
    storageBucket: "myspa-api-2197e.appspot.com",
    messagingSenderId: "91288679971",
    appId: "1:91288679971:web:7b301c6698c90469396396",
    measurementId: "G-SVW84J67ZJ"
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