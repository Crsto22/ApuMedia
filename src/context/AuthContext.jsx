import { createContext, useContext, useState, useEffect } from "react";
import { login, logout } from "../firebase/Auth";
import { auth, db, realtimeDB } from "../firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, update } from "firebase/database"; // Importar funciones de Realtime Database

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          console.log("🔍 Usuario autenticado:", firebaseUser.uid);

          // Buscar el usuario en Firestore
          const q = query(collection(db, "usuarios"), where("uid", "==", firebaseUser.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();

            const userInfo = {
              id: userDoc.id, // Usar el ID de Firestore como clave en Realtime Database
              uid: firebaseUser.uid,
              email: userData.email || "Email no encontrado",
              rol: userData.rol || "Rol no encontrado",
              nombre: userData.nombre || "Nombre no encontrado",
            };

            console.log("✅ Usuario encontrado en Firestore:", userInfo);
            setUser(userInfo);

            // Actualizar isOnline y lastSeen en Realtime Database
            const userRef = ref(realtimeDB, `users/${userDoc.id}`); // Usar el ID de Firestore
            await update(userRef, {
              isOnline: true,
              lastSeen: new Date().toISOString(),
            });
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
      setLoading(false);
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
    try {
      if (user) {
        // Actualizar isOnline y lastSeen en Realtime Database antes de cerrar sesión
        const userRef = ref(realtimeDB, `users/${user.id}`); // Usar el ID de Firestore
        await update(userRef, {
          isOnline: false,
          lastSeen: new Date().toISOString(),
        });
      }

      await logout(); // Cerrar sesión en Firebase Auth
      setUser(null); // Limpiar el estado del usuario
    } catch (error) {
      console.error("🔥 Error al cerrar sesión:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);