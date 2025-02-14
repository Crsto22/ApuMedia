import { createContext, useContext, useState, useEffect } from "react";
import { login, logout } from "../firebase/Auth";
import { auth, db } from "../firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true); // Comenzar carga
      if (firebaseUser) {
        try {
          console.log("🔍 Usuario autenticado:", firebaseUser.uid);

          const q = query(collection(db, "usuarios"), where("uid", "==", firebaseUser.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();

            const userInfo = {
              uid: firebaseUser.uid,
              email: userDoc.email || "Email no encontrado",
              rol: userDoc.rol || "Rol no encontrado",
              nombre: userDoc.nombre || "Nombre no encontrado",
            };

            console.log("✅ Usuario encontrado en Firestore:", userInfo);
            setUser(userInfo);
          } else {
            console.warn(`⚠️ No se encontró el usuario en Firestore (UID: ${firebaseUser.uid})`);
            setUser(null);
          }
        } catch (error) {
          console.error("🔥 Error al obtener datos del usuario:", error);
          setUser(null);
        }
      } else {
        console.log("🚪 Usuario no autenticado.");
        setUser(null);
      }
      setLoading(false); // Finalizar carga
    });

    return () => unsubscribe();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const userData = await login(email, password);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
