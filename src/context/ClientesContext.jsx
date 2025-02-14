import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/FirebaseConfig";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clientesRef = collection(db, "clientes");

    // Escuchar cambios en tiempo real
    const unsubscribe = onSnapshot(clientesRef, (snapshot) => {
      const clientesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setClientes(clientesData);
      setLoading(false);
    });

    return () => unsubscribe(); // Detener escucha al desmontar
  }, []);

  const agregarCliente = async (cliente) => {
    await addDoc(collection(db, "clientes"), cliente);
  };

  const actualizarCliente = async (id, updatedData) => {
    await updateDoc(doc(db, "clientes", id), updatedData);
  };

  const eliminarCliente = async (id) => {
    await deleteDoc(doc(db, "clientes", id));
  };

  return (
    <ClientesContext.Provider value={{ clientes, loading, agregarCliente, actualizarCliente, eliminarCliente }}>
      {children}
    </ClientesContext.Provider>
  );
};

export const useClientes = () => useContext(ClientesContext);
