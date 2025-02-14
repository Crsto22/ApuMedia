import React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

const Alertas = ({ type, message, onClose }) => {
  const alertStyles = {
    success: 'bg-white border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.15)]',
    error: 'bg-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]',
    info: 'bg-white border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
  };

  const iconStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-amber-500 text-white'
  };

  const textStyles = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-amber-800'
  };

  const icons = {
    success: <CheckCircle2 className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    info: <AlertCircle className="h-5 w-5" />
  };

  const titles = {
    success: '¡Éxito!',
    error: '¡Error!',
    info: '¡Atención!'
  };

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-left">
      <div 
        className={`relative w-96 rounded-2xl border-l-4 overflow-hidden
        backdrop-blur-lg bg-opacity-98 ${alertStyles[type]}`}
      >
        <div className="p-4 pl-5">
          <div className="flex items-start gap-4">
            <div className={`shrink-0 rounded-xl p-2.5 ${iconStyles[type]}`}>
              {icons[type]}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`text-base font-semibold mb-1 ${textStyles[type]}`}>
                {titles[type]}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {message}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-10" />
        <div 
          className={`absolute inset-0 ${iconStyles[type]} opacity-5 
          transform -skew-x-12 translate-x-1/2 translate-y-1/2`} 
        />
      </div>
    </div>
  );
};

export default Alertas;