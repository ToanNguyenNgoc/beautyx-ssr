import firebase from "firebase";


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
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth, firebase }