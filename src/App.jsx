import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import Clientes from "./page/Clientes";
import ForgotPassword from "./page/ForgotPassword";
import ResetPassword from "./page/ResetPassword";
import Cuentas from "./page/Cuentas";
import Loading from "./components/Loading";
import { ClientesProvider } from "./context/ClientesContext";
import { CuentasProvider } from "./context/CuentasContext";
import { ChatProvider } from "./context/ChatContext"; // Importar ChatProvider
import Chats from "./page/Chats";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Rutas protegidas (requieren autenticación) */}
      <Route
        path="/*"
        element={
          user ? (
            <ChatProvider> {/* Envolver todas las rutas protegidas con ChatProvider */}
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <ClientesProvider>
                      <Dashboard />
                    </ClientesProvider>
                  }
                />
                <Route
                  path="/clientes"
                  element={
                    <ClientesProvider>
                      <Clientes />
                    </ClientesProvider>
                  }
                />
                <Route
                  path="/cuentas"
                  element={
                    <CuentasProvider>
                      <Cuentas />
                    </CuentasProvider>
                  }
                />
                <Route path="/chats" element={<Chats />} />
              </Routes>
            </ChatProvider>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
};

export default App;