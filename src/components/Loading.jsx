import React from 'react';
import ApuMedia from "../img/ApuMedia.png";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Contenedor de la imagen con animación */}
        <div className="relative">
          {/* Imagen principal con animación de rebote */}
          <img
            src={ApuMedia}
            alt="Logo"
            className="w-24  animate-bounce" // Tamaño más grande (96x96 píxeles)
          />
          {/* Efecto de ping (brillo) detrás de la imagen */}
          <div className="absolute inset-0 w-24 h-24 bg-amber-500/20 rounded-full animate-ping opacity-75"></div>
        </div>

        {/* Puntos de carga con animación */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 rounded-full bg-red-500 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;