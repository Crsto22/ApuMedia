import React, { useState } from "react";
import { Mail } from "lucide-react";
import { resetPassword } from "../firebase/auth";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    
    if (!email.trim()) {
      setError("Por favor, ingresa tu correo electrónico.");
      return;
    }

    setIsLoading(true);
    try {
      const successMessage = await resetPassword(email);
      setMessage(successMessage);
    } catch (err) {
      setError("No se pudo enviar el correo. Verifica el email ingresado.");
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-amber-800" />
            <input
              type="email"
              placeholder="Ingresa tu email"
              className="w-full px-10 py-3 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-red-800 hover:bg-red-700 text-white rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg disabled:opacity-70"
          >
            {isLoading ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/" className="text-white hover:text-amber-200 text-sm">
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
