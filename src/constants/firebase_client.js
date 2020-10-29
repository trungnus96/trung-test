import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADW-ihT8xOrKQ2RFMX9by7wUWJ2TZGORg",
  authDomain: "brauz-url-shortener-test.firebaseapp.com",
  databaseURL: "https://brauz-url-shortener-test.firebaseio.com",
  projectId: "brauz-url-shortener-test",
  storageBucket: "brauz-url-shortener-test.appspot.com",
  messagingSenderId: "440052633252",
  appId: "1:440052633252:web:a3ed779182e36e83c2a031",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

// Export the database for components to use.
export { db };
