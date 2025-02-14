import React, { useState } from 'react';
import { User, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ApuMedia from "../img/ApuMedia.png";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });

  const validateForm = () => {
    const errors = {
      email: '',
      password: ''
    };
    
    if (!credentials.email.trim()) {
      errors.email = 'Por favor ingrese su email';
    }
    if (!credentials.password.trim()) {
      errors.password = 'Por favor ingrese su contraseña';
    }

    setValidationErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await loginUser(credentials.email, credentials.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-amber-600 via-red-800 to-amber-600 animate-gradient-xy">
      <div className="relative w-full max-w-md p-8 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl m-4 border border-white/20 transform transition-all duration-300">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-black rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-black rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="space-y-4 flex flex-col items-center mb-8 relative">
          <div className="w-32 h-32 mb-4 rounded-full bg-white p-4 shadow-xl flex items-center justify-center backdrop-blur-sm border border-white/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
            <img
              src={ApuMedia}
              alt="Company Logo"
              className="w-24 h-24 object-contain drop-shadow-lg"
            />
          </div>
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Bienvenido</h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-xl text-white text-center animate-shake">
            {error}
          </div>
        )}

        <div className="relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <User className="absolute left-3 top-3 h-5 w-5 text-amber-800" />
              <input
                type="email"
                placeholder="Email"
                className={`w-full px-10 py-3 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg transition-all duration-300 ${
                  validationErrors.email ? 'ring-2 ring-red-500' : ''
                }`}
                value={credentials.email}
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    email: e.target.value
                  });
                  if (validationErrors.email) {
                    setValidationErrors({
                      ...validationErrors,
                      email: ''
                    });
                  }
                }}
              />
              {validationErrors.email && (
                <p className="text-white text-sm mt-1 ml-2 animate-fadeIn">
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div className="relative group">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-amber-800" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className={`w-full px-10 py-3 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg transition-all duration-300 ${
                  validationErrors.password ? 'ring-2 ring-red-500' : ''
                }`}
                value={credentials.password}
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    password: e.target.value
                  });
                  if (validationErrors.password) {
                    setValidationErrors({
                      ...validationErrors,
                      password: ''
                    });
                  }
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-amber-800 hover:text-amber-600 transition-colors duration-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {validationErrors.password && (
                <p className="text-white text-sm mt-1 ml-2 animate-fadeIn">
                  {validationErrors.password}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Link 
                to="/forgot-password" 
                className="text-white hover:text-amber-200 text-sm transition-colors duration-300"
              >
                ¿Has olvidado tu contraseña?
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3 px-4 bg-red-800 hover:bg-red-700 cursor-pointer text-white rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Ingresando...</span>
                </div>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Ingresar
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;