import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (!oobCode) {
      setError("Código no válido.");
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
      .then(() => setIsCodeValid(true))
      .catch(() => setError("El enlace es inválido o ha expirado."));
  }, [oobCode]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsLoading(true);

    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setIsLoading(false);
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Contraseña restablecida con éxito. Redirigiendo...");
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setError("Error al restablecer la contraseña. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-amber-600 via-red-800 to-amber-600">
      <div className="w-full max-w-md p-8 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl m-4 border border-white/20">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Restablecer Contraseña</h2>

        {message && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-xl text-white text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-xl text-white text-center">
            {error}
          </div>
        )}

        {isCodeValid && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <input
              type="password"
              placeholder="Nueva contraseña"
              className="w-full px-4 py-3 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-red-800 hover:bg-red-700 text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg disabled:opacity-70"
            >
              {isLoading ? "Restableciendo..." : "Restablecer contraseña"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
