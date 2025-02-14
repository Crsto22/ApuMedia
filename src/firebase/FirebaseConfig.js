import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (reemplaza con tus propios valores)
const firebaseConfig = {
  apiKey: "AIzaSyBWFQLugcfXYnjurYsJgjzHb1z_F6S1Zl4",
  authDomain: "apumedia-3d5f2.firebaseapp.com",
  projectId: "apumedia-3d5f2",
  storageBucket: "apumedia-3d5f2.firebasestorage.app",
  messagingSenderId: "934108215041",
  appId: "1:934108215041:web:f64483e0c109efa2f6cd00",
  measurementId: "G-L5EFSV77BW"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
