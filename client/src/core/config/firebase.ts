import firebase from "firebase/app";
import "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyDp4mEwWmkLs2Q1cd9Tce_Totro0rw3nBI",
    authDomain: "ig-coder.firebaseapp.com",
    databaseURL: "https://ig-coder.firebaseio.com",
    projectId: "ig-coder",
    storageBucket: "ig-coder.appspot.com",
    messagingSenderId: "507408162734",
    appId: "1:507408162734:web:b162fb711b68a2f22f323f",
    measurementId: "G-4LEBSV6YQH"
};

// react-redux-firebase config
export const rrfConfig = {
}

firebase.initializeApp(firebaseConfig);

export default firebase;
