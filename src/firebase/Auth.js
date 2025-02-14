import { auth } from "./FirebaseConfig";
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";

// Iniciar sesión con correo y contraseña
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    throw error;
  }
};

// Cerrar sesión
export const logout = async () => {
  await signOut(auth);
};

// Enviar correo para restablecer contraseña
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "Correo de restablecimiento enviado. Revisa tu bandeja de entrada.";
  } catch (error) {
    console.error("Error al enviar correo de restablecimiento:", error.message);
    throw error;
  }
};
