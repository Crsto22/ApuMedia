import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const clientesCollection = collection(db, "clientes");

// Obtener todos los clientes
export const getClientes = async () => {
  const snapshot = await getDocs(clientesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Agregar un nuevo cliente
export const addCliente = async (cliente) => {
  const docRef = await addDoc(clientesCollection, cliente);
  return { id: docRef.id, ...cliente };
};

// Actualizar cliente por ID
export const updateCliente = async (id, updatedData) => {
  const clienteRef = doc(db, "clientes", id);
  await updateDoc(clienteRef, updatedData);
};

// Eliminar cliente por ID
export const deleteCliente = async (id) => {
  const clienteRef = doc(db, "clientes", id);
  await deleteDoc(clienteRef);
};
