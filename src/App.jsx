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
      <ChatProvider> {/* Envolver toda la aplicación con ChatProvider */}
        <Router>
          <AppRoutes />
        </Router>
      </ChatProvider>
    </AuthProvider>
  );
}

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={
          user ? (
            <ClientesProvider>
              <Dashboard />
            </ClientesProvider>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/clientes"
        element={
          user ? (
            <ClientesProvider>
              <Clientes />
            </ClientesProvider>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/chats"
        element={
          user ? (
            <Chats /> 
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/cuentas"
        element={
          user ? (
            <CuentasProvider>
              <Cuentas />
            </CuentasProvider>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
};

export default App;