import React from 'react';
import { 
  Bell, 
  User,
  Settings,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext'; // Importar el contexto de chat

const Navbar = () => {
  const { user } = useAuth();
  const { unreadMessagesCount } = useChat(); // Obtener el contador de mensajes no leídos

  return (
    <nav className="h-16 border-b border-gray-100 px-8 flex items-center justify-end shadow-lg backdrop-blur-sm bg-white/80 sticky top-0 z-50">
      {/* Right Side Icons */}
      <div className="flex items-center space-x-2">
        {/* Icons Section */}
        <div className="flex items-center px-2 space-x-2">
          {/* Notifications */}
          <button className="relative p-2.5 hover:bg-amber-50 rounded-xl transition-all duration-150 hover:text-amber-500 group cursor-pointer">
            <Bell className="w-5 h-5 text-gray-600 group-hover:text-amber-500 transition-colors duration-150" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
          </button>

          {/* Chat */}
          <button className="relative p-2.5 hover:bg-amber-50 rounded-xl transition-all duration-150 hover:text-amber-500 group cursor-pointer">
            <MessageSquare className="w-5 h-5 text-gray-600 group-hover:text-amber-500 transition-colors duration-150" />
            {unreadMessagesCount > 0 && ( // Mostrar el globo solo si hay mensajes no leídos
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full ring-2 ring-white">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button className="p-2.5 hover:bg-amber-50 rounded-xl transition-all duration-150 hover:text-amber-500 group cursor-pointer">
            <Settings className="w-5 h-5 text-gray-600 group-hover:text-amber-500 transition-colors duration-150" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200"></div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-700 tracking-wide">
              {user?.nombre || "Usuario"}
            </p>
            <p className="text-xs font-medium text-amber-600 tracking-wide">
              {user?.rol || "Sin rol"}
            </p>
          </div>
          <button className="flex items-center justify-center group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 
                          flex items-center justify-center shadow-md 
                          group-hover:shadow-lg group-hover:scale-105 
                          transition-all duration-150 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
              <User className="w-5 h-5 text-white relative z-10" />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;