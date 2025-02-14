import React, { useState } from 'react';
import {
  LayoutDashboard, Play, Users, ShoppingCart, Package, BarChart2, LogOut,
  ChevronDown, ChevronRight, PlusCircle, Edit, List, History, FileText,
  DollarSign, Box, MessageCircle
} from 'lucide-react';
import ApuMedia from "../img/ApuMedia.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-all duration-300 transform group-hover:scale-110" />,
      items: [],
      path: '/dashboard'
    },
    {
      title: 'Cuentas',
      icon: <Play className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-all duration-300 transform group-hover:scale-110" />,
      items: [],
      path: '/cuentas'
    },
    {
      title: 'Clientes',
      icon: <Users className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-all duration-300 transform group-hover:scale-110" />,
      items: [],
      path: '/clientes'
    },
    {
      title: 'Mensajes',
      icon: <MessageCircle className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-all duration-300 transform group-hover:scale-110" />,
      items: [],
      path: '/chats'
    },
    {
      title: 'Ventas',
      icon: <ShoppingCart className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-all duration-300 transform group-hover:scale-110" />,
      items: [
        { name: 'Historial de Ventas', icon: <History className="w-4 h-4 text-amber-400/70" />, path: '/ventas/historial' },
        { name: 'Nueva Venta', icon: <PlusCircle className="w-4 h-4 text-amber-400/70" />, path: '/ventas/nueva' }
      ]
    },
    {
      title: 'Inventario',
      icon: <Package className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-all duration-300 transform group-hover:scale-110" />,
      items: [
        { name: 'Stock de Cuentas', icon: <Box className="w-4 h-4 text-amber-400/70" />, path: '/inventario/stock' },
        { name: 'Reabastecer', icon: <PlusCircle className="w-4 h-4 text-amber-400/70" />, path: '/inventario/reabastecer' }
      ]
    },
    {
      title: 'Reportes',
      icon: <BarChart2 className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-all duration-300 transform group-hover:scale-110" />,
      items: [
        { name: 'Ventas por Período', icon: <FileText className="w-4 h-4 text-amber-400/70" />, path: '/reportes/ventas' },
        { name: 'Ingresos', icon: <DollarSign className="w-4 h-4 text-amber-400/70" />, path: '/reportes/ingresos' }
      ]
    }
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>

      {/* Logo Area */}
      <div className="p-6 border-b border-red-700/30 flex-shrink-0 relative backdrop-blur-sm bg-gradient-to-r from-red-900/50 to-red-800/50">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-white to-amber-100 p-2.5 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <img 
              src={ApuMedia}
              alt="ApuMedia Logo"
              className="w-12 h-12 rounded-xl object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              ApuMedia
            </h1>
            <p className="text-xs text-amber-200/70 tracking-wide">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 relative backdrop-blur-sm">
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            background-color: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background-color: rgba(185, 28, 28, 0.1);
            border-radius: 8px;
            margin: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, rgb(245, 158, 11), rgb(194, 65, 12));
            border-radius: 8px;
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

        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title} className={item.items.length > 0 ? 'mt-4' : ''}>
              <button 
                onClick={() => {
                  if (item.items.length === 0) {
                    handleNavigation(item.path);
                  } else {
                    setExpandedSection(expandedSection === item.title ? null : item.title);
                  }
                }}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gradient-to-r hover:from-red-700/40 hover:to-red-800/40 transition-all duration-300 group relative overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/0 transition-all duration-500"></div>
                <div className="flex items-center gap-3 relative z-10">
                  {item.icon}
                  <span className="font-medium text-amber-50 tracking-wide transition-all duration-300 group-hover:translate-x-1">
                    {item.title}
                  </span>
                </div>
                {item.items.length > 0 && (
                  <div className="relative z-10">
                    {expandedSection === item.title ? 
                      <ChevronDown className="w-4 h-4 text-amber-400/70 transition-transform duration-300 transform rotate-180" /> : 
                      <ChevronRight className="w-4 h-4 text-amber-400/70 transition-transform duration-300" />
                    }
                  </div>
                )}
              </button>
              
              {expandedSection === item.title && item.items.length > 0 && (
                <ul className="mt-2 ml-4 pl-4 border-l border-red-700/30 space-y-1">
                  {item.items.map((subItem) => (
                    <li key={subItem.name}>
                      <button 
                        onClick={() => handleNavigation(subItem.path)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-red-700/20 transition-all duration-300 group"
                      >
                        {subItem.icon}
                        <span className="text-sm text-amber-100/80 transition-all duration-300 group-hover:translate-x-1">
                          {subItem.name}
                        </span>
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
      <div className="p-4 border-t border-red-700/30 flex-shrink-0 relative backdrop-blur-sm bg-gradient-to-r from-red-900/50 to-red-800/50">
        <button 
          onClick={handleLogout}
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-300 hover:bg-gradient-to-r hover:from-red-950/40 hover:to-red-900/40 transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-red-500/0 transition-all duration-500"></div>
          <LogOut className="w-5 h-5 group-hover:text-red-200 transition-all duration-300 transform group-hover:scale-110" />
          <span className="font-medium transition-all duration-300 group-hover:translate-x-1">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;