// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFPMaCKZmi4IqODTiCIlxFYnx0Mbci7cw",
  authDomain: "test-e95ea.firebaseapp.com",
  databaseUrl:"https://test-e95ea-default-rtdb.firebaseio.com/",
  projectId: "test-e95ea",
  storageBucket: "test-e95ea.appspot.com",
  messagingSenderId: "677183882453",
  appId: "1:677183882453:web:b3994bad5151477090ce5c",
  measurementId: "G-8KGYM6DVQV"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const  database = getDatabase(app)