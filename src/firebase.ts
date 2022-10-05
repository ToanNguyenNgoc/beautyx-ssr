import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from "firebase/analytics"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    // apiKey: "AIzaSyAoVGO0p-bNNXGQ4CKKeB5Bgi1YFWErAhs",
    // authDomain: "x-otp-5668b.firebaseapp.com",
    // projectId: "x-otp-5668b",
    // storageBucket: "x-otp-5668b.appspot.com",
    // messagingSenderId: "2479500697",
    // appId: "1:2479500697:web:1fbb9ec40c6bcf7f30f708"

    apiKey: "AIzaSyDpR6tnzXJaKhp_uHsHEpHVn9o9tMQeASU",
    authDomain: "myspa-api-2197e.firebaseapp.com",
    projectId: "myspa-api-2197e",
    storageBucket: "myspa-api-2197e.appspot.com",
    messagingSenderId: "91288679971",
    appId: "1:91288679971:web:7b301c6698c90469396396",
    measurementId: "G-SVW84J67ZJ"

    // apiKey: "AIzaSyCKr8P1F42G7Y_x7LBkbIO96xVVSVxCyfg",
    // authDomain: "app-checkin-test.firebaseapp.com",
    // projectId: "app-checkin-test",
    // storageBucket: "app-checkin-test.appspot.com",
    // messagingSenderId: "395382988799",
    // appId: "1:395382988799:web:dbdf5c7de7957e5c0a91ca",
    // measurementId: "G-5K4B1FFSVQ",

    // apiKey: "AIzaSyC0lNEJAh95Dp4JpYDv7L8kXUZ8502dmSk",
    // authDomain: "beautyx-spa.firebaseapp.com",
    // projectId: "beautyx-spa",
    // storageBucket: "beautyx-spa.appspot.com",
    // messagingSenderId: "1018381055842",
    // appId: "1:1018381055842:web:bad18434f365fb4afe9e3b"
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