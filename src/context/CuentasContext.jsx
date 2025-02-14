import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/FirebaseConfig";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const CuentasContext = createContext();

export const CuentasProvider = ({ children }) => {
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cuentasRef = collection(db, "cuentas");

    // Escuchar cambios en tiempo real
    const unsubscribe = onSnapshot(cuentasRef, (snapshot) => {
      const cuentasData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCuentas(cuentasData);
      setLoading(false);
    });

    return () => unsubscribe(); // Detener escucha al desmontar
  }, []);

  const agregarCuenta = async (cuenta) => {
    await addDoc(collection(db, "cuentas"), cuenta);
  };

  const actualizarCuenta = async (id, updatedData) => {
    await updateDoc(doc(db, "cuentas", id), updatedData);
  };

  const eliminarCuenta = async (id) => {
    await deleteDoc(doc(db, "cuentas", id));
  };

  return (
    <CuentasContext.Provider value={{ cuentas, loading, agregarCuenta, actualizarCuenta, eliminarCuenta }}>
      {children}
    </CuentasContext.Provider>
  );
};

export const useCuentas = () => useContext(CuentasContext);