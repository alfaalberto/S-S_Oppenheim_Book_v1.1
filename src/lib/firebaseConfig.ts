// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf5GbKNmUFNo0IOdajhJsk88NAiDRwQpQ",
  authDomain: "diapositivassys.firebaseapp.com",
  projectId: "diapositivassys",
  storageBucket: "diapositivassys.firebasestorage.app",
  messagingSenderId: "1041233662617",
  appId: "1:1041233662617:web:20a2709f85477d2ccb5e08"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);