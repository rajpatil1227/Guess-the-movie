import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9KBdu0BxRo5gbUJ7HGEh0oyVikdneHeY",
  authDomain: "guess-one-movie.firebaseapp.com",
  projectId: "guess-one-movie",
  storageBucket: "guess-one-movie.appspot.com",
  messagingSenderId: "533990165125",
  appId: "1:533990165125:web:29400a8662b26b1cfcf7ec",
  measurementId: "G-PGPZN5G5M5",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const storage = getStorage(app);

export { app, storage };
