import React, { useState } from 'react';
import {
  LayoutDashboard, Play, Users, ShoppingCart, Package, BarChart2, LogOut,
  ChevronDown, ChevronRight, PlusCircle, Edit, List, History, FileText,
  DollarSign, Box
} from 'lucide-react';
import ApuMedia from "../img/ApuMedia.png";
import { useAuth } from "../context/AuthContext"; // Importar el contexto de autenticación
import { useNavigate } from "react-router-dom"; // Para redirigir después de cerrar sesión

const Sidebar = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const { logoutUser } = useAuth(); // Obtener la función de logout del contexto
  const navigate = useNavigate(); // Hook para redireccionar

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await logoutUser(); // Cerrar sesión
      navigate("/login"); // Redirigir al usuario a la página de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  // Función para manejar la navegación
  const handleNavigation = (path) => {
    navigate(path); // Redirigir a la ruta especificada
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5 text-amber-500 group-hover:text-amber-400" />,
      items: [],
      path: '/dashboard' // Ruta para Dashboard
    },
    {
      title: 'Cuentas',
      icon: <Play className="w-5 h-5 text-amber-500 group-hover:text-amber-400" />,
      items: [
        { name: 'Lista de Cuentas', icon: <List className="w-4 h-4 text-amber-400/70" />, path: '/cuentas' },
        { name: 'Agregar Cuenta', icon: <PlusCircle className="w-4 h-4 text-amber-400/70" />, path: '/cuentas/agregar' },
        { name: 'Editar Cuenta', icon: <Edit className="w-4 h-4 text-amber-400/70" />, path: '/cuentas/editar' }
      ]
    },
    {
      title: 'Clientes',
      icon: <Users className="w-5 h-5 text-amber-500 group-hover:text-amber-400" />,
      items: [
        { name: 'Lista de Clientes', icon: <List className="w-4 h-4 text-amber-400/70" />, path: '/clientes' },
        { name: 'Agregar Cliente', icon: <PlusCircle className="w-4 h-4 text-amber-400/70" />, path: '/clientes/agregar' },
        { name: 'Editar Cliente', icon: <Edit className="w-4 h-4 text-amber-400/70" />, path: '/clientes/editar' }
      ]
    },
    {
      title: 'Ventas',
      icon: <ShoppingCart className="w-5 h-5 text-amber-500 group-hover:text-amber-400" />,
      items: [
        { name: 'Historial de Ventas', icon: <History className="w-4 h-4 text-amber-400/70" />, path: '/ventas/historial' },
        { name: 'Nueva Venta', icon: <PlusCircle className="w-4 h-4 text-amber-400/70" />, path: '/ventas/nueva' }
      ]
    },
    {
      title: 'Inventario',
      icon: <Package className="w-5 h-5 text-amber-500 group-hover:text-amber-400" />,
      items: [
        { name: 'Stock de Cuentas', icon: <Box className="w-4 h-4 text-amber-400/70" />, path: '/inventario/stock' },
        { name: 'Reabastecer', icon: <PlusCircle className="w-4 h-4 text-amber-400/70" />, path: '/inventario/reabastecer' }
      ]
    },
    {
      title: 'Reportes',
      icon: <BarChart2 className="w-5 h-5 text-amber-500 group-hover:text-amber-400" />,
      items: [
        { name: 'Ventas por Período', icon: <FileText className="w-4 h-4 text-amber-400/70" />, path: '/reportes/ventas' },
        { name: 'Ingresos', icon: <DollarSign className="w-4 h-4 text-amber-400/70" />, path: '/reportes/ingresos' }
      ]
    }
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-red-800 to-red-900 text-white shadow-xl flex flex-col">
      {/* Logo Area */}
      <div className="p-6 border-b border-red-700/50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl shadow-lg">
            <img 
              src={ApuMedia}
              alt="ApuMedia Logo"
              className="w-15 rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
              ApuMedia
            </h1>
            <p className="text-xs text-amber-200/70">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar p-4">
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            background-color: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background-color: rgba(185, 28, 28, 0.1);
            border-radius: 4px;
            margin: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, rgb(245, 158, 11), rgb(194, 65, 12));
            border-radius: 4px;
            border: 2px solid rgba(185, 28, 28, 0.1);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, rgb(251, 191, 36), rgb(234, 88, 12));
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgb(245, 158, 11) rgba(185, 28, 28, 0.1);
          }
        `}</style>

        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.title} className={item.items.length > 0 ? 'mt-4' : ''}>
              <button 
                onClick={() => {
                  if (item.items.length === 0) {
                    handleNavigation(item.path); // Navegar si no tiene subitems
                  } else {
                    setExpandedSection(expandedSection === item.title ? null : item.title);
                  }
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-red-700/40 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium text-amber-50">{item.title}</span>
                </div>
                {item.items.length > 0 && (
                  expandedSection === item.title ? 
                    <ChevronDown className="w-4 h-4 text-amber-400/70" /> : 
                    <ChevronRight className="w-4 h-4 text-amber-400/70" />
                )}
              </button>
              
              {expandedSection === item.title && item.items.length > 0 && (
                <ul className="mt-2 ml-4 pl-4 border-l border-red-700/50 space-y-1">
                  {item.items.map((subItem) => (
                    <li key={subItem.name}>
                      <button 
                        onClick={() => handleNavigation(subItem.path)} // Navegar al hacer clic en subitems
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-700/20 transition-all duration-200"
                      >
                        {subItem.icon}
                        <span className="text-sm text-amber-100/80">{subItem.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-red-700/50 flex-shrink-0">
        <button 
          onClick={handleLogout} // Asignar la función de logout al botón
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-950/40 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 group-hover:text-red-200" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;