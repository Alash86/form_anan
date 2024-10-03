// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import storage

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDOYO6dYGTvT8IL6eDWNGP2rvhAbqL94M",
    authDomain: "physio-anan.firebaseapp.com",
    projectId: "physio-anan",
    storageBucket: "physio-anan.appspot.com",
    messagingSenderId: "751099166265",
    appId: "1:751099166265:web:bd15cb542c5f1b3eaf97e8",
    measurementId: "G-C90EY6CMTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize storage

export { storage }; // Export storage for use in other files