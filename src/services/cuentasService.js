import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const cuentasCollection = collection(db, "cuentas");

// Obtener todas las cuentas
export const getCuentas = async () => {
  const snapshot = await getDocs(cuentasCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Agregar una nueva cuenta
export const addCuenta = async (cuenta) => {
  const docRef = await addDoc(cuentasCollection, cuenta);
  return { id: docRef.id, ...cuenta };
};

// Actualizar cuenta por ID
export const updateCuenta = async (id, updatedData) => {
  const cuentaRef = doc(db, "cuentas", id);
  await updateDoc(cuentaRef, updatedData);
};

// Eliminar cuenta por ID
export const deleteCuenta = async (id) => {
  const cuentaRef = doc(db, "cuentas", id);
  await deleteDoc(cuentaRef);
};